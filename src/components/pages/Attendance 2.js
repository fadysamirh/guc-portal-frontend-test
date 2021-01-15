import React, { useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import axios from 'axios'
import moment from 'moment'
import { useSelector } from 'react-redux'
//local imports

import { backendLink, secretOrKey } from '../../keys_dev'
import Snackbar from '../Helpers/General/SnackbarAlert'

//react bootstrap
import { Row, Table, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

//material ui imports
import { Button } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'

//styling
import 'react-datepicker/dist/react-datepicker.css'

var jwt = require('jsonwebtoken')

const useStyles = makeStyles({
  formControl: {},
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '1vw',
    textAlign: 'center',
    backgroundColor: '#899fba',
    color: 'white',
  },
})

export default function Attendance() {
  const classes = useStyles()

  const token = useSelector((state) => state.token)
  const academicId = jwt.verify(token, secretOrKey).academicId
  //hooks
  const [manualSignInState, setManualSignInState] = React.useState({})
  const [manualSignOutState, setManualSignOutState] = React.useState({})
  //view my attendance
  const [attendanceStartDate, setAttendanceStartDate] = React.useState(
    new Date()
  )
  const [deductionsDate, setDeductionsDate] = React.useState(
    new Date()
  )
  const [attendance, setAttendance] = React.useState([])
  const [deductions, setDeductions] = React.useState({})
  //missing hours date
  const [missingHoursStartDate, setMissingHoursStartDate] = React.useState(
    new Date()
  )
  const [missingHours, setMissingHours] = React.useState(-1)
  const [extraHours, setExtraHours] = React.useState(-1)
  //missing days hooks
  const [missingDaysStartDate, setMissingDaysStartDate] = React.useState(
    new Date()
  )
  const [missingDays, setMissingDays] = React.useState(-1)

  //alert hooks
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')

  //view all my attendance
  const [attendanceAllStartDate, setAttendanceAllStartDate] = React.useState(
    new Date()
  )
  const [attendanceAll, setAttendanceAll] = React.useState([])

  useEffect(() => {}, [extraHours, missingHours, missingDays])

  //handlers
  const handleManualSignInChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setManualSignInState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }
  const handleManualSignOutChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setManualSignOutState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }
  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  const handleSignIn = (e) => {
    axios({
      method: 'post',
      url: `${backendLink}/attendance/signIn`,
      headers: { authorization: token },
      data: {
        Account: { academicId: academicId },
      },
    }).then((res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg(res.data.message)
        setShowSeverity('success')
      } else {
        setShowSeverity('error')
       
        setShowAlert(true)
        setShowAlertMsg(res.data.error)
      }
    })
  }
  const handleSignOut = (e) => {
    axios({
      method: 'post',
      url: `${backendLink}/attendance/signOut`,
      headers: { authorization: token },
      data: {
        Account: { academicId: academicId },
      },
    }).then((res) => {
      if (res.data.statusCode === 0) {
        setShowAlertMsg(res.data.message)
        setShowSeverity('success')
        setShowAlert(true)
      } else {
        setShowAlertMsg(res.data.error)
        setShowSeverity('error')

        setShowAlert(true)
      }
    })
  }
  const handleViewMyAttendance = (e) => {
    axios({
      method: 'post',
      url: `${backendLink}/attendance/viewMyAttendanceRecord`,
      headers: { authorization: token },
      data: {
        Account: { academicId: academicId },
        Attendance: {
          month: `${moment(attendanceStartDate).month() + 1}`,
          year: `${moment(attendanceStartDate).year()}`,
        },
      },
    }).then((res) => {
      if (res.data.statusCode === 0) {
        setAttendance(res.data.Attendance)
      } else {
      }
    })
  }
  const handleViewMyDeductions = (e) => {
    setDeductions({})
    axios({
      method: 'post',
      url: `${backendLink}/attendance/getDeductions`,
      headers: { authorization: token },
      data: {
        Account: { academicId: academicId },
        Attendance: {
          month: `${moment(deductionsDate).month() + 1}`,
          year: `${moment(deductionsDate).year()}`,
        },
      },
    }).then((res) => {
      console.log(res.data)
      if (res.data.statusCode === 0) {
        console.log(res.data)
        setDeductions(res.data)
      } else {
      }
    })
  }
  const handleMissingHours = () => {
    setExtraHours(-1)
    setMissingHours(-1)

    axios({
      method: 'post',
      url: `${backendLink}/attendance/viewExtraMissingWorkedHours`,
      headers: { authorization: token },
      data: {
        Account: { academicId: academicId },
        Attendance: {
          month: `${moment(missingHoursStartDate).month() + 1}`,
          year: `${moment(missingHoursStartDate).year()}`,
        },
      },
    }).then((res) => {
      console.log(res)
      console.log(extraHours, missingHours)
      if (res.data.statusCode === 0) {
        if (res.data.type === 'extra') {
          setExtraHours(res.data.hours)
        } else {
          setMissingHours(res.data.hours)
        }
      } else {
        setShowAlertMsg(res.data.message)
        setShowSeverity('error')

        setShowAlert(true)
      }
    })
  }
  const handleMissingDays = () => {
    setMissingDays(-1)
    axios({
      method: 'post',
      url: `${backendLink}/attendance/viewMissingDays`,
      headers: { authorization: token },
      data: {
        Account: { academicId: academicId },
        Attendance: {
          month: `${moment(missingDaysStartDate).month() + 1}`,
          year: `${moment(missingDaysStartDate).year()}`,
        },
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode === 0) {
        setMissingDays(res.data.missingDays)
      } else {
        setShowAlertMsg(res.data.error)
        setShowSeverity('error')
        setShowAlert(true)
      }
    })
  }
  const handleViewAllMyAttendance = () => {
    console.log()
    axios({
      method: 'post',
      url: `${backendLink}/attendance/viewAllMyAttendanceRecord`,
      headers: { authorization: token },
      data: {
        Account: { academicId: academicId },
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode === 0) {
        setAttendanceAll(res.data.Attendance)
      } else {
        setShowAlertMsg(res.data.error)
        setShowSeverity('error')
        setShowAlert(true)
      }
    })
  }
  //view Helpers
  const ManualSignIn = () => {
    return (
      <Row>
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='hour'
            onChange={handleManualSignInChange}
            required
            value={
              manualSignInState['hour'] !== undefined
                ? manualSignInState['hour']
                : ''
            }
            placeholder='Hour'
          />{' '}
        </Form.Group>
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='minute'
            onChange={handleManualSignInChange}
            required
            value={
              manualSignInState['minute'] !== undefined
                ? manualSignInState['minute']
                : ''
            }
            placeholder='Minute'
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='day'
            onChange={handleManualSignInChange}
            required
            value={
              manualSignInState['day'] !== undefined
                ? manualSignInState['day']
                : ''
            }
            placeholder='Day'
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='month'
            onChange={handleManualSignInChange}
            required
            value={
              manualSignInState['month'] !== undefined
                ? manualSignInState['month']
                : ''
            }
            placeholder='Month'
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='year'
            onChange={handleManualSignInChange}
            required
            value={
              manualSignInState['year'] !== undefined
                ? manualSignInState['year']
                : ''
            }
            placeholder='Year'
          />
        </Form.Group>{' '}
        <button>Manual Sign In</button>
      </Row>
    )
  }

  const ManualSignOut = () => {
    return (
      <Row>
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='hour'
            onChange={handleManualSignOutChange}
            required
            value={
              manualSignOutState['hour'] !== undefined
                ? manualSignOutState['hour']
                : ''
            }
            placeholder='Hour'
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='minute'
            onChange={handleManualSignOutChange}
            required
            value={
              manualSignOutState['minute'] !== undefined
                ? manualSignOutState['minute']
                : ''
            }
            placeholder='Minute'
          />{' '}
        </Form.Group>
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='day'
            onChange={handleManualSignOutChange}
            required
            value={
              manualSignOutState['day'] !== undefined
                ? manualSignOutState['day']
                : ''
            }
            placeholder='Day'
          />{' '}
        </Form.Group>
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='month'
            onChange={handleManualSignOutChange}
            required
            value={
              manualSignOutState['month'] !== undefined
                ? manualSignOutState['month']
                : ''
            }
            placeholder='Month'
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='year'
            onChange={handleManualSignOutChange}
            required
            value={
              manualSignOutState['year'] !== undefined
                ? manualSignOutState['year']
                : ''
            }
            placeholder='Year'
          />
        </Form.Group>{' '}
        <button>Manual Sign Out</button>
      </Row>
    )
  }

  //View Attendance
  function FormMyAttendanceRow(props) {
    return (
      <Grid container item xs={9} spacing={1}>
        <React.Fragment>
          <Grid item xs={3}>
            <Paper className={classes.paper}>{props.item1}</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>{props.item2}</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>{props.item3}</Paper>
          </Grid>
        </React.Fragment>
      </Grid>
    )
  }
  function FormMyAttendanceTableHeader(props) {
    return (
      <Grid container item xs={9} spacing={1}>
        <React.Fragment>
          <Grid item xs={3}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item1}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item2}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item3}
            </Paper>
          </Grid>
        </React.Fragment>
      </Grid>
    )
  }

  const ViewMyAttendanceTable = () => {
    return (
      <div>
        {/*Table Creation */}{' '}
        <Grid container spacing={1} style={{ marginBottom: '1vw' }}>
          <FormMyAttendanceTableHeader
            item1='Date'
            item2='SignIn Time'
            item3='SignOut Time'
          />{' '}
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ height: '20vw', overflow: 'scroll' }}
        >
          {attendance.length === 0
            ? 'No Results Found'
            : attendance.map((oneAttendance) => (
                <FormMyAttendanceRow
                  item1={moment(oneAttendance.signInTime).format('DD/MM/YYYY')}
                  item2={moment(oneAttendance.signInTime).format('HH:mm')}
                  item3={moment(oneAttendance.signOutTime).format('HH:mm')}
                />
              ))}
        </Grid>
      </div>
    )
  }

  const ViewMyAttendance = () => {
    return (
      <div>
        <div>View Your Attendance a Specific Month/Year</div>
        <Row>
          {' '}
          <ReactDatePicker
            selected={attendanceStartDate}
            onChange={(date) => setAttendanceStartDate(date)}
            dateFormat='MM/yyyy'
            showMonthYearPicker
            showFullMonthYearPicker
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleViewMyAttendance}
          >
            View
          </Button>
        </Row>
        <ViewMyAttendanceTable />
      </div>
    )
  }
  const ViewMyDeductions = () => {
    return (
      <div>
        <div>View Your deductions in a specific Month/Year</div>
        <Row>
          {' '}
          <ReactDatePicker
            selected={deductionsDate}
            onChange={(date) => setDeductionsDate(date)}
            dateFormat='MM/yyyy'
            showMonthYearPicker
            showFullMonthYearPicker
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleViewMyDeductions}
          >
            View
          </Button>
        </Row>
        <div>
          {deductions === undefined ? '' : deductions.deductedHours }
        </div>
        <div>
          {deductions === undefined ? '' : deductions.deductedDays}
        </div>
      </div>
    )
  }
  //View Extra/Missing Hours
  const ViewMyMissingHours = () => {
    return (
      <div>
        <div>View Your Missing/Extra Hours for a Specific Month/Year</div>
        <Row>
          {' '}
          <ReactDatePicker
            selected={missingHoursStartDate}
            onChange={(date) => setMissingHoursStartDate(date)}
            dateFormat='MM/yyyy'
            showMonthYearPicker
            showFullMonthYearPicker
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleMissingHours}
          >
            View
          </Button>
        </Row>
        {missingHours === -1 && extraHours === -1 ? (
          <div></div>
        ) : missingHours === -1 ? (
          <div>YOU HAVE {extraHours} EXTRA HOURS</div>
        ) : (
          <div>YOU HAVE {missingHours} MISSING HOURS</div>
        )}
      </div>
    )
  }
  //View Missing Days
  const ViewMyMissingDays = () => {
    return (
      <div>
        <div>View Your Missing Days for a the Picked Month/Year</div>
        <Row>
          {' '}
          <ReactDatePicker
            selected={missingDaysStartDate}
            onChange={(date) => setMissingDaysStartDate(date)}
            dateFormat='MM/yyyy'
            showMonthYearPicker
            showFullMonthYearPicker
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleMissingDays}
          >
            View
          </Button>
        </Row>
        <div>
          {missingDays === -1 ? '' : `YOU HAVE ${missingDays} MISSING DAYS`}
        </div>
      </div>
    )
  }

  //View All My Attendance

  const ViewAllMyAttendanceTable = () => {
    return (
      <div>
        {/*Table Creation */}{' '}
        <Grid container spacing={1} style={{ marginBottom: '1vw' }}>
          <FormMyAttendanceTableHeader
            item1='Date'
            item2='SignIn Time'
            item3='SignOut Time'
          />{' '}
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ height: '20vw', overflow: 'scroll' }}
        >
          {attendanceAll.length === 0
            ? 'No Results Found'
            : attendanceAll.map((oneAttendance) => (
                <FormMyAttendanceRow
                  item1={moment(oneAttendance.signInTime).format('DD/MM/YYYY')}
                  item2={moment(oneAttendance.signInTime).format('HH:mm')}
                  item3={moment(oneAttendance.signOutTime).format('HH:mm')}
                />
              ))}
        </Grid>
      </div>
    )
  }

  const ViewAllMyAttendance = () => {
    return (
      <div>
        <div>View Your Attendance a Specific Month/Year</div>
        <Row>
          {' '}
          <ReactDatePicker
            selected={attendanceAllStartDate}
            onChange={(date) => setAttendanceAllStartDate(date)}
            dateFormat='MM/yyyy'
            showMonthYearPicker
            showFullMonthYearPicker
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleViewAllMyAttendance}
          >
            View
          </Button>
        </Row>
        <ViewAllMyAttendanceTable />
      </div>
    )
  }

  //view MAIN
  return (
    <div>
      {/* Normal attendance sign in and sign out for all users*/}
      <div>
        <div>Attendance Sign In and Sign Out Simulation</div>
        <Button variant='contained' color='primary' onClick={handleSignIn}>
          Sign In
        </Button>
        <Button variant='contained' color='primary' onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
      {/* Manual sign in and sign out is only available for HR */}
      <ViewMyDeductions/>
      <ViewMyAttendance />
      <ViewMyMissingHours />
      <ViewMyMissingDays />
      <ViewAllMyAttendance />
      <Snackbar
        handleClose={handleCloseAlert}
        severity={showSeverity}
        msg={showAlertMsg}
        showAlert={showAlert}
      />
    </div>
  )
}

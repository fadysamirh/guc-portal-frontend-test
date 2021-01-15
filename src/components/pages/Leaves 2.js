import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Accordion from 'react-bootstrap/Accordion'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Form from 'react-bootstrap/Form'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import SnackbarAlert from '../Helpers/General/SnackbarAlert'
import axios from 'axios'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { backendLink, secretOrKey } from '../../keys_dev'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Container, Row, Col, Spinner } from 'react-bootstrap'

const useStyles = makeStyles({
  root: {},
  root2: {
    width: '50vw',
    marginBottom: '2vw',
  },
  Button: {
    marginLeft: '13vw',
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: '1vw',
    color: '#000000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: '2vw',
  },
  pos: {
    marginBottom: 12,
  },
  input: {
    alignContent: 'top',
    alignItems: 'top',
    display: 'flex',
    width: '20vw',
    fontSize: '1vw',
    zIndex: '0',
    textIndent: '0.4vw',
  },
  paper: {
    padding: '0.25vw',
    textAlign: 'center',
    borderBlockStyle: 'solid',
    height: '4vw',
    paddingTop: '0.7vw',
    border: '0vw',
    backgroundColor: '#1d4c75',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  paper1: {
    padding: '0.25vw',
    textAlign: 'center',
    borderBlockStyle: 'solid',
    height: '4vw',
    paddingTop: '0.7vw',
    border: '0vw',
    backgroundColor: '#899fba',
    color: '#FFFFFF',
  },
  paper2: {
    padding: '0.25vw',
    textAlign: 'center',
    borderBlockStyle: 'solid',
    height: '4vw',
    paddingTop: '0.7vw',
    border: '0vw',
    backgroundColor: '#FF0000',
    fontWeight: 'bold',
    color: '#FFFFFF',
    cursor: 'pointer',
  },
})

export default function Leaves() {
  const jwt = require('jsonwebtoken')
  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector((state) => state.token)
  const account = jwt.verify(token, secretOrKey)
  const academicId = account.academicId
  const classes = useStyles()
  //snackback hooks
  const [showAlert, setShowAlert] = React.useState(false)
  const [reason1, setReason1] = React.useState('')
  const [reason2, setReason2] = React.useState('')
  const [reason3, setReason3] = React.useState('')
  const [reason4, setReason4] = React.useState('')
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  //date hooks
  const [date1, setDate1] = React.useState(new Date())
  const [dateToSend1, setDateToSend1] = React.useState({
    day: '',
    month: '',
    year: '',
  })
  const [viewDates, setViewDates] = React.useState({
    day: '',
    month: '',
    year: '',
  })
  const [date2, setDate2] = React.useState(new Date())
  const [dateToSend2, setDateToSend2] = React.useState({
    day: '',
    month: '',
    year: '',
  })
  const [date3, setDate3] = React.useState(new Date())
  const [dateToSend3, setDateToSend3] = React.useState({
    day: '',
    month: '',
    year: '',
  })
  const [date4, setDate4] = React.useState(new Date())
  const [dateToSend4, setDateToSend4] = React.useState({
    day: '',
    month: '',
    year: '',
  })
  const [requests, setRequests] = React.useState([])
  const handleChangeSick = (event) => {
    setReason1(event.target.value)
    console.log(reason1)
  }
  const handleChangeMaternity = (event) => {
    setReason2(event.target.value)
    console.log(reason2)
  }
  const handleChangeAccidental = (event) => {
    setReason3(event.target.value)
    console.log(reason3)
  }
  const handleChangeCompensation = (event) => {
    setReason4(event.target.value)
    console.log(reason4)
  }
  const handleChange1 = (event) => {
    setDateToSend1({
      month: `${moment(date1).month() + 1}`,
      year: `${moment(date1).year()}`,
      day: `${moment(date1).date()}`,
    })
  }
  const handleChange2 = (event) => {
    setDateToSend2({
      month: `${moment(date2).month() + 1}`,
      year: `${moment(date2).year()}`,
      day: `${moment(date2).date()}`,
    })
  }
  const handleChange3 = (event) => {
    setDateToSend3({
      month: `${moment(date3).month() + 1}`,
      year: `${moment(date3).year()}`,
      day: `${moment(date3).date()}`,
    })
  }
  const handleChange4 = (event) => {
    setDateToSend4({
      month: `${moment(date4).month() + 1}`,
      year: `${moment(date4).year()}`,
      day: `${moment(date4).date()}`,
    })
  }
  const handleCalendarOpen = () => console.log('Calendar opened')
  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  const handleView = async (event) => {
    console.log('click')
    await axios({
      method: 'post',
      url: `${backendLink}/leaves/viewLeaves`,
      data: {
        Account: { academicId: academicId },
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg('successfull')
        setShowSeverity('success')
        setRequests(res.data.leaves)
        console.log(res.data)
        console.log(requests)
      } else {
        setShowAlert(true)
        console.log(res.data)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  }
  const handleClickSick = () => {
    console.log('click')
    axios({
      method: 'post',
      url: `${backendLink}/leaves/requestSickLeave`,
      data: {
        Account: { academicId: academicId },
        leaveDay: {
          day: dateToSend1.day,
          month: dateToSend1.month,
          year: dateToSend1.year,
          comments: reason1,
        },
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg('Request Sent')
        setShowSeverity('success')
      } else {
        setShowAlert(true)
        console.log(res.data)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  }
  const handleClickMaternity = () => {
    console.log('click')
    axios({
      method: 'post',
      url: `${backendLink}/leaves/requestMaternityLeave`,
      data: {
        Account: { academicId: academicId },
        leaveDay: {
          day: dateToSend2.day,
          month: dateToSend2.month,
          year: dateToSend2.year,
          comments: reason2,
        },
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg('Request Sent')
        setShowSeverity('success')
      } else {
        setShowAlert(true)
        console.log(res.data)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  }
  const handleClickAccidental = () => {
    console.log(dateToSend3)
    axios({
      method: 'post',
      url: `${backendLink}/leaves/requestAccidentalLeave`,
      data: {
        Account: { academicId: academicId },
        leaveDay: {
          day: dateToSend3.day,
          month: dateToSend3.month,
          year: dateToSend3.year,
          comments: reason3,
        },
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg('Request Sent')
        setShowSeverity('success')
      } else {
        setShowAlert(true)
        console.log(res.data)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  }
  const handleClickCompensation = async () => {
    console.log('click')
    await axios({
      method: 'post',
      url: `${backendLink}/leaves/requestCompensationLeave`,
      data: {
        Account: { academicId: academicId },
        leaveDay: {
          day: dateToSend4.day,
          month: dateToSend4.month,
          year: dateToSend4.year,
        },
        reasonForCompensation: reason4,
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg('Request Sent')
        setShowSeverity('success')
      } else {
        setShowAlert(true)
        console.log(res.data)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  }
  const handleCancelRequest = async (event) => {
    const arr = requests
    await axios({
      method: 'post',
      url: `${backendLink}/leaves/cancelLeaveReq`,
      data: {
        Account: { academicId: academicId },
        leaveId: requests[event.target.id]._id,
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg('successfull')
        setShowSeverity('success')
        handleView()
      } else {
        setShowAlert(true)
        console.log(res.data)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Request a leave
        </Typography>
        <Accordion defaultActiveKey='1'>
          <div>
            <Accordion.Toggle
              style={{ marginBottom: '2vw', width: '25vw' }}
              as={Button}
              variant='contained'
              color='primary'
              eventKey='0'
            >
              Request sick leave
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey='0'>
            <div>
              <Typography
                style={{
                  fontSize: '1vw',
                  color: '#000000',
                  fontWeight: 'bold',
                }}
                color='textSecondary'
                gutterBottom
              >
                Date :
              </Typography>
              <div style={{ marginBottom: '0vw' }}>
                <DatePicker
                  selected={date1}
                  onChange={(date1) => setDate1(date1)}
                  onCalendarClose={handleChange1}
                  onCalendarOpen={handleCalendarOpen}
                />
              </div>
              <div>
                <form noValidate autoComplete='off'>
                  <TextField
                    id='standard-name'
                    label='Comments'
                    className={classes.textField}
                    value={reason1}
                    onChange={handleChangeSick}
                    margin='normal'
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '0vw',
                      border: '0.2vw',
                      fontSize: '1vw',
                      textIndent: '0.4vw',
                    }}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                </form>
              </div>
              <div>
                <Button
                  style={{
                    width: '7vw',
                    marginBottom: '1vw',
                    marginLeft: '13vw',
                  }}
                  variant='contained'
                  color='secondary'
                  onClick={handleClickSick}
                >
                  Request
                </Button>
              </div>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion defaultActiveKey='1'>
          <div>
            <Accordion.Toggle
              style={{ marginBottom: '2vw', width: '25vw' }}
              as={Button}
              variant='contained'
              color='primary'
              eventKey='0'
            >
              Request maternity leave
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey='0'>
            <div>
              <Typography
                style={{
                  fontSize: '1vw',
                  color: '#000000',
                  fontWeight: 'bold',
                }}
                color='textSecondary'
                gutterBottom
              >
                Date :
              </Typography>
              <div style={{ marginBottom: '0vw' }}>
                <DatePicker
                  selected={date2}
                  onChange={(date2) => setDate2(date2)}
                  onCalendarClose={handleChange2}
                  onCalendarOpen={handleCalendarOpen}
                />
              </div>
              <div>
                <form noValidate autoComplete='off'>
                  <TextField
                    id='standard-name'
                    label='Reason'
                    className={classes.textField}
                    value={reason2}
                    onChange={handleChangeMaternity}
                    margin='normal'
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '0vw',
                      border: '0.2vw',
                      fontSize: '1vw',
                      textIndent: '0.4vw',
                    }}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                </form>
              </div>
              <div>
                <Button
                  style={{
                    width: '7vw',
                    marginBottom: '1vw',
                    marginLeft: '13vw',
                  }}
                  variant='contained'
                  color='secondary'
                  onClick={handleClickMaternity}
                >
                  Request
                </Button>
              </div>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion defaultActiveKey='1'>
          <div>
            <Accordion.Toggle
              style={{ marginBottom: '2vw', width: '25vw' }}
              as={Button}
              variant='contained'
              color='primary'
              eventKey='0'
            >
              Request accidental leave
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey='0'>
            <div>
              <Typography
                style={{
                  fontSize: '1vw',
                  color: '#000000',
                  fontWeight: 'bold',
                }}
                color='textSecondary'
                gutterBottom
              >
                Date :
              </Typography>
              <div style={{ marginBottom: '0vw' }}>
                <DatePicker
                  selected={date3}
                  onChange={(date3) => setDate3(date3)}
                  onCalendarClose={handleChange3}
                  onCalendarOpen={handleCalendarOpen}
                />
              </div>
              <div>
                <form noValidate autoComplete='off'>
                  <TextField
                    id='standard-name'
                    label='Reason'
                    className={classes.textField}
                    value={reason3}
                    onChange={handleChangeAccidental}
                    margin='normal'
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '0vw',
                      border: '0.2vw',
                      fontSize: '1vw',
                      textIndent: '0.4vw',
                    }}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                </form>
              </div>
              <div>
                <Button
                  style={{
                    width: '7vw',
                    marginBottom: '1vw',
                    marginLeft: '13vw',
                  }}
                  variant='contained'
                  color='secondary'
                  onClick={handleClickAccidental}
                >
                  Request
                </Button>
              </div>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <Accordion defaultActiveKey='1'>
          <div>
            <Accordion.Toggle
              style={{ width: '25vw' }}
              as={Button}
              variant='contained'
              color='primary'
              eventKey='0'
            >
              Request Compensation leave
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey='0'>
            <div>
              <Typography
                style={{
                  fontSize: '1vw',
                  color: '#000000',
                  fontWeight: 'bold',
                  marginTop: '2vw',
                }}
                color='textSecondary'
                gutterBottom
              >
                Date :
              </Typography>
              <div style={{ marginBottom: '0vw' }}>
                <DatePicker
                  selected={date4}
                  onChange={(date4) => setDate4(date4)}
                  onCalendarClose={handleChange4}
                  onCalendarOpen={handleCalendarOpen}
                />
              </div>
              <div>
                <form noValidate autoComplete='off'>
                  <TextField
                    id='standard-name'
                    label='Reason'
                    className={classes.textField}
                    value={reason4}
                    onChange={handleChangeCompensation}
                    margin='normal'
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '0vw',
                      border: '0.2vw',
                      fontSize: '1vw',
                      textIndent: '0.4vw',
                    }}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                </form>
              </div>
              <div>
                <Button
                  style={{
                    width: '7vw',
                    marginBottom: '1vw',
                    marginLeft: '13vw',
                  }}
                  variant='contained'
                  color='secondary'
                  onClick={handleClickCompensation}
                >
                  Request
                </Button>
              </div>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <Accordion style={{ marginTop: '2vw' }} defaultActiveKey='1'>
          <div>
            <Accordion.Toggle
              style={{ marginBottom: '2vw', width: '25vw' }}
              as={Button}
              variant='contained'
              color='primary'
              eventKey='0'
              onClick={handleView}
            >
              View My Requests
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey='0'>
            <div className={classes.root2}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>Status</Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>Type</Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>Date</Paper>
                </Grid>
              </Grid>
              {requests.map((label, index) => {
                const month = `${moment(label.date).month() + 1}`
                const year = `${moment(label.date).year()}`
                const day = `${moment(label.date).date()}`
                return (
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                      <Paper className={classes.paper1}>{label.status}</Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper className={classes.paper1}>{label.type}</Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper className={classes.paper1}>
                        {' '}
                        {month}/{day}/{year}{' '}
                      </Paper>
                    </Grid>
                    {label.status === 'pending' ? (
                      <Grid item xs={3}>
                        <Paper
                          className={classes.paper2}
                          id={index}
                          onClick={handleCancelRequest}
                        >
                          {' '}
                          Cancel{' '}
                        </Paper>
                      </Grid>
                    ) : (
                      ''
                    )}
                  </Grid>
                )
              })}
            </div>
          </Accordion.Collapse>
        </Accordion>
      </CardContent>
      <SnackbarAlert
        handleClose={handleCloseAlert}
        severity={showSeverity}
        msg={showAlertMsg}
        showAlert={showAlert}
      />
    </Card>
  )
}

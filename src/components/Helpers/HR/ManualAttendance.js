import 'date-fns'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import moment from 'moment'

import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import axios from 'axios'
import SnackbarAlert from '../General/SnackbarAlert'

import { backendLink, secretOrKey } from '../../../keys_dev'

import { checkTokenExpired } from '../../../globalState/actions/AuthActions'

const currencies = [
  {
    value: 'office',
    label: 'Office',
  },
  {
    value: 'lectureHall',
    label: 'Lecture Hall',
  },
  {
    value: 'room',
    label: 'Room',
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

export default function CreateLocation(props) {
  const jwt = require('jsonwebtoken')

  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector((state) => state.token)
  const account = jwt.verify(token, secretOrKey)
  const academicId = account.academicId
  const classes = useStyles()
  const [type, setType] = React.useState()
  const [courseName, setCourseName] = React.useState()
  const [courseId, setCourseId] = React.useState()
  const [department, setDepatment] = React.useState()
  const [creditHours, setCreditHours] = React.useState()
  const [academicIdC, setAcademicIdC] = React.useState()

  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')

  const [selectedDate, setSelectedDate] = React.useState(new Date())

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleChangeAcademicIdC = (event) => {
    setAcademicIdC(event.target.value)
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  const handleSignIn = () => {
    axios({
      url: `${backendLink}/attendance/manualSignIn`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      data: {
        Account: { academicId },
        Attendance: {
          academicId: academicIdC,
          hour: moment(selectedDate).hour().toString(),
          minute: moment(selectedDate).minute().toString(),
          day: moment(selectedDate).date().toString(),
          month: (moment(selectedDate).month() + 1).toString(),
          year: moment(selectedDate).year().toString(),
        },
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode !== 0) {
        setShowSeverity('error')

        setShowAlert(true)
        setShowAlertMsg(res.data.message)
      }

      if (res.data.statusCode === 0) {
        setShowSeverity('success')
        setShowAlert(true)
        setShowAlertMsg('Created Successfully')
        history.go(0)

        //setLocations(res.data.locationFound)
      }
    })
  }
  const handleSignOut = () => {
    axios({
      url: `${backendLink}/attendance/manualSignOut`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      data: {
        Account: { academicId },
        Attendance: {
          academicId: academicIdC,
          hour: moment(selectedDate).hour().toString(),
          minute: moment(selectedDate).minute().toString(),
          day: moment(selectedDate).date().toString(),
          month: (moment(selectedDate).month() + 1).toString(),
          year: moment(selectedDate).year().toString(),
        },
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode !== 0) {
        setShowSeverity('error')

        setShowAlert(true)
        setShowAlertMsg(res.data.message)
      }

      if (res.data.statusCode === 0) {
        setShowSeverity('success')
        setShowAlert(true)
        setShowAlertMsg('Created Successfully')

        //setLocations(res.data.locationFound)
      }
    })
  }

  //useEffect(() => {}, [showSeverity])

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div
        style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'inherit',
        }}
      >
        {' '}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify='space-around'>
            <KeyboardDatePicker
              margin='normal'
              id='date-picker-dialog'
              label='Date picker dialog'
              format='MM/dd/yyyy'
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin='normal'
              id='time-picker'
              label='Time picker'
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
      <div
        style={{
          marginTop: '1vw',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'inherit',
        }}
      >
        <TextField
          size={'small'}
          id='outlined-select-type'
          label='Academic Id'
          value={academicIdC}
          onChange={handleChangeAcademicIdC}
          helperText='Type academic Id'
          variant='outlined'
        ></TextField>
      </div>
      <div style={{ float: 'right' }}>
        <Button
          //type="button"
          variant='contained'
          style={{
            width: '7vw',
            margin: '1vw',
            marginTop: '0vw',
            fontSize: '1vw',
          }}
          color='primary'
          onClick={handleSignIn}
        >
          SignIn
        </Button>
        <Button
          //type="button"
          variant='contained'
          style={{
            width: '7vw',
            margin: '1vw',
            marginTop: '0vw',
            fontSize: '1vw',
          }}
          color='primary'
          onClick={handleSignOut}
        >
          SignOut
        </Button>
        <SnackbarAlert
          handleClose={handleCloseAlert}
          severity={showSeverity}
          msg={showAlertMsg}
          showAlert={showAlert}
        />
      </div>
    </form>
  )
}

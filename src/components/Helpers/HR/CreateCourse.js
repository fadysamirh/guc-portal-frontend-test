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

  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')

  const handleCourseName = (event) => {
    setCourseName(event.target.value)
  }
  const handleChangeDepatment = (event) => {
    setDepatment(event.target.value)
  }
  const handleChangeCreditHours = (event) => {
    setCreditHours(event.target.value)
  }
  const handleChangeCourseId = (event) => {
    setCourseId(event.target.value)
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  const handleCreate = () => {
    axios({
      url: `${backendLink}/courses/createCourse`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      data: {
        Account: { academicId },
        courseId,
        courseName,
        creditHours,
        department,
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode !== 0) {
        setShowSeverity('error')

        setShowAlert(true)
        setShowAlertMsg(res.data.error)
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
        <TextField
          id='outlined-select-type'
          label='Course Id'
          value={courseId}
          onChange={handleChangeCourseId}
          helperText='Type courseId'
          variant='outlined'
        ></TextField>
        <TextField
          id='outlined-select-type'
          label='Depatment'
          value={department}
          onChange={handleChangeDepatment}
          helperText='Type department'
          variant='outlined'
        ></TextField>
      </div>
      <div
        style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'inherit',
        }}
      >
        {' '}
        <TextField
          id='outlined-select-type'
          label='Course Name'
          value={courseName}
          onChange={handleCourseName}
          helperText='Type Name'
          variant='outlined'
        ></TextField>
        <TextField
          id='outlined-select-type'
          label='Credit Hours'
          value={creditHours}
          onChange={handleChangeCreditHours}
          helperText='Type creditHours'
          variant='outlined'
        ></TextField>
      </div>
      <div style={{ float: 'right' }}>
        <Button
          //type="button"
          variant='contained'
          style={{ margin: '1vw' }}
          color='primary'
          onClick={handleCreate}
        >
          Create
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

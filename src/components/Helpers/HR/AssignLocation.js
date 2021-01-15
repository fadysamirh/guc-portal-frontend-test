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

export default function AssignLocation() {
  const jwt = require('jsonwebtoken')

  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector((state) => state.token)
  const account = jwt.verify(token, secretOrKey)
  const academicId = account.academicId
  const classes = useStyles()
  const [type, setType] = React.useState()
  const [name, setName] = React.useState()
  const [academicID, setAcademicID] = React.useState()
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')

  const handleChange = (event) => {
    setType(event.target.value)
  }
  const handleChangeName = (event) => {
    setName(event.target.value)
  }
  const handleChangeAcademicId = (event) => {
    setAcademicID(event.target.value)
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  const handleCreate = () => {
    axios({
      url: `${backendLink}/locations/assignLocation`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      data: {
        Account: { academicId },
        office: name,
        academicId: academicID,
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
        setShowAlertMsg('Assigned Successfully')
        history.go(0)

        //setLocations(res.data.locationFound)
      }
    })
  }

  //useEffect(() => {}, [showSeverity])

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div style={{ display: 'flex', flexDirection: 'inherit' }}>
        <TextField
          id='outlined-select-type'
          label='Office Name'
          value={name}
          onChange={handleChangeName}
          helperText='Please type Office Name'
          variant='outlined'
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id='outlined-select-type'
          label='AcademicId'
          value={academicID}
          onChange={handleChangeAcademicId}
          helperText='Please type Academic Id'
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
          Assign
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

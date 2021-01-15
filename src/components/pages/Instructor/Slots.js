import React, { useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import axios from 'axios'
import moment from 'moment'
import { useSelector } from 'react-redux'
import {
  Button,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core'
import { Form, Row } from 'react-bootstrap'
import Snackbar from '../../Helpers/General/SnackbarAlert'
import { backendLink, secretOrKey } from '../../../keys_dev'
import AssignSlot from '../../Helpers/Instructor/Slots/AssignSlot'
import ReAssignSlot from '../../Helpers/Instructor/Slots/ReAssignSlot'
import UnAssignSlot from '../../Helpers/Instructor/Slots/UnAssignSlot'
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

export default function Slots() {
  const classes = useStyles()
  const token = useSelector((state) => state.token)
  const academicId = jwt.verify(token, secretOrKey).academicId

  //alert hooks
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')

  //alet handler
  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  return (
    <div>
      <AssignSlot
        setShowSeverity={setShowSeverity}
        setShowAlertMsg={setShowAlertMsg}
        setShowAlert={setShowAlert}
      />
      <ReAssignSlot
        setShowSeverity={setShowSeverity}
        setShowAlertMsg={setShowAlertMsg}
        setShowAlert={setShowAlert}
      />
      <UnAssignSlot
        setShowSeverity={setShowSeverity}
        setShowAlertMsg={setShowAlertMsg}
        setShowAlert={setShowAlert}
      />
      <Snackbar
        handleClose={handleCloseAlert}
        severity={showSeverity}
        msg={showAlertMsg}
        showAlert={showAlert}
      />{' '}
    </div>
  )
}

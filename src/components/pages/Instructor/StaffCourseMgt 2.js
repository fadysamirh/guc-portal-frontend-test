import React, { useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import axios from 'axios'
import moment from 'moment'
import { useSelector } from 'react-redux'
//local imports

import { backendLink, secretOrKey } from '../../../keys_dev'
import Snackbar from '../../Helpers/General/SnackbarAlert'
import AssignCourseCoorinator from '../../Helpers/Instructor/AssignCourseCoordinator'
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
import AssignCourseMember from '../../Helpers/Instructor/AssignCourseMember'
import UnAssignCourseCoordinator from '../../Helpers/Instructor/UnAssignCourseCoordinator'
import UnAssignCourseMember from '../../Helpers/Instructor/UnAssignCourseMember'
import ViewStaff from '../../Helpers/Instructor/ViewStaff'

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

export default function StaffCourseMgt() {
  const classes = useStyles()

  const token = useSelector((state) => state.token)
  const academicId = jwt.verify(token, secretOrKey).academicId
  //alert hooks
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  return (
    <div>
      <AssignCourseCoorinator
        setShowSeverity={setShowSeverity}
        setShowAlertMsg={setShowAlertMsg}
        setShowAlert={setShowAlert}
      />
      <AssignCourseMember
        setShowSeverity={setShowSeverity}
        setShowAlertMsg={setShowAlertMsg}
        setShowAlert={setShowAlert}
      />
      <UnAssignCourseCoordinator
        setShowSeverity={setShowSeverity}
        setShowAlertMsg={setShowAlertMsg}
        setShowAlert={setShowAlert}
      />
      <UnAssignCourseMember
        setShowSeverity={setShowSeverity}
        setShowAlertMsg={setShowAlertMsg}
        setShowAlert={setShowAlert}
      />
      <ViewStaff
        setShowSeverity={setShowSeverity}
        setShowAlertMsg={setShowAlertMsg}
        setShowAlert={setShowAlert}
      />

      <Snackbar
        handleClose={handleCloseAlert}
        severity={showSeverity}
        msg={showAlertMsg}
        showAlert={showAlert}
      />
    </div>
  )
}

import React, { useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import axios from 'axios'
import moment from 'moment'
import { useSelector } from 'react-redux'

//local imports
import { backendLink, secretOrKey } from '../../../keys_dev'
import Snackbar from '../../Helpers/General/SnackbarAlert'

//react bootstrap
import { Row, Table, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

//material ui imports
import { Button } from '@material-ui/core'
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
export default function UnAssignCourseCoordinator(props) {
  const classes = useStyles()

  const token = useSelector((state) => state.token)
  const academicId = jwt.verify(token, secretOrKey).academicId
  //hooks
  const [state, setState] = React.useState({})
  //handlers
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }
  const handleAssignCourseCoordinator = () => {
    axios({
      method: 'post',
      url: `${backendLink}/courses/unassignCourseCoordinator`,
      headers: { authorization: token },
      data: {
        Account: { academicId: academicId },
        courseId: state.courseId,
        assignedAcademicId: state.assignedAcademicId,
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode === 0) {
        props.setShowAlertMsg('unassigned successfully')
        props.setShowSeverity('success')

        props.setShowAlert(true)
      } else {
        props.setShowAlertMsg(res.data.error)
        props.setShowSeverity('error')

        props.setShowAlert(true)
      }
    })
  }
  return (
    <div>
      <div>Unassign Course Coordinator</div>
      <div>
        {' '}
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='courseId'
            onChange={handleChange}
            required
            value={state['courseId'] !== undefined ? state['courseId'] : ''}
            placeholder='Course Id'
          />{' '}
        </Form.Group>
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='assignedAcademicId'
            onChange={handleChange}
            required
            value={
              state['assignedAcademicId'] !== undefined
                ? state['assignedAcademicId']
                : ''
            }
            placeholder='Assigned Academic Id'
          />{' '}
        </Form.Group>
        <Button
          variant='contained'
          color='primary'
          onClick={handleAssignCourseCoordinator}
        >
          Unassign Course Coordinator
        </Button>
      </div>
    </div>
  )
}

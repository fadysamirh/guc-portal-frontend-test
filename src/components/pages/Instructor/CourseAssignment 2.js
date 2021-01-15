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

export default function ViewMyCourseAssignment() {
  const classes = useStyles()

  const token = useSelector((state) => state.token)
  const academicId = jwt.verify(token, secretOrKey).academicId
  //hooks
  const [assignment, setAssignment] = React.useState([])

  //alert hooks
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  useEffect(() => {
    axios({
      method: 'post',
      url: `${backendLink}/courseInstructorFunctionalities/viewMyCoursesAssignment`,
      headers: { authorization: token },
      data: {
        Account: { academicId: academicId },
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode === 0) {
        setAssignment(res.data.list)
      } else {
        setShowAlertMsg(res.data.error)
        setShowSeverity('error')

        setShowAlert(true)
      }
    })
  }, [])
  function CourseListRow(props) {
    return (
      <Grid container item xs={12} spacing={1}>
        <React.Fragment>
          <Grid item xs={2}>
            <Paper className={classes.paper}>{props.item1}</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>{props.item2}</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>{props.item3}</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>{props.item4}</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>{props.item5}</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>{props.item6}</Paper>
          </Grid>
        </React.Fragment>
      </Grid>
    )
  }
  function CourseListHeader(props) {
    return (
      <Grid container item xs={12} spacing={1}>
        <React.Fragment>
          <Grid item xs={2}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item1}
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item2}
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item3}
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item4}
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item5}
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item6}
            </Paper>
          </Grid>
        </React.Fragment>
      </Grid>
    )
  }

  const CourseListTable = (props) => {
    return (
      <div>
        {/*Table Creation */}{' '}
        <Grid container spacing={1} style={{ marginBottom: '1vw' }}>
          <CourseListHeader
            item1='assignedAcademicId'
            item2='courseId'
            item3='day'
            item4='locationName'
            item5='slot'
            item6='slotType'
          />{' '}
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ height: '20vw', overflow: 'scroll' }}
        >
          {props.list.length === 0
            ? 'No Results Found'
            : props.list.map((oneList) => (
                <CourseListRow
                  item1={
                    oneList.assignedAcademicId === null ||
                    oneList.assignedAcademicId === undefined
                      ? 'N/A'
                      : oneList.assignedAcademicId
                  }
                  item2={oneList.courseId}
                  item3={oneList.day}
                  item4={oneList.locationName}
                  item5={oneList.slot}
                  item6={oneList.slotType}
                />
              ))}
        </Grid>
      </div>
    )
  }

  return (
    <div>
      {assignment.map((oneCourse) => {
        return (
          <div>
            <div>Course ID:{oneCourse.couseId}</div>
            <CourseListTable list={oneCourse.list} />
          </div>
        )
      })}
    </div>
  )
}

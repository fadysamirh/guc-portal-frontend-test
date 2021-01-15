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
import { Button, Grid, Paper } from '@material-ui/core'
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
    overflow: 'visible',
    height: '5vw',
    marginBottom: '1vw',
  },
})

export default function ViewStaff(props) {
  const classes = useStyles()

  const token = useSelector((state) => state.token)
  const academicId = jwt.verify(token, secretOrKey).academicId
  //hooks
  const [state, setState] = React.useState({})
  const [viewStaff, setViewStaff] = React.useState([])
  useEffect(() => {}, [viewStaff])

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
  const handleViewStaff = () => {
    axios({
      method: 'post',
      url: `${backendLink}/courseInstructorFunctionalities/viewStaff`,
      headers: { authorization: token },
      data: {
        Account: { academicId: academicId },
        courseId:
          state.courseId === undefined || state.courseId === ''
            ? undefined
            : state.courseId,
        assignedAcademicId: state.assignedAcademicId,
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode === 0) {
        if (state.courseId === undefined || state.courseId === '') {
          setViewStaff(res.data.staff)
        } else {
          const intialList = res.data.staff
          console.log(intialList)
          let finalList = []
          intialList.map((oneStaff) => finalList.push(oneStaff[0]))
          setViewStaff(finalList)
        }
      } else {
        props.setShowAlertMsg(res.data.error)
        props.setShowSeverity('error')

        props.setShowAlert(true)
      }
    })
  }
  function ViewStaffRow(props) {
    return (
      <Grid container item xs={12} spacing={1}>
        <React.Fragment>
          <Grid item xs={1} style={{ overflow: 'visible', height: '6vw' }}>
            <Paper className={classes.paper}>{props.item1}</Paper>
          </Grid>
          <Grid item xs={1} style={{ overflow: 'visible', height: '6vw' }}>
            <Paper className={classes.paper}>{props.item2}</Paper>
          </Grid>
          <Grid item xs={1} style={{ overflow: 'visible', height: '6vw' }}>
            <Paper className={classes.paper}>{props.item3}</Paper>
          </Grid>
          <Grid item xs={3} style={{ overflow: 'visible', height: '6vw' }}>
            <Paper className={classes.paper}>{props.item4}</Paper>
          </Grid>
          <Grid item xs={1} style={{ overflow: 'visible', height: '6vw' }}>
            <Paper className={classes.paper}>{props.item5}</Paper>
          </Grid>
          <Grid item xs={1} style={{ overflow: 'visible', height: '6vw' }}>
            <Paper className={classes.paper}>{props.item6}</Paper>
          </Grid>
          <Grid item xs={1} style={{ overflow: 'visible', height: '6vw' }}>
            <Paper className={classes.paper}>{props.item7}</Paper>
          </Grid>
          <Grid item xs={1} style={{ overflow: 'visible', height: '6vw' }}>
            <Paper className={classes.paper}>{props.item8}</Paper>
          </Grid>
          <Grid item xs={2} style={{ overflow: 'visible', height: '6vw' }}>
            <Paper className={classes.paper}>{props.item9}</Paper>
          </Grid>
        </React.Fragment>
      </Grid>
    )
  }
  function ViewStaffHeader(props) {
    return (
      <Grid container item xs={12} spacing={1}>
        <React.Fragment>
          <Grid item xs={1} style={{ overflow: 'visible', height: '4vw' }}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item1}
            </Paper>
          </Grid>
          <Grid item xs={1} style={{ overflow: 'visible', height: '4vw' }}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item2}
            </Paper>
          </Grid>
          <Grid item xs={1} style={{ overflow: 'visible', height: '4vw' }}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item3}
            </Paper>
          </Grid>
          <Grid item xs={3} style={{ overflow: 'visible', height: '4vw' }}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item4}
            </Paper>
          </Grid>
          <Grid item xs={1} style={{ overflow: 'visible', height: '4vw' }}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item5}
            </Paper>
          </Grid>
          <Grid item xs={1} style={{ overflow: 'visible', height: '4vw' }}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item6}
            </Paper>
          </Grid>
          <Grid item xs={1} style={{ overflow: 'visible', height: '4vw' }}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item7}
            </Paper>
          </Grid>
          <Grid item xs={1} style={{ overflow: 'visible', height: '4vw' }}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item8}
            </Paper>
          </Grid>
          <Grid item xs={2} style={{ overflow: 'visible', height: '4vw' }}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item9}
            </Paper>
          </Grid>
        </React.Fragment>
      </Grid>
    )
  }

  const ViewStaffTable = () => {
    return (
      <div>
        {/*Table Creation */}{' '}
        <Grid container spacing={1} style={{ marginBottom: '3vw' }}>
          <ViewStaffHeader
            item1='Academic Id'
            item2='Day Off'
            item3='Dpt.'
            item4='Email'
            item5='Name'
            item6='Gender'
            item7='Member Type'
            item8='Office'
            item9='Phone Number'
          />{' '}
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ height: '20vw', overflow: 'scroll' }}
        >
          {viewStaff.length === 0
            ? 'No Results Found'
            : viewStaff.map((oneStaff) => (
                <ViewStaffRow
                  item1={oneStaff.academicId}
                  item2={oneStaff.dayOff}
                  item3={oneStaff.department}
                  item4={oneStaff.email}
                  item5={oneStaff.firstName + ' ' + oneStaff.lastName}
                  item6={oneStaff.gender}
                  item7={oneStaff.memberType}
                  item8={oneStaff.office}
                  item9={oneStaff.phoneNumber}
                />
              ))}
        </Grid>
      </div>
    )
  }
  return (
    <div>
      <div>
        View Staff: if courseId is left empty it will get you all your staff
        members in all courses
      </div>
      <div>
        {' '}
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='courseId'
            onChange={handleChange}
            value={state['courseId'] !== undefined ? state['courseId'] : ''}
            placeholder='Course Id'
          />{' '}
        </Form.Group>
        <Button variant='contained' color='primary' onClick={handleViewStaff}>
          Assign Course Coordinator
        </Button>
        <ViewStaffTable />
      </div>
    </div>
  )
}

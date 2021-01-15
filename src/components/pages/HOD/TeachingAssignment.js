import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import SnackbarAlert from '../../Helpers/General/SnackbarAlert'
import axios from 'axios'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import { backendLink, secretOrKey } from '../../../keys_dev'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
  },
  comment: {
    marginLeft: '1vw',
    marginRight: '1vw',
    marginTop: '1vw',
    marginBottom: '1vw',
    fontSize: '1vw',
  },
  root2: {
    width: '90vw',
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
  paper11: {
    padding: '0.25vw',
    textAlign: 'center',
    borderBlockStyle: 'solid',
    height: '4vw',
    paddingTop: '0.7vw',
    border: '0vw',
    backgroundColor: '#899fba',
    color: '#FFFFFF',
    cursor: 'pointer',
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
  paper22: {
    padding: '0.25vw',
    textAlign: 'center',
    borderBlockStyle: 'solid',
    height: '4vw',
    paddingTop: '0.7vw',
    border: '0vw',
    backgroundColor: '#31C41E',
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
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorEl2, setAnchorEl2] = React.useState(null)
  const [requests, setRequests] = React.useState([])
  const [comment, setComment] = React.useState('')
  const [comment2, setComment2] = React.useState('')
  const [course, setCourse] = React.useState('')
  useEffect(() => {
    axios({
      method: 'post',
      url: `${backendLink}/hodFunctionalities/viewTeachingAssignments`,
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
        setRequests(res.data.list)
        console.log(res.data)
        console.log(requests)
      } else {
        setShowAlert(true)
        console.log(res.data)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  }, [])

  const handleSpecificCourse = (event) => {
    setCourse(event.target.value)
    console.log(course)
  }

  const handleSpecificView = () => {
    axios({
      method: 'post',
      url: `${backendLink}/hodFunctionalities/viewTeachingAssignments`,
      data: {
        Account: { academicId: academicId },
        courseId: course,
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg('successfull')
        setShowSeverity('success')
        setRequests(res.data.list)
        console.log(res.data)
        console.log(requests)
      } else {
        setShowAlert(true)
        console.log(res)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Teaching assignments
        </Typography>
        <div
          style={{ display: 'flex', flexDirection: 'row', marginBottom: '2vw' }}
        >
          <form noValidate autoComplete='off'>
            <TextField
              id='standard-name'
              label='Enter specific course'
              className={classes.textField}
              value={course}
              onChange={handleSpecificCourse}
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
          <Button
            style={{ height: '2vw', marginTop: '2.5vw', marginLeft: '13vw' }}
            variant='contained'
            color='secondary'
            onClick={handleSpecificView}
          >
            View
          </Button>
        </div>

        <div className={classes.root2}>
          {requests.map((label, index) => {
            const month = `${moment(label.date).month() + 1}`
            const year = `${moment(label.date).year()}`
            const day = `${moment(label.date).date()}`

            return (
              <div>
                <Typography
                  className={classes.title}
                  color='textSecondary'
                  gutterBottom
                >
                  {label.courseId}
                </Typography>

                <div>
                  {label.List.length === 0 ? (
                    <div>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Paper className={classes.paper}>NO SLOTS</Paper>
                        </Grid>
                      </Grid>
                    </div>
                  ) : (
                    ''
                  )}
                  {label.List.map((slot, index) => {
                    console.log(label.List)
                    if (label.List.length !== 0) {
                      return (
                        <div>
                          <Grid container spacing={2}>
                            <Grid item xs={3}>
                              <Paper className={classes.paper}>Day</Paper>
                            </Grid>
                            <Grid item xs={3}>
                              <Paper className={classes.paper}>Slot</Paper>
                            </Grid>
                            <Grid item xs={3}>
                              <Paper className={classes.paper}>
                                Location Name
                              </Paper>
                            </Grid>
                            <Grid item xs={3}>
                              <Paper className={classes.paper}>
                                Assigned academic id
                              </Paper>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            spacing={2}
                            style={{ marginBottom: '2vw' }}
                          >
                            <Grid item xs={3}>
                              <Paper className={classes.paper1}>
                                {slot.day}
                              </Paper>
                            </Grid>
                            <Grid item xs={3}>
                              <Paper className={classes.paper1}>
                                {slot.slot}
                              </Paper>
                            </Grid>
                            <Grid item xs={3}>
                              <Paper className={classes.paper1}>
                                {slot.locationName}
                              </Paper>
                            </Grid>
                            <Grid item xs={3}>
                              <Paper className={classes.paper1}>
                                {' '}
                                {slot.assignedAcademicId === null
                                  ? 'not assigned'
                                  : slot.assignedAcademicId}{' '}
                              </Paper>
                            </Grid>
                          </Grid>
                        </div>
                      )
                    }
                    if (label.List.length === 0) {
                      console.log('iin')
                      return (
                        <Grid container spacing={2}>
                          <Grid item xs={3}>
                            <Paper className={classes.paper}>NO SLOTS</Paper>
                          </Grid>
                        </Grid>
                      )
                    }
                  })}
                </div>
              </div>
            )
          })}
        </div>
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

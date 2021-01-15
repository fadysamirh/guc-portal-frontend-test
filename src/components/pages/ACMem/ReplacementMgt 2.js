import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Accordion from 'react-bootstrap/Accordion'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import SnackbarAlert from './../../Helpers/General/SnackbarAlert'
import axios from 'axios'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Schedule from '../SchedulingSlotId'
import { backendLink, secretOrKey } from '../../../keys_dev'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
const useStyles = makeStyles({
  root: {
    marginBottom: '2vw',
  },
  root2: {
    width: '100vw',
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
  paper3: {
    padding: '0.25vw',
    textAlign: 'center',
    borderBlockStyle: 'solid',
    height: '4vw',
    paddingTop: '0.7vw',
    border: '0vw',
    backgroundColor: '#008000',
    fontWeight: 'bold',
    color: '#FFFFFF',
    cursor: 'pointer',
  },
  paper4: {
    padding: '0.25vw',
    textAlign: 'center',
    borderBlockStyle: 'solid',
    height: '4vw',
    paddingTop: '0.7vw',
    border: '0vw',
    backgroundColor: 'FF0000',
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
  const [acId, setAcId] = React.useState('')
  const [slotId, setSlotId] = React.useState('')
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  const [date1, setDate1] = React.useState(new Date())
  const [dateToSend1, setDateToSend1] = React.useState({
    day: '',
    month: '',
    year: '',
  })
  const [requests, setRequests] = React.useState([])
  const [requests2, setRequests2] = React.useState([])

  const handleChangeAcId = (event) => {
    setAcId(event.target.value)
    console.log(acId)
  }
  const handleChangeSlotId = (event) => {
    setSlotId(event.target.value)
    console.log(slotId)
  }
  const handleChange1 = (event) => {
    setDateToSend1({
      month: `${moment(date1).month() + 1}`,
      year: `${moment(date1).year()}`,
      day: `${moment(date1).date()}`,
    })
  }
  const handleCalendarOpen = () => console.log('Calendar opened')
  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  const handleViewRecieved = async (event) => {
    await axios({
      method: 'post',
      url: `${backendLink}/replacementsRequests/viewRecievedReq`,
      data: {
        Account: { academicId: academicId },
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      console.log(res)
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg('successfull')
        setShowSeverity('success')
        setRequests2(res.data.list)
        console.log(res.data)
        console.log(requests2)
      } else {
        setShowAlert(true)
        console.log(res.data)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  }
  const handleViewSent = async (event) => {
    await axios({
      method: 'post',
      url: `${backendLink}/replacementsRequests/viewSentReq`,
      data: {
        Account: { academicId: academicId },
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      console.log(res)
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
  }
  const handleClickRequest = () => {
    console.log(acId)
    axios({
      method: 'post',
      url: `${backendLink}/replacementsRequests/createReplacementRequest`,
      data: {
        Account: { academicId: academicId },
        academicIdReciever: acId,
        day: dateToSend1.day,
        month: dateToSend1.month,
        year: dateToSend1.year,
        slotId: slotId,
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
  const handleClickAccept = async (event) => {
    console.log('in')
    await axios({
      method: 'post',
      url: `${backendLink}/replacementsRequests/updateReplacementRequestStatus`,
      data: {
        Account: { academicId: academicId },
        reqId: requests2[event.target.id]._id,
        status: 'accepted',
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg('successfull')
        setShowSeverity('success')
        handleViewRecieved()
        console.log(res.data)
      } else {
        setShowAlert(true)
        console.log(res.data)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  }
  const handleClickReject = async (event) => {
    console.log('in')
    await axios({
      method: 'post',
      url: `${backendLink}/updateReplacementRequestStatus`,
      data: {
        Account: { academicId: academicId },
        reqId: requests2[event.target.id]._id,
        status: 'rejected',
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg('successfull')
        setShowSeverity('success')
        handleViewRecieved()
        console.log(res.data)
      } else {
        setShowAlert(true)
        console.log(res.data)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  }
  return (
    <div>
      <div style={{ marginBottom: '3vw' }}>
        <Schedule />
      </div>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            Replacment requests
          </Typography>
          <Accordion defaultActiveKey='1'>
            <div>
              <Accordion.Toggle
                style={{ width: '25vw', marginBottom: '1vw' }}
                as={Button}
                variant='contained'
                color='primary'
                eventKey='0'
              >
                Send replacment requests
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
                      label=' Reciver academic_id :'
                      className={classes.textField}
                      value={acId}
                      onChange={handleChangeAcId}
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
                  <form noValidate autoComplete='off'>
                    <TextField
                      id='standard-name'
                      label=' Slot_id :'
                      className={classes.textField}
                      value={slotId}
                      onChange={handleChangeSlotId}
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
                    onClick={handleClickRequest}
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
                style={{ marginBottom: '1vw', width: '25vw' }}
                as={Button}
                variant='contained'
                color='primary'
                eventKey='0'
                onClick={handleViewSent}
              >
                View sent requests
              </Accordion.Toggle>
            </div>
            <Accordion.Collapse eventKey='0'>
              <div className={classes.root2}>
                <Grid container style={{ marginTop: '0.5vw' }} spacing={2}>
                  <Grid item xs={2}>
                    <Paper className={classes.paper}>Reciever id</Paper>
                  </Grid>
                  <Grid item xs={2}>
                    <Paper className={classes.paper}>Slot id</Paper>
                  </Grid>
                  <Grid item xs={2}>
                    <Paper className={classes.paper}>Date</Paper>
                  </Grid>
                  <Grid item xs={2}>
                    <Paper className={classes.paper}>status</Paper>
                  </Grid>
                </Grid>
                {requests.map((label, index) => {
                  const month = `${moment(label.date).month() + 1}`
                  const year = `${moment(label.date).year()}`
                  const day = `${moment(label.date).date()}`
                  return (
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <Paper className={classes.paper1}>
                          {label.academicIdReciever}
                        </Paper>
                      </Grid>
                      <Grid item xs={2}>
                        <Paper className={classes.paper1}>{label.slotId}</Paper>
                      </Grid>
                      <Grid item xs={2}>
                        <Paper className={classes.paper1}>
                          {' '}
                          {month}/{day}/{year}{' '}
                        </Paper>
                      </Grid>

                      <Grid item xs={2}>
                        <Paper className={classes.paper1} id={index}>
                          {label.status}{' '}
                        </Paper>
                      </Grid>
                    </Grid>
                  )
                })}
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
                onClick={handleViewRecieved}
              >
                View recieved requests
              </Accordion.Toggle>
            </div>
            <Accordion.Collapse eventKey='0'>
              <div className={classes.root2}>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <Paper className={classes.paper}>Sender id</Paper>
                  </Grid>
                  <Grid item xs={2}>
                    <Paper className={classes.paper}>Slot id</Paper>
                  </Grid>
                  <Grid item xs={2}>
                    <Paper className={classes.paper}>Date</Paper>
                  </Grid>
                  <Grid item xs={2}>
                    <Paper className={classes.paper}>status</Paper>
                  </Grid>
                </Grid>
                {requests2.map((label, index) => {
                  const month = `${moment(label.date).month() + 1}`
                  const year = `${moment(label.date).year()}`
                  const day = `${moment(label.date).date()}`
                  return (
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <Paper className={classes.paper1}>
                          {label.academicId}
                        </Paper>
                      </Grid>
                      <Grid item xs={2}>
                        <Paper className={classes.paper1}>{label.slotId}</Paper>
                      </Grid>
                      <Grid item xs={2}>
                        <Paper className={classes.paper1}>
                          {' '}
                          {month}/{day}/{year}{' '}
                        </Paper>
                      </Grid>

                      <Grid item xs={2}>
                        <Paper className={classes.paper1} id={index}>
                          {label.status}{' '}
                        </Paper>
                      </Grid>
                      {label.status === 'pending' ||
                      label.status === 'rejected' ? (
                        <Grid item xs={1}>
                          <Paper
                            className={classes.paper3}
                            id={index}
                            onClick={handleClickAccept}
                          >
                            Accept
                          </Paper>
                        </Grid>
                      ) : (
                        ''
                      )}
                      {label.status === 'pending' ? (
                        <Grid item xs={1}>
                          <Paper
                            className={classes.paper2}
                            id={index}
                            onClick={handleClickReject}
                          >
                            Reject
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
    </div>
  )
}

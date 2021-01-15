import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import SnackbarAlert from './../../Helpers/General/SnackbarAlert'
import axios from 'axios'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import { backendLink, secretOrKey } from '../../../keys_dev'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import Popover from '@material-ui/core/Popover'

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
    fontSize:'0.9vw',
    fontWeight:'bold'
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
function arrayToString(x) {
  var z = x[0]
  console.log(z)
  for (var i = 1; i < x.length; i++) {
    z = z + ' , ' + x[i]
  }
  return z // The function returns the product of p1 and p2
}
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
  useEffect(() => {
    axios({
      method: 'post',
      url: `${backendLink}/leaves/viewAllLeaves`,
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
        setRequests(res.data.leaves)
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
  const refresh = (event) => {
    axios({
      method: 'post',
      url: `${backendLink}/leaves/viewAllLeaves`,
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
        setRequests(res.data.leaves)
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setComment(event.target.id)
  }

  const handleClose2 = () => {
    setAnchorEl(null)
  }

  const open2 = Boolean(anchorEl)
  const id = open2 ? 'simple-popover' : undefined

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget)
    setComment2(event.target.id)
  }

  const handleClose22 = () => {
    setAnchorEl2(null)
  }

  const open22 = Boolean(anchorEl2)
  const id2 = open22 ? 'simple-popover' : undefined

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  const handleRRequest = async (event) => {
    await axios({
      method: 'post',
      url: `${backendLink}/leaves/rejectLeave`,
      data: {
        Account: { academicId: academicId },
        leaveId: requests[event.target.id]._id,
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg('successfull')
        setShowSeverity('success')
        refresh()
      } else {
        setShowAlert(true)
        console.log(res.data)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  }
  const handleARequest = async (event) => {
    var link = ''
    if (requests[event.target.id].type === 'sick') {
      link = '/leaves/acceptSickLeave'
    }
    if (requests[event.target.id].type === 'annual') {
      link = '/leaves/acceptAnnualLeave'
    }
    if (requests[event.target.id].type === 'maternity') {
      link = '/leaves/acceptMaternityLeave'
    }
    if (requests[event.target.id].type === 'accidental') {
      link = '/leaves/acceptAccidentalLeave'
    }
    if (requests[event.target.id].type === 'compensation') {
      link = '/leaves/acceptCompensationLeave'
    }
    await axios({
      method: 'post',
      url: `${backendLink}${link}`,
      data: {
        Account: { academicId: academicId },
        leaveId: requests[event.target.id]._id,
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg('successfull')
        setShowSeverity('success')
        refresh()
      } else {
        setShowAlert(true)
        console.log(res.data)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  }
  return (
    <Card className={classes.root}>
      <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
         Leave requests
        </Typography>
        <div className={classes.root2}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Paper className={classes.paper}>Academic id</Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>Status</Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>Type</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>Date</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>Comments</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>Replacment requests ids</Paper>
            </Grid>
          </Grid>
          {requests.map((label, index) => {
            const month = `${moment(label.date).month() + 1}`
            const year = `${moment(label.date).year()}`
            const day = `${moment(label.date).date()}`
            return (
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <Paper className={classes.paper1}>{label.academicId}</Paper>
                </Grid>
                <Grid item xs={1}>
                  <Paper className={classes.paper1}>{label.status}</Paper>
                </Grid>
                <Grid item xs={1}>
                  <Paper className={classes.paper1}>{label.type}</Paper>
                </Grid>
                <Grid item xs={2}>
                  <Paper className={classes.paper1}>
                    {' '}
                    {month}/{day}/{year}{' '}
                  </Paper>
                </Grid>
                <Grid item xs={2}>
                  {console.log(label.comments)}
                  <Paper
                    className={classes.paper11}
                    id={label.comments === undefined ? 'N/A' : label.comments}
                    onClick={handleClick}
                  >
                    Click to view
                  </Paper>
                  <Popover
                    id={id}
                    open={open2}
                    anchorEl={anchorEl}
                    onClose={handleClose2}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <Typography className={classes.comment}>
                      {comment}
                    </Typography>
                  </Popover>
                </Grid>
                <Grid item xs={3}>
                  <Paper
                    className={classes.paper11}
                    id={
                      label.repReqIds.length === 0
                        ? 'N/A'
                        : arrayToString(label.repReqIds)
                    }
                    onClick={handleClick2}
                  >
                    Click to view
                  </Paper>
                  <Popover
                    id={id2}
                    open={open22}
                    anchorEl={anchorEl2}
                    onClose={handleClose22}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <Typography className={classes.comment}>
                      {comment2}
                    </Typography>
                  </Popover>
                </Grid>
                {label.status === 'pending' || label.status === 'rejected' ? (
                  <Grid item xs={1.5}>
                    <Paper
                      className={classes.paper22}
                      id={index}
                      onClick={handleARequest}
                    >
                      {' '}
                      A{' '}
                    </Paper>
                  </Grid>
                ) : (
                  ''
                )}
                {label.status === 'pending' ? (
                  <Grid item xs={1.5}>
                    <Paper
                      className={classes.paper2}
                      id={index}
                      onClick={handleRRequest}
                    >
                      {' '}
                      R
                    </Paper>
                  </Grid>
                ) : (
                  ''
                )}
              </Grid>
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

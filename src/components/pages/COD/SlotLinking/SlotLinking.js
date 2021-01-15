import React, { useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import axios from 'axios'
import moment from 'moment'
import { useSelector } from 'react-redux'
import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core'
import { Form, Row } from 'react-bootstrap'
import Snackbar from '../../../Helpers/General/SnackbarAlert'
import { backendLink, secretOrKey } from '../../../../keys_dev'
import SnackbarAlert from '../../../Helpers/General/SnackbarAlert'

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

export default function SlotLinking() {
  const classes = useStyles()
  const token = useSelector((state) => state.token)
  const academicId = jwt.verify(token, secretOrKey).academicId
  //accept slot linking hooks
  const [slotLinkId, setSlotLinkId] = React.useState({})
  //view slot linking request
  const [mylinks, setMylinks] = React.useState([])

  //alert hooks
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')

  //alet handler
  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  //accept slotlinking handlers
  const handleCreateSlotChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setSlotLinkId((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }
  const handleAcceptSlotLinking = () => {
    axios({
      method: 'post',
      url: `${backendLink}/slotLinking/acceptSlotLinkingRequest`,
      headers: { authorization: token },
      data: {
        Account: { academicId: academicId },
        slotLinkId: slotLinkId.slotLinkId,
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg('Request successfully accepted')
        setShowSeverity('success')
      } else {
        setShowSeverity('error')

        setShowAlert(true)
        setShowAlertMsg(res.data.error)
      }
    })
  }
  const handeSlotLinkingRequests = () => {
    axios({
      method: 'post',
      url: `${backendLink}/slotLinking/viewSlotLinkingRequest`,
      headers: { authorization: token },
      data: {
        Account: { academicId: academicId },
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode === 0) {
        setMylinks(res.data.mylinks)
      } else {
      }
    })
  }
  const AcceptSlotLinking = () => {
    return (
      <div>
        {' '}
        <div>Accept Slot Linking</div>
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='slotLinkId'
            onChange={handleCreateSlotChange}
            required
            value={
              slotLinkId.slotLinkId === undefined
                ? ''
                : slotLinkId['slotLinkId']
            }
            placeholder='Slot Link Id'
          />{' '}
        </Form.Group>
        <Button
          variant='contained'
          color='primary'
          onClick={handleAcceptSlotLinking}
        >
          Accept Slot Linking
        </Button>
        <SnackbarAlert
          handleClose={handleCloseAlert}
          severity={showSeverity}
          msg={showAlertMsg}
          showAlert={showAlert}
        />
      </div>
    )
  }
  //View Attendance
  function FormSlotLinkingRow(props) {
    return (
      <Grid container item xs={12} spacing={1}>
        <React.Fragment>
          <Grid item xs={3}>
            <Paper className={classes.paper}>{props.item1}</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>{props.item2}</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>{props.item3}</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>{props.item4}</Paper>
          </Grid>
        </React.Fragment>
      </Grid>
    )
  }
  function FormSlotLinkingTableHeader(props) {
    return (
      <Grid container item xs={12} spacing={1}>
        <React.Fragment>
          <Grid item xs={3}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item1}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item2}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item3}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              style={{ backgroundColor: '#1d4c75' }}
              className={classes.paper}
            >
              {props.item4}
            </Paper>
          </Grid>
        </React.Fragment>
      </Grid>
    )
  }

  const ViewSlotLinkingTable = () => {
    return (
      <div>
        {/*Table Creation */}{' '}
        <Grid container spacing={1} style={{ marginBottom: '1vw' }}>
          <FormSlotLinkingTableHeader
            item1='Accepted'
            item2='Request Id'
            item3='Slot Id'
            item4='Academic Id'
          />{' '}
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ height: '20vw', overflow: 'scroll' }}
        >
          {mylinks.length === 0
            ? 'No Results Found'
            : mylinks.map((oneLink) => (
                <FormSlotLinkingRow
                  item1={oneLink.accepted}
                  item2={oneLink._id}
                  item3={oneLink.slotId}
                  item4={oneLink.academicId}
                />
              ))}
        </Grid>
      </div>
    )
  }
  const ViewSlotLinkingRequests = () => {
    return (
      <div>
        {' '}
        <Button
          variant='contained'
          color='primary'
          onClick={handeSlotLinkingRequests}
        >
          View Slot Linking Requests
        </Button>
        <ViewSlotLinkingTable />
      </div>
    )
  }
  return (
    <div>
      <AcceptSlotLinking />
      <ViewSlotLinkingRequests />
    </div>
  )
}

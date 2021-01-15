import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Accordion from 'react-bootstrap/Accordion'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SnackbarAlert from './../../Helpers/General/SnackbarAlert'
import axios from 'axios'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Schedule from "../SchedulingSlotId"
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { backendLink, secretOrKey } from '../../../keys_dev'
const useStyles = makeStyles({
  root: {
    
  },
  root2: {
  
    width: '100vw',
    marginBottom: '2vw'
  },
  Button: {
    marginLeft:'13vw',
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: "1vw",
    color:'#000000',
    fontWeight:"bold",
    textDecorationLine: 'underline',
    marginBottom:'2vw'
  },
  pos: {
    marginBottom: 12,
  },
  input: {
    alignContent:'top',
    alignItems:'top',
    display:'flex',
    width: '20vw',
    fontSize: '1vw',
    zIndex:'0',
    textIndent:'0.4vw',
},
paper: {
  padding: '0.25vw',
  textAlign: 'center',
  borderBlockStyle:'solid',
  height:'4vw',
  paddingTop:'0.7vw',
  border:'0vw',
  backgroundColor: '#1d4c75',
  fontWeight:'bold',
  color:'#FFFFFF'
},
paper1: {
  padding: '0.25vw',
  textAlign: 'center',
  borderBlockStyle:'solid',
  height:'4vw',
  paddingTop:'0.7vw',
  border:'0vw',
  backgroundColor: '#899fba',
  color:'#FFFFFF'
},
paper2: {
  padding: '0.25vw',
  textAlign: 'center',
  borderBlockStyle:'solid',
  height:'4vw',
  paddingTop:'0.7vw',
  border:'0vw',
  backgroundColor: '#FF0000',
  fontWeight:'bold',
  color:'#FFFFFF',
  cursor:'pointer'
},
paper3: {
  padding: '0.25vw',
  textAlign: 'center',
  borderBlockStyle:'solid',
  height:'4vw',
  paddingTop:'0.7vw',
  border:'0vw',
  backgroundColor: '#008000',
  fontWeight:'bold',
  color:'#FFFFFF',
  cursor:'pointer'
},
paper4: {
  padding: '0.25vw',
  textAlign: 'center',
  borderBlockStyle:'solid',
  height:'4vw',
  paddingTop:'0.7vw',
  border:'0vw',
  backgroundColor: 'FF0000',
  fontWeight:'bold',
  color:'#FFFFFF',
  cursor:'pointer'
},
});

export default function SlotMgt() {
  const jwt = require('jsonwebtoken')
  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector((state) => state.token)
  const account = jwt.verify(token, secretOrKey)
  const academicId = account.academicId
  const classes = useStyles();
  const [showAlert, setShowAlert] = React.useState(false)
  const [acId, setAcId] = React.useState('');
  const [slotId, setSlotId] = React.useState('');
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  const [date1, setDate1] = React.useState(new Date());
  const [dateToSend1, setDateToSend1] = React.useState({day: '', month: '',year:''})
  const [requests, setRequests] = React.useState([])
  const [requests2, setRequests2] = React.useState([])

  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  const handleViewRecieved = async (event) => {
    console.log("click")
    await axios({
      method: 'post',
      url: `${backendLink}/slots/viewUnassignedSlots`,
      data: {
        
          Account:{academicId:academicId},          
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg("successfull")
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
  };
  const handleClickAccept = async (event) => {
    console.log(requests2[event.target.id]._id)
    await axios({
      method: 'post',
      url: `${backendLink}/slotLinking/slotLinkingRequest`,
      data: {
        
          Account:{academicId:academicId},    
          slot:{id: requests2[event.target.id]._id},      
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg("successfull")
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
  };
  return (
    <div>
    <Card className={classes.root}>
      <CardContent>
       
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         slots
        </Typography>
   
         <Accordion style={{marginTop:"2vw"}} defaultActiveKey="1">
         <div>
      <Accordion.Toggle style={{marginBottom:'2vw',width:'25vw'}} as={Button} variant="contained" color="primary" eventKey="0" onClick={handleViewRecieved}>
        View avilable slots
      </Accordion.Toggle>
      </div>
    <Accordion.Collapse eventKey="0">
      
    <div className={classes.root2}>
      <Grid container spacing={2}>
        
        <Grid item xs={2}>
          <Paper className={classes.paper}>Day</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Slot</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Location Name</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Course Id</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Type</Paper>
        </Grid>
        </Grid>
           {requests2.map((label, index) => {
        
             const month =`${moment(label.date).month() + 1}`;
             const year = `${moment(label.date).year()}`;
             const day =`${moment(label.date).date()}`;
                 return (
                  <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <Paper className={classes.paper1}>{label.day}</Paper>
                  </Grid>
                  <Grid item xs={2}>
                    <Paper className={classes.paper1}>{label.slot}</Paper>
                  </Grid>
                  <Grid item xs={2}>
                    <Paper className={classes.paper1}> {label.locationName}   </Paper>
                  </Grid>
               
                  <Grid item xs={2}>
                    <Paper className={classes.paper1} id={index} >{label.courseId} </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper1} id={index} >{label.slotType} </Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper3} id={index} onClick={handleClickAccept}>Apply</Paper>
                </Grid>
           
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
  );
}

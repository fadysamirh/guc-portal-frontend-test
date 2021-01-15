import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SnackbarAlert from './../../components/Helpers/General/SnackbarAlert'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { backendLink, secretOrKey } from '../../keys_dev'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { BorderColor } from '@material-ui/icons';


const useStyles = makeStyles({
  root: {
  },
  root2: {
    width: '50vw',
    height: '40vw',
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
  title2: {
    fontSize: "0.8vw",
    color:'#000000',
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
paper1: {
  padding: '0.25vw',
  textAlign: 'center',
  height:'4vw',
  paddingTop:'0.7vw',
  borderRadius: "0vw",
  border: '0.2vw',
  borderColor: 'black',
  borderTopStyle:'solid',
  borderLeftStyle:'solid',
  borderRightStyle:'solid',
  borderBottomStyle: 'solid',
  backgroundColor: '#1d4c75',
  fontSize:"1vw",
  color:'#FFFFFF',
  fontWeight: "bold"
},
paper: {
  cursor: 'pointer',
  padding: '0.2vw',
  textAlign: 'center',
  height:'4vw',
  paddingTop:'0vw',
  paddingBottom:'0.2vw',
  borderRadius: "0vw",
  border: '0.2vw',
  borderColor: 'black',
  borderTopStyle:'solid',
  borderLeftStyle:'solid',
  borderRightStyle:'solid',
  borderBottomStyle: 'solid',
  backgroundColor: '#899fba',
  fontSize:"1vw",
  color:'#FFFFFF',
},
});

export default function Scheduling() {
  const jwt = require('jsonwebtoken')
  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector((state) => state.token)
  const account = jwt.verify(token, secretOrKey)
  const academicId = account.academicId
  const classes = useStyles();
  const [schedule, setSchedule] = React.useState([])
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')


  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  useEffect(() => {
    axios({
      method: 'post',
      url: `${backendLink}/slots/viewSchedule`,
      data: {
        
          Account:{academicId:academicId},
      },
      headers: {
        authorization:token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        console.log(res.data)
        setSchedule(res.data.Schedule)
        console.log(schedule)
        setShowAlertMsg("Submited successfully")
        setShowSeverity('success')
      } else {
        setShowAlert(true)
        console.log(res.data)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  }, [])

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         My schedule
        </Typography>
        <Typography className={classes.title2} color="textSecondary" gutterBottom>
         accepted replacment requests slot's will appear in your schedule when it's the week in which this slots take place
        </Typography>
        <div className={classes.root}>
      <Grid container spacing={1.5}>
        <Grid item xs={4} sm={2}>
          <Paper className={classes.paper1}></Paper>
        </Grid>
        <Grid item xs={4} sm={2}>
          <Paper className={classes.paper1}>First</Paper>
        </Grid>
        <Grid item xs={4} sm={2}>
          <Paper className={classes.paper1}>Second</Paper>
        </Grid>
        <Grid item xs={4} sm={2}>
          <Paper className={classes.paper1}>Third</Paper>
        </Grid>
        <Grid item xs={4} sm={2}>
          <Paper className={classes.paper1}>Fourth</Paper>
        </Grid>
        <Grid item xs={4} sm={2}>
          <Paper className={classes.paper1}>Fifth</Paper>
        </Grid>
      </Grid>
      {schedule.map((label, index) => {
 
                return (
                  <Grid container spacing={1.5}>
                  <Grid item xs={4} sm={2}>
                    <Paper className={classes.paper1}>{label.day}</Paper>
                  </Grid>
                  <Grid item xs={4} sm={2}>
                    <Paper className={classes.paper} > <div style={{display:'flex',flexDirection:'column'}}><div>{label.dayOff === undefined ? label.firstSlot === null ? "FREE":label.firstSlot.courseId :"FREE" }</div><div>{label.dayOff === undefined ? label.firstSlot === null ? "N/A":label.firstSlot.locationName :"N/A" }</div></div></Paper>
                  </Grid>
                  <Grid item xs={4} sm={2}>
                  <Paper className={classes.paper}> <div style={{display:'flex',flexDirection:'column'}}><div>{label.dayOff === undefined ? label.secondSlot === null ? "FREE":label.secondSlot.courseId :"FREE" }</div><div>{label.dayOff === undefined ? label.secondSlot === null ? "N/A":label.secondSlot.locationName :"N/A" }</div></div></Paper>
                  </Grid>
                  <Grid item xs={4} sm={2}>
                  <Paper className={classes.paper}> <div style={{display:'flex',flexDirection:'column'}}><div>{label.dayOff === undefined ? label.thirdSlot === null ? "FREE":label.thirdSlot.courseId :"FREE" }</div><div>{label.dayOff === undefined ? label.thirdSlot === null ? "N/A":label.thirdSlot.locationName :"N/A" }</div></div></Paper>
                  </Grid>
                  <Grid item xs={4} sm={2}>
                  <Paper className={classes.paper}> <div style={{display:'flex',flexDirection:'column'}}><div>{label.dayOff === undefined ? label.fourthSlot === null ? "FREE":label.fourthSlot.courseId :"FREE" }</div><div>{label.dayOff === undefined ? label.fourthSlot === null ? "N/A":label.fourthSlot.locationName :"N/A" }</div></div></Paper>
                  </Grid>
                  <Grid item xs={4} sm={2}>
                  <Paper className={classes.paper}> <div style={{display:'flex',flexDirection:'column'}}><div>{label.dayOff === undefined ? label.fifthSlot === null ? "FREE":label.fifthSlot.courseId :"FREE" }</div><div>{label.dayOff === undefined ? label.fifthSlot === null ? "N/A":label.fifthSlot.locationName :"N/A" }</div></div></Paper>
                  </Grid>
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
  );
}

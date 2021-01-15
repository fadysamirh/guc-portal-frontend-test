import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Accordion from 'react-bootstrap/Accordion'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Form from 'react-bootstrap/Form'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SnackbarAlert from './../../Helpers/General/SnackbarAlert'
import axios from 'axios'
import zIndex from '@material-ui/core/styles/zIndex';
import { backendLink, secretOrKey } from '../../../keys_dev'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'




const useStyles = makeStyles({
  root: {
    flexGrow: 1,
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
  width: '8vw',
},
paper1: {
  padding: '0.25vw',
  textAlign: 'center',
  overflowY: 'auto',
  width: '8vw',
  height: '4vw',
  },
});

export default function DayoffMgt(props) {
  const jwt = require('jsonwebtoken')
  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector((state) => state.token)
  const account = jwt.verify(token, secretOrKey)
  const academicId = account.academicId
  const classes = useStyles();
  const [day, setday] = React.useState('');
  const [reason, setReason] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  const [requests, setRequests] = React.useState([])
  const [hodComment,setHodComment]=React.useState('')
  // const token = useSelector(state=>state.token)
//  const academicId=jwt.verify(token,'SECRET').academicId
const handleCloseAlert = () => {
  setShowAlert(false)
};
console.log(hodComment)
const handleView= async (event) => {
    console.log("click")
     axios({
      method: 'post',
      url: `${backendLink}/changeDayOff/viewAllRequests`,
      data: {
        
          Account:{academicId: academicId},          
      },
      headers: {
        authorization:token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg("successfull")
        setShowSeverity('success')  
              console.log(res.data)

        setRequests(res.data.requests)
        console.log(requests)
      } else {
        setShowAlert(true)
        console.log(res.data)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  };

  
  const handleClick1 = async (index) => {
    console.log(index)

    await axios({
      method: 'post',
      url: `${backendLink}/changeDayOff/updateRequest`,
      data: {
        
          Account:{academicId:academicId},
          
         status: 'accepted',
          hodComment:  reason !== '' ? reason : 'N/A',
          reqId:  requests[index]._id
      },
      headers: {
        authorization:token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
         setShowAlert(true)
         setShowAlertMsg("Accepted successfully")
         setShowSeverity('success')
      } else {
         setShowAlert(true)
        console.log(res.data)
         setShowSeverity('error')
         setShowAlertMsg(res.data.error)
      }
    })
  };
  const handleClick2 = async (index) => {
    console.log(index)
    
     axios({
      method: 'post',
      url: `${backendLink}/changeDayOff/updateRequest`,
      data: {
        
          Account:{academicId:academicId},
          
         status: 'rejected',
         hodComment:  hodComment !== '' ? hodComment : undefined,
          
          reqId:  requests[index]._id
      },
      headers: {
        authorization:token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
         setShowAlert(true)
         setShowAlertMsg("Rejected successfully")
         setShowSeverity('success')
        handleView()
      } else {
         setShowAlert(true)
        console.log(res.data)
         setShowSeverity('error')
         setShowAlertMsg(res.data.error)
      }
    })
  };
  const handleChange1 = (event) => {
    setHodComment(event.target.value);

  };
 
  return (
    <Card className={classes.root} >
      <CardContent >
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         Manage day off requests
        </Typography>
       
         <Accordion style={{flexGrow: 1}} defaultActiveKey="1">
         <div>
      <Accordion.Toggle  as={Button} variant="contained" color="primary" eventKey="0" onClick={handleView}>
        View all Requests
      </Accordion.Toggle>
      </div>
    <Accordion.Collapse eventKey="0">
      
    <div className={classes.root} >
    <Grid container spacing={3} >
        <Grid item xs={13}>
          <Paper className={classes.paper}>Status</Paper>
        </Grid>
        <Grid item xs={13}>
          <Paper className={classes.paper}>New day off</Paper>
        </Grid>
        <Grid item xs={13}>
          <Paper className={classes.paper}>Academic ID</Paper>
        </Grid>
        <Grid item xs={13}>
          <Paper className={classes.paper} style = {{width: '10vw'}}>Your Comments</Paper>
        </Grid>
        <Grid item xs={13}>
          <Paper className={classes.paper} style = {{width: '15vw'}}>Reason</Paper>
        </Grid>
        <Grid item xs={13}>
            <Form.Group>
            <Form.Control
       placeholder='If rejecting, you can enter a comment here'
        onChange={handleChange1}
        style = {{width: '23vw'}}
        />
            </Form.Group>
      </Grid>
      </Grid>
      <div style={{overflow:'scroll'}}>
      {requests.map((label, index) => {
           
            var i = index
            
                return (
                  
                  <Grid container spacing={3} >
                  <Grid item xs={13}>
                    <Paper className={classes.paper}>{label.status}</Paper>
                  </Grid>
                  <Grid item xs={13}>
                    <Paper className={classes.paper}>{label.newDayOff}</Paper>
                  </Grid>
                  <Grid item xs={13}>
                    <Paper className={classes.paper}>{label.academicId}</Paper>
                  </Grid>
                  <Grid item xs={13}>
               
     
                     <Paper className={classes.paper1}>{label.hodComment === undefined ? 'N/A' : label.hodComment}</Paper> 
                  </Grid>

                  <Grid item xs={13}>
                  <Paper className={classes.paper1} style = {{width: '15vw'}}>{label.reason === undefined ? 'N/A' : label.reason}</Paper>
        </Grid>
                  
                  <Grid item xs={13}>
          <Button variant="contained"style={{backgroundColor:"#228B22"}} id = {index} onClick={()=>handleClick1(index)} >Accept</Button>
        </Grid>
        <Grid item xs={13}>
        <Button variant="contained" color="secondary" id = {i} onClick={()=>handleClick2(index)} value={hodComment}> Reject </Button> 
        </Grid>
                  </Grid>
                )
          })}</div>
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
  );
}

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
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { backendLink, secretOrKey } from '../../../keys_dev'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import Popover from '@material-ui/core/Popover';
const useStyles = makeStyles({
  root: {
  },
  root2: {
    width: '50vw',
    marginBottom: '2vw'
  },
  Button: {
    marginLeft:'13vw',
  },
comment: {
  marginLeft:'1vw',
  marginRight: '1vw',
  marginTop:'1vw',
  marginBottom:'1vw',
  fontSize:'1vw'
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
  backgroundColor: '#899fba',
  color: '#FFFFFF',
},
paper1: {
  padding: '0.25vw',
  textAlign: 'center',
  borderBlockStyle:'solid',
  height:'4vw',
  paddingTop:'0.7vw',
  border:'0vw',
  backgroundColor: '#899fba',
  color: '#FFFFFF',
  cursor:'pointer'
},
paper2: {
  padding: '0.25vw',
  textAlign: 'center',
  borderBlockStyle:'solid',
  height:'4vw',
  paddingTop:'0.7vw',
  border:'0vw',
  backgroundColor: '#1d4c75',
  color: '#FFFFFF',
  fontWeight:'bold'
},
});

export default function Dayoff() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setComment(event.target.id)
  };

  const handleClose2 = () => {
    setAnchorEl(null);
  };

  const open2 = Boolean(anchorEl);
  const id = open2 ? 'simple-popover' : undefined;

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
  const [requests, setRequests] = React.useState([])
  const [comment, setComment] = React.useState('')
  //form hooks
  const [state, setState] = React.useState({})
  //snackback hooks
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  const handleChange1 = (event) => {
    setReason(event.target.value);
    console.log(reason)
  };
  const handleView= async (event) => {
    console.log("click")
    await axios({
      method: 'post',
      url: `${backendLink}/changeDayOff/viewSentReq`,
      data: {
        
          Account:{academicId: academicId},          
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg("successfull")
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
  };
  const handleChangeSubmit = async (event) => {
    console.log("click")
    await axios({
      method: 'post',
      url: `${backendLink}/changeDayOff/requestChangeDayOff`,
      data: {
        
          Account:{academicId:academicId},
          academicId: academicId,
          newDayOff: day,
          reason:  reason !== '' ? reason : 'N/A'
          
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg("Submited successfully")
        setShowSeverity('success')
      } else {
        setShowAlert(true)
        console.log(res.data)
        setShowSeverity('error')
        setShowAlertMsg(res.data.error)
      }
    })
  };
  const handleChange = (event) => {
    setday(event.target.value);
    console.log(day)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         Change Day Off
        </Typography>
         <Accordion defaultActiveKey="1">
         <div>
      <Accordion.Toggle  as={Button} variant="contained" color="primary" eventKey="0">
        New Request
      </Accordion.Toggle>
      </div>
    <Accordion.Collapse eventKey="0">
      
      <div>  
      <div>  
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label" style={{zIndex:1,fontSize:'1vw',marginLeft:'0.4vw'}}>Day</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={day}
          onChange={handleChange}
          defaultValue={"Age"}
          style={{
            backgroundColor: '#F0F0F0',
            borderRadius: '0.5vw',
            border: 'none',
            height: '2vw',
            width: '8vw',
            fontSize: '1vw',
            zIndex:'0',
            textIndent:'0.4vw'
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"saturday"}>saturday</MenuItem>
          <MenuItem value={"sunday"}>sunday</MenuItem>
          <MenuItem value={"monday"}>monday</MenuItem>
          <MenuItem value={"tuesday"}>tuesday</MenuItem>
          <MenuItem value={"wednesday"}>wednesay</MenuItem>
          <MenuItem value={"thursday"}>thursday</MenuItem>
        </Select>
      </FormControl>
      <div>
      <form  noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label='Reason'
          className={classes.textField}
          value={reason}
          onChange={handleChange1}
          margin="normal"
          style={{
            backgroundColor: '#F0F0F0',
            borderRadius: '0.5vw',
            border: 'none',
            fontSize: '1vw',
            textIndent:'0.4vw'
          }}
          InputProps={{
            className: classes.input,
        }}
        />
        </form>
      </div>
      <Button className={classes.Button} variant="contained" color="secondary" onClick={handleChangeSubmit}>
       submit
     </Button>
      </div>
    </div>
  

  
  
    </Accordion.Collapse>
         </Accordion>
     
         <Accordion style={{marginTop:"2vw"}} defaultActiveKey="1">
         <div>
      <Accordion.Toggle style={{marginBottom:"2vw"}} as={Button} variant="contained" color="primary" eventKey="0" onClick={handleView}>
        View My Requests
      </Accordion.Toggle>
      </div>
    <Accordion.Collapse eventKey="0">
      
    <div className={classes.root2}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper2}>Status</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper2}>New day off</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper2}>Hod comment</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper2}>My comment</Paper>
        </Grid>
        </Grid>
           {requests.map((label, index) => {
           console.log(label.hodComment)
                return (
                  
                  <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <Paper className={classes.paper}>{label.status}</Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper className={classes.paper}>{label.newDayOff}</Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper className={classes.paper1} id={label.hodComment === undefined ? 'N/A' : label.hodComment} onClick={handleClick}>Click to view</Paper>
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
        <Typography className={classes.comment}>{comment}</Typography>
      </Popover>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper className={classes.paper1} id={label.reason === undefined ? 'did not add reason' : label.reason} onClick={handleClick}>Click to view</Paper>
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
        <Typography className={classes.comment}>{comment}</Typography>
      </Popover>
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
  );
}
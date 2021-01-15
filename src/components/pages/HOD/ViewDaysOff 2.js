import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { Form } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { backendLink, secretOrKey } from '../../../keys_dev'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '1vw',
    textAlign: 'center',
    backgroundColor:'#1E90FF',
    color:'white'
  },
  paperContent: {
    padding: '1vw',
    textAlign: 'center',
    backgroundColor:'white',
    color:'#1E90FF'
  },
  title: {
    fontSize: "1vw",
    color:'#000000',
    fontWeight:"bold",
    textDecorationLine: 'underline',
    marginBottom:'2vw'
  },
}));
export default function ViewDaysOff(props) {
  const jwt = require('jsonwebtoken')
  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector((state) => state.token)
  const account = jwt.verify(token, secretOrKey)
  const academicId = account.academicId
  const classes=useStyles()

  //hooks
  const [state,setState]=React.useState({})
  const [personel,setPersonel]=React.useState([])
//alert hooks
const [showAlert, setShowAlert] = React.useState(false)
const [showAlertMsg, setShowAlertMsg] = React.useState('error')
const [showSeverity, setShowSeverity] = React.useState('error')
  const handleView=()=>{
     axios({
      method: 'post',
      url: `${backendLink}/hodFunctionalities/viewDaysOff`,
      data: {
        
          Account:{academicId:academicId},

          academicId:state.academicId===''?undefined:state.academicId  
      },
      headers: {
        authorization:token,
      },
    }).then(async (res) => {
      console.log(res)
      if (res.data.statusCode === 0) {
        if(state.academicId===''||state.academicId===undefined){
          setPersonel(res.data.staff)

        }else{
          setPersonel([res.data.staff])

        }
      } else {
        props.setShowAlert(true)
        props.setShowSeverity('error')
        props.setShowAlertMsg(res.data.message)
      }
    })
  }
  //handlers
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }
  //console.log(coverage)
  //views
  //view helper
  const CreateRow=(propsRow)=>{
    return( <div className={classes.root}>
    
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper className={propsRow.header?classes.paper:classes.paperContent}>{propsRow.item1}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={propsRow.header?classes.paper:classes.paperContent}>{propsRow.item2}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={propsRow.header?classes.paper:classes.paperContent}>{propsRow.item3}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={propsRow.header?classes.paper:classes.paperContent}>{propsRow.item4}</Paper>
        </Grid>
      </Grid>
    </div>)
  }
  return (<div>
  <Accordion defaultActiveKey="1">
  <Card>
    <Card.Header>
    <Typography className={classes.title} color="textSecondary" gutterBottom>
                 Days off
                 </Typography>
      <Accordion.Toggle as={Button} variant="contained" color="primary" eventKey="0">
        View all or a certain staff members' day off
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
        <Form.Group>
          <Form.Control placeholder= 'enter an academic ID or press view for all' name='academicId' onChange={handleChange} value={state.academicId===undefined?'':state.academicId}/>
        </Form.Group>
        <Button variant='contained' color='primary' onClick={handleView}>View Days Off</Button>
       {/*Table Header */}
        <CreateRow item1='Academic ID' item2='First Name' item3='Last Name' item4='Day Off' header={true}/>
        {/*Table Content */}
        {personel.map((onePerson)=>{
         return <CreateRow item1={onePerson.academicId} item2={onePerson.firstName} item3={onePerson.lastName} item4={onePerson.dayOff} header={false}/>
        })}
      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
  </div>)
}

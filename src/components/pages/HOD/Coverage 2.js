import { Button, Grid, makeStyles, Paper } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { Form } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { backendLink, secretOrKey } from '../../../keys_dev'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import Typography from '@material-ui/core/Typography';
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
export default function Coverage(props) {
  const jwt = require('jsonwebtoken')
  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector((state) => state.token)
  const account = jwt.verify(token, secretOrKey)
  const academicId = account.academicId
  const classes = useStyles();
  //hooks
  const [state,setState]=React.useState({})
  const [coverage,setCoverage]=React.useState([])
  const handleView=()=>{
     axios({
      method: 'post',
      url: `${backendLink}/hodFunctionalities/viewCoursesCoverage`,
      data: {
        
          Account:{academicId:academicId},

          courseId:state.courseId===''?undefined:state.courseId  
      },
      headers: {
        authorization:token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        if(state.courseId===''||state.courseId===undefined){
          setCoverage(res.data.coverage)

        }else{
          setCoverage([res.data.coverage])

        }
      } else {
        props.setShowAlert(true)
        props.setShowSeverity('error')
        props.setShowAlertMsg(res.data.error)
      }
    })
  }
  //handlers
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }
  console.log(coverage)
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
       
      </Grid>
    </div>)
  }
  return (<div>
  <Accordion defaultActiveKey="1">
  <Card>
    <Card.Header>
    <Typography className={classes.title} color="textSecondary" gutterBottom>
                 Courses coverage
                 </Typography>
      <Accordion.Toggle as={Button} variant="contained" color="primary" eventKey="0">
      View all or a certain course covarage
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
        <Form.Group>
          <Form.Control name='courseId'  placeholder= 'enter course ID or press view for all'       onChange={handleChange} value={state.courseId===undefined?'':state.courseId}
/>
        </Form.Group>
        <Button variant='contained' color='primary' onClick={handleView}>View Coverage</Button>
       {/*Table Header */}
        <CreateRow item1='Course Id' item2='Coverage' header={true}/>
        {/*Table Content */}
        {coverage.map((oneCourse)=>{
         return <CreateRow item1={oneCourse.couseId} item2={oneCourse.coverage} header={false}/>
        })}
      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
  </div>)
}

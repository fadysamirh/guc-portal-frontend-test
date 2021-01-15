import axios from 'axios'
import Button  from '@material-ui/core/Button'
import React from 'react'
import { Form } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { backendLink, secretOrKey } from '../../../keys_dev'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    display:'flex',
    alignContent:'center',
    justifyContent: 'center',
    alignItems:'center',
    justifyItems:'center'
},
comment: {
    marginLeft:'1vw',
    marginRight: '1vw',
    marginTop:'1vw',
    marginBottom:'1vw',
    fontSize:'1vw'
  },
  root2: {
    width: '90vw',
    marginBottom: '2vw',
  
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
paper11: {
    padding: '0.25vw',
    textAlign: 'center',
    borderBlockStyle:'solid',
    height:'4vw',
    paddingTop:'0.7vw',
    border:'0vw',
    backgroundColor: '#899fba',
    color:'#FFFFFF',
    cursor:'pointer'
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
paper22: {
    padding: '0.25vw',
    textAlign: 'center',
    borderBlockStyle:'solid',
    height:'4vw',
    paddingTop:'0.7vw',
    border:'0vw',
    backgroundColor: '#31C41E',
    fontWeight:'bold',
    color:'#FFFFFF',
    cursor:'pointer'
  },
});
export default function AssignCourseInst (props){
  const classes = useStyles();
  const jwt = require('jsonwebtoken')
  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector((state) => state.token)
  const account = jwt.verify(token, secretOrKey)
  const academicId = account.academicId
    const [state,setState] = React.useState({})
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value })
      }
      const handleAssign = () => {
        axios({
            method: 'post',
            url: `${backendLink}/courses/assignCourseInstructor`,
            data: {
              
                Account:{academicId: academicId}, 
                courseId: state.courseId,
                assignedAcademicId: state.assignedAcademicId
                         
            },
            headers: {
              authorization:token,
            },
          }).then(async (res) => {
              console.log(res)
            if (res.data.statusCode === 0) {
              props.setShowAlert(true)
              props.setShowAlertMsg("successfull")
              props.setShowSeverity('success')  
                    console.log(res.data)
      
             
            } else {
              props.setShowAlert(true)
              console.log(res.data)
              props.setShowSeverity('error')
              props.setShowAlertMsg(res.data.error)
            }
          })
      
      }
    return(
        <Accordion defaultActiveKey="1">
  <Card>
    <Card.Header>
  
      <Accordion.Toggle  as={Button} variant="contained" color="primary" eventKey="0">
        Assign Course Instructor
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
          <Form.Group>
              <Form.Control name = 'courseId' placeholder='Enter the desired course ID' value = {state.courseId===undefined ? '': state.courseId} onChange={handleChange}  />
          </Form.Group>
          <Form.Group>
              <Form.Control name = 'assignedAcademicId' placeholder='Enter the academic ID of the instructor' value = {state.assignedAcademicId===undefined ? '': state.assignedAcademicId} onChange={handleChange}  />
          </Form.Group>
          <Button variant = 'contained' color='secondary' onClick={handleAssign}>Submit</Button>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  
</Accordion>



    )


}
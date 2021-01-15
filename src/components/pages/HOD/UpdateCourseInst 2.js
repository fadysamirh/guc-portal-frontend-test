import axios from 'axios'
import Button  from '@material-ui/core/Button'
import React from 'react'
import { Form } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { backendLink ,secretOrKey } from '../../../keys_dev'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

export default function UpdateCourseInst (props){
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
            url: `${backendLink}/courses/updateCourseInstructor`,
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
        Update Course Instructor
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
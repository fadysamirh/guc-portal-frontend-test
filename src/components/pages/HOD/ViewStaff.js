import { Button, Grid, makeStyles, Paper } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { Form } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { backendLink } from '../../../keys_dev'
//YOUSSEF HELP
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '1vw',
    textAlign: 'center',
    backgroundColor: '#1E90FF',
    color: 'white',
  },
  paperContent: {
    padding: '1vw',
    textAlign: 'center',
    backgroundColor: 'white',
    color: '#1E90FF',
  },
}))
export default function ViewStaff(props) {
  const classes = useStyles()
  const academicId = 'ac-9'
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTYzNjkxNzc5ZjkzMzc2ODc4YTYxOSIsImFjYWRlbWljSWQiOiJhYy05IiwiZmlyc3ROYW1lIjoiU2hhZGkiLCJsYXN0TmFtZSI6Ik5ha2hsYSIsInBob25lTnVtYmVyIjoiMDEyMjE2NjgwMDQiLCJlbWFpbCI6ImFtbUB0ZXN0LmNvbSIsInR5cGUiOiJhY2FkZW1pYyBtZW1iZXIiLCJtZW1iZXJUeXBlIjoiaGVhZCBvZiBkZXBhcnRtZW50IiwiaWF0IjoxNjEwNDUwOTAwLCJleHAiOjE2MTA0Nzk3MDB9.jYkb2FSiVC-ti0PCk7XCW99JS5jY5933Ci-TowJwujU'

  //hooks
  const [state, setState] = React.useState({})
  const [staff, setStaff] = React.useState([])
  const handleView = () => {
    axios({
      method: 'post',
      url: `${backendLink}/hodFunctionalities/viewStaff`,
      data: {
        Account: { academicId: academicId },

        courseId: props.courseId === '' ? undefined : props.courseId,
      },
      headers: {
        authorization: token,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        if (props.courseId === '' || props.courseId === undefined) {
          setStaff(res.data.staff)
        } else {
          setStaff([res.data.staff])
        }
      } else {
        props.setShowAlert(true)
        props.setShowSeverity('error')
        props.setShowAlertMsg(res.data.error)
      }
    })
  }
  //handlers
  //   const handleChange = (event) => {
  //     setprops({ ...props, [event.target.name]: event.target.value })
  //   }
  //   console.log(staff)
  //   //views
  //   //view helper
  //   const CreateRow=(propsRow)=>{
  //     return( <div className={classes.root}>
  //       <Grid container spacing={2}>
  //         <Grid item xs={3}>
  //           <Paper className={propsRow.header?classes.paper:classes.paperContent}>{propsRow.item1}</Paper>
  //         </Grid>
  //         <Grid item xs={3}>
  //           <Paper className={propsRow.header?classes.paper:classes.paperContent}>{propsRow.item2}</Paper>
  //         </Grid>

  //       </Grid>
  //     </div>)
  //   }
  //   return (<div>
  //   <Accordion defaultActiveKey="1">
  //   <Card>
  //     <Card.Header>
  //       <Accordion.Toggle as={Button} variant="contained" color="primary" eventKey="0">
  //       View all staff or a certain course staff
  //       </Accordion.Toggle>
  //     </Card.Header>
  //     <Accordion.Collapse eventKey="0">
  //       <Card.Body>
  //         <Form.Group>
  //           <Form.Control name='courseId'  placeholder= 'enter course ID or press view for all'       onChange={handleChange} value={props.courseId===undefined?'':props.courseId}/>
  //         </Form.Group>
  //         <Button variant='contained' color='primary' onClick={handleView}>View Staff</Button>
  //        {/*Table Header */}
  //         <CreateRow item1='Course Id' item2='Coverage' header={true}/>
  //         {/*Table Content */}
  //         {coverage.map((oneCourse)=>{
  //          return <CreateRow item1={oneCourse.couseId} item2={oneCourse.coverage} header={false}/>
  //         })}
  //       </Card.Body>
  //     </Accordion.Collapse>
  //   </Card>
  // </Accordion>
  //   </div>)
  // }
}

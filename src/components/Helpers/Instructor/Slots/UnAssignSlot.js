import React, { useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import axios from 'axios'
import moment from 'moment'
import { useSelector } from 'react-redux'
import {
  Button,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core'
import { Form, Row } from 'react-bootstrap'
import { backendLink, secretOrKey } from '../../../../keys_dev'
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

export default function CreateSlot(props) {
  const classes = useStyles()
  const token = useSelector((state) => state.token)
  const academicId = jwt.verify(token, secretOrKey).academicId
  //day drop hooks
  const [open, setOpen] = React.useState(false)
  const [day, setDay] = React.useState('')
  //slots drop hooks
  const [openSlot, setOpenSlot] = React.useState(false)
  const [slot, setSlot] = React.useState('')
  //slot type drop hooks
  const [openSlotType, setOpenSlotType] = React.useState(false)
  const [slotType, setSlotType] = React.useState('')
  //create slot state
  const [createState, setCreateState] = React.useState({})
  //day drop handlers
  const handleChange = (event) => {
    setDay(event.target.value)
    console.log(day)
  }
  //alert hooks
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }
  //slots drop handlers
  const handleSlotChange = (event) => {
    setSlot(event.target.value)
    console.log(day)
  }

  const handleSlotClose = () => {
    setOpenSlot(false)
  }

  const handleSlotOpen = () => {
    setOpenSlot(true)
  }
  //slots type drop handlers
  const handleSlotTypeChange = (event) => {
    setSlotType(event.target.value)
    console.log(day)
  }

  const handleSlotTypeClose = () => {
    setOpenSlotType(false)
  }

  const handleSlotTypeOpen = () => {
    setOpenSlotType(true)
  }
  // create slot handler
  const handleCreateSlotChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setCreateState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }
  const handleCreateSlot = (e) => {
    axios({
      method: 'post',
      url: `${backendLink}/slots/unAssignSlot`,
      headers: { authorization: token },
      data: {
        Account: { academicId: academicId },
        slot: {
          day: day,
          slot: slot,
          locationName: createState.locationName,
        },
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg('Slot created successfully')
        setShowSeverity('success')
        props.setShowAlert(true)
        props.setShowAlertMsg('Slot created successfully')
        props.setShowSeverity('success')
      } else {
        props.setShowSeverity('error')
        props.setShowAlert(true)
        props.setShowAlertMsg(res.data.error)
      }
    })
  }
  //Create view helpers
  const DayDrop = () => {
    return (
      <FormControl>
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={day}
          onChange={handleChange}
          defaultValue={''}
          style={{
            backgroundColor: '#F0F0F0',
            borderRadius: '0.5vw',
            border: 'none',
            height: '2vw',
            width: '8vw',
            fontSize: '1vw',
            zIndex: '0',
            textIndent: '0.4vw',
          }}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'saturday'}>saturday</MenuItem>
          <MenuItem value={'sunday'}>sunday</MenuItem>
          <MenuItem value={'monday'}>monday</MenuItem>
          <MenuItem value={'tuesday'}>tuesday</MenuItem>
          <MenuItem value={'wednesday'}>wednesay</MenuItem>
          <MenuItem value={'thursday'}>thursday</MenuItem>
        </Select>
      </FormControl>
    )
  }
  const SlotDrop = () => {
    return (
      <FormControl>
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          open={openSlot}
          onClose={handleSlotClose}
          onOpen={handleSlotOpen}
          value={slot}
          onChange={handleSlotChange}
          defaultValue={''}
          style={{
            backgroundColor: '#F0F0F0',
            borderRadius: '0.5vw',
            border: 'none',
            height: '2vw',
            width: '8vw',
            fontSize: '1vw',
            zIndex: '0',
            textIndent: '0.4vw',
          }}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'first'}>first</MenuItem>
          <MenuItem value={'second'}>second</MenuItem>
          <MenuItem value={'third'}>third</MenuItem>
          <MenuItem value={'fourth'}>fourth</MenuItem>
          <MenuItem value={'fifth'}>fifth</MenuItem>
        </Select>
      </FormControl>
    )
  }

  return (
    <div>
      {' '}
      <div>Un-Assign Slot</div>
      <Row>
        <DayDrop />
        <SlotDrop />
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='locationName'
            onChange={handleCreateSlotChange}
            required
            value={
              createState['locationName'] !== undefined
                ? createState['locationName']
                : ''
            }
            placeholder='Location Name'
          ></Form.Control>
        </Form.Group>
        {/* <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='assignedAcademicId'
            onChange={handleCreateSlotChange}
            required
            value={
              createState['assignedAcademicId'] !== undefined
                ? createState['assignedAcademicId']
                : ''
            }
            placeholder='Assigned Academic Id'
          ></Form.Control>
        </Form.Group> */}
        <Button variant='contained' color='primary' onClick={handleCreateSlot}>
          Un-Assign Slot
        </Button>
      </Row>
    </div>
  )
}

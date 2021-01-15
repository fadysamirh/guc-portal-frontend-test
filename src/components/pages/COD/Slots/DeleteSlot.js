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

export default function DeleteSlot(props) {
  const classes = useStyles()
  const token = useSelector((state) => state.token)
  const academicId = jwt.verify(token, secretOrKey).academicId
  //day delete drop hooks
  const [openDelete, setOpenDelete] = React.useState(false)
  const [dayDelete, setDayDelete] = React.useState('')
  //slots delete drop hooks
  const [openSlotDelete, setOpenSlotDelete] = React.useState(false)
  const [slotDelete, setSlotDelete] = React.useState('')

  //delete slot state
  const [deleteState, setDeleteState] = React.useState({})
  //alert hooks
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  //alet handler
  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  const handleChangeDeleteDay = (event) => {
    setDayDelete(event.target.value)
  }

  const handleCloseDeleteDay = () => {
    setOpenDelete(false)
  }

  const handleOpenDeleteDay = () => {
    setOpenDelete(true)
  }
  //slots delete drop handlers
  const handleSlotChangeDelete = (event) => {
    setSlotDelete(event.target.value)
  }

  const handleSlotCloseDelete = () => {
    setOpenSlotDelete(false)
  }

  const handleSlotOpenDelete = () => {
    setOpenSlotDelete(true)
  }
  // delete slot handler
  const handleDeleteSlotChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setDeleteState((prevState) => {
      console.log(prevState)
      return {
        ...prevState,
        [name]: value,
      }
    })
  }
  const handleDeleteSlot = (e) => {
    axios({
      method: 'post',
      url: `${backendLink}/slots/deleteSlot`,
      headers: { authorization: token },
      data: {
        Account: { academicId: academicId },
        slot: {
          day: dayDelete,
          slot: slotDelete,
          locationName: deleteState.locationName,
        },
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode === 0) {
        setShowAlert(true)
        setShowAlertMsg('Slot deleted successfully')
        setShowSeverity('success')
        props.setShowAlert(true)
        props.setShowAlertMsg('Slot deleted successfully')
        props.setShowSeverity('success')
      } else {
        props.setShowSeverity('error')
        props.setShowAlert(true)
        props.setShowAlertMsg(res.data.error)
      }
    })
  }

  //Delete view Helper
  const DayDropDelete = () => {
    return (
      <FormControl>
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          open={openDelete}
          onClose={handleCloseDeleteDay}
          onOpen={handleOpenDeleteDay}
          value={dayDelete}
          onChange={handleChangeDeleteDay}
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
  const SlotDropDelete = () => {
    return (
      <FormControl>
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          open={openSlotDelete}
          onClose={handleSlotCloseDelete}
          onOpen={handleSlotOpenDelete}
          value={slotDelete}
          onChange={handleSlotChangeDelete}
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
      <div>Delete Slot</div>
      <Row>
        <DayDropDelete />
        <SlotDropDelete />
        <Form>
          <Form.Group>
            <Form.Control
              className={classes.formControl}
              name='locationName'
              onChange={handleDeleteSlotChange}
              required
              value={
                deleteState['locationName'] !== undefined
                  ? deleteState['locationName']
                  : ''
              }
              placeholder='Location Name'
            ></Form.Control>
          </Form.Group>
        </Form>
        <Button variant='contained' color='primary' onClick={handleDeleteSlot}>
          Delete Slot
        </Button>
      </Row>
    </div>
  )
}

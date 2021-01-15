import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import axios from 'axios'
import SnackbarAlert from '../General/SnackbarAlert'

import { backendLink, secretOrKey } from '../../../keys_dev'

import { checkTokenExpired } from '../../../globalState/actions/AuthActions'

const types = [
  {
    value: 'HR',
    label: 'HR',
  },
  {
    value: 'academic member',
    label: 'Academic Member',
  },
]
const genders = [
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
]
const memtypes = [
  {
    value: 'head of department',
    label: 'HOD',
  },
  {
    value: 'course coordinator',
    label: 'Coordinator',
  },
  {
    value: 'course instructor',
    label: 'Instructor',
  },
  {
    value: 'academic member',
    label: 'Member',
  },
]

const daysOffs = [
  {
    value: 'saturday',
    label: 'saturday',
  },
  {
    value: 'sunday',
    label: 'sunday',
  },
  {
    value: 'monday',
    label: 'monday',
  },
  {
    value: 'tuesday',
    label: 'tuesday',
  },
  {
    value: 'wednesday',
    label: 'wednesday',
  },
  {
    value: 'thursday',
    label: 'thursday',
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

export default function CreateLocation(props) {
  const jwt = require('jsonwebtoken')

  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector((state) => state.token)
  const account = jwt.verify(token, secretOrKey)
  const academicId = account.academicId
  const classes = useStyles()

  const [firstName, setFirstName] = React.useState()
  const [lastName, setLastName] = React.useState()
  const [email, setEmail] = React.useState()

  const [phoneNumber, setPhoneNumber] = React.useState()
  const [type, setType] = React.useState()
  const [memberType, setMemberType] = React.useState()

  const [daysOff, setDaysOff] = React.useState()
  const [gender, setGender] = React.useState()
  const [salary, setSalary] = React.useState()

  const [office, setOffice] = React.useState()
  const [department, setDepartment] = React.useState()

  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value)
  }
  const handleChangeLastName = (event) => {
    setLastName(event.target.value)
  }
  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value)
  }
  const handleChangeType = (event) => {
    setType(event.target.value)

    {
      event.target.value === 'HR' ? setDaysOff('saturday') : setDaysOff(daysOff)
    }
  }
  const handleChangeMemberType = (event) => {
    setMemberType(event.target.value)
  }
  const handleChangeDaysOff = (event) => {
    setDaysOff(event.target.value)
  }
  const handleChangeGender = (event) => {
    setGender(event.target.value)
  }
  const handleChangeSalary = (event) => {
    setSalary(event.target.value)
  }
  const handleChangeOffice = (event) => {
    setOffice(event.target.value)
  }
  const handleChangeDepartment = (event) => {
    setDepartment(event.target.value)
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  const handleCreate = () => {
    axios({
      url: `${backendLink}/account/createAccount`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      data: {
        Account: {
          firstName,
          lastName,
          email,
          phoneNumber,
          type,
          memberType,
          daysOff,
          gender,
          salary,
          office,
          department,
        },
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode !== 0) {
        setShowSeverity('error')

        setShowAlert(true)
        setShowAlertMsg(res.data.error)
      }

      if (res.data.statusCode === 0) {
        setShowSeverity('success')
        setShowAlert(true)
        setShowAlertMsg('Created Successfully')
        history.go(0)

        //setLocations(res.data.locationFound)
      }
    })
  }

  //useEffect(() => {}, [showSeverity])

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div style={{ display: 'flex', flexDirection: 'inherit' }}>
        <TextField
          id='outlined-select-type'
          label='First Name'
          value={firstName}
          onChange={handleChangeFirstName}
          helperText='Enter First Name'
          variant='outlined'
          size='small'
        ></TextField>
        <TextField
          id='outlined-select-type'
          label='Last Name'
          value={lastName}
          onChange={handleChangeLastName}
          helperText='Enter Last Name'
          variant='outlined'
          size='small'
        ></TextField>
        <TextField
          id='outlined-select-type'
          label='Phone Number'
          value={phoneNumber}
          onChange={handleChangePhoneNumber}
          helperText='Enter phone'
          variant='outlined'
          size='small'
        ></TextField>
      </div>

      <div style={{ display: 'flex', flexDirection: 'inherit' }}>
        <div style={{ width: '90%' }}>
          <TextField
            id='outlined-select-type'
            label='Email'
            fullWidth
            value={email}
            onChange={handleChangeEmail}
            helperText='Enter Email'
            size='small'
            variant='outlined'
            style={{ width: '96%' }}
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <TextField
          id='outlined-select-type'
          select
          label='Gender'
          value={gender}
          onChange={handleChangeGender}
          helperText='Select Memtype'
          size='small'
          variant='outlined'
        >
          {genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div style={{ display: 'flex', flexDirection: 'inherit' }}>
        <TextField
          id='outlined-select-type'
          label='Department'
          value={department}
          onChange={handleChangeDepartment}
          helperText='Enter Department'
          size='small'
          variant='outlined'
        ></TextField>

        <TextField
          id='outlined-select-type'
          select
          label='Type'
          value={type}
          onChange={handleChangeType}
          helperText='Select type'
          size='small'
          variant='outlined'
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id='outlined-select-type'
          disabled={type === 'HR' ? true : false}
          select
          label='Mem Type'
          value={type}
          onChange={handleChangeMemberType}
          helperText='Select Memtype'
          size='small'
          variant='outlined'
        >
          {memtypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div style={{ display: 'flex', flexDirection: 'inherit' }}>
        <TextField
          id='outlined-select-type'
          label='salary'
          value={salary}
          onChange={handleChangeSalary}
          helperText='Enter Base Salary'
          size='small'
          variant='outlined'
        ></TextField>
        <TextField
          id='outlined-select-type'
          label='Office'
          value={office}
          onChange={handleChangeOffice}
          helperText='Enter Office'
          size='small'
          variant='outlined'
        ></TextField>
        <TextField
          id='outlined-select-type'
          value={type === 'HR' ? 'saturday' : daysOff}
          disabled={type === 'HR' ? true : false}
          select
          label='DayOff'
          onChange={handleChangeDaysOff}
          helperText='Select DayOff'
          size='small'
          variant='outlined'
        >
          {daysOffs.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div style={{ float: 'right' }}>
        <Button
          //type="button"
          variant='contained'
          style={{ marginRight: '1vw' }}
          color='primary'
          onClick={handleCreate}
        >
          Create
        </Button>
        <SnackbarAlert
          handleClose={handleCloseAlert}
          severity={showSeverity}
          msg={showAlertMsg}
          showAlert={showAlert}
        />
      </div>
    </form>
  )
}

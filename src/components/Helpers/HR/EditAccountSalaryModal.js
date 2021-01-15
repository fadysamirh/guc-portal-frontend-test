import React, { useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { blue, green } from '@material-ui/core/colors'

import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux'
import { loginAPI } from '../../../globalState/actions/AuthActions'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import Card from '@material-ui/core/Card'

import SnackbarAlert from '../General/SnackbarAlert'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { backendLink, secretOrKey } from '../../../keys_dev'
import axios from 'axios'
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
  root1: {
    alignSelf: 'center',
    width: 'min-content',
    height: 'fit-content',
    maxHeight: '80vh',
    minWidth: 275,
    padding: '2vw',
    paddingTop: '1vw',
    overflowY: 'inherit',
  },
  root2: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formcontrolc: {
    width: '75%',
    margin: '2vw',
  },
  title: {
    fontSize: 20,
  },
}))
const styles = (theme) => ({})

export default function EditLocationModal(props) {
  const classess = useStyles()

  const dispatch = useDispatch()
  const history = useHistory()
  const nameP = props.name
  const typeP = props.type
  const capacityP = props.MaxCapacity
  //form hooks
  //snackback hooks
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')

  const jwt = require('jsonwebtoken')

  const token = useSelector((state) => state.token)
  const account = jwt.verify(token, secretOrKey)
  const academicId = account.academicId

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
  const [academicIdOld, setAcademicIdOld] = React.useState()

  useEffect(() => {
    setAcademicIdOld(props.academicIdOld)

    setFirstName(props.firstName)
    setLastName(props.lastName)
    setEmail(props.email)
    setPhoneNumber(props.phoneNumber)
    setType(props.type)
    setMemberType(props.memberType)
    setDaysOff(props.daysOff)
    setGender(props.gender)
    setSalary(props.salary)
    setOffice(props.office)
    setDepartment(props.department)
  }, [props.name, props.openClose])

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value)
  }
  const handleChangeLastName = (event) => {
    setLastName(event.target.value)
  }

  const handleChangeSalary = (event) => {
    setSalary(event.target.value)
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  const handleEdit = () => {
    axios({
      url: `${backendLink}/account/updateSalary`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      data: {
        Account: { academicId: academicIdOld },
        salary,
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode !== 0) {
        setShowSeverity('error')

        setShowAlert(true)
        setShowAlertMsg(res.data.error)
      }

      if (res.data.statusCode === 0) {
        props.setShowSeverity('fail')

        props.setShowSeverity('success')
        props.setShowAlert(true)
        props.setShowAlertMsg('Updated Successfully')
        props.handleClose()
        //setLocations(res.data.locationFound)
      }
    })
  }

  return (
    <div key={props.name}>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'} //style={{ width: '50vw' }}
        onClose={props.handleClose}
        aria-labelledby='customized-dialog-title'
        open={props.openClose}
      >
        <Typography
          className={classess.title}
          style={{ fontSize: 20, marginBottom: '1vw', textAlign: 'center' }}
          color='textSecondary'
          gutterBottom
        >
          Edit Salary
        </Typography>
        <Card className={classess.root1}>
          <form className={classess.root} noValidate autoComplete='off'>
            <div style={{ display: 'flex', flexDirection: 'inherit' }}>
              <TextField
                id='outlined-select-type'
                disabled
                label='First Name'
                value={firstName}
                onChange={handleChangeFirstName}
                helperText='Enter First Name'
                variant='outlined'
                size='small'
              ></TextField>
              <TextField
                id='outlined-select-type'
                disabled
                label='Last Name'
                value={lastName}
                onChange={handleChangeLastName}
                helperText='Enter Last Name'
                variant='outlined'
                size='small'
              ></TextField>
            </div>

            <div style={{ display: 'flex', flexDirection: 'inherit' }}>
              <TextField
                id='outlined-select-type'
                disabled
                label='Old salary'
                value={props.salary}
                onChange={handleChangeSalary}
                helperText='Enter Base Salary'
                size='small'
                variant='outlined'
              ></TextField>
              <TextField
                id='outlined-select-type'
                label='new salary'
                value={salary}
                onChange={handleChangeSalary}
                helperText='Enter Base Salary'
                size='small'
                variant='outlined'
              ></TextField>
            </div>

            <div style={{ float: 'right' }}>
              <Button
                //type="button"
                variant='contained'
                style={{ margin: '1vw', backgroundColor: green[500] }}
                color='primary'
                onClick={handleEdit}
              >
                Update
              </Button>
              <SnackbarAlert
                handleClose={handleCloseAlert}
                severity={showSeverity}
                msg={showAlertMsg}
                showAlert={showAlert}
              />
            </div>
          </form>
        </Card>
      </Dialog>
    </div>
  )
}

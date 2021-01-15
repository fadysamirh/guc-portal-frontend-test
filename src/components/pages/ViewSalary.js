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
import { loginAPI } from '../../globalState/actions/AuthActions'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import Card from '@material-ui/core/Card'

import SnackbarAlert from '../Helpers/General/SnackbarAlert'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { backendLink, secretOrKey } from '../../keys_dev'
import axios from 'axios'
import { checkTokenExpired } from '../../globalState/actions/AuthActions'

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
    console.log(academicId)

    if (!dispatch(checkTokenExpired(history))) {
      axios({
        url: `${backendLink}/account/calculateSalary`,
        method: 'POST',
        headers: {
          authorization: token,
        },
        data: {
          Account: { academicId },
          Attendance: {},
          academicId,
        },
      }).then((res) => {
        console.log(res)
        if (res.data.statusCode !== 0) {
          setShowAlert(true)
          setShowAlertMsg(res.data.error)
        }

        if (res.data.statusCode === 0) {
          setSalary(res.data.salary)
        }
      })
    }
  }, [])

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

  const handleEdit = () => {
    axios({
      url: `${backendLink}/account/updateProfile`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      data: {
        Account: { academicId: props.academicId },
        academicIdToUpdate: academicIdOld,
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
        props.setShowAlertMsg('Edited Successfully')
        props.handleClose()
        //setLocations(res.data.locationFound)
      }
    })
  }

  return (
    <div key={props.name}>
      <Dialog
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
          Salary{' '}
        </Typography>
        <Card className={classess.root1}>
          <form
            className={classess.root}
            style={{ textAlign: 'center' }}
            noValidate
            autoComplete='off'
          >
            <span style={{ fontWeight: 'bold' }}> This month's Salary: </span>{' '}
            <br />
            {salary} <br />
            <br />
            <span style={{ fontWeight: 'bold' }}> Your Base Salary:</span>{' '}
            <br />
            {props.baseSalary}
            <SnackbarAlert
              handleClose={handleCloseAlert}
              severity={showSeverity}
              msg={showAlertMsg}
              showAlert={showAlert}
            />
          </form>
        </Card>
      </Dialog>
    </div>
  )
}

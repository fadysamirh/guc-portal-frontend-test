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
const currencies = [
  {
    value: 'office',
    label: 'Office',
  },
  {
    value: 'lectureHall',
    label: 'Lecture Hall',
  },
  {
    value: 'room',
    label: 'Room',
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
const styles = (theme) => ({
  root1: {
    alignSelf: 'center',
    width: 'max-content',
    height: 'fit-content',
    maxHeight: '70vh',
    minWidth: 275,
    padding: '2vw',
    paddingTop: '1vw',
    overflowY: 'inherit',
  },
  root: {
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
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

export default function EditLocationModal(props) {
  const classess = useStyles()

  const classes = makeStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const nameP = props.name
  const facultyP = props.faculty
  console.log(nameP)
  //form hooks
  //snackback hooks
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')

  const jwt = require('jsonwebtoken')

  const token = useSelector((state) => state.token)
  const account = jwt.verify(token, secretOrKey)
  const academicId = account.academicId

  const [faculty, setFaculty] = React.useState(facultyP)
  const [name, setName] = React.useState(nameP)

  useEffect(() => {
    setFaculty(facultyP)
    setName(nameP)
  }, [props.name, props.openClose])

  const handleChangeName = (event) => {
    setName(event.target.value)
  }
  const handleChangeCapacity = (event) => {
    setFaculty(event.target.value)
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  const handleEdit = () => {
    axios({
      url: `${backendLink}/departments/updateDepartment`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      data: {
        Account: { academicId },
        name: nameP,
        faculty: facultyP,
        department: {
          name: name,
          faculty: faculty,
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
        fullWidth={true}
        maxWidth={'sm'} //style={{ width: '50vw' }}
        onClose={props.handleClose}
        aria-labelledby='customized-dialog-title'
        open={props.openClose}
      >
        <div
          style={{
            margin: '3vw',
            maxWidth: 'max-content',
            alignSelf: 'center',
          }}
        >
          <Typography
            className={classes.title}
            style={{ fontSize: 20, marginBottom: '1vw' }}
            color='textSecondary'
            gutterBottom
          >
            Edit Department
          </Typography>
          <Card className={classes.root1}>
            {' '}
            <form className={classess.root} noValidate autoComplete='off'>
              <div style={{ display: 'flex', flexDirection: 'inherit' }}>
                <TextField
                  id='outlined-select-type'
                  label='New Name'
                  value={name ? name : nameP}
                  onChange={handleChangeName}
                  helperText='Please type New Name'
                  variant='outlined'
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id='outlined-select-type'
                  label='Faculty'
                  value={faculty}
                  onChange={handleChangeCapacity}
                  helperText='Please type new faculty'
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
                  EDIT
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
        </div>
      </Dialog>
    </div>
  )
}

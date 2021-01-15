import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux'
import { backendLink, secretOrKey } from '../../../keys_dev'
import { useHistory } from 'react-router'
import SnackbarAlert from '../General/SnackbarAlert'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { logout } from '../../../globalState/actions/AuthActions'

const styles = (theme) => ({
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

export default function CustomizedDialogs(props) {
  var jwt = require('jsonwebtoken')

  const [open, setOpen] = React.useState(props.openClose)
  const classes = makeStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const delay = (ms) => new Promise((res) => setTimeout(res, ms))
  const token = useSelector((state) => state.token)
  const academicId = token ? jwt.verify(token, secretOrKey).academicId : ''
  //form hooks
  const [state, setState] = React.useState({})
  const [code, setCode] = React.useState(0)

  //snackback hooks
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  const handleLogout = () => {
    dispatch(logout(history))
    const token = null
    history.push(0)
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }
  const handleChangePassword = async (event) => {
    axios({
      method: 'post',
      url: `${backendLink}/account/changePassword`,
      headers: { authorization: token },
      data: {
        Account: { academicId: academicId },
        Credentials: {
          oldPassword: state.oldPassword,
          newPassword: state.newPassword,
        },
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode === 0) {
        setShowAlertMsg('Password changed successfully')
        setShowSeverity('success')
        setShowAlert(true)
        props.handleClose()
      } else {
        setShowAlertMsg(res.data.error)
        setShowSeverity('error')
        setShowAlert(true)
      }
    })
  }
  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  return (
    <div>
      <Dialog
        onClose={props.handleClose}
        aria-labelledby='customized-dialog-title'
        open={props.openClose}
      >
        <DialogTitle
          style={{ width: '45vw', backgroundColor: '#3f51b5', color: 'white' }}
          id='customized-dialog-title'
          onClose={props.handleClose}
        >
          Change Password{' '}
        </DialogTitle>
        <DialogContent dividers>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Form
              style={{
                width: '90%',
                margin: '2vw',
              }}
            >
              <Form.Group>
                <Form.Control
                  className={classes.formControl}
                  name='oldPassword'
                  type='password'
                  onChange={handleChange}
                  required
                  value={
                    state['oldPassword'] !== undefined
                      ? state['oldPassword']
                      : ''
                  }
                  placeholder='old Password'
                ></Form.Control>
              </Form.Group>
              <Form.Group
                style={{
                  marginTop: '2vw',
                }}
              >
                <Form.Control
                  className={classes.formControl}
                  name='newPassword'
                  type='password'
                  onChange={handleChange}
                  required
                  value={
                    state['newPassword'] !== undefined
                      ? state['newPassword']
                      : ''
                  }
                  placeholder='New Password'
                ></Form.Control>
              </Form.Group>
            </Form>{' '}
            <SnackbarAlert
              handleClose={handleCloseAlert}
              severity={showSeverity}
              msg={showAlertMsg}
              showAlert={showAlert}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleChangePassword} color='primary'>
            Change password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

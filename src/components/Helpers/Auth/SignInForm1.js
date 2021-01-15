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
import {
  loginAPI,
  loginFirstAPI,
} from '../../../globalState/actions/AuthActions'
import { useHistory } from 'react-router'
import SnackbarAlert from '../General/SnackbarAlert'

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
  const [open, setOpen] = React.useState(props.openClose)
  const classes = makeStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const delay = (ms) => new Promise((res) => setTimeout(res, ms))

  //form hooks
  const [state, setState] = React.useState({})
  const [code, setCode] = React.useState(0)

  //snackback hooks
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')

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
  const handleSignIn = async (event) => {
    if (code === 105) {
      const x = await dispatch(
        loginFirstAPI(state.email, state.password, state.newPassword, history)
      )
      if (x.code !== 0) {
        if (x.code === 105) {
          setShowAlertMsg('Please change password first')
        }
        if (x.code === 104) {
          setShowAlertMsg('Wrong credentials')
        }
        if (x.code !== 104 && x !== 105) {
          setShowAlertMsg(x.error)
        }

        setShowAlert(true)
        setShowSeverity('error')

        event.preventDefault()
        event.stopPropagation()
      } else {
        setShowAlert(true)
        setShowSeverity('success')
        setShowAlertMsg('Login Successful')
        await delay(8000)
        props.handleClose()
      }
    } else {
      const x = await dispatch(loginAPI(state.email, state.password, history))
      if (x !== 0) {
        if (x === 105) {
          setCode(x)
          setShowAlertMsg('Please change password first')
        } else {
          setShowAlertMsg('Wrong credentials')
        }
        setCode(x)

        setShowAlert(true)
        setShowSeverity('error')

        event.preventDefault()
        event.stopPropagation()
      } else {
        setCode(x)

        setShowAlert(true)
        setShowSeverity('success')
        setShowAlertMsg('Login Successful')
        await delay(2000)

        props.handleClose()
      }
    }
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
          style={{ backgroundColor: '#3f51b5', color: 'white' }}
          id='customized-dialog-title'
          onClose={props.handleClose}
        >
          Login{' '}
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
                  name='email'
                  disabled={code === 105 ? true : false}
                  onChange={handleChange}
                  required
                  value={state['email'] !== undefined ? state['email'] : ''}
                  placeholder='E-Mail'
                ></Form.Control>
              </Form.Group>
              <Form.Group
                style={{
                  marginTop: '2vw',
                }}
              >
                <Form.Control
                  className={classes.formControl}
                  name='password'
                  type='password'
                  onChange={handleChange}
                  required
                  disabled={code === 105 ? true : false}
                  value={
                    state['password'] !== undefined ? state['password'] : ''
                  }
                  placeholder='Password'
                ></Form.Control>
              </Form.Group>
              {code === 105 ? (
                <Form.Group
                  style={{
                    marginTop: '2vw',
                  }}
                >
                  <Form.Control
                    className={classes.formControl}
                    name='newPassword'
                    type='Password'
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
              ) : (
                ''
              )}
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
          <Button autoFocus onClick={handleSignIn} color='primary'>
            SIGN IN
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

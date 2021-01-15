import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux'
import { loginAPI } from '../../../globalState/actions/AuthActions'
import { useHistory } from 'react-router'
import SnackbarAlert from '../General/SnackbarAlert'

const useStyles = makeStyles({ formControl: {}, SignInButton: {} })

export default function SignInForm(props) {
  const classes = makeStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  //form hooks
  const [state, setState] = React.useState({})
  //snackback hooks
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')

  //handlers
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
    const x = await dispatch(loginAPI(state.email, state.password, history))
    if (x !== 0) {
      setShowAlert(true)
      setShowAlertMsg('Wrong credentials')
      event.preventDefault()
      event.stopPropagation()
    }
  }
  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  //view
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='email'
            onChange={handleChange}
            required
            value={state['email'] !== undefined ? state['email'] : ''}
            placeholder='E-Mail'
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            className={classes.formControl}
            name='password'
            type='password'
            onChange={handleChange}
            required
            value={state['password'] !== undefined ? state['password'] : ''}
            placeholder='Password'
          ></Form.Control>
        </Form.Group>
      </Form>{' '}
      <button className={classes.SignInButton} onClick={handleSignIn}>
        {' '}
        SIGN IN
      </button>
      <SnackbarAlert
        handleClose={handleCloseAlert}
        severity={showSeverity}
        msg={showAlertMsg}
        showAlert={showAlert}
      />
    </div>
  )
}

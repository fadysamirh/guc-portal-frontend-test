import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux'
import { loginAPI } from '../../../globalState/actions/AuthActions'
import { useHistory } from 'react-router'
import SnackbarAlert from '../General/SnackbarAlert'
import axios from 'axios'
import { Row } from 'react-bootstrap'
import { backendLink } from '../../../keys_dev'

const useStyles = makeStyles({
  formControl: {},
  SignInButton: {},
  shortFormControl: {},
  longFormControl: {},
})

export default function SignUpForm(props) {
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
  const handleSignUp = async (event) => {
    await axios({
      method: 'post',
      url: `${backendLink}/account/createAccount`,
      data: {
        Account: state,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 0) {
        const x = await dispatch(loginAPI(state.email, state.password, history))
      } else {
        setShowAlert(true)
        setShowAlertMsg(res.data.error)
      }
    })

    event.preventDefault()
    event.stopPropagation()
  }
  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  //view
  return (
    <div>
      <Form>
        <Row>
          {' '}
          <Form.Group>
            <Form.Control
              className={classes.shortFormControl}
              name='firstName'
              onChange={handleChange}
              required
              value={state['firstName'] !== undefined ? state['firstName'] : ''}
              placeholder='First Name'
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className={classes.shortFormControl}
              name='lastName'
              onChange={handleChange}
              required
              value={state['lastName'] !== undefined ? state['lastName'] : ''}
              placeholder='Last Name'
            />
          </Form.Group>
        </Row>

        <Form.Group>
          <Form.Control
            className={classes.longFormControl}
            name='email'
            onChange={handleChange}
            required
            value={state['email'] !== undefined ? state['email'] : ''}
            placeholder='E-Mail'
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            className={classes.longFormControl}
            name='phoneNumber'
            onChange={handleChange}
            required
            value={
              state['phoneNumber'] !== undefined ? state['phoneNumber'] : ''
            }
            placeholder='Phone Number'
          />
        </Form.Group>
        <Row>
          {' '}
          <Form.Group>
            <Form.Control
              className={classes.shortFormControl}
              name='type'
              onChange={handleChange}
              required
              value={state['type'] !== undefined ? state['type'] : ''}
              placeholder='Type'
            />
          </Form.Group>{' '}
          <Form.Group>
            <Form.Control
              className={classes.shortFormControl}
              name='memberType'
              onChange={handleChange}
              required
              value={
                state['memberType'] !== undefined ? state['memberType'] : ''
              }
              placeholder='Member Type'
            />
          </Form.Group>
        </Row>
        <Row>
          {' '}
          <Form.Group>
            <Form.Control
              className={classes.shortFormControl}
              name='daysOff'
              onChange={handleChange}
              required
              value={state['daysOff'] !== undefined ? state['daysOff'] : ''}
              placeholder='Day Off'
            />
          </Form.Group>{' '}
          <Form.Group>
            <Form.Control
              className={classes.shortFormControl}
              name='gender'
              onChange={handleChange}
              required
              value={state['gender'] !== undefined ? state['gender'] : ''}
              placeholder='Gender'
            />
          </Form.Group>
        </Row>
        <Row>
          {' '}
          <Form.Group>
            <Form.Control
              className={classes.shortFormControl}
              name='salary'
              onChange={handleChange}
              required
              value={state['salary'] !== undefined ? state['salary'] : ''}
              placeholder='Salary'
            />
          </Form.Group>{' '}
          <Form.Group>
            <Form.Control
              className={classes.shortFormControl}
              name='office'
              onChange={handleChange}
              required
              value={state['office'] !== undefined ? state['office'] : ''}
              placeholder='Office'
            />
          </Form.Group>
        </Row>
        <Form.Group>
          <Form.Control
            className={classes.longFormControl}
            name='department'
            onChange={handleChange}
            required
            value={state['department'] !== undefined ? state['department'] : ''}
            placeholder='Department'
          />
        </Form.Group>
      </Form>{' '}
      <button className={classes.SignInButton} onClick={handleSignUp}>
        {' '}
        Register
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

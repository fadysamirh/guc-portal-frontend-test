import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { useHistory } from 'react-router'
import { isMobile } from 'mobile-device-detect'

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

export default function SnackbarAlert(props) {
  const history = useHistory()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    props.handleClose()
  }

  return (
    <div>
      {props.action !== '' ||
      props.action !== undefined ||
      props.action !== null ? (
        <Snackbar
          open={props.showAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={props.severity}>
            <div
              style={{
                fontSize: isMobile ? '5vw' : '1vw',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {' '}
              <div>{props.msg}&nbsp;</div>
              <div
                onClick={() => history.push(props.href)}
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                {' '}
                {props.action}
              </div>
            </div>
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={props.showAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={props.severity}>
            <div style={{ fontSize: isMobile ? '5vw' : '1vw' }}>
              {' '}
              {props.msg}{' '}
            </div>
          </Alert>
        </Snackbar>
      )}
    </div>
  )
}

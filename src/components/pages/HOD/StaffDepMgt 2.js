import React from 'react'
import DayoffMgt from '../HOD/DayoffMgt'
import Leaves from './Leaves'
import ViewDaysOff from './ViewDaysOff'
import ViewStaff from '../../Helpers/HOD/ViewStaff1'
import SnackbarAlert from '../../Helpers/General/SnackbarAlert'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    width: '45vw',
    height: 'fit-content',
    maxHeight: '71.5vh',
    minWidth: 275,
    padding: '2vw',
    paddingTop: '1vw',
    overflowY: 'inherit',
  },
  root1: {
    width: '92vw',
    height: '90vh',
    maxHeight: '71.5vh',
    minWidth: 275,
    padding: '2vw',
    paddingTop: '0.5vw',
    paddingBottom: '0.5vw',

    overflowY: 'inherit',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
})

export default function StaffDepMgt() {
  const classes = useStyles()

  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  const [courseId, setCourseId] = React.useState('')
  const handleChangeCourseId = (event) => {
    setCourseId(event.target.value)
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  return (
    <div>
      <div style={{ marginBottom: '2vw' }}>
        <DayoffMgt />
      </div>
      <div style={{ marginBottom: '2vw' }}>
        <Leaves />
      </div>

      <div
        style={{
          Width: '80vw',
          marginBottom: '2vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {' '}
        <Card className={classes.root1}>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            View Staff Department{' '}
          </Typography>
          <TextField
            id='outlined-select-type'
            label='Course Id'
            value={courseId}
            onChange={handleChangeCourseId}
            helperText='Type courseId'
            variant='outlined'
          ></TextField>
          <ViewStaff courseId={courseId} />
        </Card>
      </div>
      <div style={{ marginBottom: '2vw' }}>
        <ViewDaysOff
          setShowAlert={setShowAlert}
          setShowAlertMsg={setShowAlertMsg}
          setShowSeverity={setShowSeverity}
        />
      </div>

      <SnackbarAlert
        handleClose={handleCloseAlert}
        severity={showSeverity}
        msg={showAlertMsg}
        showAlert={showAlert}
      />
    </div>
  )
}

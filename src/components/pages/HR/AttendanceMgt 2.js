import React, { useEffect } from 'react'
import { isMobile } from 'mobile-device-detect'

import ViewAttendance from '../../Helpers/HR/ViewAttendance'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import Typography from '@material-ui/core/Typography'
import ManualAttendance from '../../Helpers/HR/ManualAttendance'
import ViewMissing from '../../Helpers/HR/ViewMissing'

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
    width: '45vw',
    height: 'fit-content',
    maxHeight: '70vh',
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

export default function AttendanceMgt() {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }
  return (
    <div
      style={{
        display: isMobile ? '' : 'flex',
        width: 'max-content',
        maxWidth: '93vw',
      }}
    >
      <div style={{ marginRight: '3vw', maxWidth: '45vw' }}>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          View employee attendance records
        </Typography>
        <Card className={classes.root}>
          <ViewAttendance />
        </Card>

        <Typography
          style={{ marginTop: '2.5vw' }}
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Add attendance Manually
        </Typography>
        <Card className={classes.root1}>
          {' '}
          <ManualAttendance />{' '}
        </Card>
      </div>

      <div style={{ maxWidth: '45vw' }}>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          View all staff members with missing days/hours
        </Typography>
        <Card className={classes.root}>
          <ViewMissing type={state.checkedB ? 'days' : 'hours'} />
        </Card>{' '}
      </div>
    </div>
  )
}

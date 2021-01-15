import React, { useEffect } from 'react'
import ViewAllLoc from '../../Helpers/HR/ViewAllLoc'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CreateLocation from '../../Helpers/HR/CreateLocation'
import AssignLocation from '../../Helpers/HR/AssignLocation'
import { isMobile } from 'mobile-device-detect'

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

export default function LocationMgt() {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

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
          Create Location
        </Typography>
        <Card className={classes.root1}>
          <CreateLocation />
        </Card>{' '}
        <Typography
          style={{ marginTop: '1vw' }}
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Assign Office
        </Typography>
        <Card className={classes.root1}>
          <AssignLocation />
        </Card>
      </div>

      <div style={{ maxWidth: '45vw' }}>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          All Locations
        </Typography>
        <Card className={classes.root}>
          <ViewAllLoc />
        </Card>
      </div>
    </div>
  )
}

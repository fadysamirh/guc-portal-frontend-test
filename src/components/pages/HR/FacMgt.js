import React, { useEffect } from 'react'
import ViewAllFac from '../../Helpers/HR/ViewAllFac'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CreateFac from '../../Helpers/HR/CreateFac'
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

export default function FacMgt() {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>
  const [refresh, setRefresh] = React.useState(false)
  const [refresh1, setRefresh1] = React.useState(false)

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
          Create Faculties
        </Typography>
        <Card className={classes.root1}>
          <CreateFac />
        </Card>{' '}
      </div>

      <div style={{ maxWidth: '45vw' }}>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          All Faculties
        </Typography>
        <Card className={classes.root}>
          <ViewAllFac />
        </Card>
      </div>
    </div>
  )
}

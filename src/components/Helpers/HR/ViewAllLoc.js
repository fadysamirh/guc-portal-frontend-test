import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import { blue, green } from '@material-ui/core/colors'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import axios from 'axios'
import SnackbarAlert from '../General/SnackbarAlert'
import EditLocationModal from './EditLocationModal'

import { backendLink, secretOrKey } from '../../../keys_dev'

import { checkTokenExpired } from '../../../globalState/actions/AuthActions'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1vw',
    minWidth: 275,
    width: '40vw',
    maxWidth: '40vw',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  avatar1: {
    margin: '0.2vw',
    fontSize: '0.7rem',
    backgroundColor: '#303f9f',
  },
}))

export default function ViewAllLoc() {
  const jwt = require('jsonwebtoken')

  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector((state) => state.token)
  const account = jwt.verify(token, secretOrKey)
  const academicId = account.academicId
  console.log(account)
  const classes = useStyles()
  const [showAlert, setShowAlert] = React.useState(false)
  const [card, setCard] = React.useState({})

  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  const [expanded, setExpanded] = React.useState(false)
  const [locations, setLocations] = React.useState([])
  const [openMod, setOpenMod] = React.useState(false)

  const [eName, setEName] = React.useState('')
  const [eMaxCap, setEMaxCap] = React.useState('')
  const [eType, setEType] = React.useState('')

  const handleClickOpen = () => {
    setOpenMod(true)
  }

  const handleCloseModal = () => {
    setOpenMod(false)
    setCard([])
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  const handleClick = (index) => {
    setCard({ [index]: true })
  }

  const handleDelete = (name) => {
    axios({
      url: `${backendLink}/locations/deleteLocation`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      data: {
        Account: { academicId },
        name,
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode !== 0) {
        setShowSeverity('success')

        setShowSeverity('error')

        setShowAlert(true)
        setShowAlertMsg(res.data.error)
      }

      if (res.data.statusCode === 0) {
        setShowSeverity('error')

        setShowSeverity('success')
        setShowAlert(true)
        setShowAlertMsg('Deleted Successfully')
        //setLocations(res.data.locationFound)
      }
    })
  }
  const handleEdit = (name, Maxcapacity, type) => {
    setEMaxCap(Maxcapacity)
    setEName(name)
    setEType(type)
    console.log(eName, eMaxCap, eType)
  }

  const handleExpandClick = (index) => {
    card[index] = !card[index]
    setCard(card)
    setExpanded(!expanded)
  }
  useEffect(() => {
    if (!dispatch(checkTokenExpired(history))) {
      axios({
        url: `${backendLink}/locations/viewLocations`,
        method: 'POST',
        headers: {
          authorization: token,
        },
        data: {
          Account: { academicId },
        },
      }).then((res) => {
        console.log(res)
        if (res.data.statusCode !== 0) {
          setShowAlert(true)
          setShowAlertMsg(res.data.error)
        }

        if (res.data.statusCode === 0) {
          setLocations(res.data.locationFound)
        }
      })
    }
  }, [showSeverity, eName])
  return (
    <div>
      <EditLocationModal
        setShowAlert={setShowAlert}
        setShowAlertMsg={setShowAlertMsg}
        setShowSeverity={setShowSeverity}
        openClose={openMod}
        handleClickOpen={handleClickOpen}
        handleClose={handleCloseModal}
        name={eName}
        type={eType}
        MaxCapacity={eMaxCap}
      />
      {locations.map((location, index) => {
        return (
          <Card className={classes.root}>
            <CardActions disableSpacing>
              <CardHeader
                avatar={
                  <Avatar aria-label='recipe' className={classes.avatar}>
                    {location.type.toString() === ' lectureHall'
                      ? 'L'
                      : location.type.toString() === 'office'
                      ? 'O'
                      : 'R'}
                  </Avatar>
                }
                title={location.name.toUpperCase()}
                subheader={location.type}
              />

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: card[index],
                })}
                onClick={() => {
                  handleExpandClick(index)
                  handleEdit(location.name, location.MaxCapacity, location.type)
                }}
                aria-expanded={card[index]}
                aria-label='show more'
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={card[index]} timeout='auto' unmountOnExit>
              <CardContent>
                <Typography
                  paragraph
                  style={{
                    marginBottom: '0.2vw',
                    fontSize: '0.875rem',
                  }}
                >
                  <span style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                    Max Capacity:
                  </span>{' '}
                  {location.MaxCapacity}
                </Typography>
                <Typography
                  paragraph
                  style={{
                    marginBottom: '0.2vw',
                    fontSize: '0.875rem',
                  }}
                >
                  {' '}
                  <span style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                    Current Capacity:
                  </span>{' '}
                  {location.capacity}
                </Typography>
                <Typography
                  paragraph
                  style={{
                    marginBottom: '0.2vw',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                  }}
                >
                  Assigned members:
                </Typography>
                <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                  {location.list.map((mem) => {
                    return (
                      <Avatar aria-label='recipe' className={classes.avatar1}>
                        {mem}
                      </Avatar>
                    )
                  })}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Fab
                    color='inherit'
                    size='small'
                    aria-label='add'
                    style={{
                      marginRight: '1vw',
                      marginTop: '1vw',
                      backgroundColor: green[500],
                    }}
                    onClick={() => {
                      handleClickOpen()
                    }}
                  >
                    <EditIcon />
                  </Fab>
                  <Fab
                    color='secondary'
                    size='small'
                    aria-label='edit'
                    style={{ marginRight: '0vw', marginTop: '1vw' }}
                    onClick={() => {
                      handleDelete(location.name)
                    }}
                  >
                    <DeleteIcon />
                  </Fab>
                </div>
              </CardContent>
            </Collapse>
            <SnackbarAlert
              handleClose={handleCloseAlert}
              severity={showSeverity}
              msg={showAlertMsg}
              showAlert={showAlert}
            />
          </Card>
        )
      })}
    </div>
  )
}

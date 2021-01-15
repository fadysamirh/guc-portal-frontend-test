import React, { useEffect } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
//import 'date-fns'
import moment from 'moment'

import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

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
import Moment from 'react-moment'
import CheckIcon from '@material-ui/icons/Check'
import ToggleButton from '@material-ui/lab/ToggleButton'
import DateRangeIcon from '@material-ui/icons/DateRange'

import TextField from '@material-ui/core/TextField'

import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import axios from 'axios'
import SnackbarAlert from '../General/SnackbarAlert'
//import EditLocationModal from './EditLocationModal'

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

export default function ViewAttendance() {
  const jwt = require('jsonwebtoken')

  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector((state) => state.token)
  const account = jwt.verify(token, secretOrKey)
  const academicId = account.academicId
  const classes = useStyles()
  const [showAlert, setShowAlert] = React.useState(false)
  const [card, setCard] = React.useState({})
  const [selectedDate, setSelectedDate] = React.useState(new Date())

  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  const [expanded, setExpanded] = React.useState(false)
  const [attendance, setAttendance] = React.useState([])
  const [openMod, setOpenMod] = React.useState(false)
  const [academicIdC, setAcademicIdC] = React.useState('')

  const [expand, setExpand] = React.useState(false)
  const [eMaxCap, setEMaxCap] = React.useState('')
  const [eType, setEType] = React.useState('')

  const handleChangeAcademicId = (event) => {
    setExpand(false)
    setAcademicIdC(event.target.value)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleAc = () => {
    if (!expand) {
      if (showSeverity === 'error') {
        setShowAlertMsg('please select a valid employee first')
        setShowAlert(true)
      } else {
        setExpand(!expand)
      }
    } else {
      setExpand(!expand)
    }
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

  const handleExpandClick = (index) => {
    card[index] = !card[index]
    setCard(card)
    setExpanded(!expanded)
  }
  useEffect(() => {
    if (academicIdC !== '') {
      if (!dispatch(checkTokenExpired(history))) {
        expand
          ? axios({
              url: `${backendLink}/attendance/viewStaffAttendanceRecord`,
              method: 'POST',
              headers: {
                authorization: token,
              },
              data: {
                Account: { academicId },
                Attendance: {
                  academicId: academicIdC.toLocaleLowerCase(),
                  month: (moment(selectedDate).month() + 1).toString(),
                  year: moment(selectedDate).year().toString(),
                },
              },
            }).then((res) => {
              console.log(res)
              if (res.data.statusCode !== 0) {
                setShowSeverity('error')

                setShowAlertMsg(res.data.message)
                setAttendance([])
                setShowAlert(true)
              }

              if (res.data.statusCode === 0) {
                setShowSeverity('success')
                setShowAlertMsg('FOUND!')
                if (res.data.Attendance.length === 0) {
                  setShowSeverity('success')

                  setShowAlertMsg('No attendance found for this month')
                }
                setShowAlert(true)
                setAttendance(res.data.Attendance)
              }
            })
          : axios({
              url: `${backendLink}/attendance/viewAllStaffAttendanceRecord`,
              method: 'POST',
              headers: {
                authorization: token,
              },
              data: {
                Account: { academicId },
                Attendance: { academicId: academicIdC.toLocaleLowerCase() },
              },
            }).then((res) => {
              console.log(res)
              if (res.data.statusCode !== 0) {
                setShowSeverity('error')

                setShowAlertMsg(res.data.error)
                setAttendance([])
                setShowAlert(true)
              }

              if (res.data.statusCode === 0) {
                setShowSeverity('success')
                setShowAlertMsg('FOUND!')

                setShowAlert(true)
                setAttendance(res.data.Attendance)
              }
            })
      }
    }
  }, [academicIdC, expand, selectedDate])
  return (
    <div>
      <Accordion expanded={expand} style={{ marginRight: '1vw' }}>
        <AccordionSummary
          expandIcon={
            <DateRangeIcon
              onClick={() => {
                handleAc()
              }}
            />
          }
          aria-controls='panel1a-content'
          id='panel1a-header'
          style={{ placeContent: 'center', textAlign: 'center' }}
        >
          <Typography
            style={{
              placeContent: 'center',
              textAlign: 'center',
              width: '100%',
              marginLeft: '5%',
            }}
          >
            <TextField
              size='small'
              id='outlined-select-type'
              label='Academic Id'
              value={academicIdC}
              onChange={handleChangeAcademicId}
              helperText='Please type academic Id of member'
              variant='outlined'
            ></TextField>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify='space-around'>
              <DatePicker
                variant='inline'
                openTo='year'
                views={['year', 'month']}
                label='Year and Month'
                helperText='Start from year selection'
                value={selectedDate}
                onChange={handleDateChange}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </AccordionDetails>
      </Accordion>
      {attendance.map((att, index) => {
        return (
          <Card className={classes.root}>
            <CardActions disableSpacing>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label='recipe'
                    className={classes.avatar}
                    style={{
                      backgroundColor: att.signOutTime === -1 ? green[500] : '',
                    }}
                  >
                    {index}
                  </Avatar>
                }
                title={<Moment format='DD/MM/YYYY'>{att.signInTime}</Moment>}
                subheader={att.academicId.toUpperCase()}
              />

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: card[index],
                })}
                onClick={() => {
                  handleExpandClick(index)
                  //handleEdit(location.name, location.MaxCapacity, location.type)
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
                    SignIn:
                  </span>{' '}
                  <Moment>{att.signInTime}</Moment>
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
                    SignOut:
                  </span>{' '}
                  <Moment>{att.signOutTime}</Moment>
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        )
      })}{' '}
      <SnackbarAlert
        handleClose={handleCloseAlert}
        severity={showSeverity}
        msg={showAlertMsg}
        showAlert={showAlert}
      />
    </div>
  )
}

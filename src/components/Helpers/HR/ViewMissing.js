import React, { useEffect } from 'react'
import Picker from 'react-month-picker'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import 'date-fns'
import moment from 'moment'
import GetAppIcon from '@material-ui/icons/GetApp'
import Switch from '@material-ui/core/Switch'

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
import { SettingsEthernet } from '@material-ui/icons'

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

export default function ViewMissing(props) {
  const jwt = require('jsonwebtoken')
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  })
  const handleChange = (event) => {
    setAccounts([])
    setState({ ...state, [event.target.name]: event.target.checked })
  }
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
  const [accounts, setAccounts] = React.useState([])
  const [openMod, setOpenMod] = React.useState(false)
  const [academicIdC, setAcademicIdC] = React.useState('')

  const [expand, setExpand] = React.useState(false)
  const [eMaxCap, setEMaxCap] = React.useState('')
  const [get, setGet] = React.useState(false)

  const handleChangeAcademicId = (event) => {
    setExpand(false)
    setAccounts([])
    setAcademicIdC(event.target.value)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleAc = () => {
    setExpand(!expand)
  }

  const handleCloseModal = () => {
    setOpenMod(false)
    setCard([])
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  const handleClick = (index) => {
    setGet(!get)
  }

  const handleExpandClick = (index) => {
    card[index] = !card[index]
    setCard(card)
    setExpanded(!expanded)
  }
  useEffect(() => {
    if (!dispatch(checkTokenExpired(history))) {
      setCard([])
      state.checkedB
        ? axios({
            url: `${backendLink}/attendance/viewStaffWithMissingDays`,
            method: 'POST',
            headers: {
              authorization: token,
            },
            data: {
              Account: { academicId },
              Attendance: {
                month: (moment(selectedDate).month() + 1).toString(),
                year: moment(selectedDate).year().toString(),
              },
            },
          }).then((res) => {
            console.log(res)
            if (res.data.statusCode !== 0) {
              setShowSeverity('error')

              setShowAlertMsg(res.data.message)
              setAccounts([])
              setShowAlert(true)
            }

            if (res.data.statusCode === 0) {
              setShowSeverity('success')
              setShowAlertMsg('Staff with missing days!')
              if (res.data.listOfStaff.length === 0) {
                setShowSeverity('success')

                setShowAlertMsg('No attendance found for this month')
              }
              setShowAlert(true)
              setAccounts(res.data.listOfStaff)
            }
          })
        : axios({
            url: `${backendLink}/attendance/viewStaffWithMissingHours`,
            method: 'POST',
            headers: {
              authorization: token,
            },
            data: {
              Account: { academicId },
              Attendance: {
                month: (moment(selectedDate).month() + 1).toString(),
                year: moment(selectedDate).year().toString(),
              },
            },
          }).then((res) => {
            console.log(res)
            if (res.data.statusCode !== 0) {
              setShowSeverity('error')

              setShowAlertMsg(res.data.error)
              setAccounts([])
              setShowAlert(true)
            }

            if (res.data.statusCode === 0) {
              setShowSeverity('success')
              setShowAlertMsg('Staff with missing Hours!')

              setShowAlert(true)
              setAccounts(res.data.listOfStaff)
            }
          })
    }
  }, [academicIdC, expand, selectedDate, state])
  return (
    <div>
      <Card className={classes.root} style={{ margin: '1vw' }}>
        <Typography
          component='div'
          style={{ justifyContent: 'center', padding: '1vw' }}
        >
          <Grid
            component='label'
            style={{ justifyContent: 'center' }}
            container
            alignItems='center'
            spacing={1}
          >
            <Grid item>Missing Hours</Grid>
            <Grid item>
              <Switch
                checked={state.checkedB}
                onChange={handleChange}
                name='checkedB'
                color='primary'
              />{' '}
            </Grid>
            <Grid item>Missing Days</Grid>
          </Grid>
        </Typography>
      </Card>
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
      {accounts.map((acc, index) => {
        return (
          <Card className={classes.root}>
            <CardActions disableSpacing>
              <CardHeader
                avatar={
                  <Avatar aria-label='recipe' className={classes.avatar}>
                    {acc.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                }
                title={
                  acc.firstName.toUpperCase() + ' ' + acc.lastName.toUpperCase()
                }
                subheader={acc.academicId}
              />

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: card[index],
                })}
                onClick={() => {
                  handleExpandClick(index)
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
                    Type:
                  </span>{' '}
                  {acc.type}
                </Typography>
                {acc.type === 'HR' ? (
                  ' '
                ) : (
                  <Typography
                    paragraph
                    style={{
                      marginBottom: '0.2vw',
                      fontSize: '0.875rem',
                    }}
                  >
                    {' '}
                    <span style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                      Member type:
                    </span>{' '}
                    {acc.memberType}
                  </Typography>
                )}
                <Typography
                  paragraph
                  style={{
                    marginBottom: '0.2vw',
                    fontSize: '0.875rem',
                  }}
                >
                  <span style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                    Email:
                  </span>{' '}
                  {acc.email}
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
                    Phone Number:
                  </span>{' '}
                  {acc.phoneNumber}
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
                    Department:
                  </span>{' '}
                  {acc.department}
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
                    Salary:
                  </span>{' '}
                  {acc.salary}
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
                    Office:
                  </span>{' '}
                  {acc.office}
                </Typography>
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

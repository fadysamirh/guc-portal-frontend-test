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
import { blue, green, yellow } from '@material-ui/core/colors'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import LocalAtmIcon from '@material-ui/icons/LocalAtm'

import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import axios from 'axios'
import SnackbarAlert from '../General/SnackbarAlert'
import EditAccountModal from './EditAccountModal'
import EditAccountSalaryModal from './EditAccountSalaryModal'

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
    fontSize: '0.875rem',
    backgroundColor: '#303f9f',
  },
}))

export default function ViewAllLoc() {
  const jwt = require('jsonwebtoken')

  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector((state) => state.token)
  const Account = jwt.verify(token, secretOrKey)
  const academicId = Account.academicId
  const classes = useStyles()
  const [showAlert, setShowAlert] = React.useState(false)
  const [card, setCard] = React.useState({})

  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  const [expanded, setExpanded] = React.useState(false)
  const [accounts, setAccounts] = React.useState([])
  const [openMod, setOpenMod] = React.useState(false)
  const [openMod1, setOpenMod1] = React.useState(false)

  const [firstName, setFirstName] = React.useState()
  const [lastName, setLastName] = React.useState()
  const [email, setEmail] = React.useState()

  const [phoneNumber, setPhoneNumber] = React.useState()
  const [type, setType] = React.useState()
  const [memberType, setMemberType] = React.useState()

  const [daysOff, setDaysOff] = React.useState()
  const [gender, setGender] = React.useState()
  const [salary, setSalary] = React.useState()

  const [office, setOffice] = React.useState()
  const [department, setDepartment] = React.useState()
  const [academicIdOld, setAcademicIdOld] = React.useState()

  const handleClickOpen = () => {
    setOpenMod(true)
  }
  const handleClickOpen1 = () => {
    setOpenMod1(true)
  }

  const handleCloseModal = () => {
    setOpenMod(false)
    setCard([])
  }

  const handleCloseModal1 = () => {
    setOpenMod1(false)
    setCard([])
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  const handleClick = (index) => {
    setCard({ [index]: true })
  }

  const handleDelete = (academicID) => {
    axios({
      url: `${backendLink}/account/deleteProfile`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      data: {
        Account: { academicId: academicID },
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
        setCard([])
        //setLocations(res.data.locationFound)
      }
    })
  }
  const handleEdit = (
    academicIdOld,
    firstName,
    lastName,
    email,
    phoneNumber,
    type,
    memberType,
    daysOff,
    gender,
    salary,
    office,
    department
  ) => {
    setAcademicIdOld(academicIdOld)
    setFirstName(firstName)
    setLastName(lastName)
    setEmail(email)
    setPhoneNumber(phoneNumber)
    setType(type)
    setMemberType(memberType)
    setDaysOff(daysOff)
    setGender(gender)
    setSalary(salary)
    setOffice(office)
    setDepartment(department)
  }

  const handleExpandClick = (index) => {
    card[index] = !card[index]
    setCard(card)
    setExpanded(!expanded)
  }
  useEffect(() => {
    if (!dispatch(checkTokenExpired(history))) {
      axios({
        url: `${backendLink}/account/viewAllAccounts`,
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
          setAccounts(res.data.accounts)
        }
      })
    }
  }, [showSeverity, firstName])
  return (
    <div>
      <EditAccountModal
        setShowAlert={setShowAlert}
        setShowAlertMsg={setShowAlertMsg}
        setShowSeverity={setShowSeverity}
        openClose={openMod}
        handleClickOpen={handleClickOpen}
        handleClose={handleCloseModal}
        academicIdOld={academicIdOld}
        firstName={firstName}
        lastName={lastName}
        email={email}
        phoneNumber={phoneNumber}
        type={type}
        memberType={memberType}
        daysOff={daysOff}
        gender={gender}
        salary={salary}
        office={office}
        department={department}
      />
      <EditAccountSalaryModal
        setShowAlert={setShowAlert}
        setShowAlertMsg={setShowAlertMsg}
        setShowSeverity={setShowSeverity}
        openClose={openMod1}
        handleClickOpen={handleClickOpen1}
        handleClose={handleCloseModal1}
        academicIdOld={academicIdOld}
        salary={salary}
        firstName={firstName}
        lastName={lastName}
      />
      {accounts.map((account, index) => {
        return (
          <Card className={classes.root}>
            <CardActions disableSpacing>
              <CardHeader
                avatar={
                  <Avatar aria-label='recipe' className={classes.avatar}>
                    {account.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                }
                title={
                  account.firstName.toUpperCase() +
                  ' ' +
                  account.lastName.toUpperCase()
                }
                subheader={account.academicId}
              />

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: card[index],
                })}
                onClick={() => {
                  handleExpandClick(index)
                  handleEdit(
                    account.academicId,
                    account.firstName,
                    account.lastName,
                    account.email,
                    account.phoneNumber,
                    account.type,
                    account.memberType,
                    account.daysOff,
                    account.gender,
                    account.salary,
                    account.office,
                    account.department
                  )
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
                  {account.type}
                </Typography>
                {account.type === 'HR' ? (
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
                    {account.memberType}
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
                  {account.email}
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
                  {account.phoneNumber}
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
                  {account.department}
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
                  {account.salary}
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
                  {account.office}
                </Typography>

                <div style={{ textAlign: 'right' }}>
                  <Fab
                    color='inherit'
                    size='small'
                    aria-label='add'
                    style={{
                      marginRight: '1vw',
                      marginTop: '1vw',
                      backgroundColor: yellow[500],
                    }}
                    onClick={() => {
                      handleClickOpen1()
                    }}
                  >
                    <LocalAtmIcon />
                  </Fab>
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
                      handleDelete(account.academicId)
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

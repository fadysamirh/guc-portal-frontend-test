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
import EditDepModal from './EditDepModal'

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
  const account = jwt.verify(token, secretOrKey)
  const academicId = account.academicId
  const classes = useStyles()
  const [showAlert, setShowAlert] = React.useState(false)
  const [card, setCard] = React.useState({})

  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  const [expanded, setExpanded] = React.useState(false)
  const [departments, setDepartments] = React.useState([])
  const [openMod, setOpenMod] = React.useState(false)

  const [eName, setEName] = React.useState('')
  const [eFaculty, setEFaculty] = React.useState('')

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

  const handleDelete = (name, faculty) => {
    console.log('FFFFFFFFFFFFFFFF', faculty)
    axios({
      url: `${backendLink}/departments/deleteDepartment`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      data: {
        Account: { academicId },
        name,
        faculty,
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
  const handleEdit = (name, faculty) => {
    setEName(name)
    setEFaculty(faculty)
  }

  const handleExpandClick = (index) => {
    card[index] = !card[index]
    setCard(card)
    setExpanded(!expanded)
  }
  useEffect(() => {
    if (!dispatch(checkTokenExpired(history))) {
      console.log('res')

      axios({
        url: `${backendLink}/departments/viewAllDep`,
        method: 'POST',
        headers: {
          authorization: token,
        },
        data: {
          Account: { academicId },
        },
      }).then((res) => {
        console.log('AAAAAAAA', res)
        if (res.data.statusCode !== 0) {
          setShowAlert(true)
          setShowAlertMsg(res.data.error)
        }

        if (res.data.statusCode === 0) {
          setDepartments(res.data.departments)
        }
      })
    }
  }, [showSeverity, eName])
  return (
    <div>
      <EditDepModal
        setShowAlert={setShowAlert}
        setShowAlertMsg={setShowAlertMsg}
        setShowSeverity={setShowSeverity}
        openClose={openMod}
        handleClickOpen={handleClickOpen}
        handleClose={handleCloseModal}
        name={eName}
        faculty={eFaculty}
      />
      {departments.map((department, index) => {
        return (
          <Card className={classes.root}>
            <CardActions disableSpacing>
              <CardHeader
                avatar={
                  <Avatar aria-label='recipe' className={classes.avatar}>
                    D
                  </Avatar>
                }
                title={department.name.toUpperCase()}
                subheader={department.faculty}
              />

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: card[index],
                })}
                onClick={() => {
                  handleExpandClick(index)
                  handleEdit(department.name, department.faculty)
                }}
                aria-expanded={card[index]}
                aria-label='show more'
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={card[index]} timeout='auto' unmountOnExit>
              <CardContent>
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
                      handleDelete(department.name, department.faculty)
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

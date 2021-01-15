import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'

import MenuItem from '@material-ui/core/MenuItem'
import { checkTokenExpired } from '../../globalState/actions/AuthActions'
import { isMobile } from 'mobile-device-detect'

import Menu from '@material-ui/core/Menu'
import { useHistory } from 'react-router'
import SideMenu from '../Helpers/General/SideMenu'
import { secretOrKey } from '../../keys_dev'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../globalState/actions/AuthActions'

import Button from '@material-ui/core/Button'
import LoginModal from '../Helpers/Auth/SignInForm1'
import ChangePassword from '../Helpers/Auth/ChangePassword'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function MenuAppBar() {
  useEffect(() => {
    console.log('toot')
    if (!dispatch(checkTokenExpired(history))) {
      const account = jwt.verify(token, secretOrKey)
      const type = account.type
      const memType = account.memberType
      console.log(account)
      if (type === 'HR') {
        setMenu('HR')
      } else {
        if (memType == 'academic member') {
          setMenu('AC')
        }
        if (memType == 'head of department') {
          setMenu('HOD')
        }
        if (memType == 'course instructor') {
          setMenu('CI')
        }
        if (memType == 'course coordinator') {
          setMenu('COOR')
        }
      }
    }
  }, [])
  const dispatch = useDispatch()
  const history = useHistory()

  dispatch(checkTokenExpired(history))
  const jwt = require('jsonwebtoken')
  const [menu, setMenu] = React.useState('')
  const name = useSelector((state) => state.name)
  const token = useSelector((state) => state.token)
  console.log(token)
  const account = token ? jwt.verify(token, secretOrKey) : {}
  const type = account.type
  const memType = account.memberType

  console.log(type)
  console.log(memType)
  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const [auth, setAuth] = React.useState(token ? true : false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorEl1, setAnchorEl1] = React.useState(null)

  const open = Boolean(anchorEl)
  const open1 = Boolean(anchorEl1)

  const [openMod, setOpenMod] = React.useState(false)
  const [openMod1, setOpenMod1] = React.useState(false)

  const handleChange = (event) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenu1 = () => {
    toggleDrawer('left', true)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClickOpen = () => {
    setOpenMod(true)
  }

  const handleClickOpen1 = () => {
    setOpenMod1(true)
  }

  const handleCloseModal = () => {
    console.log('aho')
    history.go(0)

    setOpenMod(false)
  }
  const handleCloseModal1 = () => {
    console.log('aho')
    history.go(0)
    setOpenMod1(false)
  }
  const handleLogout = () => {
    dispatch(logout(history))
    const token = null
    setAuth(false)
    history.push(0)
  }

  return (
    <div className={classes.root}>
      <LoginModal
        openClose={openMod}
        handleClickOpen={handleClickOpen}
        handleClose={handleCloseModal}
      />
      <ChangePassword
        openClose={openMod1}
        handleClickOpen={handleClickOpen1}
        handleClose={handleCloseModal1}
      />
      <SideMenu state={state} toggleDrawer={toggleDrawer} type={menu} />
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label='login switch'
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            disabled={auth ? false : true}
            className={classes.menuButton}
            aria-label='account of current user'
            aria-controls='menu-appbar1'
            aria-haspopup='true'
            onClick={() => {
              setState({
                top: false,
                left: true,
                bottom: false,
                right: false,
              })
            }}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            <span>GUC Portal </span>
            {!isMobile && (
              <span style={{ opacity: '80%' }}>
                {'  ' + history.location.pathname.toUpperCase()}{' '}
              </span>
            )}
          </Typography>
          {auth && (
            <div>
              {name}
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    history.push('/myProfile')
                  }}
                >
                  Profile
                </MenuItem>

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={handleClickOpen1}>
                  Change
                  <br /> password
                </MenuItem>
              </Menu>
            </div>
          )}
          {!auth && (
            <div>
              <Button
                variant='outlined'
                color='default'
                onClick={handleClickOpen}
                style={{ color: 'white' }}
              >
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

function menu() {
  return <div></div>
}

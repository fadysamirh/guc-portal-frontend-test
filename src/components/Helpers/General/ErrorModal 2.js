import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import { Row } from 'react-bootstrap'

const styles = (theme) => ({
  root: {
    margin: 0,
    backgroundColor: '#ED1C24',
    width: '30vw',
    padding: '0vw',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0.5),
    top: theme.spacing(0),
    bottom: theme.spacing(8),
    color: theme.palette.black,
    width: '1vw',
  },
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: '#ED1C24',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}))(MuiDialogContent)

const useStyles = makeStyles({
  text1: {
    fontSize: '1vw',
    fontWeight: 'bold',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text2: {
    fontSize: '0.7vw',
    color: '#FFFFFF',
    paddingBottom: '1vw',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default function CustomizedDialogs(props) {
  const classes = useStyles()

  return (
    <div>
      <Dialog
        onClose={props.onCloseNew ? props.onCloseNew : props.close}
        aria-labelledby='customized-dialog-title'
        open={props.open}
      >
        <DialogTitle
          id='customized-dialog-title'
          onClose={props.onCloseNew ? props.onCloseNew : props.close}
        ></DialogTitle>
        <DialogContent>
          <Row className={classes.row}>
            <Typography className={classes.text1}>{props.message}</Typography>
          </Row>
        </DialogContent>
      </Dialog>
    </div>
  )
}

import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import CallMergeIcon from '@material-ui/icons/CallMerge'
import CallSplitIcon from '@material-ui/icons/CallSplit'
import MailIcon from '@material-ui/icons/Mail'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { useHistory } from 'react-router'
import HomeIcon from '@material-ui/icons/Home'
import ScheduleIcon from '@material-ui/icons/DateRange'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import FindReplaceIcon from '@material-ui/icons/FindReplace'
import LinkIcon from '@material-ui/icons/Link'
import WeekendIcon from '@material-ui/icons/Weekend'
import TimeToLeaveIcon from '@material-ui/icons/TimeToLeave'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import TodayIcon from '@material-ui/icons/Today'
import FaceIcon from '@material-ui/icons/Face'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
})

export default function SwipeableTemporaryDrawer(props) {
  const type = props.type
  const classes = useStyles()
  const history = useHistory()
  // const [state, setState] = React.useState({
  //   top: false,
  //   left: false,
  //   bottom: false,
  //   right: false,
  // })

  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (
  //     event &&
  //     event.type === 'keydown' &&
  //     (event.key === 'Tab' || event.key === 'Shift')
  //   ) {
  //     return
  //   }

  //   setState({ ...state, [anchor]: open })
  // }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role='presentation'
      onClick={props.toggleDrawer(anchor, false)}
      onKeyDown={props.toggleDrawer(anchor, false)}
    >
      {' '}
      {type === 'HR' && (
        <div>
          <List>
            <ListItem
              button
              key={'Home'}
              onClick={() => {
                history.push('/home')
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>{' '}
            <ListItem
              button
              key={'StaffMgt'}
              onClick={() => {
                history.push('/HR/StaffMgt')
              }}
            >
              <ListItemIcon>
                <SupervisedUserCircleIcon />
              </ListItemIcon>
              <ListItemText primary={'Staff Mgt'} />
            </ListItem>
            <ListItem
              button
              key={'CourseMgt'}
              onClick={() => {
                history.push('/HR/CourseMgt')
              }}
            >
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary={'Course Mgt'} />
            </ListItem>
            <ListItem
              button
              key={'LocationMgt'}
              onClick={() => {
                history.push('/HR/LocationMgt')
              }}
            >
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary={'Locations Mgt'} />
            </ListItem>
            <ListItem
              button
              key={'AttendanceMgt'}
              onClick={() => {
                history.push('/HR/AttendanceMgt')
              }}
            >
              <ListItemIcon>
                <TodayIcon />
              </ListItemIcon>
              <ListItemText primary={'Attendance Mgt'} />
            </ListItem>{' '}
            <ListItem
              button
              key={'LocationMgt'}
              onClick={() => {
                history.push('/HR/DepMgt')
              }}
            >
              <ListItemIcon>
                <CallMergeIcon />
              </ListItemIcon>
              <ListItemText primary={'Department Mgt'} />
            </ListItem>
            <ListItem
              button
              key={'LocationMgt'}
              onClick={() => {
                history.push('/HR/FacMgt')
              }}
            >
              <ListItemIcon>
                <CallSplitIcon />
              </ListItemIcon>
              <ListItemText primary={'Faculty Mgt'} />
            </ListItem>
          </List>
          <Divider />
          <ListItem
            button
            key={'Attendance'}
            onClick={() => {
              history.push('/attendance')
            }}
          >
            <ListItemIcon>
              <CheckBoxIcon />
            </ListItemIcon>
            <ListItemText primary={'Attendance'} />
          </ListItem>
        </div>
      )}
      {type === 'AC' && (
        <div>
          <List>
            <div></div>
            <ListItem
              button
              key={'Home'}
              onClick={() => {
                history.push('/home')
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>

              <ListItemText primary={'Home'} />
            </ListItem>
            <ListItem
              button
              key={'Scheduling'}
              onClick={() => {
                history.push('/Scheduling')
              }}
            >
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary={'Schedule'} />
            </ListItem>
            <ListItem
              button
              key={'Replacment Requests'}
              onClick={() => {
                history.push('/AC/ReplacmentMgt')
              }}
            >
              <ListItemIcon>
                <FindReplaceIcon />
              </ListItemIcon>
              <ListItemText primary={'Replacment Requests'} />
            </ListItem>
            <ListItem
              button
              key={'Slot Linking'}
              onClick={() => {
                history.push('/AC/SlotMgt')
              }}
            >
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary={'Slot linking'} />
            </ListItem>

            <ListItem
              button
              key={'Leave requests'}
              onClick={() => {
                history.push('/Leaves')
              }}
            >
              <ListItemIcon>
                <TimeToLeaveIcon />
              </ListItemIcon>
              <ListItemText primary={'Leave requests'} />
            </ListItem>
          </List>
          <Divider />
          <ListItem
            button
            key={'Attendance'}
            onClick={() => {
              history.push('/attendance')
            }}
          >
            <ListItemIcon>
              <CheckBoxIcon />
            </ListItemIcon>
            <ListItemText primary={'Attendance'} />
          </ListItem>{' '}
          <ListItem
            button
            key={'Day off'}
            onClick={() => {
              history.push('/DaysOff')
            }}
          >
            <ListItemIcon>
              <WeekendIcon />
            </ListItemIcon>
            <ListItemText primary={'Day off'} />
          </ListItem>
        </div>
      )}
      {type === 'COOR' && (
        <div>
          <List>
            <div></div>
            <ListItem
              button
              key={'Home'}
              onClick={() => {
                history.push('/home')
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>

              <ListItemText primary={'Home'} />
            </ListItem>
            <ListItem
              button
              key={'Slots MGT'}
              onClick={() => {
                history.push('/cod/slots')
              }}
            >
              <ListItemIcon>
                <AccessAlarmIcon />
              </ListItemIcon>
              <ListItemText primary={'Slots'} />
            </ListItem>
            <ListItem
              button
              key={'Slot linking MGT'}
              onClick={() => {
                history.push('/cod/slotLinking')
              }}
            >
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary={'Slot linking MGT'} />
            </ListItem>
          </List>
          <Divider />
          <ListItem
            button
            key={'Attendance'}
            onClick={() => {
              history.push('/attendance')
            }}
          >
            <ListItemIcon>
              <CheckBoxIcon />
            </ListItemIcon>
            <ListItemText primary={'Attendance'} />
          </ListItem>{' '}
        </div>
      )}
      {type === 'HOD' && (
        <div>
          <List>
            <div></div>
            <ListItem
              button
              key={'Home'}
              onClick={() => {
                history.push('/home')
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>

              <ListItemText primary={'Home'} />
            </ListItem>
            <ListItem
              button
              key={'Scheduling'}
              onClick={() => {
                history.push('/Scheduling')
              }}
            >
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary={'Schedule'} />
            </ListItem>
            <ListItem
              button
              key={'Leave requests'}
              onClick={() => {
                history.push('/Leaves')
              }}
            >
              <ListItemIcon>
                <TimeToLeaveIcon />
              </ListItemIcon>
              <ListItemText primary={'Leave requests'} />
            </ListItem>
            <ListItem
              button
              key={'Staff department MGT'}
              onClick={() => {
                history.push('/HOD/StaffDepMgt')
              }}
            >
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={'Staff department MGT'} />
            </ListItem>
            <ListItem
              button
              key={'Courses department MGT'}
              onClick={() => {
                history.push('/HOD/CoursesDepMgt')
              }}
            >
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary={'Courses department MGT'} />
            </ListItem>
            <ListItem
              button
              key={'Instructors department managment'}
              onClick={() => {
                history.push('/HOD/InstructorDepMgt')
              }}
            >
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary={'Instructors department MGT'} />
            </ListItem>
          </List>
          <Divider />
          <ListItem
            button
            key={'Attendance'}
            onClick={() => {
              history.push('/attendance')
            }}
          >
            <ListItemIcon>
              <CheckBoxIcon />
            </ListItemIcon>
            <ListItemText primary={'Attendance'} />
          </ListItem>{' '}
        </div>
      )}
      {type === 'CI' && (
        <div>
          <List>
            <div></div>
            <ListItem
              button
              key={'Home'}
              onClick={() => {
                history.push('/home')
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>

              <ListItemText primary={'Home'} />
            </ListItem>
            <ListItem
              button
              key={'Scheduling'}
              onClick={() => {
                history.push('/Scheduling')
              }}
            >
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary={'Schedule'} />
            </ListItem>
            <ListItem
              button
              key={'Leave requests'}
              onClick={() => {
                history.push('/Leaves')
              }}
            >
              <ListItemIcon>
                <TimeToLeaveIcon />
              </ListItemIcon>
              <ListItemText primary={'Leave requests'} />
            </ListItem>
            <ListItem
              button
              key={'Staff MGT'}
              onClick={() => {
                history.push('/instructor/staffManagement')
              }}
            >
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={'Staff MGT'} />
            </ListItem>

            <ListItem
              button
              key={'Course Assignments'}
              onClick={() => {
                history.push('/instructor/viewMyCoursesAssignment')
              }}
            >
              <ListItemIcon>
                <AssignmentIndIcon />
              </ListItemIcon>
              <ListItemText primary={'Course Assignments'} />
            </ListItem>
            <ListItem
              button
              key={'Course coverage'}
              onClick={() => {
                history.push('/instructor/coverage')
              }}
            >
              <ListItemIcon>
                <PersonPinCircleIcon />
              </ListItemIcon>
              <ListItemText primary={'Course coverage'} />
            </ListItem>
            <ListItem
              button
              key={'Slot MGT'}
              onClick={() => {
                history.push('/instructor/slots')
              }}
            >
              <ListItemIcon>
                <AccessAlarmIcon />
              </ListItemIcon>
              <ListItemText primary={'Slot MGT'} />
            </ListItem>

            <Divider />
            <ListItem
              button
              key={'Attendance'}
              onClick={() => {
                history.push('/attendance')
              }}
            >
              <ListItemIcon>
                <CheckBoxIcon />
              </ListItemIcon>
              <ListItemText primary={'Attendance'} />
            </ListItem>
            <ListItem
              button
              key={'Day off'}
              onClick={() => {
                history.push('/DaysOff')
              }}
            >
              <ListItemIcon>
                <WeekendIcon />
              </ListItemIcon>
              <ListItemText primary={'Day off'} />
            </ListItem>
          </List>{' '}
        </div>
      )}
    </div>
  )

  return (
    <div>
      <React.Fragment key={'left'}>
        <SwipeableDrawer
          anchor={'left'}
          open={props.state['left']}
          onClose={props.toggleDrawer('left', false)}
          onOpen={props.toggleDrawer('left', true)}
        >
          {list('left')}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  )
}

import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import Header from './components/pages/Header'
import DaysOff from './components/pages/ACMem/DayOff'
import SlotMgt from './components/pages/ACMem/SlotMgt'
import ReplacmentMgt from './components/pages/ACMem/ReplacementMgt'
import Scheduling from './components/pages/Scheduling'
import Leaves from './components/pages/Leaves'
import SignUpForm from './components/Helpers/Auth/SignUpForm'
import Attendance from './components/pages/Attendance'
import Slots from './components/pages/COD/Slots/Slots'
import SlotLinking from './components/pages/COD/SlotLinking/SlotLinking'
import StaffCourseMgt from './components/pages/Instructor/StaffCourseMgt'
import ViewMyCourseAssignment from './components/pages/Instructor/CourseAssignment'
import Coverage from './components/pages/Instructor/Coverage'
import InstructorSlots from './components/pages/Instructor/Slots'
import LocationMgt from './components/pages/HR/LocationMgt'
import DepMgt from './components/pages/HR/DepMgt'
import FacMgt from './components/pages/HR/FacMgt'
import StaffMgt from './components/pages/HR/StaffMgt'
import CourseMgt from './components/pages/HR/CourseMgt'
import AttendanceMgt from './components/pages/HR/AttendanceMgt'
import SignInForm from './components/Helpers/Auth/SignInForm'
//import LeaveRequests from './components/pages/HOD/leaves'
import TeachingAssignment from './components/pages/HOD/TeachingAssignment'
import StaffDepMgt from './components/pages/HOD/StaffDepMgt'
import HodIndex from './components/pages/HOD/HodIndex'
import InstDepMgt from './components/pages/HOD/InstDepMgt'
import MyProfile from './components/pages/MyProfile'
import { isMobile } from 'mobile-device-detect'

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div
          style={{
            margin: '3vw',
            marginBottom: '0vw',
            marginTop: isMobile ? '10vh' : '7vw',
            overflow: 'hidden',
          }}
        >
          <React.Fragment>
            {' '}
            <Route path='/HR/LocationMgt' exact render={() => <LocationMgt />}>
              {/* <Redirect to='/home' /> */}
            </Route>{' '}
            <Route path='/HR/DepMgt' exact render={() => <DepMgt />}></Route>
            <Route
              path='/HR/AttendanceMgt'
              exact
              render={() => <AttendanceMgt />}
            ></Route>
            <Route path='/HR/FacMgt' exact render={() => <FacMgt />}></Route>
            <Route path='/DaysOff' exact render={() => <DaysOff />}></Route>
            <Route path='/AC/SlotMgt' exact render={() => <SlotMgt />}></Route>
            <Route
              path='/Scheduling'
              exact
              render={() => <Scheduling />}
            ></Route>
            <Route path='/Leaves' exact render={() => <Leaves />}></Route>
            <Route
              path='/AC/ReplacmentMgt'
              exact
              render={() => <ReplacmentMgt />}
            ></Route>
            {/* <Route
              path='/HOD/LeaveRequests'
              exact
              render={() => <LeaveRequests />}
            ></Route> */}
            <Route
              path='/HOD/TeachingAssignment'
              exact
              render={() => <TeachingAssignment />}
            ></Route>
            <Route
              path='/HOD/StaffDepMgt'
              exact
              render={() => <StaffDepMgt />}
            ></Route>
            <Route
              path='/HOD/CoursesDepMgt'
              exact
              render={() => <HodIndex />}
            ></Route>
            <Route
              path='/HOD/InstructorDepMgt'
              exact
              render={() => <InstDepMgt />}
            ></Route>
            <Route
              path='/HR/CourseMgt'
              exact
              render={() => <CourseMgt />}
            ></Route>
            <Route
              path='/HR/StaffMgt'
              exact
              render={() => <StaffMgt />}
            ></Route>
            <Route path='/signUp' exact render={() => <SignUpForm />}>
              {/* <Redirect to='/home' /> */}
            </Route>
            <Route path='/' exact render={() => <HomePage />}></Route>
            <Route path='/home' exact render={() => <HomePage />} />
            <Route path='/attendance' exact render={() => <Attendance />} />
            <Route path='/cod/slots' exact render={() => <Slots />} />
            <Route path='/myProfile' exact render={() => <MyProfile />} />
            <Route
              path='/cod/slotLinking'
              exact
              render={() => <SlotLinking />}
            />
            <Route
              path='/instructor/staffManagement'
              exact
              render={() => <StaffCourseMgt />}
            />
            <Route
              path='/instructor/viewMyCoursesAssignment'
              exact
              render={() => <ViewMyCourseAssignment />}
            />
            <Route
              path='/instructor/coverage'
              exact
              render={() => <Coverage />}
            />
            <Route
              path='/instructor/slots'
              exact
              render={() => <InstructorSlots />}
            />
          </React.Fragment>
        </div>

        <React.Fragment></React.Fragment>
      </Router>
    </div>
  )
}
export default App

import React from 'react'
import SnackbarAlert from '../../Helpers/General/SnackbarAlert'
import AssignCourseInst from './AssignCourseInst'
import UnAssignCourseInst from './UnAssignCourseInst'
import UpdateCourseInst from './UpdateCourseInst'

export default function InstDepMgt() {
  const [showAlert, setShowAlert] = React.useState(false)
  const [showAlertMsg, setShowAlertMsg] = React.useState('error')
  const [showSeverity, setShowSeverity] = React.useState('error')
  const handleCloseAlert = () => {
      setShowAlert(false)
    };
  return <div>

    {/* assign cours inst,  */}
    <AssignCourseInst setShowAlert={setShowAlert} setShowAlertMsg={setShowAlertMsg} setShowSeverity={setShowSeverity}/>
    {/* unassign cours inst,  */}
    <UnAssignCourseInst setShowAlert={setShowAlert} setShowAlertMsg={setShowAlertMsg} setShowSeverity={setShowSeverity}/>

    {/* update cours inst,  */}

    <UpdateCourseInst setShowAlert={setShowAlert} setShowAlertMsg={setShowAlertMsg} setShowSeverity={setShowSeverity}/>



    <SnackbarAlert
        handleClose={handleCloseAlert}
        severity={showSeverity}
        msg={showAlertMsg}
        showAlert={showAlert}
      />
  </div>
}

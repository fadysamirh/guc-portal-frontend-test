import React from 'react'
import Coverage from './Coverage'
import TeachingAssignment from "../HOD/TeachingAssignment"
import SnackbarAlert from '../../Helpers/General/SnackbarAlert'

export default function HodIndex(){
    const [showAlert, setShowAlert] = React.useState(false)
    const [showAlertMsg, setShowAlertMsg] = React.useState('error')
    const [showSeverity, setShowSeverity] = React.useState('error')
    const handleCloseAlert = () => {
        setShowAlert(false)
      };
    
    return<div>
            <div style={{marginBottom:'2vw'}}>
        <Coverage setShowAlert={setShowAlert} setShowAlertMsg={setShowAlertMsg} setShowSeverity={setShowSeverity}/>
        </div>
        <div style={{marginBottom:'2vw'}}>
    <TeachingAssignment/>
    </div>
        <SnackbarAlert
        handleClose={handleCloseAlert}
        severity={showSeverity}
        msg={showAlertMsg}
        showAlert={showAlert}
      />
    </div>
}
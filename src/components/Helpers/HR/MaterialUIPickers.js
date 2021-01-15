import 'date-fns'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

export default function MaterialUIPickers() {
  // The first commit of Material-UI

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify='space-around'>
        <DatePicker
          variant='inline'
          openTo='year'
          views={['year', 'month']}
          label='Year and Month'
          helperText='Start from year selection'
          //value={selectedDate}
          //onChange={handleDateChange}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

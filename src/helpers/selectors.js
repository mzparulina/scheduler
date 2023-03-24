export function getAppointmentsForDay(state, name) {
  let filteredDays = []
  state.days.filter(day => {
    if(day.name === name) {
      day.appointments = day.appointments.map(appointment => {
        for (const key in state.appointments) {
          if(state.appointments[key].id === appointment) {
            return state.appointments[key]
          }
        }
      })
      filteredDays = day.appointments
    }
  });
  return filteredDays;
}
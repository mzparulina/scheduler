export function getAppointmentsForDay(state, day) {
  const filteredNames = state.days.filter(day => {
    if(day.name === day)
      return day.appointments
  });
  return filteredNames;
}
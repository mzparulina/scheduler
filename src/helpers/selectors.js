export function getAppointmentsForDay(state, name) {
  const filteredDays = state.days.filter(day => day.name === name);
  if(state.days.length === 0 || filteredDays.length === 0){
    return [];
  }
  //get the appointments
  const appointments = filteredDays[0].appointments;
  let filteredAppointments = [];
  for(const appointment of appointments) {
    filteredAppointments.push(state.appointments[appointment]);
  }

  return filteredAppointments;
}

export function getInterview(state, interview) {
  if(!interview) return null;
  const filteredInterview = {};
  filteredInterview.student = interview.student;
  filteredInterview.interviewer = state.interviewers[interview.interviewer];
  return filteredInterview;
}
function getSelectorForDay(state, name, selectorName) {
  const filteredDays = state.days.filter(day => day.name === name);
  if(state.days.length === 0 || filteredDays.length === 0){
    return [];
  }

  //get the selectorName [appointments/interviewers]
  const selectors = filteredDays[0][selectorName];
  let filteredSelectors = [];
  for(const selector of selectors) {
    filteredSelectors.push(state[selectorName][selector]);
  }
  return filteredSelectors;
}

export function getAppointmentsForDay(state, name) {
  return getSelectorForDay(state,name, 'appointments')
}

export function getInterview(state, interview) {
  if(!interview) return null;
  const filteredInterview = {};
  filteredInterview.student = interview.student;
  filteredInterview.interviewer = state.interviewers[interview.interviewer];
  return filteredInterview;
}

export function getInterviewersForDay(state, name) {
  return getSelectorForDay(state,name, 'interviewers')
}
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export function updateSpots(state, appointments) {
  return state.days.map((dayObj) => {
    if (state.day === dayObj.name) {
      let spotsRemaining = 0;
      for (const appointmentKey in appointments) {
        let appointment = appointments[appointmentKey];
        // add to spotsRemaining if the appointment.id is in dayObj's appointments and it's null
        if (
          dayObj.appointments.includes(appointment.id) &&
          !appointment.interview
        ) {
          spotsRemaining++;
        }
      }
      // return a new dayObject copy with an updated spots value
      return { ...dayObj, spots: spotsRemaining };
    }
    return dayObj;
  });
}
export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.value,
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        ...action.value,
      };
    case SET_INTERVIEW:
      // create a copy of selected appointment by id with an optimistic new state
      const appointment = {
        ...state.appointments[action.value.id],
        interview: action.value.interview && { ...action.value.interview },
      };
      const appointments = {
        ...state.appointments,
        [action.value.id]: appointment,
      };
      // call the updateSpots function to get a new dayObj copy and then update the st
      const days = updateSpots(state, appointments);
      return {
        ...state,
        days,
        appointments,
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
// export default function reducer(state, action) {
//   switch (action.type) {
//     case SET_DAY:
//       return {
//         ...state,
//         day: action.day
//       };
//     case SET_APPLICATION_DATA:
//       return {
//         ...state,
//         days: action.days,
//         appointments: action.appointments,
//         interviewers: action.interviewers
//       };
//     case SET_INTERVIEW:
//       const appointment = {
//         ...state.appointments[action.id],
//         interview: { ...action.interview }
//       };
//       const appointments = {
//         ...state.appointments,
//         [action.id]: appointment
//       };

//       const days = updateSpots(state, appointments);

//       return {
//         ...state,
//         appointments,
//         days
//       };
//     default:
//       throw new Error(
//         `Tried to reduce with unsupported action type: ${action.type}`
//       );
//   }
// }
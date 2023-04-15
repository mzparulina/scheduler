import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  const url ='/api/appointments/';

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, [])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const days = findDay(appointments); 

    return axios.put(`${url}${id}`, appointment).then(() => {
      setState({...state, appointments, days});
    })
  }

  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const days = findDay(appointments)

    return axios.delete(`${url}${id}`, appointment).then(()=>{
      setState({...state, appointments, days});
    });
  }

  function findDay(appointments) {
    const dayOfWeek = state.days.find((day) => day.name === state.day);
    let counter = 0;
    dayOfWeek.appointments.forEach((id) => {
      if (appointments[id].interview === null) {
        counter++;
      }
    });
    const newDay = { ...dayOfWeek, spots: counter };
    const newDayArray = [...state.days];
    newDayArray[dayOfWeek.id - 1] = newDay;

    return newDayArray;
  }

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  }
}
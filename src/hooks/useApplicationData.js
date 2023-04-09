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
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
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

    const getDay = findDay(state.day)

    let day = {
      ...state.days[getDay],
      spots: state.days[getDay]
    }

    if (!state.appointments[id].interview) {
      day = {
        ...state.days[getDay],
        spots: state.days[getDay].spots - 1
      } 
    } else {
      day = {
        ...state.days[getDay],
        spots: state.days[getDay].spots
      } 
    }

    state.days[getDay] = day;

    return axios.put(`${url}${id}`, appointment).then(() => {
      setState({...state, appointments});
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

    const getDay = findDay(state.day)

    const day = {
      ...state.days[getDay],
      spots: state.days[getDay].spots + 1
    }

    state.days[getDay] = day;

    return axios.delete(`${url}${id}`, appointment).then(()=>{
      setState({...state, appointments});
    });
  }

  function findDay(day) {
    const days = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return days[day]
  }

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  }
}
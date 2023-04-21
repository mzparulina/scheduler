import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application.js";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  // setDay updates the state for an individual day in our object of states
  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    socket.onmessage = function(event) {
      const message = JSON.parse(event.data);
      if (message.type) {
        dispatch({
          type: message.type,
          value: {
            id: message.id,
            interview: message.interview
          },
        });
      }
    };

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        },
      });
    });
  }, []);

  // call bookInterview() when a user creates an interview
  function bookInterview(id, interview) {
    // make the put request and then update the state
    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      })
      .then((res) => {
        dispatch({
          type: SET_INTERVIEW,
          value: {
            id,
            interview,
          },
        });
      });
  }

  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      dispatch({
        type: SET_INTERVIEW,
        value: {
          id,
          interview: null,
        },
      });
    });
  }

  return { state, setDay, bookInterview, deleteInterview };
}
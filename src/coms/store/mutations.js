import {setCookie} from '../server_func'

function filterInput (state, prop, target)
{
    let time, value;
    if ( Object.prototype.toString.call(target) === '[object Object]') {
      state[prop] = value = target.value;
      time = target.time;
    } else {
      state[prop] = value = target;
    }
    setCookie(prop, target.value, time)      
}

export default {
    SET_USER_ID (state, value)
    {
      filterInput(state, 'user_id', value);
    },
    SET_USER_TOKEN (state, value) 
    {
      filterInput(state, 'user_token', value);
    },
    SET_USER_NAME (state, value)
    {
      filterInput(state, 'user_name', value);
    },
    SET_USER_PWD (state, value)
    {
      filterInput(state, 'user_pwd', value);
    }
  }
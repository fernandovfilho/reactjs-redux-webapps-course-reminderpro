import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants'
import { bake_cookie, read_cookie } from 'sfcookies'

const reminder = (action) => {
  let { text, dueDate } = action
  return {
    text,
    dueDate,
    id: Math.random()
  }
}

const removeById = (state = [], id) => {
  const reminders = state.filter(reminder => reminder.id !== id)

  return reminders
}

const clearReminders = (state = []) => {
  const reminders = []
  return reminders
}

const reminders = (state = [], action) => {

  let reminders = null
  state = read_cookie('reminders')

  switch(action.type){
    case ADD_REMINDER:
      reminders = [...state, reminder(action)]
      console.log('reminders as state', reminders)
      bake_cookie('reminders', reminders)
      return reminders
    case DELETE_REMINDER:
      reminders = removeById(state, action.id)
      console.log('delete reminder as state', reminders)
      bake_cookie('reminders', reminders)
      return reminders
    case CLEAR_REMINDERS:
      reminders = clearReminders(state)
      console.log('clear all reminder as state', reminders)
      bake_cookie('reminders', reminders)
      return reminders
    default:
      return state
  }

}

export default reminders

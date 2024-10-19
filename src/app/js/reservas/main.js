import login from './form-login'
import validatelogin from './form-validatelogin'
import calendar from './calendar'

// Global

window.eventsreceived = events => { }

// Init

export default $ => {

  calendar($);
}
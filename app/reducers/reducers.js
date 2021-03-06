import {combineReducers } from 'redux';

function selectedSubreddit(state = 'frontend', action) {
  switch (action.type) {
    case "SELECT_SUBREDDIT":
      return action.subreddit
    default:
      return state
  }
}

function posts(state={
  isFetching: false,
  didInvalidate:false,
  items:[]
}, action){
  switch(action.type) {
    case "INVALIDATE_SUBREDDIT":
      return Object.assign({}, state, {
        didInvalidate:true
      })
    case "REQUEST_POSTS":
      return Object.assign({}, state, {
        isFetching:true,
        didInvalidate:false
      })
    case "RECIVE_POSTS":
      return Object.assign({}, state, {
        isFetching:false,
        didInvalidate:false,
        items: action.posts,
        lastUpdate:action.receivedAt
      })
    default :
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch( action.type) {
    case "INVALIDATE_SUBREDDIT":
    case "RECIVE_POSTS":
    case "REQUEST_POSTS":
      return Object.assign({}, state, {
        [action.subreddit]:posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})

export default rootReducer;
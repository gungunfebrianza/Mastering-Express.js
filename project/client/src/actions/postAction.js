import axios from 'axios';

import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING } from './types';

export const addPost = postData => dispatch => {
  axios
    .post('/api/posts', postData)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_POST, payload: null }));
};

export const getPost = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .post('/api/posts', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set Loading State
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchItems() {
    // console.log('in fetchItems generator')
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/shelf', config);
    // console.log(response.data, "this is the response from GET");

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_ITEMS', payload: response.data });
  } catch (error) {
    console.log('Items GET request failed', error);
  }
}
// addItem will take an (action) because it will have a payload to send
function* addItem(action) {
  // const config = {
  //   headers: { 'Content-Type': 'application/json' },
  //   withCredentials: true,
  // };
  try { 
    axios({
      method: 'POST',
      url: `/api/shelf/`,
      data: action.payload
    })
    yield put({
      type: 'FETCH_Items'
    })
  } catch(error) {
    console.log('Error in POST route', error)
  }
}

function* deleteItem(action) {
  try{
    axios({
      method: 'DELETE',
      url: `/api/shelf/${action.payload}`
    }) 
    yield put({
      type: 'FETCH_Items'
    })
  } catch(error) {
    console.log('Error in POST route', error)
  }
}

function* itemsSaga() {
  yield takeLatest('FETCH_Items', fetchItems);
  yield takeLatest('ADD_item', addItem);
  yield takeLatest('DELETE_item', deleteItem);
}

export default itemsSaga;

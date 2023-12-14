import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchItems() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the Items
    // If a Items is logged in, this will return their information
    // from the server session (req.Items)
    const response = yield axios.get('/api/shelf', config);
    console.log(response.data, "this is the response from GET");

    // now that the session has given us a Items object
    // with an id and Itemsname set the client-side Items object to let
    // the client-side code know the Items is logged in
    yield put({ type: 'SET_ITEMS', payload: response.data });
  } catch (error) {
    console.log('Items GET request failed', error);
  }
}

function* itemsSaga() {
  yield takeLatest('FETCH_Items', fetchItems);
}

export default itemsSaga;

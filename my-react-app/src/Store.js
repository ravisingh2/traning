
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
const reducer = (state={}, action)=>{
    switch(action.type){
        case "success":
            console.log("reducer called on put", action.payload)
            return {...state, ...action.payload};
        default:
            return state;    
    }
    
}
const rootReducer = combineReducers({
    mainReducer:reducer
})
function* test(data){
    console.log(data.payload)
    yield call("post", "google.com", data.payload)
    yield console.log("Hi From Saga");
    yield put({type:"success", payload:{name:"ritika"}})
}
function* sagaWatcher(){
    yield takeEvery("Test", test);
}
const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(sagaWatcher);
export default store;
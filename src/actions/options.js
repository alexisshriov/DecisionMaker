import { ADD_OPTION_SUCCESS, LOAD_LIST_SUCCESS } from '../constants/actionTypes'
import { AsyncStorage, Alert } from "react-native"

export const addOptionSuccess = (optionDesc) => {
    debugger
    return { type: ADD_OPTION_SUCCESS, optionDesc }
}

export const loadListSuccess = (list) => {
    return { type: LOAD_LIST_SUCCESS, list }
}


export function addOption(optionDesc) {
    debugger
    return (dispatch) => {
       AsyncStorage.getItem('testListName')
      .then(req => {
        console.log('inside first proimise')
        debugger
        JSON.parse(req)
      })
      .then(json => dispatch(addOptionSuccess(optionDesc)))
      .catch(error => console.log('error!'));
    };
  }

  // export const loadList = (listName) => {  
  //   debugger
  //   return async (dispatch, getState) => {
      

  //     try {
  //       debugger
  //       dispatch(loadListSuccess([]))
  //       const response = await AsyncStorage.getItem('testListName');
  //       const json = await response.json()
  //       debugger
  //       dispatch(loadListSuccess(json))
  //     } catch (err) {
  //       debugger
  //       console.log('an error has occured')
  //      // dispatch({ type: 'error', name: 'error', value: e.message })
  //     }
  //   }
  // }




export function loadList(listName) {
  debugger
  return async (dispatch) => {
    try {
debugger
      const res = await AsyncStorage.getItem('testListName');
      debugger

      if (res.status >= 400) {
        // dispatch(checkNodeStatusFailure(node));
        console.log('error from status code')
      }

      const json = await res.json();

      dispatch(loadListSuccess(json));
    } catch (err) {
      // dispatch(checkNodeStatusFailure(node));
      console.log('error from catch')
    }
  };
}

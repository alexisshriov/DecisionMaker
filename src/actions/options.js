import { ADD_OPTION_SUCCESS, LOAD_LIST_SUCCESS } from '../constants/actionTypes'
import { AsyncStorage, Alert } from "react-native"
import { saveData, getData } from '../api/listManager'


export const addOptionSuccess = (optionDesc) => {
    return { type: ADD_OPTION_SUCCESS, optionDesc }
}

export const loadListSuccess = (list) => {
  debugger
    return { type: LOAD_LIST_SUCCESS, list }
}



export function addOption(optionDesc) {
    return (dispatch) => {
       AsyncStorage.getItem('testListName')
      .then(req => {
        console.log('inside first proimise')
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




export function loadList() {
  // saveData('TEST_KEY')
  // const list = getData('TEST_KEY')
  // debugger
  ///Alert.alert(list)
  
  //  const store = '@RandomeChooser:';
  //  let temp;

     return async (dispatch, getState) => {
        try {
          debugger
          const lists = await AsyncStorage.getItem(store + 'TEST_KEY');
          dispatch(loadListSuccess(json))
        } catch (error) {
          debugger
          console.log('an error has occured')
         // dispatch({ type: 'error', name: 'error', value: e.message })
        }
     }

  // debugger

  // try {
  //   const value = await AsyncStorage.getItem(store + 'TEST_KEY');
  //   temp = value
  //   debugger

  // } catch (error) {
  //   console.log("Error retrieving data" + error);
  // }

  debugger
}

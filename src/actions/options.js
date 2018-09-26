import { ADD_OPTION_SUCCESS, LOAD_LIST_SUCCESS, DELETE_OPTION_SUCCESS } from '../constants/actionTypes'
import { AsyncStorage, Alert } from "react-native"
import { saveData, getData } from '../api/listManager'


export const addOptionSuccess = (optionDesc) => {
    return { type: ADD_OPTION_SUCCESS, optionDesc }
}

export const deleteOptionSuccess = (index) => {
  return { type: DELETE_OPTION_SUCCESS, index }
}



export const loadListSuccess = (list) => {
    return { type: LOAD_LIST_SUCCESS, list }
}



export function addOption(optionDesc) {

  const store = '@RandomeChooser:'

  return async (dispatch) => {
    try {

      let list = JSON.parse(await AsyncStorage.getItem(store + 'TEST_KEY'));
      list.push(optionDesc)

      await AsyncStorage.setItem(store + 'TEST_KEY', JSON.stringify(list))
      //dispatch(loadList())

      dispatch(addOptionSuccess(optionDesc))

    } catch (error) {
      console.log(error)
      // dispatch({ type: 'error', name: 'error', value: e.message })
    }
  }
}

export function deleteOption(index) {

  const store = '@RandomeChooser:'

  return async (dispatch) => {
    try {

      let list = JSON.parse(await AsyncStorage.getItem(store + 'TEST_KEY'));
      list.splice(index, 1);

      await AsyncStorage.setItem(store + 'TEST_KEY', JSON.stringify(list))
      //dispatch(loadList())

      dispatch(deleteOptionSuccess(index))

    } catch (error) {
      console.log(error)
      // dispatch({ type: 'error', name: 'error', value: e.message })
    }
  }
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
  const store = '@RandomeChooser:'

  return async (dispatch) => {
    try {

      const list = await AsyncStorage.getItem(store + 'TEST_KEY');
      console.log('load')
      console.log('lists', list)

      dispatch(loadListSuccess(JSON.parse(list)))
    } catch (error) {
      debugger
      console.log(error)
      // dispatch({ type: 'error', name: 'error', value: e.message })
    }
  }

  debugger
}

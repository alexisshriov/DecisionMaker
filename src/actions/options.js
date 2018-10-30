import { ADD_OPTION, LOAD_OPTIONS_SUCCESS, DELETE_OPTION, EMPTY_LIST} from '../constants/actionTypes'
import { AsyncStorage, Alert } from "react-native"
import { saveData, getData } from '../api/listManager'

const store = '@RandomeChooser:';

export const addOptionSuccess = (optionDesc) => {
  return { type: ADD_OPTION_SUCCESS, optionDesc }
}

export const deleteOptionSuccess = (index) => {
  return { type: DELETE_OPTION_SUCCESS, index }
}


export const loadListSuccess = (list) => {
  return { type: LOAD_OPTIONS_SUCCESS, list }
}

export const saveList = (key, list) => {

  return async (dispatch) => {
    try {
      await AsyncStorage.setItem(store + key, JSON.stringify(list))
      //dispatch(loadList())


      // dispatch(addOptionSuccess(optionDesc))

    } catch (error) {
      console.log(error)
      // dispatch({ type: 'error', name: 'error', value: e.message })
    }
  }

}



export function addOption(optionDesc) {
  return { type: ADD_OPTION, optionDesc }

}

export function deleteOption(index) {
  return { type: DELETE_OPTION, index }

}

export function emptyList() {
  return { type: EMPTY_LIST }
}

export function loadList(key) {

  return async (dispatch) => {
    try {

      const list = await AsyncStorage.getItem(store + key);

      dispatch(loadListSuccess(JSON.parse(list)))
    } catch (error) {
      console.log(error)
      // dispatch({ type: 'error', name: 'error', value: e.message })
    }
  }

}

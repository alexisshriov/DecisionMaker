import { ADD_OPTION, LOAD_OPTIONS_SUCCESS, DELETE_OPTION } from '../constants/actionTypes'
import { AsyncStorage, Alert } from "react-native"

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
    } catch (error) {
      console.log(error)
    }
  }

}

export function addOption(optionDesc) {
  return { type: ADD_OPTION, optionDesc }
}

export function deleteOption(index) {
  return { type: DELETE_OPTION, index }
}

export function loadList(key) {
  return async (dispatch) => {
    try {
      const list = await AsyncStorage.getItem(store + key);
      dispatch(loadListSuccess(JSON.parse(list)))
    } catch (error) {
      console.log(error)
    }
  }
}


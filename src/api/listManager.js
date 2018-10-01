import { AsyncStorage } from "react-native"

const store = '@RandomeChooser:';

export async function saveData (key, value) {
    debugger
    try {
      await AsyncStorage.setItem(store + key, value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  };

export async function getData (key) {

    try {
        debugger
        const value = await AsyncStorage.getItem(store + key);
        let test = value
        console.log('inside api', value)

    } catch (error) {
        console.log("Error retrieving data" + error);
    }
}
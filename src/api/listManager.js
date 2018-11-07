import { AsyncStorage } from "react-native"

const store = '@RandomeChooser:';

export async function saveData (key, value) {
    try {
      await AsyncStorage.setItem(store + key, value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  };

export async function getData (key) {
    try {
        const value = await AsyncStorage.getItem(store + key);
        return value
    } catch (error) {
        console.log("Error retrieving data" + error);
    }
}
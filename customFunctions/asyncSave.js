import AsyncStorage from '@react-native-async-storage/async-storage'

class Save {
  save = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@levelsconstans', jsonValue)
    } catch (e) {
      console.log("Savelerken sıkıntı oldu be abi = " + e)
    }
  }
  read = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@levelsconstans')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log("Readlerken sıkıntı oldu be abi = " + e)
    }
  }
  clear = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      console.log("Clearlarken sıkıntı oldu be abi = " + e)
    }
  }
}

const asyncSave = new Save();
export default asyncSave;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDTO } from "@dtos/UserDTO";
import { USER_STorage } from "./storageConfig";

export async function storageUserSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STorage, JSON.stringify(user));
}

export async function storageUserGet() {
  const storage = await AsyncStorage.getItem(USER_STorage);

  const user: UserDTO = storage ? JSON.parse(storage) : {};

  return user;
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(USER_STorage);
}

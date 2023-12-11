import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
import { createContext, ReactNode, useEffect, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userUpdate: UserDTO) => Promise<void>;
  isLoadingUser: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  async function saveUserAndToken(user: UserDTO, token: string) {
    try {
      setIsLoadingUser(true);
      await storageUserSave(user);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUser(false);
    }
  }
  async function updateUserAndToken(userData: UserDTO, token: string) {
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);
    } catch (error) {
      throw error;
    }
  }
  async function updateUserProfile(userUpdate: UserDTO) {
    try {
      setUser(userUpdate);
      await storageUserSave(userUpdate);
    } catch (error) {
      throw error;
    }
  }
  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });
      if (data.user && data.token) {
        await saveUserAndToken(data.user, data.token);
        updateUserAndToken(data.user, data.token);
      }
    } catch (error) {
      throw error;
    }
  }
  async function signOut() {
    try {
      setIsLoadingUser(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUser(false);
    }
  }

  async function localUserData() {
    try {
      setIsLoadingUser(true);
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged) {
        updateUserAndToken(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUser(false);
    }
  }

  useEffect(() => {
    localUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoadingUser,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

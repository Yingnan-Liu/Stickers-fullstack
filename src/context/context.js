import React, { useReducer } from "react";
import { AuthReducer, initialState } from "./reducer";

//记录用户信息
const AuthStateContext = React.createContext();
//传递useReducer创建的调度方法来管理状态
const AuthDispatchContext = React.createContext();

//自定义hook:
export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useAuthDispatchContext must be used within a AuthProvider"
    );
  }
  return context;
}

//context组件
export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

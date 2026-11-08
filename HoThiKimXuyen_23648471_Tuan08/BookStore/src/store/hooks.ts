import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";
import { clearCredentials, setCredentials } from "./authSlice";
import type { User } from "../types";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);

  return {
    user,
    token,
    isLoggedIn: !!user && !!token,
    signIn: (u: User, t: string) => dispatch(setCredentials({ user: u, token: t })),
    signOut: () => dispatch(clearCredentials()),
  };
}
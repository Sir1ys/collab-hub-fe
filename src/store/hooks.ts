import { AppDispatch, RootState } from "./store";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

type DispatchFunction = () => AppDispatch;

export const useUserDispatch: DispatchFunction = useDispatch;

export const useUserSelector: TypedUseSelectorHook<RootState> = useSelector;

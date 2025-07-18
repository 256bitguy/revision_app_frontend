import {  useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import type { RootState } from '../store/rootReducer';
import type { TypedUseSelectorHook } from 'react-redux';
 

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

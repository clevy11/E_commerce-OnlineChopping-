import { useContext } from 'react';
import  { ProductContext } from '../context';

const useAppState = () => useContext(ProductContext);

export default useAppState;

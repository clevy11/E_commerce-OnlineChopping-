import {
  logIn, signUp,
} from './_auth';
import { getMyProfile } from './_user';
import { checkout, getAllOrders, getUserOrders } from './_cart';
import  { getProducts, createProducts, updateProducts, deleteProducts } from './_product';
import { rejectOrder, approveOrder } from './_order';

export {
  logIn,
  signUp,
  getMyProfile,
  getProducts,
  createProducts,
  updateProducts,
  deleteProducts,
  checkout,
  getAllOrders,
  getUserOrders,
  approveOrder,
  rejectOrder
};

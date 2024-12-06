/* eslint-disable camelcase */
import { Constants } from '../helpers';

const {
  create_order_api,
  cart_api,
  get_user_order_api,
  get_all_order_api
} = Constants;

export const checkout = async (axios, order, callback) => {
  try {
    const { data } = await axios.post(create_order_api, order);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const getUserOrders = async (axios, userId, callback) => {
  try {
    const { data } = await axios.get(get_user_order_api(userId));
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const getAllOrders = async (axios, callback) => {
  try {
    const { data } = await axios.get(get_all_order_api);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const updateCart = async (axios, c_id, quantity, callback) => {
  try {
    const { data } = await axios.put(cart_api(c_id), { quantity });
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const removeCart = async (axios, c_id, callback) => {
  try {
    const { data } = await axios.delete(cart_api(c_id));
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

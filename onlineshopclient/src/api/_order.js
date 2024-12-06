/* eslint-disable camelcase */
import { Constants } from '../helpers';

const {
  approve_order_api,
  reject_order_api,
  cancel_order_api,
  uncancel_order_api,
} = Constants;


export const approveOrder = async (axios, orderId, callback) => {
  try {
    const { data } = await axios.put(approve_order_api(orderId));
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const rejectOrder = async (axios, orderId, callback) => {
  try {
    const { data } = await axios.put(reject_order_api(orderId));
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const cancelOrder = async (axios, orderId, callback) => {
  try {
    const { data } = await axios.put(cancel_order_api(orderId));
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const unCancelOrder = async (axios, orderId, callback) => {
  try {
    const { data } = await axios.put(uncancel_order_api(orderId));
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};


import axios from './_axios';
import { Constants } from '../helpers';

const {
  get_products_api,
  create_products_api,
  update_products_api,
  delete_products_api,
  get_product_api,
  cloudinary_upload_url
} = Constants;

export const uploadProductImage = async (fileData, callback) => {
  try {
    const { data } = await axios.post(cloudinary_upload_url, fileData);

    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const getProducts = async (callback) => {
  try {
    const { data } = await axios.get(get_products_api);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const getProduct = async (id, callback) => {
  try {
    const { data } = await axios.get(get_product_api(id));
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const createProducts = async (product, callback) => {
  try {
    const { data } = await axios.post(create_products_api, product);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const updateProducts = async (product, callback) => {
  try {
    const { data } = await axios.put(update_products_api(product?.id), product);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const deleteProducts = async (product, callback) => {
  try {
    const { data } = await axios.delete(delete_products_api(product?.id));
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};
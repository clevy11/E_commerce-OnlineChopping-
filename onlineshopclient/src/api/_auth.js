import axios from './_axios';
import { Constants } from '../helpers';

const {
  login_api,
  signup_api,
  logout_api,
} = Constants;

export const signUp = async (user, callback) => {
  try {
    console.log('Signing up user:', user);
    console.log('API URL:', signup_api);
    const { data } = await axios.post(signup_api, user);
    console.log('Signup response:', data);
    callback(null, data);
  } catch (error) {
    console.error('Signup error:', error);
    console.error('Error response:', error.response);
    callback(error);
  }
};

export const logIn = async (auth, callback) => {
  try {
    const { data } = await axios.post(login_api, auth);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const logOut = async (callback) => {
  try {
    const { data } = await axios.post(logout_api, {});
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};


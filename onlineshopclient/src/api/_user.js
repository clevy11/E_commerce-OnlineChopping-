import { Constants } from '../helpers';

const {
  my_profile_api,
} = Constants;




export const getMyProfile = async (axios, callback) => {
  try {
    const { data } = await axios.get(my_profile_api);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

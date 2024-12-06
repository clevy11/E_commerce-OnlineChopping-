
import { useEffect } from 'react';

import { axiosPrivate } from '../api/_axios';
import useAuth from './useAuth';
import { useNavigate } from "react-router-dom";

const useAxiosPrivate = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `${auth?.token}`;
      }
      return config;
    }, error => Promise.reject(error));
    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent) {
          prevRequest.sent = true;
          navigate('/login');
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);
  return axiosPrivate;
};

export default useAxiosPrivate;

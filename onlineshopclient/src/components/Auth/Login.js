import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Email, Password,
} from '../Shared/Input';
import { Button, ProgressBar } from '../Shared/Elements';
import useAuth from '../../hooks/useAuth';
import Alert from '../Shared/Alert';
import { logIn } from '../../api';
import {User} from "../../models";

function Login({ alert: defaultAlert }) {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';
  const [status, setStatus] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailErrors, setEmailErrors] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState(null);
  const [alert, setAlert] = useState(defaultAlert);
  const [showAlert, setShowAlert] = useState(true);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  const handleLoginSuccess = response => {
    const session = { ...response?.data };
    setEmailErrors(undefined);
    setPasswordErrors(undefined);
    setAuth(session);
    sessionStorage.setItem('authData', JSON.stringify(session));
    navigate(from, { replace: true });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = data => {
    setAlert(data || defaultAlert);
    setShowAlert(true);
  };

  const handleLogin = e => {
    e.preventDefault();
    setStatus('pending');
    logIn({ email, password }, (err, data) => {
      if (err) {
        setStatus('fail');
        const resScode = err?.response?.status;
        console.log("The response is: ", err);
        if (resScode === 400 || resScode === 401 || resScode === 403) {
          handleShowAlert({ type: 'err', message: 'Invalid email or password! 😞' });
        } else {
          handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
        }
      } else {
        handleLoginSuccess(data);
      }
    });
  };

  return (
    <div className="loginContainer">
      <div className="row loginContent">
        <div className="col-12 right d-flex justify-content-center align-items-center">
          <div className="c-f-u-content">
            <div className="c-f-content">
              {status === 'pending' && (<ProgressBar />)}
              <div className="c-f-i-content py-4 px-5">
                {(showAlert && alert) && (<Alert info={alert} handleCloseAlert={handleCloseAlert} />)}
                <div className="c-content-fields w-auto">
                  <h6>Sign In 🤞</h6>
                  <form onSubmit={handleLogin}>
                    <Email
                      handleOnChange={handleEmailChange}
                      value={email}
                      errors={emailErrors}
                      labeled
                    />
                    <Password
                        handleOnChange={handlePasswordChange}
                        value={password}
                        errors={passwordErrors}
                    />
                    <div className={"mt-3"}>
                      <Button className="mt-3" label="Sign In" classes="primary-button" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="f-c-link-b w-auto py-3 d-flex justify-content-center align-items-center">
              <div className="d-flex flex-row">
                <span className="px-1">Don&apos;t have an account? </span>
                <Link className={"text-blue"} to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

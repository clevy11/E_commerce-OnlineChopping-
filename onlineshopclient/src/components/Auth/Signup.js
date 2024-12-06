import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Validate } from '../../helpers';
import { signUp } from '../../api';
import useAuth from '../../hooks/useAuth';
import {
  Email, Password, InputText
} from '../Shared/Input';
import Alert from '../Shared/Alert';
import { Button, ProgressBar } from '../Shared/Elements';
import {User} from "../../models";

function SignUp({ alert: defaultAlert }) {
  const { setAuth } = useAuth();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [status, setStatus] = useState();
  const [password, setPassword] = useState();
  const [firstNameErrors, setFirstNameError] = useState(null);
  const [lastNameErrors, setLastNameError] = useState(null);
  const [emailErrors, setEmailErrors] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState(null);
  const [alert, setAlert] = useState(defaultAlert);
  const [showAlert, setShowAlert] = useState(true);
  const form = useRef();
  const canContinue = !!(!firstNameErrors && !lastNameErrors && !emailErrors && !passwordErrors && email && password);

  const handleFirstNameChange = e => {
    setFirstName(e.target.value);
    const { error } = Validate('signup', { firstName: e.target.value });
    setFirstNameError(error ? error.details : undefined);
  };
  const handleLastNameChange = e => {
    setLastName(e?.target?.value);
    const { error } = Validate('signup', { lastName: e?.target?.value });
    setLastNameError(error ? error.details : undefined);
  };
  const handleEmailChange = e => {
    setEmail(e.target.value);
    const { error } = Validate('signup', { email: e.target.value });
    setEmailErrors(error ? error.details : undefined);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
    const { error } = Validate('signup', { password: e.target.value });
    setPasswordErrors(error ? error.details : undefined);
  };

  const ValidateInputs = () => {
    handleEmailChange({ target: { value: email } });
    handlePasswordChange({ target: { value: password } });
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = data => {
    setAlert(data || defaultAlert);
    setShowAlert(true);
  };
  const handleSignupSuccess = () => {
    // setSignupSuccess(true);
  };
  const handleSignUp = e => {
    e.preventDefault();
    if (status !== 'pending') {
      if (!canContinue) {
        ValidateInputs();
      } else {
        setStatus('pending');
        const user = {
          email,
          firstName,
          lastName,
          password
        };
        console.log('Attempting to sign up with:', user);
        signUp(user, (err, data) => {
          if (err) {
            setStatus('fail');
            const errorMessage = err?.response?.data?.message || err?.response?.data?.errors?.[0]?.defaultMessage || "Something went wrong during signup";
            handleShowAlert({ type: 'err', message: errorMessage });
          } else {
            setStatus('success');
            handleShowAlert({ type: 'info', message: "Account created successfully, you can now login to your account!" });
          }
        });
      }
    }
  };

  return (
    <div className="signUpContainer loginContainer">
      <div className="row loginContent">
        <div className="col-12 right d-flex justify-content-center align-items-center">
          <div className="c-f-u-content">
            <div className="c-f-content">
              {status === 'pending' && (<ProgressBar />)}
              <div className="c-f-i-content py-4 px-5">
                {(showAlert && alert) && (<Alert info={alert} handleCloseAlert={handleCloseAlert} />)}
                <div className="c-content-fields w-auto">
                  <h6>Sign Up 🤞</h6>
                  <form
                    onSubmit={handleSignUp}
                    className="needs-validation"
                    ref={form}
                  >
                    <InputText
                      handleOnChange={handleFirstNameChange}
                      value={firstName}
                      label={"First name"}
                      errors={firstNameErrors}
                      labeled
                    />
                    <InputText
                      handleOnChange={handleLastNameChange}
                      value={lastName}
                      label={"Last name"}
                      errors={lastNameErrors}
                      labeled
                    />
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
                    <Button label="Sign Up" classes={`primary-button mt-3`} />
                  </form>
                </div>
              </div>
            </div>
            <div className="f-c-link-b w-auto py-3 d-flex justify-content-center align-items-center">
              <div className="d-flex flex-row">
                <span className="px-1">Already have an account? </span>
                <Link to="/login" className={"text-blue"}> Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

import React, { useState } from 'react';
import InputField from '../UI/InputField/InputField.tsx';
import { Link } from 'react-router-dom';
import PasswordVisibilityButton from '../UI/Button/PasswordVisiblityButton/PasswordVisibilityButton.tsx';

interface IuserName {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

function Registration() {
  const [userName, setUserName] = useState<IuserName>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [confrimPassword, setConfirmPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);

  function handlePasswordVisible(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  }

  function handleConfirmPasswordVisible(
    e: React.MouseEvent<HTMLButtonElement>,
  ) {
    e.preventDefault();
    setConfirmPasswordVisible(!confirmPasswordVisible);
  }

  function updateUserField(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserName(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSetConfirmPassword(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setConfirmPassword(event.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(userName);
    console.log(confrimPassword);
  }

  return (
    <div className="flex justify-center h-full items-center w-11/12 sm:w-8/12 md:w-1/2 lg:w-5/12 mx-auto">
      <div className="bg-gray-800 text-gray-200 rounded-sm shadow-lg shadow-gray-900 p-4">
        <h2 className="text-center text-2xl text-gray-200 my-10">
          Create an Account!
        </h2>
        <form onSubmit={handleSubmit} className="mx-auto my-8">
          <div className="flex justify-between gap-3 my-2">
            <div>
              <label className="text-gray-300 block my-2">First Name</label>
              <InputField
                type="text"
                name="firstname"
                placeholder="John"
                value={userName.firstname}
                onChange={updateUserField}
              />
            </div>
            <div>
              <label className="text-gray-300 block my-2">Last Name</label>
              <InputField
                type="text"
                name="lastname"
                placeholder="Doe"
                value={userName.lastname}
                onChange={updateUserField}
              />
            </div>
          </div>
          <div className="my-2">
            <label className="text-gray-300 block my-2">Email</label>
            <InputField
              type="email"
              name="email"
              placeholder="example@example.com"
              value={userName.email}
              onChange={updateUserField}
            />
          </div>
          <div className="my-2">
            <label className="text-gray-300 block my-2">Password</label>
            <div className="flex flex-row bg-gray-700 focus-within:ring focus:ring-blue-500 focus-within:ring-blue-500 rounded w-full text-gray-300 outline-none">
              <InputField
                name="password"
                value={userName.password}
                placeholder="*********"
                type={passwordVisible ? "text" : "password"}
                onChange={updateUserField}
              />
              <PasswordVisibilityButton
                visible={passwordVisible}
                onClick={handlePasswordVisible}
              />
            </div>
          </div>
          <div className="mt-2 mb-8">
            <label className="text-gray-300 block my-2">Confirm Password</label>
            <div className="flex flex-row bg-gray-700 focus-within:ring focus:ring-blue-500 focus-within:ring-blue-500 rounded w-full text-gray-300 outline-none">
              <InputField

                placeholder="*********"
                value={confrimPassword}
                type={confirmPasswordVisible ? "text" : "password"}
                onChange={handleSetConfirmPassword}
              />
              <PasswordVisibilityButton
                visible={confirmPasswordVisible}
                onClick={handleConfirmPasswordVisible}
              />
            </div>
          </div>
          <div>
            <button className="w-full p-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-gray-200">
              Submit
            </button>
          </div>
          <div className="flex flex-col items-center my-4">
            <Link to="/" className="text-white text-xs">
              Login!
            </Link>
            <Link to="/" className="text-white text-xs">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;

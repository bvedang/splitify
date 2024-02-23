import Card from "../UI/Card/Card.tsx";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import InputField from "../UI/InputField/InputField.tsx";
import PasswordVisibilityButton from "../UI/Button/PasswordVisiblityButton/PasswordVisibilityButton.tsx";

function SignIn() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
    const [formError, setFormError] = useState<string>("")

    function handleEmailOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    function handlePasswordOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function handleShowPassword(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setPasswordVisible(!passwordVisible)
    }

    function isValidEmail(email: string) {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
    }

    function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormError("");
        const emailIsValid = isValidEmail(email);

        if (!emailIsValid) {
            setFormError("Please enter a valid email address.");
            return;
        }

        console.log(email, password);
    }

    return (
        <div className="flex grow flex-col items-center justify-center">
            <Card>
                <div className="py-8">
                    <h2 className="text-center text-2xl text-gray-300 pb-4">Login</h2>
                    <form className="flex flex-col w-full mx-auto" onSubmit={handleLoginSubmit}>
                        {formError &&
                            <>
                                {/*//add error icon here*/}
                                <p className="text-center text-red-600">{formError}</p>
                            </>}
                        <div className="my-2">
                            <p>
                                <label className="">Email</label>
                            </p>
                            <InputField value={email}
                                        onChange={handleEmailOnChange}
                                        placeholder="email@example.com"
                                        type="email"
                                        required
                                        className="focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="my-4">
                            <p><label>Password</label></p>
                            <div
                                className="flex flex-row bg-gray-700 focus-within:ring focus:ring-blue-500 focus-within:ring-blue-500 rounded w-full text-gray-300 outline-none">
                                <InputField value={password}
                                            onChange={handlePasswordOnChange}
                                            placeholder="Password"
                                            type={passwordVisible ? "text" : "password"}
                                />
                                <PasswordVisibilityButton visible={passwordVisible} onClick={handleShowPassword}/>
                            </div>
                        </div>
                        <div className="flex flex-row justify-end my-2">
                            <Link className="text-white underline" to="/">Forgot Password?</Link>
                        </div>
                        <div className="my-2">
                            <button type="submit"
                                    className="p-2 w-full bg-blue-600 rounded-md text-gray-200 hover:bg-blue-700 transition-all duration-300">Submit
                            </button>
                        </div>

                    </form>
                </div>
            </Card>
        </div>
    )

}

export default SignIn
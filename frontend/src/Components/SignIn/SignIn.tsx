import Card from "../UI/Card/Card.tsx";
import {Link} from "react-router-dom";
import {useState} from "react";

function SignIn() {

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

    function handleShowPassword(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setPasswordVisible(!passwordVisible)
    }

    return (
        <div className="flex grow flex-col items-center justify-center">
            <Card>
                <div className="py-8">
                    <h2 className="text-center text-2xl text-gray-300 pb-4">Login</h2>
                    <form className="flex flex-col w-full mx-auto">
                        <div className="my-2">
                            <p><label className="">Email</label></p>
                            <input
                                placeholder="email@example.com"
                                type="email"
                                className="bg-gray-700 focus:ring focus:ring-blue-500 flex rounded w-full p-2 text-gray-200 outline-none"/>
                        </div>
                        <div className="my-2">
                            <p><label>Password</label></p>
                            <div
                                className="flex flex-row bg-gray-700 focus-within:ring focus:ring-blue-500 focus-within:ring-blue-500 rounded w-full text-gray-300 outline-none">
                                <input
                                    placeholder="Password"
                                    className="bg-gray-700 flex rounded w-full p-2 text-gray-200 focus:outline-none active:outline-none"
                                    type={passwordVisible ? "text" : "password"}/>
                                <button className="mr-2" onClick={handleShowPassword}>
                                    {passwordVisible ?
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                      strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                        </svg>
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-row justify-end my-2">
                            <Link className="text-white underline" to="/">Forgot Password?</Link>
                        </div>
                        <div className="my-2">
                            <button
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
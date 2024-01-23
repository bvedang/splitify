import Modal from "../../Components/Modal/Modal";
import React, {useContext, useState} from "react";
import {Person} from "../../context/types";
import AppContext from "../../context/AppContext";
import Toast from "../../Components/UI/Toast/Toast";

export default function Users() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const context = useContext(AppContext);
    if (!context) {
        throw new Error("Users must be used within AppProvider");
    }

    const {registeredUsers, addUser, handleUpdateRegisteredUsers} = context;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [user, setUser] = useState<Person>({
        firstName: "",
        lastName: "",
        initials: "",
        id: ""
    });

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    function deleteUser(index: number) {
        const updatedUsers = registeredUsers.filter((_, i) => i !== index);
        handleUpdateRegisteredUsers(updatedUsers);
    }

    function editUser(index: number) {
        setUser(registeredUsers[index]);
        setEditIndex(index);
        setIsOpen(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const clearAndClose = () => {
        setUser({firstName: "", lastName: "", initials: "", id: ""});
        setIsOpen(false);
    };

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedUsers = registeredUsers.map((u, i) =>
                i === editIndex ? user : u
            );
            handleUpdateRegisteredUsers(updatedUsers);
            setEditIndex(null);
        } else {
            addUser(user);
            setToastMessage("New user added successfully!");
        }
        clearAndClose();
    };

    const closeToast = () => {
        setToastMessage(null);
    };

    return (
        <div className="container mx-auto">
            {toastMessage && <Toast message={toastMessage} onClose={closeToast}/>}
            <h2 className="text-gray-400 text-3xl my-10 text-center font-bold">User Management</h2>
            <div className="container flex mx-auto justify-end p-4 mb-2">
                <button
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md shadow-blue-600/50 transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 active:bg-blue-800"
                    onClick={toggleModal}>
                    Add User
                </button>
            </div>
            <div className="container mx-auto mb-2 w-11/12 md:w-2/3 lg:w-1/2">
                {registeredUsers.length > 0 && <ul className="flex flex-col text-gray-300 bg-gray-800 rounded min-w-full p-2 item shadow-md">
                    {registeredUsers.map((person: Person, index: number) => (
                        <li key={index} className="flex w-full justify-between items-center p-2 rounded hover:cursor-pointer transition-all duration-300">
                            <div className="flex w-3/4 justify-between">
                                <span>{person.firstName}</span>
                                <span>{person.lastName}</span>
                                <span>{person.initials}</span>
                            </div>
                            <div className="flex w-1/4 mx-2 justify-end gap-2">
                                <button
                                    className="bg-gray-700 text-gray-300 hover:bg-gray-600 font-semibold p-2 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 active:bg-gray-800 shadow-gray-400/10"
                                    onClick={() => editUser(index)}
                                >
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        height="1em"
                                        width="1em"
                                    >
                                        <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                                    </svg>
                                </button>
                                <button
                                    className="bg-red-700 text-gray-300 hover:bg-red-900 font-semibold p-2 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-75 active:bg-red-800 shadow-red-700/10"
                                    onClick={() => deleteUser(index)}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        height="1em"
                                        width="1em"
                                    >
                                        <path
                                            d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/>
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>}
                <Modal isOpen={isOpen} onClose={clearAndClose}>
                    <div className="w-full">
                        <form className="flex flex-col" onSubmit={handleSubmitForm}>
                            <div className="">
                                <label htmlFor="firstName" className="text-gray-300">First name</label>
                                <input
                                    value={user.firstName}
                                    type="text"
                                    id="firstName"
                                    required
                                    onChange={handleInputChange}
                                    name="firstName"
                                    placeholder="e.g. John"
                                    className="bg-gray-700 focus:ring focus:ring-blue-500 flex rounded w-full px-4 py-2 text-gray-300 outline-none mb-3"
                                />
                                <label htmlFor="lastName" className="text-gray-300">Last name</label>
                                <input
                                    value={user.lastName}
                                    type="text"
                                    required
                                    id="lastName"
                                    onChange={handleInputChange}
                                    name="lastName"
                                    placeholder="e.g. Doe"
                                    className="bg-gray-700 focus:ring focus:ring-blue-500 flex rounded w-full px-4 py-2 text-gray-300 outline-none mb-3"
                                />
                                <label htmlFor="initials" className="text-gray-300">Initials</label>
                                <input
                                    value={user.initials}
                                    type="text"
                                    id="initials"
                                    required
                                    name="initials"
                                    onChange={handleInputChange}
                                    placeholder="e.g. JD"
                                    className="bg-gray-700 focus:ring focus:ring-blue-500 flex rounded w-full px-4 py-2 text-gray-300 outline-none mb-3"
                                />
                                <label htmlFor="id" className="text-gray-300 ">Id</label>
                                <input
                                    value={user.id}
                                    type="text"
                                    id="id"
                                    required
                                    name="id"
                                    onChange={handleInputChange}
                                    placeholder="e.g. ID"
                                    className="bg-gray-700 focus:ring focus:ring-blue-500 flex rounded w-full px-4 py-2 text-gray-300 outline-none mb-9"
                                />
                            </div>

                            <div className="flex justify-around gap-2">
                                <button
                                    className="px-4 py-2 bg-gray-600 text-gray-300 rounded w-full shadow-md hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:ring active:bg-gray-500 transition ease-in-out duration-300"
                                    onClick={clearAndClose}
                                    type="button"
                                >
                                    Cancel
                                </button>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded w-full shadow-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring active:bg-blue-600 transition ease-in-out duration-300" type="submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

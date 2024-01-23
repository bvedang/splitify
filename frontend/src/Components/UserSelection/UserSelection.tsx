import React from "react";
import {Person} from "../../context/types.ts";
import Chip from "../UI/Chip/Chip.tsx";

type UserSelectionProp = {
    searchTerm: string;
    registeredUsers: Person[];
    selectedUsers: Person[];
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectedUsers: (user: Person, isSelected: boolean) => void;
    prevStep?: () => void;
    confirmAndClose: () => void;
}

const UserSelection: React.FC<UserSelectionProp> = ({
                                                        searchTerm,
                                                        registeredUsers,
                                                        selectedUsers,
                                                        handleSearchChange,
                                                        handleSelectedUsers,
                                                        prevStep,
                                                        confirmAndClose
                                                    }) => {
    return (
        <div className="container mx-auto">
            <section className="grid gap-6 auto-rows-auto">
                <div className="mt-2 mb-4">
                    <input
                        className="bg-gray-700 focus:ring focus:ring-blue-500 flex rounded w-full px-4 py-2 text-gray-300 outline-none mb-3"
                        placeholder="Search for a friend..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <div className="flex flex-wrap text-xs before:mr-1 md:before:content-['ℹ️'] italic text-gray-300">
                        Search and select friends to add them to the bill.
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-gray-300 mb-2 uppercase font-bold">Select From Friends</p>
                    <ul className="h-52 max-h-52 overflow-scroll bg-gray-700 rounded shadow-md flex flex-col">
                        {registeredUsers.filter(user =>
                            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((user, index) => {
                            const isChecked = selectedUsers.some(selectedItem => selectedItem.id === user.id);

                            return (
                                <li key={index} className="w-full px-2 py-1 rounded min-h-fit cursor-pointer hover:bg-gray-800 transition-all duration-300 hover:border hover:border-gray-600 border border-transparent">
                                    <label
                                        className="flex items-center cursor-pointer p-2 text-gray-300 leading-6 w-full">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) => handleSelectedUsers(user, e.target.checked)}
                                            className="accent-amber-600 mr-1 checked:accent-amber-600 focus:ring-1 focus:ring-amber-600"
                                        />
                                        {user.firstName} {user.lastName}
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
            <section className="flex flex-col">
                <div className="mb-4">
                    <p className="text-gray-300 mb-2 uppercase font-bold">Selected Friends</p>
                    <div
                        className="flex flex-wrap justify-center items-center h-16 max-h-16 overflow-scroll bg-gray-700 rounded shadow-md">
                        {selectedUsers.map((user, index) => {
                            return (<Chip key={index} label={user.firstName} onDelete={() => {
                                handleSelectedUsers(user, false)
                            }}/>)
                        })}

                    </div>
                </div>
                <div className="flex mb-4 justify-between gap-2">
                    <button className="px-4 py-2 bg-gray-600 text-gray-300 rounded w-full shadow-md hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:ring active:bg-gray-500 transition ease-in-out duration-300" onClick={prevStep}>Back
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded w-full shadow-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring active:bg-blue-600 transition ease-in-out duration-300"
                            onClick={confirmAndClose}>Confirm
                    </button>
                </div>
            </section>
        </div>)

}
export default UserSelection;


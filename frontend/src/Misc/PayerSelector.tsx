import {useContext, useEffect, useRef, useState} from "react";
import {Person} from "../context/types";
import AppContext from "../context/AppContext";

type Props = {
    onSelectPayer: (payer: Person) => void;
    nextStep: () => void;
};

export default function PayerSelector({onSelectPayer, nextStep}: Props) {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("Users must be used within AppProvider");
    }

    const {registeredUsers} = context;
    let dropdownCloseTimeoutId: number | null = null;
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<Person[]>([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedPayer, setSelectedPayer] = useState<Person>({
        id: "",
        firstName: "",
        lastName: "",
        initials: "",
    });

    const handleSelectPayer = (payer: Person) => {
        setSelectedPayer(payer);
        setSearchTerm(""); // Clear the search term
        setDropdownVisible(false); // Close the dropdown
        onSelectPayer(payer); // Notify the parent component
        if (inputRef.current) inputRef.current.blur(); // Remove focus from the input
        if (dropdownCloseTimeoutId) clearTimeout(dropdownCloseTimeoutId);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setDropdownVisible(false);
        if (inputRef.current) inputRef.current.focus(); // Focus the input after clear
    };

    useEffect(() => {
        const results = registeredUsers.filter((payer) =>
            payer.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, registeredUsers]);

    function closeDropdownDelayed() {
        dropdownCloseTimeoutId = setTimeout(() => {
            setDropdownVisible(false);
        }, 100); // delay in milliseconds
    }

    return (
        <div className="container mx-auto grid grid-rows-3">
            <div className="p-2 mb-4">
                <div className="relative w-full">
                    <label htmlFor="payer" className="text-gray-300 block mb-2">Please select the payer:</label>
                    <input
                        id="payer"
                        ref={inputRef}
                        type="text"
                        className="bg-gray-700 focus:ring focus:ring-blue-500 flex rounded w-full p-4 text-gray-300 outline-none"
                        placeholder="Search payer by First Name ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setDropdownVisible(true)}
                        onBlur={closeDropdownDelayed}
                    />
                    {searchTerm && (
                        <button className="absolute right-4 p-1 top-1/2 cursor-pointer border-none text-gray-300"
                                onClick={handleClearSearch}>
                            ✖
                        </button>
                    )}
                </div>
                {isDropdownVisible && (
                    <ul className="absolute w-11/12 mt-1 max-h-40 overflow-scroll bg-gray-800 rounded shadow-lg z-10 border border-gray-600">
                        {searchResults.map((payer: Person, index) => (
                            <li
                                key={index}
                                className="w-full p-2 pl-4 cursor-pointer text-gray-300 bg-gray-700 hover:bg-gray-800 transition-all duration-300"
                                onClick={() => handleSelectPayer(payer)}
                                onMouseDown={(e) => e.preventDefault()} // To prevent the input blur event
                            >
                                {payer.firstName} {payer.lastName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="p-2 mb-4">
                {selectedPayer && <p>Payer: {selectedPayer.firstName}</p>}
            </div>

            <div className="flex items-end justify-between gap-2">
                <button
                    className="px-4 py-2 bg-amber-600 text-amber-100 rounded w-full hover:bg-amber-700 focus:outline-none focus:border-amber-700 focus:ring active:bg-amber-700 transition ease-in-out duration-300 shadow-md shadow-amber-600/50">Register
                    Payer
                </button>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded w-full shadow-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring active:bg-blue-600 transition ease-in-out duration-300 shadow-blue-600/50"
                    onClick={nextStep}>
                    Next
                </button>
            </div>
        </div>
    );
}

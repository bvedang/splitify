import React, {useContext} from "react";
import AppContext from "../../context/AppContext";

interface IBillForm {
    closeModal: () => void;
    prevStep: () => void;
    resetStep: () => void;
}

const BillForm: React.FC<IBillForm> = ({closeModal, prevStep, resetStep}) => {
    const billContext = useContext(AppContext);

    if (!billContext) {
        throw new Error("BillForm must be used within AppProvider");
    }

    const {billdata, handleBillData} =
        billContext;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        let newValue: string | number = value;
        if (value !== "" && (name === "amount" || name === "taxPercent")) {
            newValue = parseFloat(value);
            if (isNaN(newValue)) {
                newValue = 0;
            }
        }
        handleBillData({
            ...billdata,
            [name]: newValue,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data Submitted:", billdata);
        resetStep();
        closeModal();

        // Handle form submission (e.g., send data to an API)
    };
    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="container mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="text-gray-300 block mb-2">Name:</label>
                    <input
                        className="bg-gray-700 focus:ring focus:ring-blue-500 flex rounded w-full p-4 text-gray-300 outline-none"
                        placeholder="Costco.."
                        type="text"
                        id="name"
                        name="name"
                        value={billdata.name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="text-gray-300 block mb-2">Date:</label>
                    <input
                        className="bg-gray-700 focus:ring  focus:ring-blue-500 flex rounded w-full p-4 text-gray-300 outline-none"
                        type="date"
                        id="date"
                        name="date"
                        value={billdata.date}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4">

                    <label htmlFor="amount" className="text-gray-300 block mb-2">Amount:</label>

                    <input
                        className="bg-gray-700 focus:ring focus:ring-blue-500 flex rounded w-full p-4 text-gray-300 outline-none"
                        type="number"
                        id="amount"
                        name="amount"
                        value={billdata.amount}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-9">
                    <label htmlFor="taxPercent" className="text-gray-300 block mb-2">Tax %:</label>
                    <input
                        className="bg-gray-700 focus:ring focus:ring-blue-500 flex rounded w-full p-4 text-gray-300 outline-none"
                        type="number"
                        id="taxPercent"
                        name="taxPercent"
                        value={billdata.taxPercent}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex mb-4 justify-between gap-2">
                    <button type="button" className="px-4 py-2 bg-gray-600 text-gray-300 rounded w-full shadow-md hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:ring active:bg-gray-500 transition ease-in-out duration-300 shadow-gray-500/50" onClick={prevStep}>
                        Back
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded w-full shadow-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring active:bg-blue-600 transition ease-in-out duration-300 shadow-blue-600/50" type="submit">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
};

export default BillForm;

import React from "react";
import {Item} from "../../context/types.ts";

type ItemsDetailsInputProp={
    item:Item;
    handleNameChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    handleCostChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    handleIdChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    nextStep:()=>void;
    closeModal: ()=>void
}

const ItemsDetailsInput:React.FC<ItemsDetailsInputProp> = ({ item, handleNameChange, handleCostChange, handleIdChange, nextStep, closeModal })=>{
    return (<>
        <div>
            <label className="text-gray-300">Item Name</label>
            <input
                className="bg-gray-700 focus:ring focus:ring-blue-500 flex rounded w-full px-4 py-2 text-gray-300 outline-none mb-3"
                type="text"
                placeholder="Toilet Paper.."
                value={item.name}
                onChange={handleNameChange}
                required
            />
        </div>
        <div>
            <label className="text-gray-300">Cost</label>
            <input
                className="bg-gray-700 focus:ring focus:ring-blue-500 flex rounded w-full px-4 py-2 text-gray-300 outline-none mb-3"
                type="number"
                placeholder="$0.00"
                value={item.cost.toString()}
                onChange={handleCostChange}
                min="0"
                required
            />
        </div>
        <div>
            <label className="text-gray-300">Id</label>
            <input
                className="bg-gray-700 focus:ring focus:ring-blue-500 flex rounded w-full px-4 py-2 text-gray-300 outline-none mb-9"
                type="text"
                placeholder="1"
                value={item.id}
                onChange={handleIdChange}
                required
            />
        </div>
        <div className="flex mb-4 justify-between gap-2">
            <button className="w-full bg-gray-700 text-gray-300 hover:bg-gray-600 font-semibold p-2 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 active:bg-gray-800" onClick={closeModal}>Cancel</button>
            <button className="w-full bg-blue-600 text-gray-300 font-semibold py-2 px-4 rounded-lg shadow-md shadow-blue-600/50 transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 active:bg-blue-800" onClick={nextStep}>Next</button>
        </div>
    </>)
}

export default ItemsDetailsInput;
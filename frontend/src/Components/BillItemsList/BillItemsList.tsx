import NameIconCard from "../UI/NameIconCard/NameIconCard.tsx";
import {Item, Person} from "../../context/types.ts";
import React, {useState} from "react";
import useModal from "../../hooks/useModal.ts";
import Modal from "../Modal/Modal.tsx";


interface IBillItems extends Item {
    handleDeletePerson: (personId: string, itemIndex: number) => void
    itemIndex: number;
    deleteItem: (itemIndex: number) => void
    startEditItem: (itemIndex: number) => void
}

const BillItemsList: React.FC<IBillItems> = ({
                                                 name,
                                                 id,
                                                 cost,
                                                 people = [],
                                                 handleDeletePerson,
                                                 itemIndex,
                                                 deleteItem,
                                                 startEditItem
                                             }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalOpen, openModal, closeModal] = useModal();

    function toggleAccordion() {
        setIsExpanded(!isExpanded);
        console.log(id);
    }


    return (
        <div className="container mb-4 bg-gray-800 rounded p-2 shadow-lg shadow-gray-400/10">
            <div className="flex flex-col my-2 justify-between text-gray-300">
                <Modal title={"Delete Item"} isOpen={isModalOpen} onClose={closeModal}>
                    <div className="flex flex-col w-full mb-4">
                        <div className="p-2 text-gray-300">
                            {name} ${cost} will Be removed form the Items List
                        </div>
                        <div className="flex mb-4 justify-end gap-2">
                            <button
                                className=" px-4 py-2 bg-gray-600 text-gray-300 rounded shadow-md hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:ring active:bg-gray-500 transition shadow-gray-600/50 ease-in-out duration-300"
                                onClick={closeModal}>Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-gray-300 rounded shadow-md hover:bg-red-700 focus:outline-none focus:border-red-700 focus:ring active:bg-red-600 transition shadow-red-600/50 ease-in-out duration-300"
                                onClick={() => {
                                    deleteItem(itemIndex);
                                    closeModal()
                                }
                                }>Delete
                            </button>
                        </div>
                    </div>
                </Modal>
                <div className="flex justify-between items-center w-full capitalize">
                    <span className="px-2 py-4">{name}</span>
                    <span className="px-2 py-4">$ {cost}</span>
                    <div className="flex gap-1 items-center">
                        <button
                            className="bg-gray-700 text-gray-300 hover:bg-gray-600 font-semibold p-2 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 active:bg-gray-800"
                            onClick={() => startEditItem(itemIndex)}>
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
                            className="bg-gray-700 text-gray-300 hover:bg-gray-600 font-semibold p-2 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 active:bg-gray-800"
                            onClick={openModal}>
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
                        <button
                            className="bg-gray-700 text-gray-300 hover:bg-gray-600 font-semibold p-2 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 active:bg-gray-800"
                            onClick={toggleAccordion}>
                            <svg
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                height="1em"
                                width="1em"

                            >
                                {isExpanded ? (
                                    <path
                                        fillRule="evenodd"
                                        d="M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z"
                                    />
                                ) : (
                                    <path
                                        fillRule="evenodd"
                                        d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
                {isExpanded && <ul className="w-full flex flex-col flex-wrap">
                    {people.map((p: Person, index) => {
                        return (<li key={index}
                                    className="flex flex-row justify-between items-center w-full my-2 pl-2">
                            <NameIconCard deletePerson={() => {
                                handleDeletePerson(p.id, itemIndex);
                            }} firstName={p.firstName} lastName={p.lastName}/>
                        </li>)
                    })}
                </ul>
                }
            </div>
        </div>
    );
}
export default BillItemsList;
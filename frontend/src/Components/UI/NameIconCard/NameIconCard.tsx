import Modal from "../../Modal/Modal.tsx";
import useModal from "../../../hooks/useModal.ts";
import React from "react";

interface NameCard {
    deletePerson: () => void;
    firstName: string;
    lastName: string;
}

const NameIconCard: React.FC<NameCard> = ({firstName, lastName, deletePerson}) => {
    const [isOpen, openModal, closeModal] = useModal();
    return (<>
        <div>
            <span>{firstName} </span>
            <span>{lastName}</span>
        </div>
        <div>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="flex flex-col w-full mb-4">
                    <div className="p-4 text-gray-300 ">{firstName} {lastName} will not be considered in current
                        Item
                    </div>
                    <div className="flex mb-4 justify-between gap-2">
                        <button className="px-4 py-2 bg-gray-600 text-gray-300 rounded w-full shadow-md hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:ring active:bg-gray-500 transition shadow-gray-600/50 ease-in-out duration-300" onClick={closeModal}>Cancel</button>
                        <button className="px-4 py-2 bg-red-600 text-gray-300 rounded w-full shadow-md hover:bg-red-700 focus:outline-none focus:border-red-700 focus:ring active:bg-red-600 transition shadow-red-600/50 ease-in-out duration-300" onClick={() => {
                            deletePerson()
                            closeModal()
                        }
                        }>Delete
                        </button>
                    </div>
                </div>
            </Modal>
            <button
                className="bg-red-600 text-gray-300 hover:bg-red-700 font-semibold p-2 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 active:bg-red-700 shadow-red-600/10"
                onClick={openModal}>
                <svg
                    viewBox="0 0 21 21"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                >
                    <g
                        fill="none"
                        fillRule="evenodd"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M15.5 15.5l-10-10zM15.5 5.5l-10 10"/>
                    </g>
                </svg>
            </button>
        </div>
    </>);
}
export default NameIconCard;
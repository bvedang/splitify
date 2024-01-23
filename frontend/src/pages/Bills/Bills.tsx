import BillCard from "../../Components/BillCard/BillCard";
import BillSummary from "../../Components/BillSummary/BillSummary.tsx";
import Modal from "../../Components/Modal/Modal.tsx";
import React, {useContext, useEffect, useState} from "react";
import PayerSelector from "../../Misc/PayerSelector.tsx";
import AppContext from "../../context/AppContext.tsx";
import BillForm from "../../Forms/BillForm/BillForm.tsx";
import useModal from "../../hooks/useModal.ts";
import Chip from "../../Components/UI/Chip/Chip.tsx";
import useSelectableList from "../../hooks/useSelectableList.ts";
import {Item, Person, personItemSummary} from "../../context/types.ts";
import useStepManager from "../../hooks/useStepManager.ts";
import ItemsDetailsInput from "../../Components/ItemDetailsInput/ItemsDetailsInput.tsx";
import UserSelection from "../../Components/UserSelection/UserSelection.tsx";
import BillItemsList from "../../Components/BillItemsList/BillItemsList.tsx";


export default function Bills() {

    const context = useContext(AppContext);
    if (!context) {
        throw new Error("App must be used within AppProvider");
    }

    const {
        handleSelectedPayer,
        selectedPayer,
        billdata,
        registeredUsers
    } = context;

    const {name, date, taxPercent, amount} = billdata
    // Track whether modal for selecting bill payer is open:
    const [isPayerModalOpen, openPayerModal, closePayerModal] = useModal();
    // Track whether modal for selecting friends involved in the bill is open:
    const [isFriendsSelectorOpen, openFriendsSelector, closeFriendsSelector] = useModal();
    // Manage the list of people involved in the current bill:
    const [billParticipants, handleBillParticipants] = useSelectableList<Person>();
    // Manage steps within the multistep modal for bill creation (payer selection and basic bill info):
    const [billCreationStep, advanceBillCreationStep, goBackBillCreationStep, resetBillCreationSteps] = useStepManager(1, 2);

    // Store the search term for filtering friends when the friends selector modal is open:
    const [friendSearchTerm, setFriendSearchTerm] = useState<string>("");
    const handleFriendSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFriendSearchTerm(e.target.value);
    };

    // Store bill items:
    const [billItems, setBillItems] = useState<Item[]>([]);

// Manage details of the currently active item:
    const [currentBillItem, setCurrentBillItem] = useState<Item>({
        name: "",
        cost: 0,
        id: "",
        people: []
    });
//
// Manage modal visibility for item addition/editing:
    const [isItemModalOpen, openItemModal, closeItemModal] = useModal();

// Filter friends for item-specific selection:
    const [itemParticipantSearchTerm, setItemParticipantSearchTerm] = useState<string>('');

// Manage list of people involved in the bill and select individuals for each item:
    const [itemParticipants, handleItemParticipants, clearItemParticipants, updateItemParticipants] = useSelectableList<Person>();

// Manage steps within multistep item addition/editing modal:
    const [itemManagementStep, advanceItemManagementStep, goBackItemManagementStep, resetItemManagementSteps] = useStepManager(1, 2);

// Track the index of the item being edited:
    const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
    const [allParticipantsSummaries, setAllParticipantsSummaries] = useState<Record<string, personItemSummary[]>>({});

    const generateBillSummariesForAllParticipants=(billParticipants:Person[], billItems:Item[]) =>{
        const summaries:Record<string, personItemSummary[]> = {};

        billParticipants.forEach(person => {
            summaries[person.id] = getPersonalBillSummary(person.id, billItems);
        });

        return summaries;
    }

    useEffect(() => {
        const summaries = generateBillSummariesForAllParticipants(billParticipants, billItems);
        setAllParticipantsSummaries(summaries);
    }, [billItems,billParticipants]);
    function startEditItem(itemIndex: number) {
        setEditingItemIndex(itemIndex);
        setCurrentBillItem(billItems[itemIndex]);
        updateItemParticipants(billItems[itemIndex].people);
        openItemModal();
    }

    function cancelEdit() {
        setCurrentBillItem({name: "", cost: 0, id: "", people: []});
        setEditingItemIndex(null);
        resetItemManagementSteps();
        clearItemParticipants();
        closeItemModal()
    }


    function addItemToList() {
        const newItem: Item = {...currentBillItem, people: [...itemParticipants]};
        setBillItems(currentItems => {
            if (editingItemIndex !== null) {
                return currentItems.map((itm, idx) => idx === editingItemIndex ? newItem : itm);
            } else {
                return [...currentItems, newItem]
            }
        })
        setCurrentBillItem({name: "", cost: 0, id: "", people: []});
        resetItemManagementSteps();
        clearItemParticipants();
        closeItemModal()
    }

    function deleteItem(itemIndex: number) {
        setBillItems(currentItems => currentItems.filter((_, index) => index != itemIndex));
    }

    function removePersonFromItem(personId: string, itemIndex: number) {
        setBillItems(currentItems =>
            currentItems.map((item, index) =>
                index === itemIndex
                    ? {...item, people: item.people.filter(person => person.id !== personId)}
                    : item
            )
        );
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentBillItem(prevState => ({...prevState, name: e.target.value}))
    }

    const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentBillItem(prevState => ({...prevState, cost: parseFloat(e.target.value)}))
    }

    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentBillItem(prevState => ({...prevState, id: e.target.value}))
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemParticipantSearchTerm(e.target.value);
    };

    function calculateTotalSharePerPerson(items: Item[], people: Person[]): Map<string, number> {
        const totalSharePerPerson = new Map<string, number>();

        // Initialize total share for each person with zero
        people.forEach(person => {
            totalSharePerPerson.set(person.id, 0);
        });

        items.forEach(item => {
            const sharePerPerson = item.cost / item.people.length;
            item.people.forEach(person => {
                const currentTotal = totalSharePerPerson.get(person.id) || 0;
                totalSharePerPerson.set(person.id, currentTotal + sharePerPerson);
            });
        });

        return totalSharePerPerson;
    }

    function getPersonNameById(personId: string, people: Person[]): string {
        const person = people.find(p => p.id === personId);
        return person ? `${person.firstName} ${person.lastName}` : 'Unknown';
    }

    function getPersonalBillSummary(personId:string, billItems:Item[]):personItemSummary[] {
        const personalItems = billItems.filter(item =>
            item.people.some(person => person.id === personId)
        );

        return personalItems.map(item => {
            const sharePerPerson:number = item.cost / item.people.length;
            return {
                name: item.name,
                totalCost: item.cost,
                personalShare: sharePerPerson
            };
        });
    }




    const renderItemSteps = () => {
        switch (itemManagementStep) {
            case 1:
                return (
                    <ItemsDetailsInput
                        item={currentBillItem}
                        handleCostChange={handleCostChange}
                        handleIdChange={handleIdChange}
                        handleNameChange={handleNameChange}
                        nextStep={advanceItemManagementStep}
                        closeModal={() => {
                            cancelEdit();
                            closeItemModal();
                        }}
                    />
                );
            case 2:
                return (
                    <UserSelection
                        searchTerm={itemParticipantSearchTerm}
                        handleSearchChange={handleSearchChange}
                        registeredUsers={billParticipants}
                        selectedUsers={itemParticipants}
                        handleSelectedUsers={handleItemParticipants}
                        prevStep={goBackItemManagementStep}
                        confirmAndClose={() => {
                            addItemToList();
                            closeItemModal();
                        }}
                    />
                );
            default:
                return (<h1> Something went wrong</h1>);
        }
    }

    const renderBillInformationStep = () => {
        switch (billCreationStep) {
            case 1:
                return (
                    <PayerSelector
                        onSelectPayer={handleSelectedPayer}
                        nextStep={advanceBillCreationStep}
                    />
                );
            case 2:
                return <BillForm prevStep={goBackBillCreationStep} resetStep={resetBillCreationSteps}
                                 closeModal={closePayerModal}/>;
            default:
                return <div>Unknown step</div>;
        }
    };
    return (
        <div className="container mx-auto">
            <h3 className="text-gray-300 text-3xl text-center font-bold my-10">Bill Management</h3>
            <div className="container mx-auto p-4 flex justify-end mb-10">
                <button
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md shadow-blue-600/50 transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 active:bg-blue-800 "
                    onClick={openPayerModal}>New Bill
                </button>
            </div>
            <Modal title={`Step ${billCreationStep} of 2`} isOpen={isPayerModalOpen} onClose={closePayerModal}>
                {renderBillInformationStep()}
            </Modal>


            <BillCard
                billName={name}
                payer={`${selectedPayer.firstName} ${selectedPayer.lastName}`}
                amount={amount}
                taxPercent={taxPercent}
                date={date}
            />
            <div className="container mx-auto p-4 flex justify-end mb-10">
                <button
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md shadow-blue-600/50 transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 active:bg-blue-800"
                    onClick={openFriendsSelector}>Add People
                </button>
            </div>

            <Modal isOpen={isFriendsSelectorOpen} onClose={closeFriendsSelector}>
                <div className="container mx-auto">
                    <section className="grid gap-6 auto-rows-auto">
                        <div className="mt-2 mb-4">
                            <input
                                className="bg-gray-700 focus:ring focus:ring-blue-500 flex rounded w-full p-4 text-gray-300 outline-none mb-3 "
                                placeholder="Search for a friend..."
                                value={friendSearchTerm}
                                onChange={handleFriendSearchChange}
                            />
                            <div className="flex flex-wrap text-xs before:mr-1 md:before:content-['ℹ️'] italic text-gray-300">
                                Search and select friends to add them to the bill.
                            </div>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-300 mb-2 uppercase font-bold">Select From Friends</p>
                            <ul className="h-52 max-h-52 overflow-scroll bg-gray-700 rounded shadow-md flex flex-col">
                                {registeredUsers.filter(user =>
                                    user.firstName.toLowerCase().includes(friendSearchTerm.toLowerCase()) ||
                                    user.lastName.toLowerCase().includes(friendSearchTerm.toLowerCase())
                                ).map((user, index) => {
                                    const isChecked = billParticipants.some(selectedItem => selectedItem.id === user.id);

                                    return (
                                        <li key={index} className="w-full px-2 py-1 rounded min-h-fit cursor-pointer hover:bg-gray-800 transition-all duration-300 hover:border hover:border-gray-600 border border-transparent">
                                            <label className="flex items-center cursor-pointer p-2 text-gray-300 leading-6 w-full">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={(e) => handleBillParticipants(user, e.target.checked)}
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
                            <p className="text-gray-300 mb-2 uppercase font-bold">Selected for Bill</p>
                            <div className="flex flex-wrap justify-center items-center h-16 max-h-16 overflow-scroll bg-gray-700 rounded shadow-md">
                                {billParticipants.map((user, index) => {
                                    return (<Chip key={index} label={user.firstName} onDelete={() => {
                                        handleBillParticipants(user, false)
                                    }}/>)
                                })}
                            </div>
                        </div>
                        <div className="flex mb-4 justify-between gap-2">
                            <button className="px-4 py-2 bg-gray-600 text-gray-300 rounded w-full shadow-md hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:ring active:bg-gray-500 transition ease-in-out duration-300" onClick={() => {
                                closeFriendsSelector();
                            }}>Cancel
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded w-full shadow-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring active:bg-blue-600 transition ease-in-out duration-300"
                                    onClick={closeFriendsSelector}>Confirm
                            </button>
                        </div>
                    </section>
                </div>
            </Modal>
            <div className="container mx-auto flex justify-end mb-10 flex-col w-11/12 md:w-2/3 lg:w-1/2">
                <p className="text-gray-300 mb-4 uppercase font-bold ">Selected for Bill</p>
                <div className="w-full flex flex-col rounded flex-wrap bg-gray-800 mx-auto p-4 mb-4 max-h-36 h-36 gap-1 overflow-scroll justify-center">
                    {billParticipants.map((user, index) => {
                        return (<Chip key={index} label={user.firstName} onDelete={() => {
                            handleBillParticipants(user, false)
                        }}/>)
                    })}
                </div>
            </div>
            <div className="container mx-auto flex justify-end mb-10 flex-col w-11/12 md:w-2/3 lg:w-1/2">
                <div className="flex justify-between items-center mb-4" >
                    <p className="text-gray-300 uppercase font-bold ">Add Items to Bill</p>
                    <button className="bg-blue-600 text-gray-300 hover:bg-blue-700 shadow-md shadow-blue-600/50 font-semibold p-2 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-75 active:bg-blue-800" onClick={openItemModal}>
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="white"
                            height="1em"
                            width="1em"
                        >
                            <defs>
                                <style/>
                            </defs>
                            <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"/>
                            <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"/>
                        </svg>
                    </button>
                </div>
                <Modal title={`Step ${billCreationStep} of 2`} isOpen={isItemModalOpen} onClose={() => {
                    closeItemModal();
                    cancelEdit();
                }}>
                    <section className="container">
                        {renderItemSteps()}
                    </section>

                </Modal>
                {billItems.map((item, index) => {
                    return (
                        <BillItemsList startEditItem={startEditItem} deleteItem={deleteItem} key={index}
                                       itemIndex={index}
                                       id={item.id} name={item.name} cost={item.cost} people={item.people}
                                       handleDeletePerson={removePersonFromItem}/>)
                })}


            </div>

            <BillSummary allParticipantsSummaries={allParticipantsSummaries} billItems={billItems} billParticipants={billParticipants}
                         calculateTotalSharePerPerson={calculateTotalSharePerPerson}
                         getPersonNameById={getPersonNameById}/>
        </div>
    );
}

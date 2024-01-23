import React, { useState } from "react";
import AppContext from "./AppContext";
import { AppState, Person, BillData } from "./types";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [registeredUsers, setRegisteredUsers] = useState<Person[]>([]);
  // Function to add a new user

  function handleUpdateRegisteredUsers(updatedRegisteredUser: Person[]) {
    setRegisteredUsers(updatedRegisteredUser);
  }
  const addUser = (newUser: Person) => {
    setRegisteredUsers([...registeredUsers, newUser]);
  };
  const [billdata, setBillData] = useState<BillData>({
    name: "",
    date: "",
    amount: 0,
    taxPercent: 0,
  });
  const [selectedPayer, setSelectedPayer] = useState<Person>({
    id:"",
    firstName: "",
    lastName: "",
    initials: "",
  });
  const onSelectPayer = (payer: number | null) => {
    console.log(payer);
  };


  const handleIsDropDownVisible = (state: boolean) => {
    setDropdownVisible(state);
  };

  const handleSelectedPayer = (payer: Person) => {
    setSelectedPayer(payer);
  };

  const handleBillData = (billdata: BillData) => {
    setBillData(billdata);
  };

  const initialState: AppState = {
    onSelectPayer,
    searchResults: [],
    isDropdownVisible,
    billdata,
    selectedPayer,
    handleSelectedPayer,
    handleIsDropDownVisible,
    handleBillData,
    registeredUsers,
    addUser,
    handleUpdateRegisteredUsers,
  };

  return (
    <AppContext.Provider value={initialState}>{children}</AppContext.Provider>
  );
};

export default AppProvider;

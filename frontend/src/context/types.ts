export interface AppState {
  selectedPayer: Person;
  handleSelectedPayer: (payer: Person) => void;
  onSelectPayer: (payer: number | null) => void;
  searchResults: Person[];
  isDropdownVisible: boolean;
  handleIsDropDownVisible: (state: boolean) => void;
  billdata: BillData;
  handleBillData: (billData: BillData) => void;
  registeredUsers: Person[];
  addUser: (newPerson: Person) => void;
  handleUpdateRegisteredUsers: (updatedRegisteredUser: Person[]) => void;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  initials: string;
}

export interface BillData {
  name: string;
  date: string;
  amount: number;
  taxPercent: number;
}

export interface Item{
  id:string;
  name:string;
  cost:number;
  people:Person[]
}

export interface personItemSummary{
  name: string;
  totalCost: number
  personalShare: number
}
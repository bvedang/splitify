import {useState} from "react";


const useSelectableList = <T extends {id:string}>():[T[],(item:T,isChecked:boolean)=>void,()=>void, (items:T[])=>void] =>{
    const [selectedItems, setSelectedItems] = useState<T[]>([]);
    const handleItemSelection = (item:T,isChecked:boolean)=>{
        if (isChecked) {
            // Add the item if it's checked and not already in the list
            if (!selectedItems.some(selectedItem => selectedItem.id === item.id)) {
                setSelectedItems([...selectedItems, item]);
            }
        } else {
            // Remove the item if it's unchecked
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id));
        }
    }

    const updateSelectedItems = (items:T[])=>{
        setSelectedItems(items);
    }
    const clearSelectedItems = () => {
        setSelectedItems([]);
    };
    return [selectedItems, handleItemSelection, clearSelectedItems, updateSelectedItems]
}

export default useSelectableList;
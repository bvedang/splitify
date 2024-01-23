import {useState, useCallback} from "react";

const useModal = ():[boolean, () => void, () => void] =>{
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const openModal = useCallback(()=>{
        setModalOpen(true);
    },[]);
    const closeModal = useCallback(()=>{
        setModalOpen(false)
    },[])
    return [isModalOpen, openModal, closeModal];
}

export default  useModal;
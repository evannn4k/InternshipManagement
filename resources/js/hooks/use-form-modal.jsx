import { useState } from "react";

export default function useFormModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(false);

    // modal delete
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    
    // modal form create dan ediy
    const openCreate = () => {
        setIsOpen(true);
        setSelectedData(null);
    };

    const openEdit = (data) => {
        setIsOpen(true);
        setSelectedData(data);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedData(null);
    };

    // modal delete
    const openDelete = (data) => {
        setIsOpenDelete(true);
        setSelectedData(data);
    };

    const closeDelete = () => {
        setIsOpenDelete(false);
        setSelectedData(null);
    };

    return {
        isOpen,
        isEdit: Boolean(selectedData),
        data: selectedData,
        openCreate,
        openEdit,
        closeModal,

        isOpenDelete,
        openDelete,
        closeDelete,
    };
}

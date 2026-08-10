import { useState } from "react";

export function useModal() {
    const [modal, setModal] = useState(null);
    const [selectedData, setSelectedData] = useState(null);

    // modal form create dan ediy
    const openModal = (type, data = null) => {
        setModal(type);
        setSelectedData(data);
    };

    const closeModal = () => {
        setModal(null);
        setSelectedData(null);
    };

    return {
        isOpen: (type) => modal == type,
        data: selectedData,
        openModal,
        closeModal,
        openCreate: () => openModal("create"),
        openEdit: (data) => openModal("edit", data),
        openDelete: (data) => openModal("delete", data),
    };
}

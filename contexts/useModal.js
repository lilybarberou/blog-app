import { useState } from 'react';

const useModal = (keys) => {
    const initModalsObj = keys.reduce((acc, cur) => {
        acc[cur] = false;
        return acc;
    }, {});

    const [modals, setModals] = useState(initModalsObj);

    const isOpen = (modalName) => modals[modalName];

    const open = (modalName) => {
        document.body.style.overflow = 'hidden';
        setModals({ ...modals, [modalName]: true });
    };

    const close = (modalName) => {
        document.body.style.overflow = 'unset';
        setModals({ ...modals, [modalName]: false });
    };

    const toggle = (modalName) => {
        if (isOpen(modalName)) {
            close(modalName);
        } else {
            open(modalName);
        }
    };

    return { isOpen, toggle, open, close };
};

export default useModal;

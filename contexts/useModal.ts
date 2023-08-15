import { useState } from 'react';

const useModal = (keys: string[]) => {
    const initModalsObj = keys.reduce((acc, cur) => {
        acc[cur] = false;
        return acc;
    }, {} as { [key: string]: boolean });

    const [modals, setModals] = useState(initModalsObj);

    const isOpen = (modalName: string) => modals[modalName];

    const open = (modalName: string) => {
        document.body.style.overflow = 'hidden';
        setModals({ ...modals, [modalName]: true });
    };

    const close = (modalName: string) => {
        document.body.style.overflow = 'unset';
        setModals({ ...modals, [modalName]: false });
    };

    const toggle = (modalName: string) => {
        if (isOpen(modalName)) {
            close(modalName);
        } else {
            open(modalName);
        }
    };

    return { isOpen, toggle, open, close };
};

export default useModal;

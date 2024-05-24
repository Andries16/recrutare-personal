import React, { createContext, useState, useContext, useCallback } from "react";
import ConfirmationModal from "../components/Modals/ConfirmationModal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: () => {},
    onClose: () => {},
  });

  const openModal = useCallback((title, message, onConfirm, onClose) => {
    setModalState({
      open: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setModalState((prevState) => ({ ...prevState, open: false }));
      },
      onClose: () => {
        onClose();
        setModalState((prevState) => ({ ...prevState, open: false }));
      },
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prevState) => ({ ...prevState, open: false }));
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ConfirmationModal
        open={modalState.open}
        title={modalState.title}
        message={modalState.message}
        onConfirm={modalState.onConfirm}
        onClose={modalState.onClose}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};

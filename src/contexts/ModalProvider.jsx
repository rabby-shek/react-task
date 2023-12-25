import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalAOpen, setModalAOpen] = useState(false);
  const [isModalBOpen, setModalBOpen] = useState(false);

  const openModalA = () => {
    setModalAOpen(true);
    setModalBOpen(false);
  };

  const openModalB = () => {
    setModalBOpen(true);
    setModalAOpen(false);
  };

  const closeModalA = () => {
    setModalAOpen(false);
  };

  const closeModalB = () => {
    setModalBOpen(false);
  };

  // Expose the context values
  const contextValues = {
    isModalAOpen,
    isModalBOpen,
    openModalA,
    openModalB,
    closeModalA,
    closeModalB,
  };

  return (
    <ModalContext.Provider value={contextValues}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to consume the modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

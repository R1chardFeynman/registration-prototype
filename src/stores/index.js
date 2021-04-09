import React, { useContext } from "react";
import { UserStore } from "stores/UserStore";
import { ModalStore } from "stores/ModalStore";

class RootStore {
  constructor() {
    this.UserStore = new UserStore();
    this.ModalStore = new ModalStore();
  }
}

const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const store = new RootStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
};

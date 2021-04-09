import { Dialog } from "@material-ui/core";
import { RegistrationSuccess } from "components/Modals/RegistrationSuccess";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "stores";

const modals = {
  RegistrationSuccess,
};

export const ModalContainer = observer(({ children }) => {
  const {
    state: { isOpen, type },
  } = useStore().ModalStore;
  const CurrentModal = modals[type];
  return <Dialog open={isOpen}>{type && <CurrentModal />}</Dialog>;
});

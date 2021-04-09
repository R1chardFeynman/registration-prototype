import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "stores";

export const RegistrationSuccess = observer(() => {
  const { firstName, lastName, username } = useStore().UserStore.user;
  const { closeModal } = useStore().ModalStore;
  const name = firstName && lastName ? `${firstName} ${lastName}` : username;

  return (
    <>
      <DialogTitle>Регистрация прошла успешно</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {name}, вы были успешно зарегистрированы.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeModal()}>Закрыть</Button>
      </DialogActions>
    </>
  );
});

import { makeAutoObservable } from "mobx";

const initialState = {
  isOpen: false,
  type: "",
};

export class ModalStore {
  state = initialState;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });
    this.rootStore = rootStore;
  }

  openModal(type) {
    this.state = {
      isOpen: true,
      type,
    };
  }

  closeModal() {
    this.state = initialState;
  }
}

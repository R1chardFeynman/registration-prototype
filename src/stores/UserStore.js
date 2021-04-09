import { labels } from "components/common/data/labels";
import { makeAutoObservable } from "mobx";

export class UserStore {
  isLoading = false;
  user = null;
  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });
    this.rootStore = rootStore;
    this.auth();
  }

  setUser(user) {
    this.user = user;
  }

  async auth(token) {
    this.isLoading = true;
    await new Promise((res) => setTimeout(res), 1000).then(() => {
      const user = localStorage.getItem("user");
      this.setUser(JSON.parse(user));
    });
    this.isLoading = false;
  }

  get filledFields() {
    const user = this.user;

    return Object.keys(user)
      .filter((key) => user[key] !== "")
      .map((key) => ({ value: user[key], label: labels[key] }));
  }
}

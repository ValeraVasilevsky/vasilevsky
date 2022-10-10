import { defineStore } from "pinia";

type NotificationType = "success" | "error";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notification: {
      type: "",
      message: "",
    },
    isVisible: false as boolean,
  }),
  actions: {
    showNotification(type: NotificationType, message: string) {
      this.notification = { type, message };

      this.isVisible = true;

      setTimeout(() => {
        this.isVisible = false;
      }, 2000);
    },
  },
});

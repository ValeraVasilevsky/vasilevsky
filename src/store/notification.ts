import { TIMER } from "@/constants/constants";
import { NotificationType } from "@/types/TNotification";
import { defineStore } from "pinia";

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
      }, TIMER);
    },
  },
});

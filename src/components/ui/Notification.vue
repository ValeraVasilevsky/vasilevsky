<template>
  <div
    class="notification"
    :class="[`${notification.type}`, { active: isVisible }]"
  >
    <div class="notofication_icon">
      <font-awesome-icon
        :icon="notificationIcon"
        color="#f9f9f9"
        class="fa-2x"
      />
    </div>
    <div class="notification_body">
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from "@/store/notification";
import {
  faCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { computed } from "vue";

const store = useNotificationStore();

const isVisible = computed(() => store.isVisible);
const notification = computed(() => store.notification);

const notificationIcon = computed(() =>
  notification.value.type === "success" ? faCheck : faCircleExclamation
);
</script>

<style scoped lang="scss">
@import "@/assets/stylus/ui/notification.scss";
</style>

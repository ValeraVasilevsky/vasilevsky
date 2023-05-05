<template>
  <div class="layout">
    <div class="layout_actions">
      <CustomButton
        :action-label="'Загрузить данные'"
        :is-load="isLoad"
        :disabled="isDisabled"
        @handle-event-click="setTodos"
      />
    </div>
    <div class="layout_content">
      <TodoCard
        v-for="todo in userTodos"
        :key="todo.userId"
        :user-id="todo.userId"
        :todos="todo.todos"
        :completed="todo.completed"
        :uncompleted="todo.uncompleted"
      />
    </div>
    <Notification />
  </div>
</template>

<script setup lang="ts">
import TodoCard from "@/components/TodoCard.vue";
import CustomButton from "@/components/ui/CustomButton.vue";
import Notification from "@/components/ui/Notification.vue";
import { useNotificationStore } from "@/store/notification";
import { useTodoStore } from "@/store/todo";
import { computed, ref } from "vue";

const todoStore = useTodoStore();
const { showNotification } = useNotificationStore();

const { getTodos } = todoStore;
const userTodos = computed(() => todoStore.todos);

const isLoad = ref(false);
const isDisabled = ref(false);

const setTodos = async () => {
  isDisabled.value = true;
  isLoad.value = true;
  try {
    await getTodos();
  } catch (e) {
    if (e instanceof Error) {
      showNotification("error", e.message);
    }
  } finally {
    isDisabled.value = false;
    isLoad.value = false;
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/stylus/layout.scss";
</style>

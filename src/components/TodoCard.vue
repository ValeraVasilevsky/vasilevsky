<template>
  <div class="card">
    <div class="card_title">
      <div>{{ userId }}</div>
      <div class="card_title_todos-status">
        <div class="card_title_todos-status_completed">
          {{ completed }}
        </div>
        /
        <div class="card_title_todos-status_uncompleted">
          {{ uncompleted }}
        </div>
      </div>
    </div>

    <div class="card_body">
      <div class="card_body_todos-list">
        <div
          class="card_body_todos-list_item"
          v-for="item in todos"
          :key="item.id"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ITodoCard {
  userId: number;
  todos: { id: number; title: string }[];
  completed: number;
  uncompleted: number;
}
const { userId, todos, completed, uncompleted } = defineProps<ITodoCard>();
</script>

<style scoped lang="scss">
@import "@/assets/stylus/ui/card.scss";
</style>

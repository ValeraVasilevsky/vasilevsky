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
import { PropType } from "vue";

const props = defineProps({
  userId: {
    type: Number,
    default: 0,
  },
  todos: {
    type: Array as PropType<{ id: number; title: string }[]>,
    default: () => [],
  },
  completed: {
    type: Number,
    default: 0,
  },
  uncompleted: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/stylus/ui/card.scss";
</style>

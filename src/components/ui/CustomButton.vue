<template>
  <button
    type="button"
    @click="handleClick"
    class="custom-btn"
    :class="{
      disabled: disabled,
    }"
    :disabled="disabled"
  >
    <div v-if="!isLoad">{{ actionLabel }}</div>
    <div v-else><Loader /></div>
  </button>
</template>

<script setup lang="ts">
import Loader from "@/components/ui/Loader.vue";

const props = defineProps({
  actionLabel: {
    type: String,
    default: "",
  },
  isLoad: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["handleEventClick"]);

const handleClick = () => {
  emits("handleEventClick");
};
</script>

<style scoped lang="scss">
@import "@/assets/stylus/ui/button.scss";
</style>

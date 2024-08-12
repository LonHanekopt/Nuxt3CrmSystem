<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="
      cn(
        'rounded-sm  transition-colors border-2 border-transparent bg-slate-50 text-card-foreground hover:border-pink-700 hover:border-2',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>

<style scoped>
@keyframes show {
  from {
    @apply border-pink-200;
    transform: scale(0.6) translateY(-30px);
    opacity: 0.5;
  }

  90% {
    @apply border-pink-400;
  }

  to {
    @apply border-transparent;
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.animation {
  animation: show 300ms ease-in-out;
}
</style>

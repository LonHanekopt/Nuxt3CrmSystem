<template>
  <div>
    <nuxt-link
      class="flex items-center py-1 px-3 rounded-lg w-full hover:bg-slate-200 hover:shadow hover:rounded-none transition-all mb-2"
      v-for="item in MENU_DATA"
      :key="item.icon"
      :to="item.url"
    >
      <Icon :name="item.icon" class="mr-3"/>
      <span>{{item.name}}</span>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import { MENU_DATA } from "./menu.data";
</script>

<style scoped>
</style>
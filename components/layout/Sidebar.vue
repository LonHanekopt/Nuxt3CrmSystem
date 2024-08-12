<template>
  <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
    <nuxt-link to="/" class="mb-10 block">
      <NuxtImg src="/logo.svg" width="100px" class="mx-auto" />
    </nuxt-link>
    <button
      class="absolute top-2 right-3 transition-colors hover:text-pink-500"
    >
      <Icon name="line-md:logout" size="20" @click="logout" />
    </button>

    <LayoutMenu />
  </aside>
</template>

<script lang="ts" setup>
const isLoadingStore = useLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  isLoadingStore.set(true);

  await account.deleteSession("current");

  authStore.clear();

  await router.push("/login");

  isLoadingStore.set(false);
};
</script>

<style scoped>
</style>
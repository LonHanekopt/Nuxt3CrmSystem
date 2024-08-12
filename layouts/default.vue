<template>
  <LayoutLoader v-if="isLoadingStore.loading" />
  <section
    :class="{
      grid: authStore.isAuth,
    }"
    style="min-height: 100vh"
    v-else
  >
    <layout-sidebar v-if="authStore.isAuth" />
    <div>
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
const isLoadingStore = useLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  //commented out to prevent too much data usage on appwrite
  try {
    const response = await account.get();
    if (response) {
      authStore.set({
        email: response.email,
        name: response.name,
        status: response.status,
      });
    }
  } catch (error) {
    router.push("/login");
  } finally {
    isLoadingStore.set(false);
  }
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
}
</style>
<template>
  <section
    class="bg-foreground flex items-center justify-center min-h-screen w-full"
  >
    <div class="rounded bg-sidebar w-1/4 p-5">
      <h1 class="text-2xl text-slate-800 font-semibold text-center mb-5">
        Login
      </h1>

      <form ref="parent">
        <UiInput
          placeholder="Email"
          type="email"
          class="mb-3"
          v-model="emailRef"
        />
        <div
          v-if="error.type === 'email'"
          class="text-sm text-center mb-3 text-red-400 font-semibold"
        >
          <h1>{{ error.msg }}</h1>
        </div>
        <UiInput
          placeholder="Password"
          type="password"
          class="mb-3"
          v-model="passwordRef"
        />
        <div
          v-if="error.type === 'password'"
          class="text-sm text-center mb-3 text-red-400 font-semibold"
        >
          <h1>{{ error.msg }}</h1>
        </div>
        <UiInput
          placeholder="Name"
          type="text"
          class="mb-3"
          v-model="nameRef"
        />
        <div
          v-if="error.type === 'name'"
          class="text-sm text-center mb-3 text-red-400 font-semibold"
        >
          <h1>{{ error.msg }}</h1>
        </div>
        <div class="flex items-center justify-center gap-5">
          <UiButton
            class="bg-pink-600 hover:bg-pink-500"
            type="button"
            @click="login"
            >Login</UiButton
          >
          <UiButton
            class="bg-pink-600 hover:bg-pink-500"
            type="button"
            @click="register"
            >Register</UiButton
          >
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { v4 as uuid } from "uuid";
import autoAnimate from "@formkit/auto-animate";

useHead({
  title: "login",
});

let error = reactive({
  type: "",
  msg: "",
});

const emailRef = ref("");
const passwordRef = ref("");
const nameRef = ref("");

const isLoadingStore = useLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  if (emailRef.value === "") {
    error.type = "email";
    error.msg = "Email Adress not valid";
    return;
  }
  if (passwordRef.value === "") {
    error.type = "password";
    error.msg = "Password Not Valid";
    return;
  }
  isLoadingStore.set(true);

  try {
    await account.createEmailPasswordSession(emailRef.value, passwordRef.value);
    const response = await account.get();
    if (response) {
      authStore.set({
        email: response.email,
        name: response.name,
        status: response.status,
      });
    }

    emailRef.value = "";
    nameRef.value = "";
    passwordRef.value = "";

    await router.push("/");
    isLoadingStore.set(false);
  } catch (error) {
    isLoadingStore.set(false);
  }
};

const register = async () => {
  if (emailRef.value === "") {
    error.type = "email";
    error.msg = "Email Adress not valid";
    return;
  }
  if (passwordRef.value === "") {
    error.type = "password";
    error.msg = "Password Not Valid";
    return;
  }
  if (nameRef.value === "") {
    error.type = "name";
    error.msg = "Name not valid";
    return;
  }
  await account.create(
    uuid(),
    emailRef.value,
    passwordRef.value,
    nameRef.value
  );
  await login();
};

const parent = ref();

onMounted(() => {
  autoAnimate(parent.value); // thats it!
});
</script>

<style>
</style>
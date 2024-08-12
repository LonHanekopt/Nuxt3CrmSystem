<script lang="ts" setup>
import { useMutation } from "@tanstack/vue-query";
import { v4 as uuidv4 } from "uuid";
import { defineProps } from "vue";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import type { IDeal } from "@/types/deals.types";

const isOpenForm = ref(false);

interface IDealFormState extends Pick<IDeal, "name" | "price"> {
  customers: {
    email: string;
    name: string;
  };
  status: string;
}

const props = defineProps({
  status: {
    type: String,
    default: "",
    required: true,
  },
  refetch: {
    type: Function,
  },
});

const { handleSubmit, handleReset, defineField } = useForm<IDealFormState>({
  initialValues: {
    status: props.status,
  },
});

const [name, nameAttrs] = defineField("name");
const [price, priceAttrs] = defineField("price");
const [customerEmail, customerEmailAttrs] = defineField("customers.email");
const [customerName, customerNameAttrs] = defineField("customers.name");

const { mutate, isPending } = useMutation({
  mutationKey: ["create a new deal"],
  mutationFn: (data: IDealFormState) =>
    DB.createDocument(DB_ID, COLLECTION_DEALS, uuidv4(), data),
  onSuccess(data) {
    props.refetch && props.refetch();
    handleReset();
  },
});

const onSubmit = handleSubmit((values) => {
  mutate(values);
});
</script>

<template>
  <section>
    <div class="text-center mb-2">
      <button
        class="transition-all hover:text-pink-500"
        @click="isOpenForm = !isOpenForm"
      >
        <Icon
          v-if="isOpenForm"
          class="fade-in-100 fade-out-0"
          size="30"
          name="la:arrow-up"
        />
        <Icon
          v-else
          class="fade-in-100 fade-out-0"
          size="30"
          name="ph:plus-fill"
          color="red"
        />
      </button>
    </div>

    <form v-if="isOpenForm" @submit="onSubmit" class="flex flex-col  mb-6 gap-4">
        <h1 class="text-center text-lg font-semibold text-pink-500">New Deal</h1>
      <UiInput
        placeholder="Name"
        v-model="name"
        v-bind="nameAttrs"
        type="text"
        class="text-black"
      />
      <UiInput
        placeholder="Price"
        v-model="price"
        v-bind="priceAttrs"
        type="number"
        class="text-black"
      />
      <UiInput
        placeholder="Customer Email"
        v-model="customerEmail"
        v-bind="customerEmailAttrs"
        type="text"
        class="text-black"
      />
      <UiInput
        placeholder="Customer Name"
        v-model="customerName"
        v-bind="customerNameAttrs"
        type="text"
        class="text-black"
      />

      <button class="btn" :disabled="isPending">
        {{isPending ? 'Loading...' : 'Add'}}
      </button>
    </form>
  </section>
</template>

<style scoped>
</style>
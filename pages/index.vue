<template>
  <section class="bg-foreground text-background p-10 min-h-screen">
    <h1 class="text-2xl mb-10">CRM System By Gev</h1>

    <div v-if="isLoading"><h1>Kanban Loading ...</h1></div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16" v-auto-animate>
        <div
          v-for="column in data"
          :key="column.id"
          @dragover="handleDragOver"
          @drop="() => handleDrop(column)"
          v-auto-animate
          class="min-h-screen"
        >
          <div
            v-auto-animate
            class="flex items-center justify-between rounded-sm bg-pink-600 px-4 py-3 text-lg text-bold mb-5"
          >
            {{ column.name }}
            <span
              v-if="column.name === 'Incoming'"
              class="relative flex h-3 w-3"
            >
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-100 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-3 w-3 bg-pink-100"
              ></span>
            </span>
          </div>

          <div v-auto-animate>
            <KanbanCreateDeal :refetch="refetch" :status="column.id" />

            <UiCard
              v-auto-animate
              v-for="card in column.items"
              :key="card.id"
              draggable="true"
              @dragstart="() => handleDragStart(card, column)"
            >
              <UiCardHeader role="button">
                <UiCardTitle> {{ card.name }}</UiCardTitle>
                <!-- <UiCardDescription> {{card.price}}$</UiCardDescription> -->
              </UiCardHeader>

              <UiCardContent>
                <div>Company "{{ card.companyName }}"</div>
                <div class="mt-3">
                  Price <span class="font-medium">{{ card.price }}$</span>
                </div>
              </UiCardContent>
              <UiCardFooter class="text-center">
                {{ dayjs(card.$createdAt).format("DD MMMM YYYY") }}
              </UiCardFooter>
            </UiCard>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ICard, IColumn } from "~/components/kanban/kanban.types";
import { useKanbanQuery } from "~/components/kanban/useKanbanQuery";
import { vAutoAnimate } from "@formkit/auto-animate";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/vue-query";
import { EnumStatus } from "~/types/deals.types";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";

useSeoMeta({
	title: 'Home | CRM System',
})

const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)
const { data, isLoading, refetch } = useKanbanQuery()

type TypeMutationVariables = {
	docId: string
	status?: EnumStatus
}

const { mutate } = useMutation({
	mutationKey: ['move card'],
	mutationFn: ({ docId, status }: TypeMutationVariables) =>
		DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
			status,
		}),
	onSuccess: () => {
		refetch()
	},
})

function handleDragStart(card: ICard, column: IColumn) {
	dragCardRef.value = card
	sourceColumnRef.value = column
}

function handleDragOver(event: DragEvent) {
	event.preventDefault()
}

function handleDrop(targetColumn: IColumn) {
	if (dragCardRef.value && sourceColumnRef.value) {
		mutate({ docId: dragCardRef.value.id, status: targetColumn.id })
	}
}
</script>
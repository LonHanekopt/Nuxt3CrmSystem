import { useQuery } from '@tanstack/vue-query'
import { COLLECTION_DEALS, DB_ID } from '~/app.constants'
import { KANBAN_DATA } from './kanban.data'
import type { IDeal } from '~/types/deals.types'

export function useKanbanQuery() {
    return useQuery({
        queryKey: ['deals'],
        queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
        select(data) {
            const newBoard = [...KANBAN_DATA]
            const deals = data.documents as unknown as IDeal[]

            try {
                for (const deal of deals) {
                    const column = newBoard.find(col => col.id === deal.status)
                    
                    if (column) {
                        column.items.push({
                            id: deal.$id,
                            name: deal.name,
                            price: deal.price,
                            $createdAt: deal.$createdAt,
                            companyName: deal.customers.name,
                            status: deal.status
                        })
                    }
                }
                return newBoard;

            } catch (error) {
                console.log(error);
            }

        }
    })
}
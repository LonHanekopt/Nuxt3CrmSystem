import type { ICard, IColumn } from '~/components/kanban/kanban.types'
import { EnumStatus } from '~/types/deals.types'

export const KANBAN_DATA: IColumn[] = [
    {
        id: EnumStatus.todo,
        name: 'Incoming',
        items: []
    },
    {
        id: EnumStatus['to-be-agreed'],
        name: 'To Be Agreed',
        items: []
    },
    {
        id: EnumStatus['in-progress'],
        name: 'In Progress',
        items: []
    },
    {
        id: EnumStatus.produced,
        name: 'Produced',
        items: []
    },
    {
        id: EnumStatus.done,
        name: 'Done',
        items: []
    }
]
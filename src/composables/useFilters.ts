import { ref } from 'vue'
import weeksData from '@/data/weeks.json'
import { TASK_STATUSES, type Task, type TaskStatus } from '@/types'
import { useStorage } from './useStorage'

export type StatusFilter = 'all' | TaskStatus
export type WeekFilter = 'all' | number

export interface Filters {
  status: StatusFilter
  week: WeekFilter
}

function isFilters(value: unknown): boolean {
  const filters = value as Partial<Filters> | null
  return (
    typeof filters === 'object' &&
    filters !== null &&
    (filters.status === 'all' || TASK_STATUSES.includes(filters.status as TaskStatus)) &&
    (filters.week === 'all' || typeof filters.week === 'number')
  )
}

// İlk açılışta ilk haftanın görevleri gösterilir.
const defaultFilters: Filters = { status: 'all', week: weeksData[0]?.id ?? 'all' }

// Filtre seçimi tercih olarak hatırlanır; arama metni hatırlanmaz.
const filters = useStorage<Filters>('filters', { ...defaultFilters }, isFilters)
const search = ref('')

export function useFilters() {
  function resetFilters() {
    filters.value.status = 'all'
    search.value = ''
  }

  return { filters, search, resetFilters }
}

/** Türkçe büyük/küçük harf farkını kaldırır ("İ" → "i", "I" → "ı"). */
export function normalize(text: string): string {
  return text.toLocaleLowerCase('tr-TR').trim()
}

/**
 * Görevleri haftaya, duruma ve arama metnine göre süzer.
 * Arama başlık, açıklama ve etikette yapılır.
 */
export function filterTasks(
  tasks: Task[],
  statusOf: (taskId: string) => TaskStatus,
  criteria: { status: StatusFilter; week: WeekFilter; search: string },
): Task[] {
  const query = normalize(criteria.search)

  return tasks.filter((task) => {
    if (criteria.week !== 'all' && task.weekId !== criteria.week) return false
    if (criteria.status !== 'all' && statusOf(task.id) !== criteria.status) return false
    if (query === '') return true
    return [task.title, task.description, task.tag].some((field) => normalize(field).includes(query))
  })
}

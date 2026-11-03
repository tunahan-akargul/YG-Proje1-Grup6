import { computed } from 'vue'
import tasksData from '@/data/tasks.json'
import { TASK_STATUSES, type Task, type TaskInput, type TaskStatus } from '@/types'
import { useStorage } from './useStorage'

// Dersin kendi görevleri (değişmez, JSON'dan gelir).
const courseTasks: Task[] = tasksData

// --- localStorage'daki kayıtların biçim kontrolleri ---

function isStatusMap(value: unknown): boolean {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false
  return Object.values(value).every((status) => TASK_STATUSES.includes(status as TaskStatus))
}

function isTaskList(value: unknown): boolean {
  if (!Array.isArray(value)) return false
  return value.every((item) => {
    const task = item as Partial<Task> | null
    return (
      typeof task === 'object' &&
      task !== null &&
      typeof task.id === 'string' &&
      typeof task.title === 'string' &&
      typeof task.weekId === 'number'
    )
  })
}

// --- Paylaşılan durum ---
// Fonksiyonun dışında tanımlandığı için bütün bileşenler aynı veriyi görür.

/** Görev id → durum. Kaydı olmayan görev "yapılacak" sayılır. */
const statuses = useStorage<Record<string, TaskStatus>>('statuses', {}, isStatusMap)

/** Öğrencinin kendi eklediği görevler. */
const customTasks = useStorage<Task[]>('customTasks', [], isTaskList)

const allTasks = computed(() => [...courseTasks, ...customTasks.value])

export function useTasks() {
  function statusOf(taskId: string): TaskStatus {
    return statuses.value[taskId] ?? 'todo'
  }

  function setStatus(taskId: string, status: TaskStatus) {
    statuses.value[taskId] = status
  }

  function addTask(input: TaskInput): Task {
    const task: Task = { ...input, id: createId(), custom: true }
    customTasks.value.push(task)
    return task
  }

  function updateTask(taskId: string, input: TaskInput) {
    const index = customTasks.value.findIndex((task) => task.id === taskId)
    if (index === -1) return
    customTasks.value[index] = { ...input, id: taskId, custom: true }
  }

  function removeTask(taskId: string) {
    customTasks.value = customTasks.value.filter((task) => task.id !== taskId)
    delete statuses.value[taskId]
  }

  return { tasks: allTasks, statusOf, setStatus, addTask, updateTask, removeTask }
}

function createId(): string {
  return 'c-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

// --- Form doğrulama ---

export type TaskErrors = Partial<Record<keyof TaskInput, string>>

/** Formdan gelen görevi kontrol eder; hata yoksa boş nesne döner. */
export function validateTask(input: TaskInput, weekIds: number[]): TaskErrors {
  const errors: TaskErrors = {}
  const title = input.title.trim()

  if (title.length === 0) errors.title = 'Başlık boş bırakılamaz.'
  else if (title.length < 3) errors.title = 'Başlık en az 3 karakter olmalı.'
  else if (title.length > 80) errors.title = 'Başlık en fazla 80 karakter olabilir.'

  if (input.description.length > 300) errors.description = 'Açıklama en fazla 300 karakter olabilir.'
  if (input.tag.length > 20) errors.tag = 'Etiket en fazla 20 karakter olabilir.'
  if (!weekIds.includes(input.weekId)) errors.weekId = 'Geçerli bir hafta seçin.'
  if (input.dueDate && Number.isNaN(Date.parse(input.dueDate))) errors.dueDate = 'Geçerli bir tarih girin.'

  return errors
}

/** Bir görevi forma doldurmak için id/custom alanlarından ayırır. */
export function toTaskInput(task: Task): TaskInput {
  const { id: _id, custom: _custom, ...input } = task
  return input
}

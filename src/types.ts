// Uygulamanın veri modeli (Hafta 1 raporu, bölüm 6).

/** Dersin bir haftası. İçerik src/data/weeks.json dosyasından gelir. */
export interface Week {
  id: number
  title: string
  description: string
  goals: string[]
}

/** Bir haftaya bağlı görev ya da mini etkinlik. */
export interface Task {
  id: string
  weekId: number
  title: string
  description: string
  tag: string
  dueDate?: string // isteğe bağlı, "YYYY-MM-DD"
  /** Öğrencinin kendi eklediği görev mi? (JSON'daki ders görevleri düzenlenemez.) */
  custom?: boolean
}

/** Formdan gelen veri: id ve custom alanlarını uygulama kendisi verir. */
export type TaskInput = Omit<Task, 'id' | 'custom'>

/** Görevin durumu. JSON'da tutulmaz; öğrencinin seçimi localStorage'a yazılır. */
export type TaskStatus = 'todo' | 'in-progress' | 'done'

export const TASK_STATUSES: TaskStatus[] = ['todo', 'in-progress', 'done']

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'Yapılacak',
  'in-progress': 'Devam ediyor',
  done: 'Tamamlandı',
}

export type Theme = 'light' | 'dark'

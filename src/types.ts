// Uygulamanın veri modeli (Hafta 1 raporu, bölüm 6).

/** Dersin bir haftası. İçerik src/data/weeks.json dosyasından gelir. */
export interface Week {
  id: number
  title: string
  description: string
  goals: string[]
}

/** Bir haftaya bağlı görev ya da mini etkinlik. İçerik src/data/tasks.json dosyasından gelir. */
export interface Task {
  id: string
  weekId: number
  title: string
  description: string
  tag: string
  dueDate?: string // isteğe bağlı, "YYYY-MM-DD"
}

/** Görevin durumu. JSON'da tutulmaz; öğrencinin seçimi localStorage'a yazılır. */
export type TaskStatus = 'todo' | 'in-progress' | 'done'

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'Yapılacak',
  'in-progress': 'Devam ediyor',
  done: 'Tamamlandı',
}

export type Theme = 'light' | 'dark'

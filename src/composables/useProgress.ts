import type { Task, TaskStatus } from '@/types'

export interface Progress {
  done: number
  inProgress: number
  total: number
  /** 0–100 arası, tam sayıya yuvarlanmış tamamlanma yüzdesi. */
  percent: number
}

/**
 * Tamamlanan / toplam görev oranını hesaplar.
 * İlerleme ayrıca saklanmaz; her seferinde görev durumlarından yeniden hesaplanır.
 * Hiç görev yoksa yüzde 0 döner (sıfıra bölme yapılmaz). (Takip listesi P1-12)
 */
export function calculateProgress(tasks: Task[], statusOf: (taskId: string) => TaskStatus): Progress {
  const total = tasks.length
  const done = tasks.filter((task) => statusOf(task.id) === 'done').length
  const inProgress = tasks.filter((task) => statusOf(task.id) === 'in-progress').length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  return { done, inProgress, total, percent }
}

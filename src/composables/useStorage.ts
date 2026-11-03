import { ref, watch, type Ref } from 'vue'

// localStorage anahtarlarının hepsi bu önekle başlar; başka sitelerle karışmaz.
const PREFIX = 'ders-panosu:'

/**
 * localStorage ile senkron duran reaktif bir değer döndürür.
 * - İlk açılışta kayıtlı değer varsa onu okur, yoksa varsayılanı kullanır.
 * - Değer değiştikçe otomatik olarak kaydeder.
 * - Depolama kapalıysa (gizli sekme vb.) veya kayıt bozuksa uygulama çökmez,
 *   varsayılan değerle çalışmaya devam eder. (Takip listesi P1-14: "kayıt hataları yönetiliyor")
 */
export function useStorage<T>(key: string, defaultValue: T): Ref<T> {
  const fullKey = PREFIX + key
  const value = ref(read(fullKey, defaultValue)) as Ref<T>

  watch(
    value,
    (newValue) => {
      try {
        localStorage.setItem(fullKey, JSON.stringify(newValue))
      } catch (error) {
        console.warn(`"${fullKey}" kaydedilemedi:`, error)
      }
    },
    { deep: true },
  )

  return value
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch (error) {
    console.warn(`"${key}" okunamadı, varsayılan değer kullanılıyor:`, error)
    return fallback
  }
}

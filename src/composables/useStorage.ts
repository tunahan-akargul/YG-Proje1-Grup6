import { ref, watch, type Ref } from 'vue'

// localStorage anahtarlarının hepsi bu önekle başlar; başka sitelerle karışmaz.
const PREFIX = 'ders-panosu:'

/**
 * localStorage ile senkron duran reaktif bir değer döndürür.
 * - İlk açılışta kayıtlı değer varsa onu okur, yoksa varsayılanı kullanır.
 * - Değer değiştikçe otomatik olarak kaydeder.
 * - Depolama kapalıysa (gizli sekme vb.), kayıt bozuksa ya da beklenen biçimde değilse
 *   uygulama çökmez, varsayılan değerle devam eder. (Takip listesi P1-14: "kayıt hataları yönetiliyor")
 *
 * @param isValid Okunan değerin biçimini kontrol eden fonksiyon (isteğe bağlı).
 */
export function useStorage<T>(
  key: string,
  defaultValue: T,
  isValid?: (value: unknown) => boolean,
): Ref<T> {
  const fullKey = PREFIX + key
  const value = ref(read(fullKey, defaultValue, isValid)) as Ref<T>

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

function read<T>(key: string, fallback: T, isValid?: (value: unknown) => boolean): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback

    const parsed: unknown = JSON.parse(raw)
    if (isValid && !isValid(parsed)) {
      console.warn(`"${key}" beklenen biçimde değil, varsayılan değer kullanılıyor.`)
      return fallback
    }
    return parsed as T
  } catch (error) {
    console.warn(`"${key}" okunamadı, varsayılan değer kullanılıyor:`, error)
    return fallback
  }
}

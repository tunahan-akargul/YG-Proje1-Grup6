Etkileşimli Ders Deneyimi Panosu

Yazılım Geliştirme dersi — Proje 1 • Grup X

Öğrencilerin bir dersin haftalık akışını, öğrenme hedeflerini ve görevlerini tek ekranda görebildiği, görevleri tamamladıkça ilerlemesini görsel olarak takip edebildiği, mobilde de rahat kullanılan bir web panosu.

Durum: Hafta 1 tamamlandı (analiz, planlama, repository ve proje iskeleti). Geliştirme sürüyor.

İçindekiler
Proje amacı
Ekip ve roller
Kullanılan teknolojiler
Temel özellikler
Kurulum
Çalıştırma
Proje yapısı
Çalışma düzeni
Demo ve ekran görüntüleri
Proje takvimi
Bilinen eksikler
Proje amacı

Öğrenciler ders içeriğini, görevlerini ve kendi ilerlemelerini genellikle farklı yerlerden takip ediyor. Bu pano; haftalık yol haritasını, her haftanın hedeflerini ve görevlerini bir arada gösterir, görev durumlarını değiştirmeye izin verir ve genel ilerlemeyi anında günceller.

Projenin odağı istemci tarafı web geliştirme, kullanılabilirlik ve etkileşim tasarımıdır. Backend ve veri tabanı yoktur. İçerik statik JSON dosyalarından okunur, kullanıcının ilerlemesi ve tercihleri tarayıcının localStorage alanında tutulur.

Panoda gösterilen ders (Web Teknolojilerine Giriş) kurgusal bir örnek derstir: 8 hafta, 20 görev.

Ekip ve roller

Tüm üyeler aynı zamanda geliştiricidir.

Üye	Rol	GitHub
	Lider + Geliştirici	@
	Analist / Gereksinim + Geliştirici	@
	Test / Kalite + Geliştirici	@
	Dokümantasyon / Sunum + Geliştirici	@
Kullanılan teknolojiler
Vue (sürüm: doldurulacak) — arayüz
JavaScript, HTML, CSS (CSS değişkenleriyle tema)
localStorage — ilerleme ve kullanıcı tercihleri
Statik JSON — hafta ve görev içeriği
Git / GitHub — sürüm kontrolü, issue ve proje panosu
Temel özellikler

Planlanan özellikler ve durumları (ilerledikçe işaretlenir):

 Haftalık ders kartları ve yol haritası
 Hafta detayı: öğrenme hedefleri ve görevler
 Görev durumu değiştirme (yapılacak / devam ediyor / tamamlandı)
 Durum ve haftaya göre filtreleme
 Anahtar sözcükle arama
 Genel ve hafta bazlı ilerleme göstergesi
 Karanlık / aydınlık tema
 Sayfa yenilense de durumun korunması (localStorage)
 Responsive tasarım (mobil, tablet, masaüstü)
 Temel erişilebilirlik (klavye, etiketler, kontrast)
Kurulum

Gereksinimler: Node.js (LTS sürüm) ve Git.

bash
# 1. Depoyu klonla
git clone <repo-adresi>

# 2. Proje klasörüne gir
cd YG-Proje1-GrupX

# 3. Bağımlılıkları yükle
npm install
Çalıştırma
bash
# Geliştirme sunucusunu başlat
npm run dev

Terminalde yazan adresi (genellikle http://localhost:5173) tarayıcıda aç.

bash
# Üretim derlemesi (isteğe bağlı)
npm run build

Komutlar projenin gerçek kurulumuna göre güncellenmelidir.

Proje yapısı
text
YG-Proje1-GrupX/
├─ README.md
├─ src/
│  ├─ assets/          # görseller, ikonlar
│  ├─ components/      # arayüz bileşenleri
│  ├─ composables/     # ortak mantık (görevler, ilerleme, tema, localStorage)
│  ├─ data/            # weeks.json, tasks.json
│  ├─ styles/          # tasarım tokenları ve temel stiller
│  ├─ App.vue
│  └─ main.js
├─ docs/               # hafta 1 dokümanı, rapor, kullanıcı dokümanı
└─ presentation/       # sunum dosyası
Çalışma düzeni
Her üye kendi GitHub hesabıyla çalışır; görevler issue olarak açılır ve kişilere atanır.
main dalı her zaman çalışır durumda tutulur. Değişiklikler feature/..., fix/... veya docs/... dallarında yapılır ve pull request ile birleştirilir.
Commit mesajları yapılan değişikliği açıklar: add week card component, fix search for Turkish characters, update readme with setup steps.
Gizli bilgi (anahtar, parola) repoya yazılmaz.

Ayrıntılar için: docs/ klasöründeki Hafta 1 dokümanı.

Demo ve ekran görüntüleri
Canlı demo: henüz yok — yayınlanınca bağlantı eklenecek
Ekran görüntüleri: geliştirme ilerledikçe docs/ekran-goruntuleri/ altına eklenecek
Proje takvimi
Hafta	Odak	Durum
1	İhtiyaç analizi, kullanıcı hikâyeleri, repository, görev planı	✅ Tamamlandı
2	Arayüz/teknik tasarım, temel yapı, ilk işlevler	⏳ Sırada
3	Ana işlevlerin tamamlanması, entegrasyon, test	⬜
4	Kalite kontrol, dokümantasyon, sunum ve demo	⬜
Bilinen eksikler
Uygulama özellikleri henüz geliştirme aşamasında (bkz. Temel özellikler).
Canlı demo bağlantısı ve ekran görüntüleri henüz eklenmedi.
Erişilebilirlik ve responsive kontrolleri Hafta 3'te yapılacak.

Bu bölüm proje ilerledikçe güncellenir.
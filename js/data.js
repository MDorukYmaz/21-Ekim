export const events = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    capacity: 25
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "20-10-2026",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    capacity: 25
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Workshopu",
    category: "Workshop",
    date: "27-10-2026",
    time: "13:00",
    location: "B Blok Amfi 1",
    description: "Uzmanlar sibergüvenlik hakkında basit tooları gösterecek",
    capacity: 53
  },
  {
    id: "event-4",
    title: "Spor Tırmanış Etkinliği",
    category: "Atölye",
    date: "03-11-2026",
    time: "15:00",
    location: "Yüzme havuzu yanındaki tırmanış duvarı",
    description: "Sportif yüzmeye giriş ve temel teknikler.",
    capacity: 32
  },
  {
    id: "event-5",
    title: "Hackaton 2026",
    category: "Workshop",
    date: "10-11-2026",
    time: "11:00",
    location: "SDÜ spor salonu",
    description: "Uygulama geliştirme ve yarışma.",
    capacity: 50
  },
  {
    id: "event-6",
    title: "Okçuluk Etkinliği",
    category: "Spor",
    date: "25-10-2026",
    time: "16:00",
    location: "Süleyman Demirel Spor Salon",
    description: "Okçuluğa giriş ve ekipman tanıtımı ve atış denemesi.",
    capacity: 50
  }
];

// "12-10-2026" -> "2026-10-12" (ve tersi)
export function tersCevir(tarih) {
  return tarih.split("-").reverse().join("-");
}

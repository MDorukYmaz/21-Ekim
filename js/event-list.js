import { events, tersCevir } from "./data.js";

function tarihYaz(tarih) {
  const [gun, ay, yil] = tarih.split("-");
  return new Date(yil, ay - 1, gun).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

function createCard(event) {
  return `<article>
    <h3>${event.title}</h3>
    <p><strong>${event.category}</strong></p>
    <p>Tarih: ${tarihYaz(event.date)}, ${event.time}</p>
    <p>Yer: ${event.location}</p>
    <p>Kontenjan: ${event.capacity} kişi</p>
    <p>${event.description}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
  </article>`;
}

const list = document.querySelector("#etkinlik-listesi");

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

if (list.dataset.limit) {
  const yaklasan = [...events]
    .sort((a, b) => tersCevir(a.date).localeCompare(tersCevir(b.date)))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  render(events);
}

// Filtre sadece etkinlikler.html'de var
const filtreFormu = document.querySelector("#filtre-formu");

if (filtreFormu) {
  const arama = document.querySelector("#arama");
  const kategoriFiltre = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  // Kategorileri veriden üret, her biri bir kez
  const kategoriler = new Set(events.map((e) => e.category));
  kategoriler.forEach((kategori) => {
    kategoriFiltre.innerHTML += `<option value="${kategori}">${kategori}</option>`;
  });

  function filtrele() {
    const aranan = arama.value.toLocaleLowerCase("tr-TR");
    const secilen = kategoriFiltre.value;

    const sonuc = events.filter((e) => {
      const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan);
      const kategoriUyuyor = secilen === "" || e.category === secilen;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    if (sonuc.length === 0) {
      sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    } else {
      sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
    }
  }

  arama.addEventListener("input", filtrele);
  kategoriFiltre.addEventListener("change", filtrele);
  filtreFormu.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  filtrele();
}

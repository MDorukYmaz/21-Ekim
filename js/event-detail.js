import { events } from "./data.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("header h1");

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  document.title = "Etkinlik bulunamadı";
  baslik.textContent = "Etkinlik bulunamadı";
  let mesaj = "Bir etkinlik seçilmedi. Listeden bir etkinlik seçin.";
  if (id) {
    mesaj = `"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`;
  }
  container.innerHTML = `
    <p class="hata-kutusu">${mesaj}</p>
    <a href="etkinlikler.html" class="buton">← Listeye dön</a>`;
} else {
  const [gun, ay, yil] = event.date.split("-");
  const tarih = new Date(yil, ay - 1, gun).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

  document.title = event.title;
  baslik.textContent = event.title;
  container.innerHTML = `
    <div class="detay">
      <figure>
        <img src="4939446.jpg" alt="${event.title} afişi" width="400" height="200">
        <figcaption><em>${event.title} afişi</em></figcaption>
      </figure>

      <dl>
        <dt>Tarih</dt>
        <dd>${tarih}, ${event.time}</dd>
        <dt>Yer</dt>
        <dd>${event.location}</dd>
        <dt>Kategori</dt>
        <dd>${event.category}</dd>
        <dt>Kontenjan</dt>
        <dd>${event.capacity} kişi</dd>
      </dl>
    </div>

    <h2>Açıklama</h2>
    <p>${event.description}</p>

    <a href="etkinlikler.html" class="buton">← Listeye dön</a>
    <a href="etkinlik-guncelle.html?id=${event.id}" class="buton">Bu etkinliği güncelle</a>`;
}

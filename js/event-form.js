import { events, tersCevir } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");

// Güncelleme sayfası: adresteki id ile formu doldur
let etkinlik;

if (form.dataset.mode === "guncelle") {
  const id = new URLSearchParams(location.search).get("id");
  etkinlik = events.find((e) => e.id === id);

  if (etkinlik) {
    form.elements.ad.value = etkinlik.title;
    form.elements.kategori.value = etkinlik.category;
    form.elements.tarih.value = tersCevir(etkinlik.date);
    form.elements.saat.value = etkinlik.time;
    form.elements.yer.value = etkinlik.location;
    form.elements.kontenjan.value = etkinlik.capacity;
    form.elements.aciklama.value = etkinlik.description;
  } else {
    form.outerHTML = `
      <p class="hata-kutusu">Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
      <a href="etkinlikler.html" class="buton">Etkinliklere git</a>`;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fd = new FormData(form);
  const kontenjan = fd.get("kontenjan");

  let id = "event-" + (events.length + 1);
  if (form.dataset.mode === "guncelle") {
    id = etkinlik.id;
  }

  const data = {
    id: id,
    title: fd.get("ad").trim(),
    category: fd.get("kategori"),
    date: fd.get("tarih") ? tersCevir(fd.get("tarih")) : "",
    time: fd.get("saat"),
    location: fd.get("yer").trim(),
    capacity: kontenjan ? Number(kontenjan) : null,
    description: fd.get("aciklama").trim()
  };

  // Kontrol
  const errors = {};
  if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  if (!data.category) errors.kategori = "Bir kategori seçin.";
  if (data.date === "") errors.tarih = "Tarih seçin.";
  if (data.time === "") errors.saat = "Saat seçin.";
  if (data.location === "") errors.yer = "Yer bilgisini yazın.";
  if (data.capacity !== null && (data.capacity < 1 || data.capacity > 1000)) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
  }

  // Hataları alanların altına yaz, düzeltilenleri temizle
  const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];
  alanlar.forEach((alanAdi) => {
    const alan = form.elements[alanAdi];
    const hataYeri = document.querySelector(`#${alanAdi}-hata`);

    if (errors[alanAdi]) {
      hataYeri.textContent = errors[alanAdi];
      alan.setAttribute("aria-invalid", "true");
    } else {
      hataYeri.textContent = "";
      alan.removeAttribute("aria-invalid");
    }
  });

  if (Object.keys(errors).length > 0) {
    mesaj.className = "hata-kutusu";
    mesaj.textContent = "Formda hatalı alanlar var.";
    return;
  }

  let baslik = "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";
  if (form.dataset.mode === "guncelle") {
    baslik = "Etkinlik güncellendi (bu sprintte kaydedilmez):";
  }

  mesaj.className = "basari";
  mesaj.innerHTML = `<p>${baslik}</p><pre>${JSON.stringify(data, null, 2)}</pre>`;
});

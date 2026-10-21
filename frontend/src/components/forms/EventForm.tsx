interface EventFormProps {
  submitLabel: string;
}

function EventForm({ submitLabel }: EventFormProps) {
  return (
    <>
      <p>Yıldızlı (*) alanlar zorunludur. Bu sprintte form veri kaydetmez.</p>

      <form className="form" noValidate onSubmit={(e) => e.preventDefault()}>
        <p>
          <label htmlFor="ad">Etkinlik Adı *</label>
          <input type="text" id="ad" name="ad" maxLength={80} />
        </p>

        <p>
          <label htmlFor="kategori">Kategori *</label>
          <select id="kategori" name="kategori">
            <option value="">Seçiniz</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Yarışma">Yarışma</option>
          </select>
        </p>

        <p>
          <label htmlFor="tarih">Tarih *</label>
          <input type="date" id="tarih" name="tarih" />
        </p>

        <p>
          <label htmlFor="saat">Saat *</label>
          <input type="time" id="saat" name="saat" />
        </p>

        <p>
          <label htmlFor="yer">Yer *</label>
          <input type="text" id="yer" name="yer" placeholder="Örn. A Blok Konferans Salonu" />
        </p>

        <p>
          <label htmlFor="kontenjan">Kontenjan</label>
          <input type="number" id="kontenjan" name="kontenjan" min={1} max={1000} />
        </p>

        <p>
          <label htmlFor="aciklama">Açıklama</label>
          <textarea id="aciklama" name="aciklama" rows={5} />
        </p>

        <p>
          <button type="submit">{submitLabel}</button>
        </p>
      </form>
    </>
  );
}

export default EventForm;

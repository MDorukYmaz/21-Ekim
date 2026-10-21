import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event?: CampusEvent;
  onBack: () => void;
  onUpdate: (id: string) => void;
}

function EventDetail({ event, onBack, onUpdate }: EventDetailProps) {
  if (!event)
    return (
      <>
        <p className="hata-kutusu">Bir etkinlik seçilmedi. Listeden bir etkinlik seçin.</p>
        <a href="#" className="buton" onClick={(e) => { e.preventDefault(); onBack(); }}>
          ← Listeye dön
        </a>
      </>
    );

  return (
    <article>
      <div className="detay">
        {event.image && (
          <figure>
            <img src={event.image} alt={`${event.title} afişi`} width={400} height={200} />
            <figcaption><em>{event.title} afişi</em></figcaption>
          </figure>
        )}

        <dl>
          <dt>Tarih</dt>
          <dd>{formatDate(event.date)}, {event.time}</dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </div>

      <h2>Açıklama</h2>
      <p>{event.description}</p>

      <a href="#" className="buton" onClick={(e) => { e.preventDefault(); onBack(); }}>
        ← Listeye dön
      </a>{" "}
      <a href="#" className="buton" onClick={(e) => { e.preventDefault(); onUpdate(event.id); }}>
        Bu etkinliği güncelle
      </a>
    </article>
  );
}

export default EventDetail;

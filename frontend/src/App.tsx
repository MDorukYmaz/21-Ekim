import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";
import type { PageName } from "./types/page";
import { toIso } from "./utils/format-date";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const upcoming = [...events]
  .sort((a, b) => toIso(a.date).localeCompare(toIso(b.date))).slice(0, 2);

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const selected = selectedId
    ? findEventById(events, selectedId) : undefined;

  const filtered = filterByCategory(
    searchEvents(events, searchText), category);

  let title = "Ana Sayfa";
  if (page === "events") title = "Tüm Etkinlikler";
  if (page === "detail") title = selected ? selected.title : "Etkinlik bulunamadı";
  if (page === "add") title = "Etkinlik Ekle";
  if (page === "update") title = "Etkinlik Güncelle";

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  let headerText: string | undefined;
  if (page === "home") headerText = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
  if (page === "events") headerText = "Ekim ayında kampüste düzenlenen etkinlikler.";

  const showDetail = (id: string) => go("detail", id);

  return (
    <>
      <Header title={page === "home" ? "Kampüs Etkinlikleri" : title} text={headerText} />

      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={showDetail} />
            <p>
              <a href="#" className="buton" onClick={(e) => { e.preventDefault(); go("events"); }}>
                Tüm etkinlikleri gör
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />

            {filtered.length > 0 && <p id="sonuc">{filtered.length} etkinlik listeleniyor.</p>}

            <EventList
              events={filtered}
              onShowDetail={showDetail}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </>
        )}

        {page === "detail" && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onUpdate={(id) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm submitLabel={page === "add" ? "Kaydet" : "Güncelle"} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;

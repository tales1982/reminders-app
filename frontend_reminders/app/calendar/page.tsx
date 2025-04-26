/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent } from "@/types/calendar";
import { EventModal } from "../../components/Modal";
import type { View } from "react-big-calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "@/components/Footer";
import moment from "moment-timezone";
import "moment/locale/fr"; // <-- import du locale français
import {
  CalendarWrapper,
  Container,
  Header,
  Button,
  FormWrapper,
  Label,
  Input,
  FormButtonGroup,
  Textarea,
} from "./styles";

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
moment.locale("fr"); // <-- définition du locale en français
moment.tz.setDefault(userTimezone);
const localizer = momentLocalizer(moment);

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [calendarKey, setCalendarKey] = useState(0);
  const [currentView, setCurrentView] = useState<View>("month");
  const [hasMounted, setHasMounted] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showCreateEventForm, setShowCreateEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    datetime: "",
    notifyBefore: 30,
    notifyEmail: false,
  });

  useEffect(() => {
    setCurrentDate(new Date());
    setHasMounted(true);

    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${apiUrl}/api/events`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((event: any) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          start: new Date(event.datetime),
          end: new Date(event.datetime),
          notifyBefore: event.notifyBefore,
          notifyEmail: event.notifyEmail,
        }));
        setEvents(formatted);
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des événements :", err)
      );
  }, []);

  if (!hasMounted) return null;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date(newEvent.datetime);
    if (date <= new Date()) {
      alert("⛔ Impossible de planifier un événement dans le passé.");
      return;
    }

    const token = localStorage.getItem("token");
    const payload = {
      title: newEvent.title,
      description: newEvent.description,
      datetime: date.toISOString(),
      notifyBefore: newEvent.notifyBefore,
      notifyEmail: newEvent.notifyEmail,
    };

    const method = editingEvent ? "PUT" : "POST";
    const url = editingEvent
      ? `${apiUrl}/api/events/${editingEvent.id}`
      : `${apiUrl}/api/events`;

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (editingEvent) {
      setEvents((prev) =>
        prev.map((evt) =>
          evt.id === data.id
            ? {
                ...evt,
                title: data.title,
                description: data.description,
                start: new Date(data.datetime),
                end: new Date(data.datetime),
                notifyBefore: data.notifyBefore,
                notifyEmail: data.notifyEmail,
              }
            : evt
        )
      );
    } else {
      setEvents([
        ...events,
        {
          id: data.id,
          title: data.title,
          description: data.description,
          start: new Date(data.datetime),
          end: new Date(data.datetime),
          notifyBefore: data.notifyBefore,
          notifyEmail: data.notifyEmail,
        },
      ]);
    }

    setShowCreateEventForm(false);
    setNewEvent({
      title: "",
      description: "",
      datetime: "",
      notifyBefore: 30,
      notifyEmail: false,
    });
    setEditingEvent(null);
    setCalendarKey((k) => k + 1);
  };

  const handleEdit = () => {
    if (!selectedEvent) return;
    setEditingEvent(selectedEvent);
    setNewEvent({
      title: selectedEvent.title,
      description: selectedEvent.description || "",
      datetime: selectedEvent.start.toISOString(),
      notifyBefore: selectedEvent.notifyBefore,
      notifyEmail: selectedEvent.notifyEmail,
    });
    setShowCreateEventForm(true);
    setSelectedEvent(null);
  };

  const CustomEvent = ({ event }: { event: CalendarEvent }) => {
    const isPast = new Date(event.end) < new Date();
    return (
      <span style={{ textDecoration: isPast ? "line-through" : "none" }}>
        {event.title} {isPast && <span style={{ fontSize: "0.8rem" }}>✅</span>}
      </span>
    );
  };

  const handleDelete = () => {
    if (!selectedEvent) return;
    const token = localStorage.getItem("token");
    fetch(`${apiUrl}/api/events/${selectedEvent.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setEvents(events.filter((e) => e.id !== selectedEvent.id)))
      .catch((err) => {
        console.error("Échec de la suppression de l'événement :", err);
        alert("Échec lors de la suppression de l'événement.");
      });
    setSelectedEvent(null);
  };

  return (
    <Container>
      <Header>
        <h1>📅 Mon calendrier</h1>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button onClick={() => setShowCreateEventForm((v) => !v)}>
            {showCreateEventForm ? "Fermer" : "Créer un événement"}
          </Button>
          <Button onClick={handleLogout}>Se déconnecter</Button>
        </div>
      </Header>

      {showCreateEventForm && (
        <FormWrapper onSubmit={handleSubmitEvent}>
          <Label>
            Titre :
            <Input
              type="text"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              required
            />
          </Label>

          <Label>
            Description :
            <Textarea
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              rows={3}
            />
          </Label>

          <Label>
            Date et heure :
            <DatePicker
              selected={newEvent.datetime ? new Date(newEvent.datetime) : null}
              onChange={(d) =>
                setNewEvent({ ...newEvent, datetime: d ? d.toISOString() : "" })
              }
              showTimeSelect
              dateFormat="Pp"
            />
          </Label>

          <Label>
            Alerte avant :
            <select
              value={newEvent.notifyBefore}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  notifyBefore: parseInt(e.target.value, 10),
                })
              }
            >
              <option value={5}>5 min</option>
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={60}>1 h</option>
              <option value={180}>3 h</option>
              <option value={360}>6 h</option>
              <option value={720}>12 h</option>
              <option value={1440}>24 h</option>
            </select>
          </Label>

          <Label>
            <input
              type="checkbox"
              checked={newEvent.notifyEmail}
              onChange={(e) =>
                setNewEvent({ ...newEvent, notifyEmail: e.target.checked })
              }
            />{" "}
            Notifier par e-mail
          </Label>

          <FormButtonGroup>
            <Button type="submit">Enregistrer</Button>
            <Button type="button" onClick={() => setShowCreateEventForm(false)}>
              Annuler
            </Button>
          </FormButtonGroup>
        </FormWrapper>
      )}

      <CalendarWrapper>
        <Calendar
          key={calendarKey}
          localizer={localizer}
          events={events}
          date={currentDate || undefined}
          onNavigate={(d) => setCurrentDate(d!)}
          view={currentView}
          onView={(v) => setCurrentView(v)}
          views={["month", "week", "day"]}
          onSelectEvent={(e) => setSelectedEvent(e)}
          components={{ event: CustomEvent }}
          style={{ height: 600 }}
          formats={{
            weekdayFormat: "dddd",
            monthHeaderFormat: "MMMM YYYY",
            dayHeaderFormat: "dddd, D MMMM YYYY",
          }}
          messages={{
            previous: "Précédent",
            next: "Suivant",
            today: "Aujourd'hui",
            month: "Mois",
            week: "Semaine",
            day: "Jour",
            agenda: "Agenda",
            date: "Date",
            time: "Heure",
            event: "Événement",
            noEventsInRange: "Aucun événement dans cette période.",
          }}
        />
      </CalendarWrapper>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={true}
          onClose={() => setSelectedEvent(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Footer />
    </Container>
  );
};

export default CalendarPage;

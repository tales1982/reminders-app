/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event as CalendarEvent } from "../../types/calendar";
import { EventModal } from "../../components/Modal";
import type { View } from "react-big-calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "@/components/Footer";

import {
  CalendarWrapper,
  Container,
  Header,
  Button,
  FormWrapper,
  Label,
  Input,
  FormButtonGroup,
} from "./styles";

const localizer = momentLocalizer(moment);
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [calendarKey, setCalendarKey] = useState(0);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const [currentView, setCurrentView] = useState<View>("month");
  const [hasMounted, setHasMounted] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showCreateEventForm, setShowCreateEventForm] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [newEvent, setNewEvent] = useState({
    title: "",
    datetime: "",
    notifyBefore: 30,
    notifyEmail: false,
    notifyWhats: false,
  });

  useEffect(() => {
    setHasMounted(true);

    const token = localStorage.getItem("token");

    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((event: any) => {
          const date = new Date(event.datetime);
          return {
            id: event.id,
            title: event.title,
            start: date,
            end: date,
            notifyBefore: event.notifyBefore,
            notifyEmail: event.notifyEmail,
            notifyWhats: event.notifyWhats,
          };
        });

        setEvents(formatted);
      })
      .catch((err) => {
        console.error("Erreur lors de la transport d'événements:", err);
      });
  }, []);

  if (!hasMounted) return null;

  const handleLogout = () => {
    localStorage.clear(); // Limpa tudo
    window.location.href = "/login"; // Redireciona
  };

  const handleSubmitEvent = async (event: React.FormEvent) => {
    event.preventDefault();
    const selectedDate = new Date(newEvent.datetime);
    const now = new Date();

    if (selectedDate <= now) {
      alert("⛔ Il n'est pas possible d'ajouter des événements dans le passé.");
      return;
    }

    const token = localStorage.getItem("token");

    const payload = {
      ...newEvent,
      datetime: new Date(newEvent.datetime).toISOString(),
    };

    const method = editingEvent ? "PUT" : "POST";
    const endpoint = editingEvent
      ? `${apiUrl}/api/events/${editingEvent.id}`
      : `${apiUrl}/api/events`;

    const response = await fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (editingEvent) {
      // Atualizar o evento na lista
      setEvents((prev) =>
        prev.map((evt) =>
          evt.id === editingEvent.id
            ? {
                ...evt,
                title: data.title,
                start: new Date(data.datetime),
                end: new Date(data.datetime),
                notifyBefore: data.notifyBefore,
                notifyEmail: data.notifyEmail,
                notifyWhats: data.notifyWhats,
              }
            : evt
        )
      );
    } else {
      // Adicionar novo evento
      setEvents([
        ...events,
        {
          id: data.id,
          title: data.title,
          start: new Date(data.datetime),
          end: new Date(data.datetime),
        },
      ]);
    }

    setShowCreateEventForm(false);
    setNewEvent({
      title: "",
      datetime: "",
      notifyBefore: 30,
      notifyEmail: false,
      notifyWhats: false,
    });
    setEditingEvent(null);
    setCalendarKey((prev) => prev + 1);
    setTimeout(() => window.location.reload(), 200); // pequeno delay só pra UX ficar mais suave
  };

  const handleEdit = () => {
    if (selectedEvent) {
      setEditingEvent(selectedEvent);
      setNewEvent({
        title: selectedEvent.title,
        datetime: selectedEvent.start.toISOString(),
        notifyBefore: selectedEvent.notifyBefore ?? 30,
        notifyEmail: selectedEvent.notifyEmail ?? false,
        notifyWhats: selectedEvent.notifyWhats ?? false,
      });
      setShowCreateEventForm(true);
      setSelectedEvent(null);
    }
  };

  const CustomEvent = ({ event }: { event: CalendarEvent }) => {
    const isPast = new Date(event.end) < new Date();

    return (
      <span style={{ textDecoration: isPast ? "line-through" : "none" }}>
        {event.title}{" "}
        {isPast && (
          <span style={{ fontSize: "0.8rem", color: "#4caf50" }}>
            ✅ C&apos;est arrivé
          </span>
        )}
      </span>
    );
  };

  const handleDelete = () => {
    if (!selectedEvent?.id) return;

    const token = localStorage.getItem("token");

    fetch(`${apiUrl}/api/events/${selectedEvent.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setEvents(events.filter((event) => event.id !== selectedEvent.id));
        setSelectedEvent(null);
      })
      .catch((err) => {
        console.error("Erreur en excluant l'événement:", err);
        alert("Erreur lors de la suppression de l'événement.");
      });
  };

  return (
    <Container>
      <Header>
        <h1>📅 Mon Calendrier</h1>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button onClick={() => setShowCreateEventForm(!showCreateEventForm)}>
            {showCreateEventForm ? "Fermer" : "Créer un Événement"}
          </Button>
          <Button onClick={handleLogout}>Se déconnecter</Button>
        </div>
      </Header>

      {showCreateEventForm && (
        <FormWrapper onSubmit={handleSubmitEvent}>
          <Label>
            Titre de l&apos;Événement :
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
            Date et Heure :
            <div style={{ marginTop: "0.5rem" }}>
              <DatePicker
                selected={
                  newEvent.datetime ? new Date(newEvent.datetime) : null
                }
                onChange={(date) =>
                  setNewEvent({
                    ...newEvent,
                    datetime: date ? date.toISOString() : "",
                  })
                }
                dateFormat="dd/MM/yyyy HH:mm"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Heure"
                placeholderText="Sélectionnez la date et l'heure"
                className="custom-datepicker" // você pode adicionar estilos aqui
              />
            </div>
          </Label>
          <Label>
            Alerte avant :
            <select
              value={newEvent.notifyBefore}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  notifyBefore: parseInt(e.target.value),
                })
              }
              style={{
                marginTop: "0.5rem",
                padding: "0.4rem",
                borderRadius: "4px",
              }}
            >
              <option value={30}>30 minutes avant</option>
              <option value={60}>1 heure avant</option>
              <option value={180}>3 heures avant</option>
              <option value={360}>6 heures avant</option>
              <option value={720}>12 heures avant</option>
              <option value={1440}>1 jour avant</option>
              <option value={2880}>2 jours avant</option>
            </select>
          </Label>

          <Label>
            Notifications :
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <label>
                <input
                  type="checkbox"
                  checked={newEvent.notifyEmail}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, notifyEmail: e.target.checked })
                  }
                />
                Email
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={newEvent.notifyWhats}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, notifyWhats: e.target.checked })
                  }
                />
                WhatsApp
              </label>
            </div>
          </Label>
          <FormButtonGroup>
            <Button type="submit">Enregistrer</Button>
            <Button type="button" onClick={() => setShowCreateEventForm(false)}>
              Annuler
            </Button>
          </FormButtonGroup>
        </FormWrapper>
      )}

      {currentDate && (
        <CalendarWrapper>
          <Calendar
            key={calendarKey} // <--- aqui
            localizer={localizer}
            events={events}
            date={currentDate}
            onNavigate={(date) => setCurrentDate(date)}
            view={currentView}
            onView={(view) => setCurrentView(view)}
            views={["month", "week", "day"]}
            onSelectEvent={(event) => setSelectedEvent(event)}
            style={{ height: 600 }}
            components={{ event: CustomEvent }}
            messages={{
              today: "Aujourd'hui",
              previous: "Précédent",
              next: "Suivant",
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
      )}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
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

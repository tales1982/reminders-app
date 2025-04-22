/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event as CalendarEvent } from "../../types/calendar";
import { EventModal } from "../../components/Modal";
import type { View } from "react-big-calendar";

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

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
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
    datetime: "",
    notifyBefore: 30,
    notifyEmail: false,
    notifyWhats: false,
  });

  useEffect(() => {
    setHasMounted(true);

    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:4000/api/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((event: any) => ({
          id: event.id,
          title: event.title,
          start: new Date(event.datetime),
          end: new Date(event.datetime),
          notifyBefore: event.notifyBefore,
          notifyEmail: event.notifyEmail,
          notifyWhats: event.notifyWhats,
        }));
        setEvents(formatted);
      })
      .catch((err) => {
        console.error("Erro ao carregar eventos:", err);
      });
  }, []);

  if (!hasMounted) return null;

  const handleCreateEvent = async (event: React.FormEvent) => {
    event.preventDefault();
    const selectedDate = new Date(newEvent.datetime);
    const now = new Date();

    if (selectedDate <= now) {
      alert("⛔ Não é possível adicionar eventos no passado.");
      return;
    }
    console.log("Evento no passado que nao pode ser armazenado " + editingEvent);

    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/api/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    const data = await response.json();
    setEvents([
      ...events,
      {
        id: data.id,
        title: data.title,
        start: new Date(data.datetime),
        end: new Date(data.datetime),
      },
    ]);
    setShowCreateEventForm(false);
    setNewEvent({
      title: "",
      datetime: "",
      notifyBefore: 30,
      notifyEmail: false,
      notifyWhats: false,
    });
  };

  const handleDelete = () => {
    if (!selectedEvent?.id) return;

    const token = localStorage.getItem("token");
    fetch(`http://localhost:4000/api/events/${selectedEvent.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setEvents(events.filter((event) => event.id !== selectedEvent.id));
        setSelectedEvent(null);
      })
      .catch((err) => console.error("Erro ao excluir evento:", err));
  };

  const handleEdit = () => {
    if (selectedEvent) {
      setEditingEvent(selectedEvent);
      setSelectedEvent(null);
    }
  };


  return (
    <Container>
      <Header>
        <h1>📅 Meu Calendário</h1>
        <Button onClick={() => setShowCreateEventForm(!showCreateEventForm)}>
          {showCreateEventForm ? "Fechar" : "Criar Evento"}
        </Button>
      </Header>

      {showCreateEventForm && (
        <FormWrapper onSubmit={handleCreateEvent}>
          <Label>
            Título do Evento:
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
            Data e Hora:
            <Input
              type="datetime-local"
              value={newEvent.datetime}
              onChange={(e) =>
                setNewEvent({ ...newEvent, datetime: e.target.value })
              }
              required
            />
          </Label>

          <Label>
            Notificar antes (minutos):
            <Input
              type="number"
              min={1}
              value={newEvent.notifyBefore}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  notifyBefore: Number(e.target.value),
                })
              }
              required
            />
          </Label>

          <Label>
            Notificar por:
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <label>
                <input
                  type="checkbox"
                  checked={newEvent.notifyEmail}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, notifyEmail: e.target.checked })
                  }
                />
                E-mail
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
            <Button type="submit">Salvar</Button>
            <Button type="button" onClick={() => setShowCreateEventForm(false)}>
              Cancelar
            </Button>
          </FormButtonGroup>
        </FormWrapper>
      )}

      <CalendarWrapper>
        <Calendar
          localizer={localizer}
          events={events}
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          view={currentView}
          onView={(view) => setCurrentView(view)}
          views={["month", "week", "day"]}
          onSelectEvent={(event) => setSelectedEvent(event)} // ✅ Aqui!
          style={{ height: 600 }}
          messages={{
            today: "Hoje",
            previous: "Anterior",
            next: "Próximo",
            month: "Mês",
            week: "Semana",
            day: "Dia",
            agenda: "Agenda",
            date: "Data",
            time: "Hora",
            event: "Evento",
            noEventsInRange: "Sem eventos neste período.",
          }}
        />
      </CalendarWrapper>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Container>
  );
};

export default CalendarPage;

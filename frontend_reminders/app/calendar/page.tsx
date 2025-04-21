"use client";

import React, { useState, useEffect } from "react";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event as CalendarEvent } from "../types/calendar"; // alias para evitar conflito com DOM

import {
  Container,
  Header,
  StyledCalendar,
  Button,
  FormWrapper,
  Label,
  Input,
  FormButtonGroup,
} from "./styles";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showCreateEventForm, setShowCreateEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    datetime: "",
    notifyBefore: 30,
    notifyEmail: false,
    notifyWhats: false,
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const handleCreateEvent = (event: React.FormEvent) => {
    event.preventDefault();
  
    const selectedDate = new Date(newEvent.datetime);
    const now = new Date();
  
    if (selectedDate <= now) {
      alert("⛔ Não é possível adicionar eventos no passado.");
      return;
    }
  
    const token = localStorage.getItem("token");
    fetch("http://localhost:4000/api/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Evento criado com sucesso:", data);
        setEvents([
          ...events,
          {
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
      })
      .catch((error) => console.error("Erro ao criar evento:", error));
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
            Notificar antes:
            <select
              value={newEvent.notifyBefore}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  notifyBefore: Number(e.target.value),
                })
              }
            >
              <option value={15}>15 minutos</option>
              <option value={30}>30 minutos</option>
              <option value={60}>1 hora</option>
              <option value={120}>2 horas</option>
              <option value={240}>4 horas</option>
              <option value={720}>12 horas</option>
              <option value={1440}>1 dia</option>
              <option value={2880}>2 dias</option>
            </select>
          </Label>

          <Label>
            <input
              type="checkbox"
              checked={newEvent.notifyEmail}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  notifyEmail: e.target.checked,
                })
              }
            />
            Notificar por E-mail
          </Label>

          <Label>
            <input
              type="checkbox"
              checked={newEvent.notifyWhats}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  notifyWhats: e.target.checked,
                })
              }
            />
            Notificar por WhatsApp
          </Label>

          <FormButtonGroup>
            <Button type="submit">Salvar</Button>
            <Button type="button" onClick={() => setShowCreateEventForm(false)}>
              Cancelar
            </Button>
          </FormButtonGroup>
        </FormWrapper>
      )}

      <StyledCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </Container>
  );
};

export default CalendarPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
// ✅ Tipo dos eventos para o calendário
// types/calendar.ts

export interface Event {
  id: number | string; // ✅ adicione isso
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
  notifyBefore?: number;
  notifyEmail?: boolean;
  notifyWhats?: boolean;
}

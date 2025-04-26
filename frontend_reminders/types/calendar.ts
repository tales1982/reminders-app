/* eslint-disable @typescript-eslint/no-explicit-any */
// ✅ Tipo dos eventos para o calendário
// types/calendar.ts

export interface CalendarEvent {
  id: number;
  title: string;
  description: string;    // ← agora existe
  start: Date;
  end: Date;
  notifyBefore: number;   // ← agora existe
  notifyEmail: boolean;   // ← agora existe
}

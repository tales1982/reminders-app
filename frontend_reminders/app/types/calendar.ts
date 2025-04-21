/* eslint-disable @typescript-eslint/no-explicit-any */
// ✅ Tipo dos eventos para o calendário
export interface Event {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
  }
  
'use client';

import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: #f4f6ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export const CalendarWrapper = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 1000px;

  .rbc-toolbar {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .rbc-event {
    background-color: #4f46e5;
    color: white;
    border-radius: 6px;
    padding: 4px 8px;
    font-weight: 500;
  }

  .rbc-today {
    background: #eef2ff;
  }

  .rbc-selected {
    background-color: #4338ca !important;
  }

  .rbc-day-bg.rbc-today {
    border: 2px solid #4f46e5;
  }

  .rbc-time-view .rbc-time-slot {
    border-top: 1px solid #e5e7eb;
  }

  .rbc-time-header-cell {
    background-color: #f8fafc;
    border-bottom: 1px solid #e5e7eb;
  }

  .rbc-header {
    background-color: #f8fafc;
    border-bottom: 1px solid #e5e7eb;
    font-weight: 600;
    color: #334155;
  }

  .rbc-off-range {
    background-color: #f1f5f9;
  }

  .rbc-agenda-view table.rbc-agenda-table {
    border: none;
    font-size: 0.95rem;

    th {
      background-color: #f0f0ff;
      color: #4f46e5;
    }

    td {
      padding: 0.75rem;
    }
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.2rem;
    font-weight: bold;
    color: #4f46e5;
    margin: 0;
  }
`;

export const Button = styled.button`
  background: #4f46e5;
  color: #fff;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #4338ca;
  }
`;

export const FormWrapper = styled.form`
  background: #ffffff;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 500;
  color: #1e293b;
`;

export const Input = styled.input`
  margin-top: 0.5rem;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }
`;

export const FormButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

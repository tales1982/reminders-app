'use client';

import styled from 'styled-components';

// Apenas a div externa ao BigCalendar será estilizada
export const CalendarWrapper = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  .rbc-event {
    background-color: #0070f3;
    color: white;
    border-radius: 4px;
    padding: 2px 6px;
  }
`;

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: #f5f7fa;
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h1 {
    font-size: 1.8rem;
    color: #333;
  }
`;

export const Button = styled.button`
  padding: 0.6rem 1rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #0059c1;
  }
`;

export const FormWrapper = styled.form`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
  color: #333;
`;

export const Input = styled.input`
  margin-top: 0.4rem;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`;

export const FormButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

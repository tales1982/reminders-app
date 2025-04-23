'use client';
import styled from 'styled-components';

export const Container = styled.div`
display: flex;
flex-direction: column;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #c9d6ff, #e2e2e2);
  padding: 2rem;
`;

export const FormWrapper = styled.div`
  background-color: white;
  padding: 2rem 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.8rem;
  color: #333;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 1rem;
  font-size: 0.95rem;
  color: #333;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 0.6rem;
  font-size: 1rem;
  margin-top: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #0070f3;
  }
`;

export const Button = styled.button`
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0059c1;
  }
`;

export const ErrorText = styled.p`
  color: red;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
`;

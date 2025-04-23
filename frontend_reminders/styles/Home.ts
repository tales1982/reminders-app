import styled, { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(to bottom right, #f0f4ff, #e0e7ff);
  font-family: "Inter", sans-serif;
`;

export const Card = styled.div`
  background: #ffffff;
  padding: 3rem 2rem;
  border-radius: 2rem;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.05);
  max-width: 500px;
  width: 100%;
  animation: ${fadeIn} 0.6s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #4f46e5;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const Status = styled.p<{ $logged?: boolean }>`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: ${(props) => (props.$logged ? '#22c55e' : '#ef4444')};
`;


export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s ease;

  background: ${(props) =>
    props.variant === "primary" ? "#4f46e5" : "#f3f4f6"};
  color: ${(props) => (props.variant === "primary" ? "#ffffff" : "#1e293b")};

  &:hover {
    background: ${(props) =>
      props.variant === "primary" ? "rgb(17, 114, 241)" : "#e5e7eb"};
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.6rem 1.2rem;
  }
`;


export const AlertBox = styled.div`
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fcd34d;
  padding: 1rem 1.25rem;
  margin-bottom: 2rem;
  border-radius: 1rem;
  font-size: 0.95rem;
  text-align: left;
  max-width: 460px;
  width: 100%;

  strong {
    display: block;
    margin-bottom: 0.5rem;
    color: #b45309;
    font-weight: 600;
  }

  code {
    background: #fde68a;
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.85rem 1rem;
  }
`;

'use client';
import React from 'react';
import styled from 'styled-components';
import { Event } from '../types/calendar';

type Props = {
  event: Event;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isOpen: boolean;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Button = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0059c1;
  }
`;

export const EventModal = ({ event, onClose, onEdit, onDelete }: Props) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>{event.title}</Title>
        <p><strong>Data:</strong> {new Date(event.start).toLocaleString()}</p>

        <ButtonGroup>
          <Button onClick={onEdit}>✏️ Modifier</Button>
          <Button onClick={onDelete}>🗑️ Supprimer</Button>
          <Button onClick={onClose}>Fermer</Button>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};

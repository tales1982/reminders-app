"use client";
import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  FormWrapper,
  Title,
  StyledForm,
  Label,
  Input,
  Button,
  ErrorText,
} from './styles';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        name,
        surname,
        city,
        email,
        password,
        whatsapp,
      });
      console.log(response.data);
      window.location.href = '/login';
    } catch (error) {
      setError('Erro ao registrar usuário');
      console.error(error);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Crie sua conta</Title>
        <StyledForm onSubmit={handleSubmit}>
          <Label>
            Nome:
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Label>
          <Label>
            Sobrenome:
            <Input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
          </Label>
          <Label>
            Cidade:
            <Input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
          </Label>
          <Label>
            E-mail:
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Label>
          <Label>
            Número de WhatsApp:
            <Input
              type="tel"
              placeholder="ex: 352661234567"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
            />
          </Label>
          <Label>
            Senha:
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Label>
          <Label>
            Confirmar Senha:
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </Label>
          <Button type="submit">Registrar</Button>
          {error && <ErrorText>{error}</ErrorText>}
        </StyledForm>
      </FormWrapper>
    </Container>
  );
};

export default RegisterPage;

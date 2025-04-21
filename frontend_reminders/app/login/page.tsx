'use client';

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

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/calendar';
    } catch (error) {
      setError('Erro ao fazer login');
      console.error(error);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <StyledForm onSubmit={handleSubmit}>
          <Label>
            E-mail:
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </Label>
          <Label>
            Senha:
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Label>
          <Button type="submit">Fazer Login</Button>
          {error && <ErrorText>{error}</ErrorText>}
        </StyledForm>
      </FormWrapper>
    </Container>
  );
};

export default LoginPage;

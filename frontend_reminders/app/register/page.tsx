"use client";
import { useState } from 'react';
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone: string) => /^\+?[0-9]{10,15}$/.test(phone);
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

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import Footer from '@/components/Footer';

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
  
    // Verifica campos básicos
    if (!name || !surname || !city || !email || !whatsapp || !password || !confirmPassword) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
  
    if (!isValidEmail(email)) {
      setError("Veuillez entrer une adresse e-mail valide.");
      return;
    }
  
    if (!isValidPhone(whatsapp)) {
      setError("Veuillez entrer un numéro WhatsApp valide (ex: +352661234567).");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
  
    try {
      const response = await axios.post(`${apiUrl}/api/auth/register`, {
        name,
        surname,
        city,
        email,
        password,
        whatsapp,
      });

      console.log(response.data);
      // Alerta para ativar número no CallMeBot
      alert("Inscription réussie ! Pour activer votre numéro WhatsApp, veuillez envoyer un message contenant le mot '/start' à CallMeBot au numéro suivant : +34 684 73 40 44 via WhatsApp.");
      window.location.href = '/login';
    } catch (error) {
      setError("Erreur lors de l'inscription.");
      console.error(error);
    }
  };
  

  return (
    <Container>
      <FormWrapper>
        <Title>Créer votre compte</Title>
        <StyledForm onSubmit={handleSubmit}>
          <Label>
            Prénom :
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Label>
          <Label>
            Nom :
            <Input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
          </Label>
          <Label>
            Ville :
            <Input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
          </Label>
          <Label>
            Adresse e-mail :
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Label>
          <Label>
            Numéro WhatsApp :
            <Input
              type="tel"
              placeholder="ex : 352661234567"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
            />
          </Label>
          <Label>
            Mot de passe :
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Label>
          <Label>
            Confirmer le mot de passe :
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </Label>
          <Button type="submit">S&apos;inscrire</Button>
          {error && <ErrorText>{error}</ErrorText>}
        </StyledForm>
      </FormWrapper>
      <Footer/>
    </Container>
  );
};

export default RegisterPage;

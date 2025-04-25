"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

import {
  Container,
  Card,
  Title,
  Subtitle,
  Status,
  Actions,
  Button,
  AlertBox,
} from "@/styles/Home";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error('Erro ao verificar token:', err);
        setIsLoggedIn(false);
      });
  }, []);
  

  return (
    <Container>
      <Card>
        <Title>🧠 Reminders App</Title>
        <Subtitle>
          Organisez vos événements avec des rappels pour <strong>Email</strong>{" "}
          e <strong>WhatsApp</strong>.
        </Subtitle>
        <AlertBox>
  <strong>📌 Pour recevoir des notifications WhatsApp :</strong>
  Avant tout, vous devez activer votre numéro auprès du service CallMeBot.
  <br /><br />
  Envoyez le message <code>/start</code> au numéro :<br />
  <strong>+34 684 73 40 44</strong>
  <br /><br />
  Après cela, vous serez autorisé à recevoir des rappels via WhatsApp.
</AlertBox>

        {isLoggedIn ? (
          <>
            <Status $logged>✅ Vous êtes connecté!</Status>

            <Button variant="primary" onClick={() => router.push("/calendar")}>
              Aller au calendrier 📅
            </Button>
          </>
        ) : (
          <Actions>
            <Status>🔐 Vous n&apos;êtes pas encore connecté.</Status>
            <Button variant="primary" onClick={() => router.push("/login")}>
              Se connecter
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push("/register")}
            >
              Créer un compte
            </Button>
          </Actions>
        )}
      </Card>
      <Footer />
    </Container>
  );
}

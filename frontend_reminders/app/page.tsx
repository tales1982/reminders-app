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
} from "@/styles/Home";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Container>
      <Card>
        <Title>🧠 Reminders App</Title>
        <Subtitle>
          Organisez vos événements avec des rappels pour <strong>Email</strong>{" "}
          e <strong>WhatsApp</strong>.
        </Subtitle>

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

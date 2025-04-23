"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import "./home.css";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <main className="home-container">
      <div className="home-card">
        <h1 className="home-title">🧠 Reminders App</h1>
        <p className="home-subtitle">
          Organisez vos événements avec des rappels pour <strong>Email</strong> e <strong>WhatsApp</strong>.
        </p>

        {isLoggedIn ? (
          <>
            <p className="home-status logged">✅ Vous êtes connecté!</p>
            <button className="home-button primary" onClick={() => router.push("/calendar")}>Aller au calendrier 📅</button>
          </>
        ) : (
          <div className="home-actions">
            <p className="home-status not-logged">🔐 Vous n&apos;êtes pas encore connecté.</p>
            <button className="home-button primary" onClick={() => router.push("/login")}>Se connecter</button>
            <button className="home-button secondary" onClick={() => router.push("/register")}>Créer un compte</button>
          </div>
        )}
      </div>
      <Footer/>
    </main>
  );
}

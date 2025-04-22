"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
          Organize seus eventos com lembretes por <strong>Email</strong> e <strong>WhatsApp</strong>.
        </p>

        {isLoggedIn ? (
          <>
            <p className="home-status logged">✅ Você está logado!</p>
            <button className="home-button primary" onClick={() => router.push("/calendar")}>Ir para o Calendário 📅</button>
          </>
        ) : (
          <div className="home-actions">
            <p className="home-status not-logged">🔐 Você ainda não está logado.</p>
            <button className="home-button primary" onClick={() => router.push("/login")}>Login</button>
            <button className="home-button secondary" onClick={() => router.push("/register")}>Criar Conta</button>
          </div>
        )}
      </div>
    </main>
  );
}

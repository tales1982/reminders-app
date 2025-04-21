"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🧠 Bem-vindo ao Reminders App!</h1>
      <p>Gerencie seus eventos com lembretes por E-mail e WhatsApp.</p>

      {isLoggedIn ? (
        <>
          <p style={{ marginTop: "1rem" }}>✅ Você está logado!</p>
          <button
            style={{ marginTop: "1rem", padding: "10px 20px", fontSize: "16px" }}
            onClick={() => router.push("/calendar")}
          >
            Ir para o Calendário 📅
          </button>
        </>
      ) : (
        <>
          <p style={{ marginTop: "1rem" }}>🔐 Você ainda não está logado.</p>
          <button
            style={{ margin: "1rem", padding: "10px 20px", fontSize: "16px" }}
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button
            style={{ padding: "10px 20px", fontSize: "16px" }}
            onClick={() => router.push("/register")}
          >
            Criar Conta
          </button>
        </>
      )}
    </main>
  );
}

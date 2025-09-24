"use client";
import { useState } from "react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: { name, email, message },
      }),
    });

    if (res.ok) {
      setStatus("Message envoyé !");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("Erreur lors de l'envoi.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom"
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Votre message"
        rows="5"
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2"
      />
      <button
        type="submit"
        className="inline-block bg-black text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Envoyer
      </button>
      {status && <p className="text-sm text-green-600 mt-2">{status}</p>}
    </form>
  );
}

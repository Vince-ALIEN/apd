"use client";
import React, { useState } from "react";
import Footer from "./Footer"; // adapte le chemin si nécessaire

export default function ContactSection({ site }) {
  return (
    <section className="w-full max-w-xl mx-auto bg-black/20 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-white">
      <h2 className="text-3xl font-bold mb-6 drop-shadow-lg text-center">
        Contactez-nous
      </h2>
      <ContactForm />
    </section>
  );
}

function ContactForm() {
  return (
    <form className="space-y-6 contact-form">
      <FormField id="nom" label="Nom" type="text" />
      <FormField id="email" label="Email" type="email" />
      <FormTextarea id="message" label="Message" rows={5} />
      <SubmitButton />
    </form>
  );
}

function FormField({ id, label, type }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full p-3 rounded-lg bg-white/80 text-black"
        required
      />
    </div>
  );
}

function FormTextarea({ id, label, rows }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 font-medium">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className="w-full p-3 rounded-lg bg-white/80 text-black"
        required
      />
    </div>
  );
}

function SubmitButton() {
  return (
    <button
      type="submit"
      className="px-6 py-3 bg-red-500 text-white font-bold rounded-full shadow hover:bg-red-600 transition"
    >
      Envoyer
    </button>
  );
}

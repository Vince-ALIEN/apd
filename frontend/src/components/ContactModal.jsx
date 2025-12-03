"use client";

import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import gsap from "gsap";

/**
 * ContactModal - Modale de contact simple avec état interne
 * @param {boolean} triggerButton - Afficher le bouton déclencheur (défaut: true)
 * @param {string} buttonText - Texte du bouton
 * @param {string} buttonClassName - Classes CSS du bouton
 */
const ContactModal = forwardRef(
  (
    {
      triggerButton = true,
      buttonText = "Contacter l'association",
      buttonClassName = "mt-4 px-6 py-3 bg-[#ac1115] font-semibold text-white rounded-sm shadow-md hover:bg-red-700 transition mx-auto block",
    },
    ref
  ) => {
    const modalRef = useRef(null);
    const successRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    // Expose open/close pour contrôle externe via ref
    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    const [form, setForm] = useState({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
      document.body.style.overflow = isOpen ? "hidden" : "";
      if (isOpen && modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          }
        );
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    useEffect(() => {
      if (success && successRef.current) {
        gsap.fromTo(
          successRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    }, [success]);

    useEffect(() => {
      if (success) {
        const timer = setTimeout(() => {
          setIsOpen(false);
          setSuccess(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [success]);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setSuccess(false);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/email`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          }
        );

        const data = await res.json();
        console.log("Réponse Strapi :", data);

        if (res.ok && data.success) {
          setSuccess(true);
          setForm({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
        } else {
          alert(data.error || "Erreur lors de l'envoi.");
        }
      } catch (err) {
        console.error("Erreur réseau :", err);
        alert("Impossible de contacter le serveur.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <>
        {triggerButton && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={buttonClassName}
          >
            {buttonText}
          </button>
        )}

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4 pt-12">
            <div
              ref={modalRef}
              className="bg-white text-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-xl relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>

              <h2 className="text-3xl md:text-4xl mb-6 text-center font-garamond">
                Contactez-{" "}
                <span className="shadow-underline text-white">nous</span>
              </h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Votre nom"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Votre email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Téléphone (facultatif)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  type="text"
                  placeholder="Sujet (facultatif)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Votre message"
                  rows={5}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#ac1115] font-semibold text-white py-3 rounded-lg transition disabled:opacity-50 hover:brightness-110"
                >
                  {loading ? "Envoi en cours..." : "Envoyer le message"}
                </button>
                {success && (
                  <p
                    ref={successRef}
                    className="text-green-600 text-center text-sm mt-2"
                  >
                    ✅ Message envoyé avec succès !
                  </p>
                )}
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
);

ContactModal.displayName = "ContactModal";

export default ContactModal;

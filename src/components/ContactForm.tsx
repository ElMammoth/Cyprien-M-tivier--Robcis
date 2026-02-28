"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

interface FloatingFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  delay?: number;
}

function FloatingField({
  name,
  label,
  type = "text",
  required = false,
  textarea = false,
  delay = 0,
}: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = focused || hasValue;

  const sharedClassName =
    "w-full bg-transparent font-sans text-base text-black/80 border-b border-black/15 focus:border-black/40 outline-none transition-colors duration-300 pb-2 pt-6";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay }}
      className="relative"
    >
      {/* Floating label */}
      <span
        className={`absolute left-0 font-sans transition-all duration-200 pointer-events-none ${
          isActive
            ? "top-0 text-[10px] tracking-widest uppercase text-black/30"
            : "top-6 text-base text-black/30"
        }`}
      >
        {label}
      </span>

      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          className={`${sharedClassName} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          className={sharedClassName}
        />
      )}
    </motion.div>
  );
}

interface ContactFormProps {
  locale: "en" | "fr";
}

export default function ContactForm({ locale }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const isFR = locale === "fr";

  const labels = {
    name: isFR ? "Votre nom" : "Your name",
    email: isFR ? "Votre email" : "Your email",
    company: isFR ? "Entreprise / organisation" : "Company / organization",
    role: isFR ? "Votre poste" : "Your role / position",
    message: isFR ? "Message" : "Message",
    send: isFR ? "Envoyer" : "Send message",
    sending: isFR ? "Envoi en cours…" : "Sending…",
    sent: isFR ? "Message envoyé — merci\u00A0!" : "Message sent — thank you!",
    error: isFR
      ? "Une erreur est survenue. Réessayez ou contactez-moi directement."
      : "Something went wrong. Try again or reach out directly.",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current || status === "sending") return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS env variables missing:", { serviceId: !!serviceId, templateId: !!templateId, publicKey: !!publicKey });
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      });
      setStatus("sent");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  }

  return (
    <div className="max-w-[680px]">
      {status === "sent" ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-3 h-3 bg-red rounded-full" />
            <span className="font-sans text-label tracking-widest uppercase text-black/40">
              {isFR ? "Confirmé" : "Confirmed"}
            </span>
          </div>
          <p className="font-serif text-2xl md:text-3xl leading-title">
            {labels.sent}
          </p>
        </motion.div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          <FloatingField
            name="from_name"
            label={labels.name}
            required
            delay={0.1}
          />
          <FloatingField
            name="from_email"
            label={labels.email}
            type="email"
            required
            delay={0.15}
          />
          <FloatingField
            name="company"
            label={labels.company}
            delay={0.2}
          />
          <FloatingField
            name="role"
            label={labels.role}
            delay={0.25}
          />
          <FloatingField
            name="message"
            label={labels.message}
            textarea
            required
            delay={0.3}
          />

          {/* Error message */}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-sans text-caption text-red/80"
            >
              {labels.error}
            </motion.p>
          )}

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative font-sans text-label tracking-widest uppercase px-8 py-4 bg-black text-cream hover:bg-cream hover:text-black border border-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? labels.sending : labels.send}
            </button>
          </motion.div>
        </form>
      )}
    </div>
  );
}

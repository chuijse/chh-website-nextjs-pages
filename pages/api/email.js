import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // sendEmail.js manda el body como JSON string. Next lo parsea solo si llega
  // con Content-Type: application/json; por si acaso, parseamos defensivamente.
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  const name = (body?.name ?? "").trim();
  const email = (body?.email ?? "").trim();
  const message = (body?.message ?? "").trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, "<br />")}</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(502).json({ error: "No se pudo enviar el mensaje" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Email handler error:", err);
    return res.status(500).json({ error: "Error interno" });
  }
}

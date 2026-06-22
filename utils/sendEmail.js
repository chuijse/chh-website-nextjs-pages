export async function sendEmail(data, setButtonMessage) {
  const apiEndpoint = "/api/email";

  setButtonMessage("Enviando…");

  try {
    const res = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { error } = await res.json().catch(() => ({}));
      setButtonMessage(error || "Error, reintenta");
      return false;
    }

    setButtonMessage("Mensaje enviado");
    return true;
  } catch {
    setButtonMessage("Error, reintenta");
    return false;
  }
}

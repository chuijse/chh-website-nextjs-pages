export async function sendEmail(data, setButtonMassege) {
  const apiEndpoint = "/api/email";
  //console.log(JSON.stringify(data));

  await fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      setButtonMassege("mensaje Enviado");
    })
    .catch((err) => {
      alert(err);
    });
}

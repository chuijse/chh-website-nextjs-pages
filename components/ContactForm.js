export default function ContactForm({ state, setState, onSubmit }) {
  const textAreaHandleChange = (event) => {
    setState({ ...state, message: event.target.value });
  };

  return (
    <form className="contact-form" autoComplete="off" onSubmit={onSubmit}>
      <div className="input_half">
        <label htmlFor="user_name">Nombre:</label>
        <input
          name="user_name"
          required
          placeholder="Tu nombre*"
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
      </div>
      <div className="input">
        <label htmlFor="user_mail">Mail:</label>
        <input
          type="email"
          name="user_mail"
          required
          placeholder="Tu mail*"
          onChange={(e) => setState({ ...state, email: e.target.value })}
        />
      </div>
      <div className="input_textarea">
        <label htmlFor="message">Mensaje:</label>
        <textarea
          type="text"
          name="message"
          required
          placeholder="tu mensaje*"
          onChange={(e) => textAreaHandleChange(e)}
        />
      </div>
    </form>
  );
}

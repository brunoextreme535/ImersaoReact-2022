import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(formProps) {
  const [values, setValues] = React.useState(formProps.initialValues);

  return {
    values,
    handleChange: (event) => {
      const value = event.target.value;
      const name = event.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({});
    },
  };
}

export default function RegisterVideo() {
  const fomrRegister = useForm({
    initialValues: {
      title: "",
      url: "",
    },
  });
  const [visibleForm, setVisibleForm] = React.useState(true);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setVisibleForm(true)}>
        +
      </button>
      {/* Ternário */}
      {/* Operadores de curto-circuito */}
      {visibleForm ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setVisibleForm(false);
            fomrRegister.clearForm();
          }}
        >
          <div>
            <button
            type="button"
              className="close-modal"
              onClick={() => setVisibleForm(false)}
            >
              X
            </button>
            <input
              placeholder="Título do vídeo"
              name="title"
              value={fomrRegister.values.title}
              onChange={fomrRegister.handleChange}
            />
            <input
              placeholder="URL do vídeo"
              name="url"
              value={fomrRegister.values.url}
              onChange={fomrRegister.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : null}
    </StyledRegisterVideo>
  );
}

import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from '@supabase/supabase-js'

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

const PROJECT_URL = "https://lxnozihmhenwvkmkrcvr.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4bm96aWhtaGVud3ZrbWtyY3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDg2NjMsImV4cCI6MTk4Mzc4NDY2M30.7sJlW4N4z3OUmZ3tgQaTw6tEW0-aYwSDDPndbGATMu0"
const supabase = createClient( PROJECT_URL, API_KEY )

// get youtube thumbnail from video url
function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
};

export default function RegisterVideo() {
  const formRegister = useForm({
    initialValues: {
      title: "",
      url: "",
    },
  });  

  const [visibleForm, setVisibleForm] = React.useState(false);

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

            // Contrato entre o Front e o BackEnd
            supabase.from("video").insert({
              title: formRegister.values.title,
              url: formRegister.values.url,
              thumb: getThumbnail(formRegister.values.url),
              playlist: "jogos"
            })
            .then((event) => {
              console.log(event)
            })
            .catch((error) => {
              console.log(error)
            })

            setVisibleForm(false);
            formRegister.clearForm();
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
              value={formRegister.values.title}
              onChange={formRegister.handleChange}
            />
            <input
              placeholder="URL do vídeo"
              name="url"
              value={formRegister.values.url}
              onChange={formRegister.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : null}
    </StyledRegisterVideo>
  );
}

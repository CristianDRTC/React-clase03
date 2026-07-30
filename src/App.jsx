import { useState } from "react";
import "./App.css";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";

const contactosIniciales = [
  {
    id: 1,
    nombre: "Cristian Román",
    telefono: "300 123 4567",
    correo: "cristian@sena.edu.co",
    etiqueta: "Aprendiz",
  },
];

export default function App() {
  const [contactos, setContactos] = useState(contactosIniciales);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    etiqueta: "",
  });

  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, { id: Date.now(), ...nuevo }]);
  };

  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    agregarContacto(form);
    setForm({ nombre: "", correo: "", telefono: "", etiqueta: "" });
  };

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO v2</h1>
      
      <p className="contador">
        Tienes <strong>{contactos.length}</strong> {contactos.length === 1 ? "contacto guardado" : "contactos guardados"}
      </p>

      <FormularioContacto form={form} onChange={onChange} onSubmit={onSubmit} />
      
      <section className="lista-contactos">
        {contactos.length === 0 ? (
          <p>No hay contactos en la agenda.</p>
        ) : (
          contactos.map((c) => (
            <ContactoCard
              key={c.id}
              id={c.id}
              nombre={c.nombre}
              telefono={c.telefono}
              correo={c.correo}
              etiqueta={c.etiqueta}
              onDelete={eliminarContacto}
            />
          ))
        )}
      </section>
    </main>
  );
}
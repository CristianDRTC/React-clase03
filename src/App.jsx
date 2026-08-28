import React, { useState } from "react";
import { FormularioContacto } from "./components/FormularioContacto";
import { ContactoCard } from "./components/ContactoCard";
import "./App.css";

function Agenda() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      nombre: "Ana Torres",
      telefono: "300 123 4567",
      correo: "ana.torres@sena.edu.co",
      empresa: "SENA",
    },
  ]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");

  const visibleContacts = contacts
    .filter((contact) =>
      Object.values(contact).some((value) =>
        String(value).toLowerCase().startsWith(search.toLowerCase().trim())
      )
    )
    .sort((a, b) =>
      order === "asc"
        ? a.nombre.localeCompare(b.nombre)
        : b.nombre.localeCompare(a.nombre)
    );

  function addContact(contact) {
    setContacts((current) => [...current, { ...contact, id: Date.now() }]);
  }

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO</h1>
      <p className="saludo-texto">Agrega y organiza tus contactos.</p>

      <div className="panel-layout">
        <section className="form-panel">
          <h2>Nuevo contacto</h2>
          <FormularioContacto onAgregar={addContact} mostrarEmpresa />
        </section>

        <section className="lista-panel">
          <h2 className="lista-titulo">Mis contactos</h2>
          <div className="contact-tools">
            <input
              type="search"
              placeholder="Buscar por inicio..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button
              type="button"
              onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
            >
              {order === "asc" ? "A-Z" : "Z-A"}
            </button>
          </div>

          <div className="lista-contactos">
            {visibleContacts.map((contact) => (
              <ContactoCard
                key={contact.id}
                {...contact}
                mostrarEmpresa
                onEliminar={(correo) =>
                  setContacts((current) =>
                    current.filter((item) => item.correo !== correo)
                  )
                }
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function App() {
  return <Agenda />;
}
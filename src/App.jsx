import React, { useEffect, useState } from "react";
import { FormularioContacto } from "./components/FormularioContacto";
import { ContactoCard } from "./components/ContactoCard";
import { Paginador } from "./components/Paginador";
import "./App.css";

function Agenda() {
  const [contacts, setContacts] = useState([
    { id: 1, nombre: "Ana Torres", telefono: "300 123 4567", correo: "ana.torres@sena.edu.co", empresa: "SENA" },
    { id: 2, nombre: "Cristian Acevedo", telefono: "300 765 4321", correo: "cristian@sena.edu.co", empresa: "SENA" },
    { id: 3, nombre: "Gustavo Bolaños", telefono: "321 753 2037", correo: "gustavo@sena.edu.co", empresa: "SENA" },
    { id: 4, nombre: "Beatriz Salazar", telefono: "310 222 4455", correo: "beatriz@sena.edu.co", empresa: "SENA" },
    { id: 5, nombre: "Manuela Ríos", telefono: "313 908 1122", correo: "manuela@sena.edu.co", empresa: "SENA" },
    { id: 6, nombre: "Diego Herrera", telefono: "315 400 8899", correo: "diego@sena.edu.co", empresa: "SENA" },
    { id: 7, nombre: "Laura Gómez", telefono: "320 118 3344", correo: "laura@sena.edu.co", empresa: "SENA" },
  ]);

  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [paginaActual, setPaginaActual] = useState(1);
  const [porPagina, setPorPagina] = useState(3);

  const visibleContacts = contacts
    .filter((contact) =>
      Object.values(contact).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase().trim())
      )
    )
    .sort((a, b) =>
      order === "asc"
        ? a.nombre.localeCompare(b.nombre)
        : b.nombre.localeCompare(a.nombre)
    );

  const totalPaginas = Math.max(1, Math.ceil(visibleContacts.length / porPagina));
  const inicio = (paginaActual - 1) * porPagina;
  const contactosPagina = visibleContacts.slice(inicio, inicio + porPagina);

  useEffect(() => {
    setPaginaActual(1);
  }, [search, order, porPagina]);

  useEffect(() => {
    if (paginaActual > totalPaginas) setPaginaActual(totalPaginas);
  }, [paginaActual, totalPaginas]);

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
              placeholder="Buscar..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button type="button" onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
              {order === "asc" ? "A-Z" : "Z-A"}
            </button>
            <select value={porPagina} onChange={(e) => setPorPagina(Number(e.target.value))}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>

          <p className="contador">Página {paginaActual} / {totalPaginas}</p>

          <div className="lista-contactos">
            {contactosPagina.map((contact) => (
              <ContactoCard
                key={contact.id}
                {...contact}
                mostrarEmpresa
                onEliminar={(correo) =>
                  setContacts((current) => current.filter((item) => item.correo !== correo))
                }
              />
            ))}
          </div>

          <Paginador
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            onChange={setPaginaActual}
          />
        </section>
      </div>
    </main>
  );
}

export default function App() {
  return <Agenda />;
}
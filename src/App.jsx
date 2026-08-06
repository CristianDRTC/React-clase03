import React, { useState, useEffect } from "react";
import { FormularioContacto } from "./components/FormularioContacto";
import { ContactoCard } from "./components/ContactoCard";

export default function App() {
  const [mostrarEmpresa, setMostrarEmpresa] = useState(false);
  const [contactos, setContactos] = useState(() => {
    const guardados = localStorage.getItem("agenda_adso_v4");
    return guardados
      ? JSON.parse(guardados)
      : [
          {
            nombre: "Ana Torres",
            telefono: "300 123 4567",
            correo: "ana.torres@sena.edu.co",
            empresa: "SENA CTMA",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("agenda_adso_v4", JSON.stringify(contactos));
  }, [contactos]);

  function agregarContacto(nuevo) {
    setContactos((prev) => [...prev, nuevo]);
  }

  function eliminarContacto(correo) {
    setContactos((prev) => prev.filter((c) => c.correo !== correo));
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-purple-700">Agenda ADSO v4</h1>
          <p className="text-gray-500 text-sm mt-1">
            Diseño moderno con TailwindCSS
          </p>
          <button
            onClick={() => setMostrarEmpresa(!mostrarEmpresa)}
            className="mt-3 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full transition"
          >
            {mostrarEmpresa ? "Ocultar campo Empresa" : "Activar campo Empresa"}
          </button>
        </header>

        <FormularioContacto
          onAgregar={agregarContacto}
          mostrarEmpresa={mostrarEmpresa}
        />

        <section className="space-y-3">
          {contactos.map((c) => (
            <ContactoCard
              key={c.correo}
              {...c}
              onEliminar={eliminarContacto}
              mostrarEmpresa={mostrarEmpresa}
            />
          ))}
          {contactos.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-4">
              Sin contactos guardados.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

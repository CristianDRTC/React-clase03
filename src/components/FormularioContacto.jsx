import React, { useState } from "react";

export function FormularioContacto({ onAgregar, mostrarEmpresa }) {
  const base = { nombre: "", telefono: "", correo: "", empresa: "" };
  const [form, setForm] = useState(base);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!form.nombre || !form.telefono || !form.correo) return;
    onAgregar(form);
    setForm(base);
  }

  const inputClass =
    "w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500";

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white border border-gray-200 rounded-lg shadow-sm p-5"
    >
      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">Nombre *</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">Teléfono *</label>
        <input
          name="telefono"
          value={form.telefono}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      <div className={`space-y-1 ${mostrarEmpresa ? "" : "sm:col-span-2"}`}>
        <label className="text-sm font-semibold text-gray-700">Correo *</label>
        <input
          name="correo"
          value={form.correo}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      {mostrarEmpresa && (
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">Empresa</label>
          <input
            name="empresa"
            value={form.empresa}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      )}

      <button
        type="submit"
        className="sm:col-span-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg py-2.5 transition"
      >
        Agregar contacto
      </button>
    </form>
  );
}

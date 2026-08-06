import React from "react";

export function ContactoCard({
  nombre,
  telefono,
  correo,
  empresa,
  onEliminar,
  mostrarEmpresa,
}) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center justify-between gap-4 mb-3">
      <div>
        <h3 className="font-bold text-gray-800">{nombre}</h3>
        <p className="text-sm text-gray-600">📞 {telefono}</p>
        <p className="text-sm text-gray-600">✉️ {correo}</p>
        {mostrarEmpresa && empresa && (
          <p className="text-sm text-gray-600">🏢 {empresa}</p>
        )}
      </div>
      <button
        onClick={() => onEliminar(correo)}
        className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-full px-4 py-2 transition"
      >
        Eliminar
      </button>
    </article>
  );
}

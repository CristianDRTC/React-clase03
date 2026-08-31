import React from "react";

export function Paginador({ paginaActual, totalPaginas, onChange }) {
    if (totalPaginas <= 1) return null;

    return (
        <div className="paginador">
            <button
                type="button"
                disabled={paginaActual === 1}
                onClick={() => onChange(paginaActual - 1)}
            >
                Anterior
            </button>

            {Array.from({ length: totalPaginas }, (_, index) => index + 1).map((page) => (
                <button
                    key={page}
                    type="button"
                    className={page === paginaActual ? "activo" : ""}
                    onClick={() => onChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                disabled={paginaActual === totalPaginas}
                onClick={() => onChange(paginaActual + 1)}
            >
                Siguiente
            </button>
        </div>
    );
}

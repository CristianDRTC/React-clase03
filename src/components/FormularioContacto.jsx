import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
    const [form, setForm] = useState({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "Aprendiz",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.nombre.trim() || !form.telefono.trim()) {
            alert("Por favor completa al menos el nombre y el teléfono.");
            return;
        }

        onAgregar(form);

        setForm({
            nombre: "",
            telefono: "",
            correo: "",
            etiqueta: "Aprendiz",
        });
    };

    return (
        <form className="formulario-contacto" onSubmit={handleSubmit}>
            <h2>Agregar Contacto</h2>

            <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={form.nombre}
                onChange={handleChange}
            />

            <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={handleChange}
            />

            <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={form.correo}
                onChange={handleChange}
            />

            <select name="etiqueta" value={form.etiqueta} onChange={handleChange}>
                <option value="Aprendiz">Aprendiz</option>
                <option value="Instructor">Instructor</option>
                <option value="Compañero">Compañero</option>
                <option value="Familia">Familia</option>
            </select>

            <button type="submit">Guardar Contacto</button>
        </form>
    );
}
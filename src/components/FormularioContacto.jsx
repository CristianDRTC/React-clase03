export default function FormularioContacto({ form, onChange, onSubmit }) {
    const esInvalido = !form.nombre.trim() || !form.telefono.trim() || !form.correo.includes("@");

    return (
        <form onSubmit={onSubmit} className="form-contacto">
            <input
                name="nombre"
                placeholder="Nombre completo *"
                value={form.nombre}
                onChange={onChange}
            />
            <input
                name="telefono"
                placeholder="Teléfono *"
                value={form.telefono}
                onChange={onChange}
            />
            <input
                type="email"
                name="correo"
                placeholder="Correo electrónico (debe incluir @) *"
                value={form.correo}
                onChange={onChange}
            />
            <input
                name="etiqueta"
                placeholder="Etiqueta (opcional)"
                value={form.etiqueta}
                onChange={onChange}
            />

            <button type="submit" disabled={esInvalido}>
                Agregar contacto
            </button>
        </form>
    );
}
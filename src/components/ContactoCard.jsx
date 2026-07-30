export default function ContactoCard({ id, nombre, telefono, correo, etiqueta, onDelete }) {
    return (
        <article className="contacto-card">
            <h3>{nombre}</h3>
            <p>📞 Teléfono: {telefono}</p>
            <p>📧 Correo: {correo}</p>
            <span className="badge">{etiqueta}</span>

            <button onClick={() => onDelete(id)}>
                Eliminar
            </button>
        </article>
    );
}
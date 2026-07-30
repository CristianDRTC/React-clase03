export default function ContactoCard({ id, nombre, telefono, correo, etiqueta, onDelete }) {
    return (
        <article className="tarjeta-contacto">
            <h3>{nombre}</h3>
            <p>📞 Teléfono: {telefono}</p>
            <p>📧 Correo: {correo}</p>
            {etiqueta && <span className="badge">{etiqueta}</span>}

            <button className="btn-eliminar" onClick={() => onDelete(id)}>
                Eliminar
            </button>
        </article>
    );
}
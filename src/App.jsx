import React, { useState, useEffect } from "react";
import { FormularioContacto } from "./components/FormularioContacto";
import { ContactoCard } from "./components/ContactoCard";


import { useState } from "react";
import "./App.css";

const initialForm = { nombre: "", telefono: "", correo: "", etiqueta: "" };
const initialErrors = { nombre: "", telefono: "", correo: "" };
const navItems = [["intro", "Introducción"], ["problema", "El problema de UX"], ["errores", "Estado de errores"], ["validar", "validarFormulario()"], ["demo", "Demo completa en vivo"], ["checklist", "Checklist de UX"], ["actividad", "Actividad"], ["evidencias", "Evidencias"]];

function validate(form) {
  const errors = { ...initialErrors };
  if (!form.nombre.trim()) errors.nombre = "El nombre es obligatorio.";
  if (!form.telefono.trim()) errors.telefono = "El teléfono es obligatorio.";
  if (!form.correo.trim()) errors.correo = "El correo es obligatorio.";
  else if (!form.correo.includes("@")) errors.correo = "El correo debe contener @.";
  return errors;
}

function Field({ label, name, value, error, onChange, optional = false }) {
  return <div className="field"><label htmlFor={name}>{label} {!optional && "*"}</label><input id={name} name={name} value={value} onChange={onChange} className={error ? "error" : ""} placeholder={optional ? "Opcional" : `Escribe tu ${label.toLowerCase()}`} />{error && <small className="field-error">{error}</small>}</div>;
}

function ContactForm({ onAdd }) {
  const [form, setForm] = useState(initialForm); const [errors, setErrors] = useState(initialErrors); const [sending, setSending] = useState(false);
  function change(event) { setForm((current) => ({ ...current, [event.target.name]: event.target.value })); }
  async function submit(event) { event.preventDefault(); const nextErrors = validate(form); setErrors(nextErrors); if (Object.values(nextErrors).some(Boolean)) return; setSending(true); await new Promise((resolve) => setTimeout(resolve, 700)); onAdd(form); setForm(initialForm); setErrors(initialErrors); setSending(false); }
  return <form className="contact-form" onSubmit={submit}><Field label="Nombre" name="nombre" value={form.nombre} error={errors.nombre} onChange={change} /><Field label="Teléfono" name="telefono" value={form.telefono} error={errors.telefono} onChange={change} /><Field label="Correo" name="correo" value={form.correo} error={errors.correo} onChange={change} /><Field label="Etiqueta" name="etiqueta" value={form.etiqueta} onChange={change} optional /><button className="primary" disabled={sending}>{sending ? "Guardando..." : "Agregar contacto"}</button></form>;
}

function AgendaDemo() {
  const [contacts, setContacts] = useState([{ id: 1, nombre: "Ana Torres", telefono: "300 123 4567", correo: "ana.torres@sena.edu.co", etiqueta: "Compañera" }]); const [serverOff, setServerOff] = useState(false); const [error, setError] = useState("");
  async function add(contact) { setError(""); await new Promise((resolve) => setTimeout(resolve, 700)); if (serverOff) { setError("No se pudo guardar el contacto. Verifica el servidor e intenta nuevamente."); return; } setContacts((current) => [...current, { ...contact, id: Date.now() }]); }
  return <div className="agenda-demo"><label className="server-toggle"><input type="checkbox" checked={serverOff} onChange={(event) => setServerOff(event.target.checked)} /> Simular servidor apagado</label><h3>Agenda ADSO v6</h3><p className="muted center">Gestión de contactos con validaciones y mejor experiencia.</p>{error && <div className="alert error-alert">{error}</div>}<ContactForm onAdd={add} /><div className="contacts">{contacts.map((contact) => <article className="contact" key={contact.id}><div><strong>{contact.nombre}</strong>{contact.etiqueta && <span className="tag">{contact.etiqueta}</span>}<p>Tel. {contact.telefono}<br />{contact.correo}</p></div><button className="danger" onClick={() => setContacts((current) => current.filter((item) => item.id !== contact.id))}>Eliminar</button></article>)}</div></div>;
}

function Checklist({ items }) { const [done, setDone] = useState([]); return <><ul className="checklist">{items.map((item) => <li key={item} className={done.includes(item) ? "done" : ""} onClick={() => setDone((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])}><span>{done.includes(item) ? "✓" : ""}</span>{item}</li>)}</ul><p className="muted">{done.length} de {items.length} completados</p></>; }
function Quiz() { const [answer, setAnswer] = useState(null); const options = ["Convertir el texto a mayúsculas", "Quitar espacios al inicio y al final", "Borrar el contenido del input"]; return <div className="quiz"><strong>¿Para qué sirve <code>.trim()</code>?</strong>{options.map((option, index) => <button key={option} className={answer !== null ? (index === 1 ? "correct" : index === answer ? "wrong" : "") : ""} onClick={() => setAnswer(index)}>{option}</button>)}{answer !== null && <p className="muted">Evita que un valor formado solo por espacios se acepte como válido.</p>}</div>; }
function Section({ id, number, title, children }) { return <section id={id}><p className="eyebrow">{number}</p><h2>{title}</h2>{children}</section>; }
function Code({ title, children }) { return <div className="code-panel"><div className="code-head">● ● ● <span>{title}</span></div><pre>{children}</pre></div>; }

export default function App() {
  return <div className="lesson-shell"><aside className="sidenav"><div className="brand"><i /> Clase 8 · ADSO</div><p className="brand-sub">Validaciones, UX y errores</p><nav>{navItems.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav></aside><main id="lesson-content"><button className="pdf-button" onClick={() => window.print()}>Imprimir / PDF</button>
    <header className="hero" id="intro"><p className="eyebrow">SENA CTMA · ADSO · Desarrollo Web ReactJS</p><h1>Validaciones, UX y <em>errores controlados</em></h1><p className="subtitle">La Agenda ADSO ya funciona. Hoy la hacemos profesional: validamos los datos, comunicamos qué salió mal y controlamos qué ocurre mientras se guarda.</p><div className="meta"><span>Proyecto: Agenda ADSO v6</span><span>Competencia 220501096</span></div></header>
    <Section id="problema" number="01" title="El problema de UX en el formulario actual"><p className="lead">Un formulario profesional no deja a la persona adivinando qué ocurrió.</p><div className="panel"><ul><li>Mensajes claros cuando faltan datos.</li><li>Formato mínimo para el correo.</li><li>Botón bloqueado durante el guardado.</li><li>Errores de API traducidos a lenguaje humano.</li></ul></div></Section>
    <Section id="errores" number="02" title="Un estado de errores por campo"><p className="lead">Junto a <code>form</code> agregamos <code>errores</code> y <code>enviando</code>.</p><Code title="Estado local">{`const [errores, setErrores] = useState({ nombre: "", telefono: "", correo: "" });\nconst [enviando, setEnviando] = useState(false);`}</Code></Section>
    <Section id="validar" number="03" title="validarFormulario() con .trim()"><p className="lead"><code>.trim()</code> evita que espacios vacíos pasen como información válida.</p><Code title="Validación">{`function validarFormulario(form) {\n  const errores = { nombre: "", telefono: "", correo: "" };\n  if (!form.nombre.trim()) errores.nombre = "El nombre es obligatorio.";\n  if (!form.telefono.trim()) errores.telefono = "El teléfono es obligatorio.";\n  if (!form.correo.trim()) errores.correo = "El correo es obligatorio.";\n  else if (!form.correo.includes("@")) errores.correo = "El correo debe contener @.";\n  return errores;\n}`}</Code></Section>
    <Section id="demo" number="04 · En vivo" title="Agenda ADSO v6 funcionando"><p className="lead">Prueba el formulario vacío, un correo sin <code>@</code> y el servidor apagado.</p><AgendaDemo /></Section>
    <Section id="checklist" number="05" title="Checklist de UX"><p className="lead">Verifica cada punto sobre tu propio formulario.</p><div className="panel"><Checklist items={["Cada campo obligatorio tiene su mensaje", "Los errores usan lenguaje humano", "El botón cambia a Guardando...", "Un error de red no rompe la app", "No se puede enviar dos veces por accidente"]} /></div></Section>
    <Section id="actividad" number="06 · Actividad" title="Pruebas y autoevaluación"><div className="panel"><ol className="steps"><li>Guardar con campos vacíos y observar los tres errores.</li><li>Escribir un correo sin <code>@</code>.</li><li>Activar “Simular servidor apagado”.</li></ol></div><div className="panel"><h3>Quiz rápido</h3><Quiz /></div></Section>
    <Section id="evidencias" number="07" title="Evidencias y evaluación"><p className="lead">Entrega capturas de validación, estado “Guardando...” y error global junto con tu código actualizado.</p><div className="commit">Clase_8_Agenda_ADSO_v6_Validaciones_UX</div><div className="panel"><Checklist items={["Captura con mensaje de error", "Captura del botón Guardando...", "Captura del error global", "Código actualizado en el repositorio", "Commit con el mensaje exacto"]} /></div></Section>
    <footer>Clase 8 · Validaciones, UX y errores controlados · Agenda ADSO v6</footer>
  </main></div>;
}

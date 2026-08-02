function Saludo({ nombre = "Cristian Román", curso = "React" }) {
    return (
        <div>
            <h2 className="saludo-texto">Hola {nombre}!</h2>
            <h2 className="saludo-texto">Bienvenido al curso de {curso}</h2>
        </div>
    );
}

export default Saludo;
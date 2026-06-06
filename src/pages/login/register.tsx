import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const API_URL_BK = import.meta.env.VITE_API_URL_BK || 'http://localhost:8080';

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    user_type_id: 2,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(`${API_URL_BK}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: Number(form.phone),
          password: form.password,
          user_type_id: form.user_type_id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Usuario registrado correctamente");
        console.log(data);
      } else {
        alert(data.message || "Error al registrar");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 rounded">
            <h2 className="text-center mb-4">Registro de Usuario</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Ingrese su nombre"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Ingrese su correo"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="number"
                  name="phone"
                  className="form-control"
                  placeholder="Ingrese su teléfono"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Ingrese su contraseña"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Confirmar Contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirme su contraseña"
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Registrarse
              </button>
            </form>

            <p className="text-center mt-3">
              ¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
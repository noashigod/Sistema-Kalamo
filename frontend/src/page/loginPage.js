import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const body = new URLSearchParams();
    body.append("username", username);
    body.append("password", password);

    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      credentials: "include", // permite cookies de sesión
    });

    if (!res.ok) {
      setError("Usuario o contraseña incorrectos");
      return;
    }

    // Si login correcto, obtenemos el rol
    const roleRes = await fetch("http://localhost:8080/api/user/role", {
      method: "GET",
      credentials: "include",
    });

    const roleText = await roleRes.text();

    if (roleText === "ADMIN") navigate("/admin");
    else if (roleText === "USER") navigate("/user");
    else setError("Rol desconocido");
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", textAlign: "center" }}>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;

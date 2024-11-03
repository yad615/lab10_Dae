import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate("/series");
    };

    return (
        <section 
            className="d-flex justify-content-center align-items-center min-vh-100" 
            style={{ 
                background: "linear-gradient(to right, #4a90e2, #8c9eff)", 
                color: "#fff",
                height: "100vh", 
                width: "100vw" 
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="card shadow border-0 rounded-4">
                            <div className="card-body p-4">
                                <h1 className="fs-4 text-center fw-bold mb-4">Iniciar Sesión</h1>
                                <form onSubmit={handleSubmit} autoComplete="off">
                                    <div className="mb-3">
                                        <label className="form-label text-muted" htmlFor="email">Correo Electrónico</label>
                                        <input id="email" type="email" className="form-control" name="email" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted" htmlFor="password">Contraseña</label>
                                        <input id="password" type="password" className="form-control" name="password" required />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div className="form-check">
                                            <input type="checkbox" name="remember" id="remember" className="form-check-input" />
                                            <label htmlFor="remember" className="form-check-label">Recordarme</label>
                                        </div>
                                        <a href="forgot.html" className="text-decoration-none text-white small">
                                            ¿Olvidaste tu contraseña?
                                        </a>
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-light btn-lg">Ingresar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="text-center mt-4 small">
                            &copy; Tecsup 2024
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;

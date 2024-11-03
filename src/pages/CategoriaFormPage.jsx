import { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

function CategoriaFormPage() {
    const [nombre, setNombre] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { idcategoria } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadCategorias();
        loadCategoria();
    }, [idcategoria]);

    const loadCategorias = () => {
        try {
            const storedCategorias = JSON.parse(localStorage.getItem("categorias")) || [];

            if (!storedCategorias.some(cat => cat.nombre === "Horror")) {
                storedCategorias.push({ id: storedCategorias.length + 1, nombre: "Horror" });
                localStorage.setItem("categorias", JSON.stringify(storedCategorias));
            }

            setCategorias(storedCategorias);
        } catch (e) {
            console.error("Error al cargar las categorías:", e);
            setError("Error al cargar las categorías");
        }
    };

    const loadCategoria = () => {
        try {
            const storedCategorias = JSON.parse(localStorage.getItem("categorias")) || [];
            const categoria = storedCategorias.find(cat => cat.id === parseInt(idcategoria));
            
            if (categoria) {
                setNombre(categoria.nombre);
                setError("");
            } else {
                setError("Categoría no encontrada");
                navigate("/categories");
            }
        } catch (e) {
            console.error("Error al cargar la categoría:", e);
            setError("Error al cargar la categoría");
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const updatedCategorias = categorias.map(cat => {
                if (cat.id === parseInt(idcategoria)) {
                    return { ...cat, nombre: nombre };
                }
                return cat;
            });

            localStorage.setItem("categorias", JSON.stringify(updatedCategorias));
            navigate("/categories");
        } catch (e) {
            console.error("Error al guardar:", e);
            setError("Error al guardar los cambios");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate("/categories");
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h5 className="mb-0">Editar Categoría</h5>
                            </div>
                            <div className="card-body">
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                        {error}
                                    </div>
                                )}
                                <form onSubmit={handleSave}>
                                    <div className="mb-4">
                                        <label htmlFor="selectNombre" className="form-label">
                                            Selecciona una Categoría
                                        </label>
                                        <select
                                            id="selectNombre"
                                            value={nombre}
                                            onChange={(e) => {
                                                setNombre(e.target.value);
                                                setError("");
                                            }}
                                            className="form-control"
                                            required
                                        >
                                            <option value="">-- Selecciona una categoría --</option>
                                            {categorias.map((cat) => (
                                                <option key={cat.id} value={cat.nombre}>
                                                    {cat.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="d-flex justify-content-end gap-2">
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="btn btn-secondary"
                                        >
                                            <i className="bi bi-x-circle me-1"></i>
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn btn-primary"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                                    Guardando...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-check2-circle me-1"></i>
                                                    Guardar Cambios
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoriaFormPage;

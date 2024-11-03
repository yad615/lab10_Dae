import HeaderComponent from "../components/HeaderComponent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CategoryPage() {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        setIsLoading(true);
        try {
            const storedCategories = JSON.parse(localStorage.getItem("categorias")) || [
                { id: 1, nombre: "Horror", totalSeries: 12 },
                { id: 2, nombre: "Comedy", totalSeries: 8 },
                { id: 3, nombre: "Action", totalSeries: 15 },
                { id: 4, nombre: "Drama", totalSeries: 10 },
            ];
            setCategories(storedCategories);
            if (!localStorage.getItem("categorias")) {
                localStorage.setItem("categorias", JSON.stringify(storedCategories));
            }
        } catch (error) {
            console.error('Error loading categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (id) => {
        navigate(`/categories/edit/${id}`);
    };

    const handleDelete = (id) => {
        const categoria = categories.find(cat => cat.id === id);
        const confirmDelete = () => {
            const updatedCategories = categories.filter(cat => cat.id !== id);
            localStorage.setItem("categorias", JSON.stringify(updatedCategories));
            setCategories(updatedCategories);
        };

        const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
        document.getElementById('categoryName').textContent = categoria.nombre;
        document.getElementById('confirmDelete').onclick = confirmDelete;
        modal.show();
    };

    const filteredCategories = categories.filter(category =>
        category.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <HeaderComponent />
            <div className="container py-4">
                <div className="row mb-4 align-items-center">
                    <div className="col-12 col-md-6">
                        <h2 className="mb-0 fw-bold">
                            <i className="bi bi-grid-fill me-2 text-primary"></i>
                            Categorías
                        </h2>
                        <p className="text-muted mb-0 mt-1">
                            Gestiona las categorías de tus series
                        </p>
                    </div>
                    <div className="col-12 col-md-6 mt-3 mt-md-0">
                        <div className="d-flex gap-2 justify-content-md-end">
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-search text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0"
                                    placeholder="Buscar categoría..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button 
                                className="btn btn-primary d-flex align-items-center gap-2"
                                onClick={() => navigate('/categories/new')}
                            >
                                <i className="bi bi-plus-lg"></i>
                                Nueva
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card border-0 shadow-sm">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="border-0">Nombre</th>
                                        <th className="border-0 text-center">ID</th>
                                        <th className="border-0 text-center">Series</th>
                                        <th className="border-0 text-center" style={{width: "150px"}}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : filteredCategories.length > 0 ? (
                                        filteredCategories.map((item) => (
                                            <tr key={item.id}>
                                                <td className="align-middle">
                                                    <span className="fw-medium">{item.nombre}</span>
                                                </td>
                                                <td className="text-center align-middle">
                                                    <span className="badge bg-light text-dark">
                                                        {item.id}
                                                    </span>
                                                </td>
                                                <td className="text-center align-middle">
                                                    <span className="badge bg-primary-subtle text-primary">
                                                        {item.totalSeries || 0} series
                                                    </span>
                                                </td>
                                                <td className="text-center align-middle">
                                                    <div className="btn-group">
                                                        <button 
                                                            className="btn btn-light btn-sm"
                                                            onClick={() => handleEdit(item.id)}
                                                            title="Editar"
                                                        >
                                                            <i className="bi bi-pencil text-primary"></i>
                                                        </button> 
                                                        <button 
                                                            className="btn btn-light btn-sm"
                                                            onClick={() => handleDelete(item.id)}
                                                            title="Eliminar"
                                                        >
                                                            <i className="bi bi-trash text-danger"></i>
                                                        </button> 
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4 text-muted">
                                                <i className="bi bi-emoji-frown fs-4 d-block mb-2"></i>
                                                No se encontraron categorías
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="deleteModal" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title">Confirmar Eliminación</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <div className="text-center py-4">
                                    <i className="bi bi-exclamation-circle text-warning fs-1 mb-3"></i>
                                    <p className="mb-0">¿Estás seguro de eliminar la categoría</p>
                                    <p className="fw-bold mb-0" id="categoryName"></p>
                                </div>
                            </div>
                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    id="confirmDelete"
                                    data-bs-dismiss="modal"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryPage;

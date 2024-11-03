import HeaderComponent from "../components/HeaderComponent"
import { useNavigate } from "react-router-dom"

function HomePage() {
    const navigate = useNavigate();

    const stats = [
        { title: "Series Totales", value: 150, icon: "bi-film", color: "primary" },
        { title: "Categorías", value: 8, icon: "bi-grid", color: "success" },
        { title: "Más Vistas", value: 42, icon: "bi-eye", color: "info" },
        { title: "Nuevas", value: 12, icon: "bi-plus-circle", color: "warning" }
    ];

    const recentSeries = [
        { title: "The Last of Us", category: "Drama", date: "2024-02-15" },
        { title: "Wednesday", category: "Horror", date: "2024-02-10" },
        { title: "Ted Lasso", category: "Comedy", date: "2024-02-05" }
    ];

    return (
        <>
            <HeaderComponent />
            <div className="container py-4">
                <div className="bg-primary text-white rounded-4 p-4 p-md-5 mb-4">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-8">
                            <h1 className="display-5 fw-bold mb-3">
                                Bienvenido a SeriesApp
                            </h1>
                            <p className="lead mb-4">
                                Explora nuestra colección de series y descubre nuevo contenido.
                            </p>
                            <button 
                                className="btn btn-light btn-lg"
                                onClick={() => navigate('/series')}
                            >
                                Explorar Series
                            </button>
                        </div>
                        <div className="col-md-4 d-none d-md-block text-center">
                            <i className="bi bi-play-circle-fill display-1"></i>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mb-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="col-12 col-sm-6 col-md-3">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <div className={`text-${stat.color} mb-3`}>
                                        <i className={`bi ${stat.icon} fs-1`}></i>
                                    </div>
                                    <h3 className="fw-bold mb-2">{stat.value}</h3>
                                    <p className="text-muted mb-0">{stat.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-0 py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Series Recientes</h5>
                            <button 
                                className="btn btn-primary btn-sm"
                                onClick={() => navigate('/series')}
                            >
                                Ver todas
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Título</th>
                                        <th>Categoría</th>
                                        <th>Fecha</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentSeries.map((serie, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <i className="bi bi-play-circle text-primary me-2"></i>
                                                    {serie.title}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge bg-light text-dark">
                                                    {serie.category}
                                                </span>
                                            </td>
                                            <td>{new Date(serie.date).toLocaleDateString()}</td>
                                            <td>
                                                <button className="btn btn-light btn-sm">
                                                    <i className="bi bi-eye"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
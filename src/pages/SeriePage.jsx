import HeaderComponent from "../components/HeaderComponent"
import SerieComponent from "../components/SerieComponent"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SeriePage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const series = [
        {cod:1, nom:"Friends", cat:"Comedy", img:"friends.png", rating: 4.8, year: 1994},
        {cod:2, nom:"Law & Order", cat:"Drama", img:"law-and-order.png", rating: 4.5, year: 1990},
        {cod:3, nom:"The Big Bang Theory", cat:"Comedy", img:"the-big-bang.png", rating: 4.7, year: 2007},
        {cod:4, nom:"Stranger Things", cat:"Horror", img:"stranger-things.png", rating: 4.9, year: 2016},
        {cod:5, nom:"Dr. House", cat:"Drama", img:"dr-house.png", rating: 4.8, year: 2004},
        {cod:6, nom:"The X-Files", cat:"Drama", img:"the-x-files.png", rating: 4.6, year: 1993},
    ];

    const categories = [...new Set(series.map(serie => serie.cat))];

    const filteredSeries = series.filter(serie => {
        const matchesSearch = serie.nom.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || serie.cat === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <HeaderComponent />
            <div className="container py-4">
                <div className="row mb-4 align-items-center">
                    <div className="col-12 col-md-6">
                        <h2 className="mb-0 fw-bold">
                            <i className="bi bi-film text-primary me-2"></i>
                            Series
                        </h2>
                        <p className="text-muted mb-0 mt-1">
                            Explora nuestra colección de series
                        </p>
                    </div>
                    <div className="col-12 col-md-6 mt-3 mt-md-0">
                        <div className="d-flex gap-2 justify-content-md-end">
                            <button 
                                className="btn btn-primary d-flex align-items-center gap-2"
                                onClick={() => navigate('/series/new')}
                            >
                                <i className="bi bi-plus-lg"></i>
                                Nueva Serie
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm border-0 mb-4">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-search text-muted"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-start-0"
                                        placeholder="Buscar series..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <select 
                                    className="form-select"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="all">Todas las categorías</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {filteredSeries.length > 0 ? (
                        filteredSeries.map((serie) => (
                            <div key={serie.cod} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                                <SerieComponent
                                    codigo={serie.cod}
                                    nombre={serie.nom}
                                    categoria={serie.cat}
                                    imagen={serie.img}
                                    rating={serie.rating}
                                    year={serie.year}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <i className="bi bi-film text-muted fs-1 mb-3 d-block"></i>
                            <h5 className="text-muted">No se encontraron series</h5>
                            <p className="text-muted mb-0">Intenta con otros filtros de búsqueda</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SeriePage
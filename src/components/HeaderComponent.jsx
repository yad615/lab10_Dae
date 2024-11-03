import { NavLink } from "react-router-dom"
import { useState } from "react";

function HeaderComponent() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg shadow-sm sticky-top bg-white">
            <div className="container">
                <NavLink className="navbar-brand fw-bold text-primary" to="/home">
                    <i className="bi bi-play-circle-fill me-2"></i>
                    SeriesApp
                </NavLink>

                <button 
                    className="navbar-toggler border-0" 
                    type="button" 
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`}>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item mx-2">
                            <NavLink 
                                className={({isActive}) => 
                                    `nav-link ${isActive ? 'active fw-semibold' : ''}`
                                } 
                                to="/home"
                            >
                                <i className="bi bi-house me-1"></i>
                                Inicio
                            </NavLink>
                        </li>
                        <li className="nav-item mx-2">
                            <NavLink 
                                className={({isActive}) => 
                                    `nav-link ${isActive ? 'active fw-semibold' : ''}`
                                } 
                                to="/categories"
                            >
                                <i className="bi bi-grid me-1"></i>
                                Categorías
                            </NavLink>
                        </li>
                        <li className="nav-item mx-2">
                            <NavLink 
                                className={({isActive}) => 
                                    `nav-link ${isActive ? 'active fw-semibold' : ''}`
                                } 
                                to="/series"
                            >
                                <i className="bi bi-film me-1"></i>
                                Series
                            </NavLink>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-person-circle text-primary me-2 fs-5"></i>
                            <span className="text-secondary">Yadhira</span>
                        </div>
                        <NavLink 
                            to="/" 
                            className="btn btn-outline-primary d-flex align-items-center gap-2"
                        >
                            <i className="bi bi-box-arrow-right"></i>
                            Salir
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}
  
export default HeaderComponent
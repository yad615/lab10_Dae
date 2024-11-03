import { useNavigate } from "react-router-dom";

function SerieComponent(props) {
    const navigate = useNavigate();

    const gotoUrl = (codigo) => {
        navigate('/series/edit/' + codigo);
    };

    return (
        <div className="card mb-4 shadow-sm border-0 rounded-3" style={{ backgroundColor: '#ffffff' }}>
            <img 
                className="card-img-top rounded-top" 
                src={`https://dummyimage.com/400x250/2d2d2d/fff&text=${props.imagen}`} 
                alt="img" 
            />
            <div className="card-body">
                <h5 className="card-title text-center fw-bold text-dark">{props.nombre}</h5>
                <p className="card-text text-muted text-center">{props.categoria}</p>
                <div className="d-flex justify-content-between mt-4">
                    <button 
                        onClick={() => gotoUrl(props.codigo)} 
                        className="btn btn-outline-primary" 
                    >
                        Editar
                    </button> 
                    <button className="btn btn-outline-danger">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SerieComponent;

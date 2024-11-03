import HeaderComponent from "../components/HeaderComponent";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SerieFormPage() {
    const [series, setSeries] = useState([
        { cod: 1, nom: 'Friends', cat: 'Comedy', img: 'friends.png' },
        { cod: 2, nom: 'Law & Order', cat: 'Drama', img: 'law-and-order.png' },
        { cod: 3, nom: 'The Big Bang Theory', cat: 'Comedy', img: 'the-big-bang.png' },
        { cod: 4, nom: 'Stranger Things', cat: 'Horror', img: 'stranger-things.png' },
        { cod: 5, nom: 'Dr. House', cat: 'Drama', img: 'dr.house.png' },
        { cod: 6, nom: 'The X-Files', cat: 'Drama', img: 'the-x-files.png' },
    ]);

    const { idserie } = useParams();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');

    const setDataForm = (codigo) => {
        const serie = series.find(item => item.cod === parseInt(codigo, 10));
        if (serie) {
            setNombre(serie.nom);
            setCategoria(serie.cat);
            document.getElementById('fileImg').src = `https://dummyimage.com/400x250/000/fff&text=${serie.img}`;
        }
    };

    useEffect(() => {
        setDataForm(idserie);
    }, [idserie]);

    const handleCancel = () => {
        navigate("/series");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedSeries = series.map(item => {
            if (item.cod === parseInt(idserie, 10)) {
                return { ...item, nom: nombre, cat: categoria };
            }
            return item;
        });
        setSeries(updatedSeries);
        navigate("/series");
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="border-bottom pb-3 mb-3">
                    <h3>Editar Serie</h3>
                </div>
                <form className="row" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <img
                            id="fileImg"
                            className="card-img-top"
                            src={"https://dummyimage.com/400x250/000/fff"}
                            alt="img"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="inputName" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputCategory" className="form-label">Categoría</label>
                            <select className="form-select" id="inputCategory" value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                                <option value="">Seleccione una opción</option>
                                <option value="Horror">Horror</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Action">Action</option>
                                <option value="Drama">Drama</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputImage" className="form-label">Imagen</label>
                            <input type="file" className="form-control" id="inputImage" />
                        </div>
                        <div className="mb-3 d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary">Guardar</button>
                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SerieFormPage;

import './App.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookDead, faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [ej, setEj]= useState([]);
  const [tablaUsuarios, setTablaUsuarios]= useState([]);
  const [busqueda, setBusqueda]= useState("");

const peticionGet=async()=>{
  let aBuscar = busqueda.replace(' ', '+');
  console.log(aBuscar);
  await axios.get(`https://h4g.herokuapp.com/search/?q=${aBuscar}`, {
    'headers': {
      'Content-Type': 'application/json'
    }
  })
  .then(response=>{
    console.log(response.data);
    let to_update = []
    for (const key in response.data) {
      console.log(key);
      to_update[key] = JSON.parse(response.data[key]);
    }
    setEj(to_update);
    console.log(ej);
    setTablaUsuarios([response.data]);
  }).catch(error=>{
    console.log(error);
  })
}

const handleChange=e=>{
  setBusqueda(e.target.value);
  filtrar(e.target.value);
}

const filtrar=(terminoBusqueda)=>{
  var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
    if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    || elemento.company.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    ){
      return elemento;
    }
  });
  setEj(resultadosBusqueda);
}

  return (
    <div className="App">
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por Nombre o Empresa"
          onChange={handleChange}
        />
        <button className="btn btn-warning" onClick={() => peticionGet()}>
          <FontAwesomeIcon icon={faBook}/>
        </button>
      </div>

      <div className="table-responsive">
       <table className="table table-sm table-bordered">
         <thead>
           <tr>
             <th>ID</th>
             <th>Titulo</th>
             <th>Autor</th>
             <th>Categoria</th>
             <th>keywords</th>
           </tr>
         </thead>

         <tbody>
           {ej && 
            ej.map((each) => (
              <tr key={each.docId}>
                <td>{each.docId}</td>
                <td>{each.title}</td>
                <td>{each.author}</td>
                <td>{each.subjectCategories}</td>
                <td>{each.keywords}</td>
              </tr>
            ))
             
           }
         </tbody>

       </table>

     </div>
    </div>
  );
}

export default App;

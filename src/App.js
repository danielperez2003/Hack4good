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
  await axios.get("https://h4g.herokuapp.com/search/?q=hello")
  .then(response=>{
    console.log(response.data)
    setEj([response.data]);
    setTablaUsuarios([response.data]);
  }).catch(error=>{
    console.log(error);
  })
}
/* const ej =  {
  "docId": "19700031801", 
  "stiTypeDetails": "Contractor Report (CR)", 
  "title": "Geological evaluation of Nimbus vidicon photography, Chesapeake Bay-Blue Ridge", 
  "abstract": "Geological evaluation of Nimbus vidicon photography of Chesapeake Bay to Blue Ridge area", 
  "keywords": ["topographic", "bedrock", "water bundaries", "triassic"], 
  "submittedDate": "2013-08-05T17:47:00.0000000+00:00", 
  "subjectCategories": ["GEOPHYSICS"], 
  "author": "Davies, W. E."
} */

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

useEffect(()=>{
peticionGet();
},[])

  return (
    <div className="App">
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por Nombre o Empresa"
          onChange={handleChange}
        />
        <button className="btn btn-warning">
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
             <th>Fecha de publicación</th>
             <th>Categoria</th>
             <th>keywords</th>
           </tr>
         </thead>

         <tbody>
           {ej && 
           
             <tr key={ej.docId}>
               <td>{ej.docId}</td>
               <td>{ej.title}</td>
               <td>{ej.author}</td>
               <td>{ej.keywords}</td>
               <td>{ej.asubmittedDate}</td>
               <td>{ej.subjectCategories}</td>
               

             </tr>
           }
         </tbody>

       </table>

     </div>
    </div>
  );
}

export default App;

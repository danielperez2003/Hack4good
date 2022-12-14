import './App.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngry, faBook, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useReducer } from 'react/cjs/react.production.min';

function App() {

  const [usuarios, setUsuarios]= useState([]);
  const [tablaUsuarios, setTablaUsuarios]= useState([]);
  const [busqueda, setBusqueda]= useState("");
  const [] = useState();
  const ej =  {
    "docId": "19700031801", 
    "stiTypeDetails": "Contractor Report (CR)", 
    "title": "Geological evaluation of Nimbus vidicon photography, Chesapeake Bay-Blue Ridge", 
    "abstract": "Geological evaluation of Nimbus vidicon photography of Chesapeake Bay to Blue Ridge area", 
    "keywords": ["topographic", "bedrock", "water bundaries", "triassic"], 
    "submittedDate": "2013-08-05T17:47:00.0000000+00:00", 
    "subjectCategories": ["GEOPHYSICS"], 
    "author": "Davies, W. E."
  }


const peticionGet=async()=>{
  await axios.get("")
  .then(response=>{
    setUsuarios(response.data);
    setTablaUsuarios(response.data);
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
  setUsuarios(resultadosBusqueda);
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
          placeholder="Buscar libro"
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
             <th>Fecha de publicaci??n</th>
             <th>Categoria</th>
             <th>keywords</th>
           </tr>
         </thead>

         <tbody>
           {usuarios && 
           
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

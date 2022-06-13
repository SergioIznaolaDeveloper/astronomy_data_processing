import React, {useState} from 'react'
import * as xlsx from 'xlsx';
import comparativa125_160 from "../../comparativas/125_160.json"
import comparativa390_160 from "../../comparativas/390_160.json"
import comparativa814_160 from "../../comparativas/814_160.json"
import f125 from "../../filtros/125.json"
import f160 from "../../filtros/160.json"
import f390 from "../../filtros/390.json"
import f814 from "../../filtros/814.json"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function Main() {
// estados de los componentes
  const [data, setData] = useState([]);
  const [cvc_cs, setCvc_cs] = useState([]);
  const [tn_cs, setTn_cs] = useState([]);
  const [oc_cs, setCOs_cs] = useState([]);
  const [cvc_c, setCvc_c] = useState([]);
  const [tn_c, setTn_c] = useState([]);
  const [oc_c, setCOs_c] = useState([]);
  // convertir excell con varias paginas en json
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName1 = workbook.SheetNames[0]; // pagina 1 del excel
            const sheetName2 = workbook.SheetNames[1]; // pagina 2 del excel
            const sheetName3 = workbook.SheetNames[2]; // pagina 3 del excel
            const sheetName4 = workbook.SheetNames[3]; // pagina 4 del excel
            const worksheet1 = workbook.Sheets[sheetName1];
            const worksheet2 = workbook.Sheets[sheetName2];
            const worksheet3 = workbook.Sheets[sheetName3];
            const worksheet4 = workbook.Sheets[sheetName4];
            const json1 = xlsx.utils.sheet_to_json(worksheet1);
            const json2 = xlsx.utils.sheet_to_json(worksheet2);
            const json3 = xlsx.utils.sheet_to_json(worksheet3);
            const json4 = xlsx.utils.sheet_to_json(worksheet4);
            setData([json1, json2, json3, json4]);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
}

// Guardar JSON comparativa de 125_160 en estado cvc_cs
for(let i in comparativa125_160) {
  if (cvc_cs.length < 386) {
  cvc_cs.push(comparativa125_160[i]);
  }
}

// Guardar JSON comparativa de 390_160 en estado tn_cs
for(let j in comparativa390_160) {
  if(tn_cs.length < 96) {
tn_cs.push(comparativa390_160[j]);
  }
}

// Guardar JSON comparativa de 814_160 en estado oc_cs
for(let k in comparativa814_160) {
  if(oc_cs.length < 268) {
oc_cs.push(comparativa814_160[k]);
  }
}
// CREAR POSICIONES DE LOS FILTROS 125W/390W/814W ORDENADAS CON REFERENCIA AL FILTRO 160W 
// posiciones en la tabla 125_160
for(let i = 0; i < f160.length; i++) {
if (cvc_cs[i]){
  cvc_c[cvc_cs[i][1]-1] = f125[cvc_cs[i][0]-1];
} 
}

// posiciones en la tabla 390_160 
for(let i = 0; i < f160.length; i++) {
  if (tn_cs[i]){
    tn_c[tn_cs[i][1]-1] = f390[tn_cs[i][0]-1];
  } 
  }

// posiciones en la tabla 814_160
for(let i = 0; i < f160.length; i++) {
  if (oc_cs[i]){
    oc_c[oc_cs[i][1]-1] = f814[oc_cs[i][0]-1];
  } 
  }
// ELIMINAR POSICIONES VACIAS EN LOS ESTADOS CVC_C, TN_C Y OC_C
// eliminar nulls de la tabla 125_160
for(let i = 0; i < cvc_c.length; i++) {
  if(cvc_c[i] === undefined) {
    cvc_c[i] = {"NUMBER": "", "MAG": "", "MAG_ERR": "", "A_R": "", "DEC": ""};
  }
}

//eliminar nulls de la tabla 390_160
for(let i = 0; i < tn_c.length; i++) {
  if(tn_c[i] === undefined) {
    tn_c[i] = {"NUMBER": "", "MAG_AUTO": "", "MAGERR_AUTO": "", "AR": "", "DEC": ""};
  }
}
//eliminar nulls de la tabla 814_160
for(let i = 0; i < oc_c.length; i++) {
  if(oc_c[i] === undefined) {
    oc_c[i] = {"NUMBER": "", "MAG_AUTO": "", "MAGERR_AUTO": "", "AR": "", "DEC": ""};
  }
}
return(
<main>
{/* boton para exportar excels */}
<div className="container">
    <ReactHTMLTableToExcel table="table" filename="tabla_filtros" sheet="pagina1" buttonText="exportar"/>
  </div>
{/* formulario para importar excels */}
<form>
<label htmlFor="upload">Upload File</label>
<input
    type="file"
    name="upload"
    id="upload"
    onChange={readUploadFile}
/>
</form>
  <section className='titles'>
    {/* FILTRO 160 */}
    <p className='title'>Nº</p>
    <p className='title'>MAG_AUTO</p>
    <p className='title'>MAGERR_AUTO</p>
    <p className='title'>AR</p>
    <p className='title'>DEC</p>
    {/* FILTRO 125 */}
    <p className='title'>Nº</p>
    <p className='title'>MAG_AUTO</p>
    <p className='title'>MAGERR_AUTO</p>
    <p className='title'>AR</p>
    <p className='title'>DEC</p>
    {/* FILTRO 390 */}
    <p className='title'>Nº</p>
    <p className='title'>MAG_AUTO</p>
    <p className='title'>MAGERR_AUTO</p>
    <p className='title'>AR</p>
    <p className='title'>DEC</p>
    {/* FILTRO 814 */}
    <p className='title'>Nº</p>
    <p className='title'>MAG_AUTO</p>
    <p className='title'>MAGERR_AUTO</p>
    <p className='title'>AR</p>
    <p className='title'>DEC</p>
  </section>
  {/* FILTRO 160 */}
  <table className='table' border="1" id="table">
  <tr className='column_param1'>
  {f160.map((item, i) => <td key={i}>{item.NUMBER}</td>)}
  </tr>
  <tr className='column_param1'>
  {f160.map((item, i) => <td key={i}>{item.MAG_AUTO}</td>)}
  </tr>
  <tr className='column_param1'>
  {f160.map((item, i) => <td key={i}>{item.MAGERR_AUTO}</td>)}
  </tr>
  <tr className='column_param1'>
  {f160.map((item, i) => <td key={i}>{item.AR}</td>)}
  </tr>
  <tr className='column_param1'>
  {f160.map((item, i) => <td key={i}>{item.DEC}</td>)}
  </tr>
  {/* FILTRO 125 */}
  <tr className='column_param2'>
  {cvc_c.length > 0 ? cvc_c.map((item, i) => <td key={i}>{item.NUMBER}</td>): null}
  </tr>
  <tr className='column_param2'>
  {cvc_c.length > 0 ? cvc_c.map((item, i) => <td key={i}>{item.MAG}</td>): null}
  </tr>
  <tr className='column_param2'>
  {cvc_c.length > 0 ? cvc_c.map((item, i) => <td key={i}>{item.MAG_ERR}</td>): null}
  </tr>
  <tr className='column_param2'>
  {cvc_c.length > 0 ? cvc_c.map((item, i) => <td key={i}>{item.A_R}</td>): null}
  </tr>
  <tr className='column_param2'>
  {cvc_c.length > 0 ? cvc_c.map((item, i) => <td key={i}>{item.DEC}</td>): null}
  </tr>
  {/* FILTRO 390 */}
  <tr className='column_param3'>
  {tn_c.length > 0 ? tn_c.map((item, i) => <td key={i}>{item.NUMBER}</td>): null}
  </tr>
  <tr className='column_param3'>
  {tn_c.length > 0 ? tn_c.map((item, i) => <td key={i}>{item.MAG_AUTO}</td>): null}
  </tr>
  <tr className='column_param3'>
  {tn_c.length > 0 ? tn_c.map((item, i) => <td key={i}>{item.MAGERR_AUTO}</td>): null}
  </tr>
  <tr className='column_param3'>
  {tn_c.length > 0 ? tn_c.map((item, i) => <td key={i}>{item.AR}</td>): null}
  </tr>
  <tr className='column_param3'>
  {tn_c.length > 0 ? tn_c.map((item, i) => <td key={i}>{item.DEC}</td>): null}
  </tr>

  {/* FILTRO 814 */}
  <tr className='column_param4'>
  {oc_c.length > 0 ? oc_c.map((item, i) => <td key={i}>{item.NUMBER}</td>): null}
  </tr>
  <tr className='column_param4'>
  {oc_c.length > 0 ? oc_c.map((item, i) => <td key={i}>{item.MAG_AUTO}</td>): null}
  </tr>
  <tr className='column_param4'>
  {oc_c.length > 0 ? oc_c.map((item, i) => <td key={i}>{item.MAGERR_AUTO}</td>): null}
  </tr>
  <tr className='column_param4'>
  {oc_c.length > 0 ? oc_c.map((item, i) => <td key={i}>{item.AR}</td>): null}
  </tr>
  <tr className='column_param4'>
  {oc_c.length > 0 ? oc_c.map((item, i) => <td key={i}>{item.DEC}</td>): null}
  </tr>
  </table>
</main>
  )
}
export default Main
import React, { useState, useEffect } from 'react';

export interface INavegacionProps {
    paginaAnterior: () => void,
    paginaSiguiente: () => void,
    totalPages: number,
    pagina:number
}

const Navegacion: React.FC<INavegacionProps> = ({paginaAnterior, paginaSiguiente, totalPages, pagina}) => {

    const [disableAnterior, setDisableAnterior] = useState<boolean>(false);   
    const [disableSiguiente, setDisablsiguiente] = useState<boolean>(false);  
    
    useEffect( () => {
        if (pagina===1) {
            setDisableAnterior(true);

            scroll()
        }

        if (pagina === totalPages && pagina>1){
            setDisableAnterior(false);
            setDisablsiguiente(true)
            scroll()
        };

        if (pagina<totalPages && pagina>1){
            setDisableAnterior(false);
            setDisablsiguiente(false)
        }

    },[pagina,totalPages])
    
    const scroll = () =>{
        const element = document.querySelector('.jumbotron');
        element?.scrollIntoView();
      }

    return (
        <div className = "py-5">
            <button onClick = {paginaAnterior} type = "button" className = "btn btn-info mr-1" disabled = {disableAnterior}>Anterior &larr;</button>
            <button onClick = {paginaSiguiente} type = "button" className = "btn btn-info mr-1" disabled = {disableSiguiente}>Siguiente &larr;</button>            
        </div>
    );
};

export default Navegacion;
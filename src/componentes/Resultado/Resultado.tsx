import React, { Fragment } from 'react';
import Imagen from '../imagen/Imagen';
import Navegacion from '../Navegacion/Navegacion';

export interface IResultadoProps {
    imagenes:any[],
    paginaSiguiente: () => void,
    paginaAnterior: () => void,
    totalPages:number,
    pagina:number
}

const Resultado: React.FC<IResultadoProps> = ({imagenes, paginaAnterior, paginaSiguiente, totalPages, pagina}) => {

    const mostrarImagenes = () =>{
         
        if (!imagenes.length) return null;


        return(
            <Fragment>
                <div className = "col-12 p-5 row">
                    {imagenes.map( img => (
                        <Imagen key = {img.id}imagen = {img}/>
                    ))}
                </div>
                <Navegacion 
                    paginaAnterior = {paginaAnterior} 
                    paginaSiguiente = {paginaSiguiente} 
                    totalPages = {totalPages}
                    pagina = {pagina}/>
            </Fragment>)
    }
    return (
        <Fragment>
            {mostrarImagenes()}
        </Fragment>
    );
};

export default Resultado;
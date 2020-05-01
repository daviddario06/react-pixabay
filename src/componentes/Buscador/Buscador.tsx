import React, { useRef, FormEvent } from 'react';

export interface IBuscadorProps {
    datosBusqueda: (value:string) =>void
}

const Buscador: React.FC<IBuscadorProps> = ({datosBusqueda}) => {

    const busquedaRef = useRef<HTMLInputElement>(null)
    
    const obtenerDatos = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (typeof busquedaRef.current?.value === "string"){
            const serch = (busquedaRef.current.value)
            datosBusqueda(serch)
            
        }
        
    }
    return (
        <form onSubmit = {obtenerDatos}>
            <div className = "row"> 
                <div className = "form-group col-md-8">
                    <input ref = {busquedaRef} className = "form-control form-control-lg" type ="text" placeholder ="Busca tu imagen, ejemplo: Futbol" defaultValue=""/>
                </div>
                <div className = "form-group col-md-4">
                    <input className = "btn btn-lg btn-danger btn-block" type ="submit" value ="Buscar..."/>
                </div>
            </div>
        </form>
    );
};

export default Buscador;
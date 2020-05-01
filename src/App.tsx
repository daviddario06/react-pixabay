import React, { Component } from 'react';
import Buscador from './componentes/Buscador/Buscador';
import axios from 'axios'
import Resultado from './componentes/Resultado/Resultado';
import Swal from 'sweetalert2';



class App extends Component {

  state = {
    termino:'',
    imagenes:[],
    pagina: 1,
    totalPages:1
  }

  apiKey = "16329143-8b13e0941091e2803570e4eff"

  datosBusqueda = (termino:string)=>{

    Swal.fire({
      background:"rgb(78,93,108,0)",
      onBeforeOpen: () => Swal.showLoading()
    })
    this.setState({termino}, ()=>{ this.consultarApi()})
   
  }

  consultarApi = async () =>{

    const url = `https://pixabay.com/api/?key=${this.apiKey}&q=${this.state.termino}&per_page=30&page=${this.state.pagina}`
     console.log(url);
    await axios.get(url)
              .then(resp => {
                  if (resp.status ===200){
                    const totalPages =  Math.ceil(resp.data.totalHits/30)
                    this.setState({
                      imagenes: resp.data.hits,totalPages
                    })
                    Swal.close()
                }
              })
  }

  paginaSiguiente = () => {
    let pagina = this.state.pagina
    let totalPages = this.state.totalPages
    if(pagina<totalPages){
      pagina++
      this.setState({pagina},()=>{
      this.consultarApi();
      this.scroll();
    })
    }
    else this.scroll();
  }

  paginaAnterior = () => {
    let pagina = this.state.pagina
    console.log(pagina)
    if(pagina>1){
      pagina--;
      this.setState({pagina},()=>{
        this.consultarApi();
        this.scroll();
      })

    }
    if (pagina ===1){
      console.log(pagina)
      this.scroll();
    }
  }

  scroll = () =>{
    const element = document.querySelector('.jumbotron');
    element?.scrollIntoView({block: "start", behavior: "smooth"});
  }

  render (){
    return (
      <div className = "app container">
          <div className = "jumbotron">
              <p className = "lead text-center">Buscador de imagenes</p>
              <Buscador datosBusqueda = {this.datosBusqueda}/>
          </div> 
          <div className = "row justify-content-center">
              <Resultado 
                  imagenes = {this.state.imagenes} 
                  paginaAnterior = {this.paginaAnterior} 
                  paginaSiguiente = {this.paginaSiguiente} 
                  totalPages = {this.state.totalPages}
                  pagina = {this.state.pagina}/>
          </div> 
      </div>
    );
  }


}

export default App;

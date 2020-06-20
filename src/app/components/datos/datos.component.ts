import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../../services/recetas.service';
import { ActivatedRoute } from '@angular/router' 

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {
  param: string;
  data: any;
  page:number = 0; // Pagina de la que partimos.
  error:boolean = false; // Error que se muestra si no hay datos.
  spin:boolean = false; // Icono animado que muestra que se cargan los datos.

  constructor(
    private _recetasService: RecetasService, // Cargamos los servicios para llamarlos
    private _route: ActivatedRoute // Utilizamos esto para sacar valores de la ruta
    ) { }

  ngOnInit() {       
    this.param = this._route.snapshot.paramMap.get("keyword"); // Obtenemos el termino de busqueda de la url     
    this.cargarDatos(); // Llamamos a los datos al cargar la pagina
  }

  cargarDatos(){        
    this.spin = true; // Al empezar la funcion de carga de datos mostramos la animacion de carga
    this._recetasService.getData(this.param, this.page) // Llamamos a la funcion del servicio
    .subscribe(respuesta =>{ // Nos subscribimos a los datos de la api            
            window.scroll(0,0); // Volvemos a subir arriba de la pagina                     
            this.data = respuesta.result.items; // Cargamos los datos en una variable global            
            if(this.data.length == 0){
              /* Si no existen los datos hacemos que aparezca el error */                
              this.error = true; // Si no hay datos mostramos el mensaje de error
            }else{
              /* Si los datos existen lo ocultamos */               
              this.error = false; // Si los datos existen no mostramos el error.
            }

            this.data.forEach((element,index) => { // Miramos si el keyword de los datos es individual o un array
              if(!Array.isArray(element.keyword)){// Si no es un array                                              
                this.data[index].keyword = [element.keyword] // Convertimos el elemento individual en array para tratarlo como tal.
              }
            });
            this.spin = false; // Ocultamos la animacion de carga
    })
  }
  cambioDeTermino(key: string){ // Funcion para cuando escribimos una nueva palabra en el buscador.
    this.param = key; // Modificamos el parametro global con el termino de busqueda    
    this.page = 0; // Ponemos la pagina al 0
    this.cargarDatos()
  }

  paginacion(type){ // Funcion para cambiar de pagina
    if(type==1){
      // Si el tipo de parametro que nos llega es 1 es resta
      if((this.page -1) >= 0){ // Si el resultado de la resta no es menor o igual a 0
        this.page = this.page -1; // Restamos
        this.cargarDatos() // Volvemos a cargar los datos con la pagina modificada
      }      
    }else if (type == 2){ // Si el parametro es dos sumamos      
      this.page = this.page +1; // Sumamos una pagina a la pagina actual.
      this.cargarDatos() // Volvemos a cargar la pagina con la pagina modificada.
    }
  }

}

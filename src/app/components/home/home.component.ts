import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../../services/recetas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  CA: any;
  page: number = 0;
  constructor(private _recetasService: RecetasService) { }
  
  ngOnInit() {
    this.cargarDatos(); // Al cargar la pagina se llama a los datos de la api
  }
  
  cargarDatos(){ // Funcion para cargar los datos
    /*
      La ruta que cargaba datos del gobierno sin necesidad de termino de busqueda ha dejado de funcionar.
      Es por eso que la mejor solucion para la home ahora mismo es buscar por el coronavirus, que es un tema actual,
      si volviera a funcionar la api del gobierno podemos dejarlo como antes, solo habria que dar el cambiazo con el codigo que esta escrito debajo.
    */
    // this._recetasService.getAutonomous(this.page)
    this._recetasService.getData("covid", this.page) // Se llama a la funcion getAutonomous() que devuelve datos del gobierno    
    .subscribe(respuesta =>{ // Nos subscibimos      
      this.CA = respuesta.result.items; // Cargamos estos datos en una posiccion global
      
      // El gobierno al dar los datos hace que si un array tiene solo 1 posicion en lugar de ser un array es un string
      // Esto nos da problemas a la hora de escribir por pantalla los datos, ya que da error en el bucle que dibuja los keyword
      // El bucle transforma todo lo que "no es un array" en un array para evitar ese error
      this.CA.forEach((element,index) => {
        if(!Array.isArray(element.keyword)){
          this.CA[index].keyword = [element.keyword]
        }
      });    
    })
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

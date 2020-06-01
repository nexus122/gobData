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
    this.cargarDatos();
  }
  
  cargarDatos(){
    this._recetasService.getAutonomous(this.page)
    .subscribe(respuesta =>{
      console.log("Respuesta: ",respuesta);
      this.CA = respuesta.result.items;
      
      // El gobierno al dar los datos hace que si un array tiene solo 1 posicion en lugar de ser un array es un string
      // Esto nos da problemas a la hora de escribir por pantalla los datos, ya que da error en el bucle que dibuja los keyword
      // El bucle transforma todo lo que "no es un array" en un array para evitar ese error
      this.CA.forEach((element,index) => {
        if(Array.isArray(element.keyword)){
          //console.log("Es un array")
        }else{
          //console.log("No es una array")
          this.CA[index].keyword = [element.keyword]
        }
      });
      //console.log("Result.items: ",this.CA);
    })
  }

  paginacion(type){
    if(type==1){
      //console.log("Se resta")
      if((this.page -1) >= 0){
        this.page = this.page -1;
        this.cargarDatos()
      }      
    }else if (type == 2){
      //console.log("Se suma")
      this.page = this.page +1;      
      this.cargarDatos()
    }
  }

}

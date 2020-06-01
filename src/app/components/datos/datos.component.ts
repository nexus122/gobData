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
  page:number = 0;
  error:boolean = false;
  spin:boolean = false;
  constructor(
    private _recetasService: RecetasService,
    private _route: ActivatedRoute
    ) { }

  ngOnInit() {       
    this.param = this._route.snapshot.paramMap.get("keyword");     
    this.cargarDatos();
  }

  cargarDatos(){        
    this.spin = true;
    this._recetasService.getData(this.param, this.page)
    .subscribe(respuesta =>{
            console.log("Respuesta: ",respuesta)
            window.scroll(0,0);                     
            this.data = respuesta.result.items;
            console.log("Numero de respuestas: ",this.data.length)
            if(this.data.length == 0){
              /* Si no existen los datos hacemos que aparezca el error */
              console.log("No hay datos");              
              this.error = true;
            }else{
              /* Si los datos existen lo ocultamos */ 
              console.log("Hay datos");
              this.error = false;
            }

            this.data.forEach((element,index) => {
              if(Array.isArray(element.keyword)){                
              }else{                
                this.data[index].keyword = [element.keyword]
              }
            });
            this.spin = false;
    })
  }
  cambioDeTermino(key: string){
    this.param = key;    
    this.page = 0;
    this.cargarDatos()
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

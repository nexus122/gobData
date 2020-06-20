import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class RecetasService { // Servicio para obtener datos del gobierno    
    Url = 'https://datos.gob.es/apidata/catalog/dataset?_sort=title&_pageSize=10&_page='
    Url2 = 'https://datos.gob.es/apidata/catalog/dataset/keyword/'

    constructor(private http: HttpClient) {
    }    

    getAutonomous(page: number) { // Los datos que trae el gobierno vienen paginadas porque son muy extensas, con el parametro de pagina seleccionamos la pagina de datos que queramos.
        return this.http.get<any>(`${this.Url}${page}`); // Llevamos los datos que nos da la api al controlador
    }

    getData(keyword: string, page: number) { // Los parametros son la paginacion y el termino a buscar        
        keyword = keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); /* Quitamos los acentos de la palabra para que la busqueda de resultads */
        return this.http.get<any>(`${this.Url2}` + keyword + `?_sort=title&_pageSize=10&_page=${page}`); // Devolvemos paginados los resultados que coincidan con el parametro keywoard
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class RecetasService {

    //Url = `https://datos.gob.es/apidata/nti/territory/Autonomous-region?_sort=label&_pageSize=50&_page=0`;
    Url = 'https://datos.gob.es/apidata/catalog/dataset?_sort=title&_pageSize=10&_page='
    Url2 = 'https://datos.gob.es/apidata/catalog/dataset/keyword/'

    constructor(private http: HttpClient) {
    }    

    getAutonomous(page: number) {
        return this.http.get<any>(`${this.Url}${page}`);
    }

    getData(keyword: string, page: number) {        
        keyword = keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); /* Quitamos los acentos de la palabra para que la busqueda de resultads */
        return this.http.get<any>(`${this.Url2}` + keyword + `?_sort=title&_pageSize=10&_page=${page}`);
    }
}
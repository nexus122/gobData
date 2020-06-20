import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }
  searchWord: string = null;

  ngOnInit() {
  }

  onKey(event) { // Este es un evento que se ejecuta cada vez que se pulse una tecla en el buscador
    this.searchWord = event.target.value; // Actualizamos la variable global con la palabra escrita.    
  }
}

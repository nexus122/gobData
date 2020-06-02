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

  onKey(event) {
    this.searchWord = event.target.value;
    console.log(this.searchWord);
  }
}

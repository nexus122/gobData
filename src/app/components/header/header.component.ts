import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  title = "DatGob"
  searchWord: string = null
  constructor() { }

  ngOnInit() {
  }

  onKey(event) {
    this.searchWord = event.target.value;
    console.log(this.searchWord);
  }

}

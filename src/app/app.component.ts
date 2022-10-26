import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: `app.component.html`
})

export class AppComponent implements OnInit {
  title = 'Caladan';

  constructor(private router: Router){}

  ngOnInit(){}

  goToSplitter(){
    console.log("Menu Splitter");
    this.router.navigate(["splitter"]);
  }
}
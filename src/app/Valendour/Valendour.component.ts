import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Valendour',
  templateUrl: './Valendour.component.html',
  styleUrls: ['./Valendour.component.css']
})
export class ValendourComponent implements OnInit {

  valendour: any;
  constructor(private http:HttpClient) { }

  ngOnInit() {

    this.getValues();
  }


  getValues()
  {
    this.http.get('http://localhost:59946/api/Valendour/').subscribe(response => {

    this.valendour = response;
    }, error => {
      console.log(error);
    });
  }

}

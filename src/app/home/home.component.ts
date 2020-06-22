import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;

  valendour: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.getValues();
  }

  registerToggle()
  {
    this.registerMode = true; //!this.registerMode;
  }

  getValues() {
    this.http.get('http://localhost:5000/api/Valendour/').subscribe(response => {

    this.valendour = response;
    }, error => {
      console.log(error);
    });
  }


  cancelRegisterMode(registerMode: boolean) {

    this.registerMode = registerMode;
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pets = [];
  pet = {};

  // check:{title:"", description: "", _id:""};
  constructor(private _httpService:HttpService) {}
  ngOnInit() {
    this.getPets();
    // this.getPet();
  }

  getPets(){
  let observable = this._httpService.getPets();
  observable.subscribe(data => {
    console.log("*******got_DATA***",data);
    this.pets = data['data']
    this.pets.sort(function (a, b) {
      if (a.type < b.type) {
        return -1;
      }
      if (a.type > b.type) {
        return 1;
      }
      return 0
    })
  })
}

showPet(pet){
  console.log("1kjahglfkjsadhflas",pet)
  this._httpService.showPet(pet)
}

}

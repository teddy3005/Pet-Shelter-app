import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';




@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newPet: any;
  error: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) { }

  ngOnInit() {
    this.newPet = { 
      name: "",
      type: "",
      desc: "",
      skill1: "",
      skill2: "",
      skill3: "",
      like: 0

    };
  }

  onButtonClickCreate(): void{
    console.log("sdfasdfasdf")
   let create = this._httpService.addPet(this.newPet);
   let obs = this._httpService.showPetById(this.newPet)
   console.log("111111111111111111",this.newPet)
    create.subscribe (data => {
      if ((data as any).message == "Error"){
        this.error = "all fields must be minimum of 3 characters"
      }
      else{
        this._router.navigate([''])
      }
      
    })
  }

}



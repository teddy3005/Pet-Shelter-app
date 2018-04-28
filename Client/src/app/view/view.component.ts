import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  pet=[];
  clicked = false
  _id:any 
  // skill1=""
  // skill2=""
  // skill3=""
  
  constructor(private _route: ActivatedRoute, 
  private _router: Router,
  private _httpService: HttpService) { }

  ngOnInit() {
    this._route.params.subscribe((params:Params) => this._id=params['id']);
    this.findbyId(this._id);
    
    // this.pet = this._httpService;
    // let observable = this._httpService.showPetById(this.pet);
    // observable.subscribe(data => {
    //   this.pet = data['data']
    // })
  }

  findbyId(_id){
    let observable = this._httpService.findbyId(_id);
    observable.subscribe(data => {
      this.pet = data['data']
    })
  }

  LikeThePet(pet){
    let observable = this._httpService.likePet(this.pet);
    observable.subscribe(data => {
      console.log(data)
      if (data["message"] == "Success") {
        this.clicked = true;
           
  }
  this.ngOnInit() //this ngOnIt allows you to reload the like everytime it is clicked
})
  }

  deletePet(pet){
    let observable = this._httpService.deletePet(pet);
    observable.subscribe(data => {
      this._router.navigate(['/'])
    })
  }
}

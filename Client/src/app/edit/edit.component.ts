import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editPet: any;
  error: any;
  id:any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService

  ) { }

  ngOnInit() {
    this._route.params.subscribe((params:Params) => this.id=params['id']);
    this.getPetsfromServices();
    // console.log("222222222222222",this.id  )
  }

  getPetsfromServices(){
    console.log(this.id)
    let observable = this._httpService.findbyId(this.id);
    console.log("this is the id", this.id)
    observable.subscribe(data => {
      console.log("sd;fajsf",data)
      this.editPet = data['data']
      console.log(this.editPet)
    })
}



  changePet(): void{
    let observable = this._httpService.changeThePet(this.editPet);
    let obs = this._httpService.showPetById(this.editPet)

    observable.subscribe(data => {
      if ((data as any).message == "Error"){
        this.error = "All fields must to be at minimum 3 characters!"
        console.log("this is the errrrrrrr",this.error)
      }
      else {
        this._router.navigate(['/view/' + this.editPet._id])
      }
    })
  }


}


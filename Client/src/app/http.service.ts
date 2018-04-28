import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  pet: any;
  constructor(private _http: HttpClient) {}


getPets(){
  return this._http.get('/pets')
}

addPet(newPet){
  return this._http.post('/create',newPet);
}

showPet(pet){
  console.log("at the service", pet)
  this.pet = pet

  }
showPetById(pet) {
  return this._http.get('/pets/' + pet._id, this.pet)

  }

likePet(pet){
  return this._http.put('/pets/up/' + pet._id, this.pet)
  }

deletePet(pet){
  return this._http.delete('/pets/remove/' + pet._id)
  }

changeThePet(editPet){
  this.pet = editPet
  console.log('/pets/edit/' + this.pet._id)
  return this._http.put('/pets/edit/' + this.pet._id,this.pet)
}

findbyId(_id){
  return this._http.get('/pets/'+_id)
}

}
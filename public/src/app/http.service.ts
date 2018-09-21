import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) { }

  getAll(){
    console.log("service.ts / getAll()");
    return this._http.get('/belts');
  }

  getOne(id){
    console.log("service.ts / getOne(id), id: ", id);
    return this._http.get("/belt/"+id)
  }

  add(data){
    console.log("service.ts / add(data), data: ", data);
    return this._http.post('/belt', data);
  }

  //testing stage
  addReview(reviewData){
    console.log("service.ts / addReview(data), reviewData:", reviewData);
    return this._http.post('/belt/'+reviewData['id'], reviewData);
  }

  //remove review
  removeReview(data){
    console.log("service.ts / removeReview(data): data: ", data)
    return this._http.delete("/beltReview/"+data.mvid+"&:"+data._id);
  }

  edit(data){
    console.log("service.ts / edit(data), data: ", data);
    return this._http.put('/belt/'+data['_id'], data);
  }

  remove(id){
    console.log("service.ts / remove(id), id: ", id);
    return this._http.delete("/belt/"+id);
  }
}

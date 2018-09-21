import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from './../http.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private _http:HttpService, private _route:ActivatedRoute, private _router:Router
  ) { }
  error: any;
  // success: string;
  editBelt: any;

  ngOnInit() {
    this.editBelt ={ title: ""}
    // this.success = "";
    this._route.params.subscribe((params: Params) =>{
      this.getById(params['id']);
    })
  }

  getById(id){
    this.error = "";
    let obs = this._http.getOne(id);
    obs.subscribe(data =>{
      console.log("subscribed this is data: ", data)
      if(data['message'] == true){
        this.editBelt = data['belt']
        console.log('this.editBelt: ', this.editBelt)
        // this.ngOnInit();
      }else{
        this.error = "Unable to load information"
      }
    })
  }

  onSubmit(){
    this.error = { title: "", description: ""}
    // this.success = "";
    console.log("onSubmit(), this.editBelt: ",this.editBelt)
    let obs = this._http.edit(this.editBelt);
    obs.subscribe(data =>{
      console.log("onSubmit() -> subscribing obs. Data: ", data)
      if(data['message'] == false){
        this.error = data['err']['errors'];
        console.log("this.error ", this.error )
      }else if(data['message'] == true){
        console.log("data's good")
        // this.success = "Product updated!"
        this._router.navigate(['/all']);
      }
    });
  }
  delete(){
    this.error = "";
    let obs = this._http.remove(this.editBelt['_id']);
    obs.subscribe(data =>{
      if(data['message'] == true){
        this._router.navigate(['/movies']);
      }else{
        this.error = "Sorry, unable to retrive products."
      }
    })
  }
  //this is for the black belt feature
  deleteReview(data){
    this.error = "";
    console.log('edit.comp.ts // deleteReview(data), data: ', data)
    data.mvid = this.editBelt['_id'];
    console.log('edit.comp.ts // deleteReview(data), data: ', data)
    let obs = this._http.removeReview(data);
    obs.subscribe(data =>{
      if(data['message'] == true){
        console.log("deleting rating: ", data)
        // this._router.navigate(['/movies']);
        this.ngOnInit();
      }else{
        this.error = "Sorry, unable to retrive products."
        console.log("deleting rating ERROR: ", data)
      }
    })
  }

}

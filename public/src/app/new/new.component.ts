import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newBelt: any;
  reviewBelt: any;
  error: any;
  success:string;
  constructor(private _http:HttpService, private _route:ActivatedRoute, private _router:Router) { }

  ngOnInit() {
    this.newBelt ={ title: ""}
    this.reviewBelt = { name: "", star: null, review: ""}
    this.error ={ title: null, name: null, star: null, review: null}
    this.success = null;
  }

  onSubmit(){
    this.error ={ title: null, name: null, star: null, review: null}
    // this.success = null;
    console.log("onSubmit(), this.newBelt: ",this.newBelt)
    let obs = this._http.add(this.newBelt);
    obs.subscribe(data =>{
      console.log("onSubmit() -> subscribing obs. Data: ", data)
      if(data['message'] == false){
        // data object -> data[err]['errors']['description']['message'] // data.errors.title.message
        this.error = data['err']['errors'];
        console.log("this.error ", this.error )
      }else if(data['message'] == true){
        console.log("data's good data:", data)
        this.success = "Belt added"
        this.addReview(data['belt']['_id']); // Need to get the newly added Movie's ._id
        this.newBelt = { title: ""}
      }
    });
  }

  addReview(newId){
    this.reviewBelt.id = newId;
    console.log("addReview(newId), this.reviewBelt: ", this.reviewBelt)
    let obs = this._http.addReview(this.reviewBelt);
    obs.subscribe(data =>{
      console.log("subscribed addReview() data: ", data);
      if(data['message'] == false){
        this.error.review = data['err']['errors'];
        console.log("this.error", this.error )
      }else if(data['message'] == true){
        console.log("review data's good")
        this.success = "review added"
        this._router.navigate(['/movies']);
      }
    })

  }

}

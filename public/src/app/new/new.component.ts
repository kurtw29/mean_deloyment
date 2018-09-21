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
  error: any;
  success:string;
  constructor(private _http:HttpService, private _route:ActivatedRoute, private _router:Router) { }

  ngOnInit() {
    this.newBelt ={ title: "", description: ""}
    this.error ={ title: "", description: ""}
    this.success = null;
  }

  onSubmit(){
    this.error = { title: "", description: ""}
    // this.success = null;
    console.log("onSubmit(), this.newProuct: ",this.newBelt)
    let obs = this._http.add(this.newBelt);
    obs.subscribe(data =>{
      console.log("onSubmit() -> subscribing obs. Data: ", data)
      if(data['message'] == false){
        // data object -> data[err]['errors']['description']['message'] // data.errors.title.message
        this.error = data['err']['errors'];
        console.log("this.error ", this.error )
      }else if(data['message'] == true){
        console.log("data's good")
        this.success = "Belt added"
        this.newBelt = { title: "", description: ""}
        this._router.navigate(['/all']);
      }
    });
  }

}

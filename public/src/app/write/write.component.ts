import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from './../http.service';


@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  constructor(
    private _http:HttpService, private _route:ActivatedRoute, private _router:Router
  ) { }
  reviewBelt: any;
  title: any;
  error: any;
  newId: any;
  ngOnInit() {
    this.reviewBelt ={ name: "", star:null, review:''}
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
        this.title = data['belt']['title']
        this.newId = data['belt']['_id']
        console.log("this.title: ", this.title, "this.newID: ", this.newId)
        // this.reviewBelt.name = data['belt']['reviewing'][0]
        // console.log('this.reviewBelt: ', this.reviewBelt)
        // this.ngOnInit();
      }else{
        this.error = "Unable to load information"
      }
    })
  }

  addReview(){
    this.reviewBelt.id = this.newId;
    console.log("addReview(), this.reviewBelt: ", this.reviewBelt)
    let obs = this._http.addReview(this.reviewBelt);
    obs.subscribe(data =>{
      console.log("subscribed addReview() data: ", data);
      if(data['message'] == false){
        this.error = data['err']['errors'];
        console.log("this.error", this.error )
      }else if(data['message'] == true){
        console.log("review data's good")
        // this.success = "review added"
        this._router.navigate(['/movies/'+this.newId]);
      }
    })
  }
}

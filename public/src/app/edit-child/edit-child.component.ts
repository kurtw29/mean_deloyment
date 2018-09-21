import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from './../http.service'

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.css']
})
export class EditChildComponent implements OnInit {
  // @Input() beltToShow: any;
  @Input() editBelt: any;

  @Output() aBeltEmitter = new EventEmitter()

  constructor(
    private _http:HttpService, private _route:ActivatedRoute, private _router:Router
  ) { }

  ngOnInit() {
    console.log("ngOninit edit-child")
    // this.editBelt = this.beltToShow
    this.error = { title: "", description: ""}

  };
  error: any;

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
        this._router.navigate(['/all']);
      }else{
        this.error = "Sorry, unable to retrive products."
      }
    })
  }

  callAll(){
    this.aBeltEmitter.emit(this.editBelt);
  }

  /// -- Exactly the same as Edit component.ts
  // error: any;
  // // success: string;
  // editBelt: any;

  // ngOnInit() {
  //   this.editBelt ={ title: "", dscription: ""}
  //   // this.success = "";
  //   this._route.params.subscribe((params: Params) =>{
  //     this.getById(params['id']);
  //   })
  // }

  // getById(id){
  //   this.error = "";
  //   let obs = this._http.getOne(id);
  //   obs.subscribe(data =>{
  //     console.log("subscribed this is data: ", data)
  //     if(data['message'] == true){
  //       this.editBelt = data['belt']
  //       console.log('this.editBelt: ', this.editBelt)
  //     }else{
  //       this.error = "Unable to load information"
  //     }
  //   })
  // }

  // onSubmit(){
  //   this.error = { title: "", description: ""}
  //   // this.success = "";
  //   console.log("onSubmit(), this.editBelt: ",this.editBelt)
  //   let obs = this._http.edit(this.editBelt);
  //   obs.subscribe(data =>{
  //     console.log("onSubmit() -> subscribing obs. Data: ", data)
  //     if(data['message'] == false){
  //       this.error = data['err']['errors'];
  //       console.log("this.error ", this.error )
  //     }else if(data['message'] == true){
  //       console.log("data's good")
  //       // this.success = "Product updated!"
  //       this._router.navigate(['/all']);
  //     }
  //   });
  // }
  // delete(){
  //   this.error = "";
  //   let obs = this._http.remove(this.editBelt['_id']);
  //   obs.subscribe(data =>{
  //     if(data['message'] == true){
  //       this._router.navigate(['/all']);
  //     }else{
  //       this.error = "Sorry, unable to retrive products."
  //     }
  //   })
  // }

}


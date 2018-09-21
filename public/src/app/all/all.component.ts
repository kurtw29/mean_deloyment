import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';


@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  belts: any;
  error: string;
  constructor(private _http:HttpService) { }
  ngOnInit() {
    this.getBelts();
  }

  getBelts(){
    this.error = "";
    let obs = this._http.getAll();
    obs.subscribe(data =>{
      console.log('getBelts(), data: ', data )
      if(data['message'] == true){
        this.belts = data['belts']
        console.log("this.belts: \n", this.belts)
      }else{
        this.error = "Sorry, unable to retrive belts."
      }
    })
  }

  delete(data){
    this.error = "";
    let obs = this._http.remove(data['_id']);
    obs.subscribe(data =>{
      if(data['message'] == true){
        this.ngOnInit()   //reload the page to show the updated list of all items
      }else{
        this.error = "Unable to delete"
      }
    })
  }
}

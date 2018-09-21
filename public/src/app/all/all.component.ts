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
  selectedBelt: any;
  avgStar: any;
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
        this.find_avgStar();
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

  //This is for the nested compontent of edit
  selectThisBelt(belt){
    this.selectedBelt = belt;
    console.log('GOT selectedBelt info: ', this.selectedBelt)
  }

  editchild_update(eventData){
    console.log("editchild_update(eventdata): data:", eventData);
    this.selectedBelt = eventData;
    this.getBelts();
  }

  find_avgStar(){
    for(var belt of this.belts){
      var tot_star = 0;
      for(let rev of belt['reviewing']){
        tot_star+= rev.star;
      }
      belt.avgStar = (tot_star/belt['reviewing'].length).toFixed(2)
    }
    console.log("are the stars in there? this.belts: ", this.belts)
  }
}

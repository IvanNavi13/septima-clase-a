import { Component, OnInit } from '@angular/core';
import NavigatorHelper from '../../libs/helpers/navigator.helper';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements OnInit {

  position: any ={};
  time: any = '';

  constructor() { }

  ngOnInit(): void {
    NavigatorHelper.getDevices();
  }

  getLocation(){

    // NavigatorHelper.getLocation().then(position => {
    //   console.log("posi", position);
    // }).catch((err) => {
    //   console.log("Error", err);
    // } )

    NavigatorHelper.getLocationCa((pos)=>{
      console.log(pos);
      this.position = {
         lat: pos.coords.latitude,
         lon: pos.coords.longitude
       }
       this.time = new Date(pos.timestamp).toLocaleDateString();
       this.time = pos.timestamp;
    },(err)=>{
      console.log(err);
    })
  } 

    onSubmit(){
      console.log("button:",this.position, this.time);
    }


    start(video: HTMLVideoElement, btn: HTMLElement){
      console.log(video);
      NavigatorHelper.startRecord(video, btn);
    }

    startAudio(audio: HTMLAudioElement, btn: HTMLElement){
      console.log(audio);
      NavigatorHelper.startAudio(audio, btn);
    }
  
}

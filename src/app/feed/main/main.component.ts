import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnDestroy(): void {
    window.removeEventListener("resize",()=>{})
  }

  ngOnInit(): void {
    window.addEventListener("resize", function(event) {
      if (window.matchMedia('screen and (max-width: 1000px)').matches) {
        document.getElementById("left").style.display = "none";
      }else{
        document.getElementById("left").style.display = "block";
      }
  })
  }

  hamburgerListener($value){
    if ($value == true){
      document.getElementById("left").style.display = "block";
    }else{
      document.getElementById("left").style.display = "none"
    }
  }

}

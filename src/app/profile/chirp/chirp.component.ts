import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chirp } from 'src/app/models/chirp';

@Component({
  selector: 'app-chirp',
  templateUrl: './chirp.component.html',
  styleUrls: ['./chirp.component.css']
})
export class ChirpComponent implements OnInit {

  @Input()chirp:Chirp

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToProfile(){
    this.router.navigate([`profile`],{queryParams:{ID:this.chirp.ID}})
  }

}

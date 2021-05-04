import { Component, Input, OnInit } from '@angular/core';
import { Chirp } from 'src/app/models/chirp';

@Component({
  selector: 'app-chirp',
  templateUrl: './chirp.component.html',
  styleUrls: ['./chirp.component.css']
})
export class ChirpComponent implements OnInit {

  @Input()chirp:Chirp

  constructor() { }

  ngOnInit(): void {
  }

}

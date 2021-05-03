import { Component, Input, OnInit } from '@angular/core';
import { Feed } from 'src/app/models/feed';

@Component({
  selector: 'app-chirp',
  templateUrl: './chirp.component.html',
  styleUrls: ['./chirp.component.css']
})
export class ChirpComponent implements OnInit {

  @Input()chirp:Feed

  constructor() { }

  ngOnInit(): void {
  }

}

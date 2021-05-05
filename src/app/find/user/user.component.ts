import { Component, Input, OnInit } from '@angular/core';
import { Search } from 'src/app/models/search';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()user:Search

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from 'src/app/models/search';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()user:Search

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToProfile(){
    this.router.navigate([`profile`],{queryParams:{ID:this.user.ID}})
  }

}

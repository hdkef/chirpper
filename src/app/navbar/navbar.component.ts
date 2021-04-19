import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  open = false

  @Output() hamburger = new EventEmitter<boolean>()

  ngOnInit(): void {
  }

  hamburgerEmitter(){
    this.open = !this.open
    this.hamburger.emit(this.open)
  }

}

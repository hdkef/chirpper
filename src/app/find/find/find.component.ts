import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FindService } from '../find-service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {

  constructor(private findservice:FindService) { }

  findSubs:Subscription
  findForm:FormGroup
  result:any

  ngOnInit(): void {
    this.findForm = new FormGroup({
      'Searchkey': new FormControl(null, Validators.required),
    })
  }

  proceedFind(){
    this.findSubs = this.findservice.goFind(this.findForm.value.Searchkey).subscribe((data)=>{
      this.result = data
    })
  }

}

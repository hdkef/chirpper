import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromAppReducer from '../../redux/reducers/app-reducer';
import * as fromEndpointsAction from '../../redux/actions/auth-action'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private sanitizer:DomSanitizer, private http:HttpClient, private store:Store<fromAppReducer.AppState>) { }

  settingForm:FormGroup
  fileHolder:File | null
  AvatarURL:SafeUrl | null | string
  localJSON:string
  valid:boolean

  ngOnInit(): void {

    this.settingForm = new FormGroup({
      'Avatar': new FormControl(null),
      'Desc': new FormControl(null),
    })

    this.localJSON = JSON.parse(localStorage.getItem("BEARER"))

    this.settingForm.setValue({'Desc':this.localJSON["Desc"],'Avatar':null})
    this.AvatarURL = this.localJSON["AvatarURL"]
  }

  onFileChange(event){
    if (event.target.files && event.target.files.length) {
      this.fileHolder = event.target.files[0];
      this.AvatarURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.fileHolder))
      this.valid = true
    }
  }

  goSubmit(){
    let formData = new FormData()
    if (this.settingForm.value.Desc != this.localJSON["Desc"] && this.settingForm.value.Desc != null){
      formData.append('Desc', this.settingForm.value.Desc)
    }
    if (this.fileHolder && this.AvatarURL != this.localJSON["AvatarURL"] && this.AvatarURL != null){
      formData.append('Avatar', this.fileHolder, this.localJSON["ID"])
    }
    if (formData.has('Desc') || formData.has('Avatar')){
      formData.append('ID', this.localJSON["ID"])
      this.http.post(`${environment.api}${environment.settingroute}`,formData).subscribe((data)=>{
        this.afterSubmit({AvatarURL:["AvatarURL"],Desc:data["Desc"]})
      },(err)=>{
        console.log(err)
        alert(err.message)
      })
    }else{
      alert("you haven't set anything")
    }
  }

  afterSubmit(payload:{AvatarURL:SafeUrl | string,Desc:string}){
    let tobeSaved = {
      Username:this.localJSON["Username"],
      Email:this.localJSON["Email"],
      ID:this.localJSON["ID"],
      Token:this.localJSON["Token"],
      AvatarURL:this.localJSON["AvatarURL"],
      Desc:this.localJSON["Desc"],
    }
    if (payload.Desc && payload.AvatarURL){
      tobeSaved.AvatarURL = payload.AvatarURL
      tobeSaved.Desc = payload.Desc
    }else if(payload.Desc && !payload.AvatarURL){
      tobeSaved.Desc = payload.Desc
    }else if(!payload.Desc && payload.AvatarURL){
      tobeSaved.AvatarURL = payload.AvatarURL
    }
    // this.saveToLocal(JSON.stringify(tobeSaved))
  }

  // saveToLocal(payload){
  //   localStorage.removeItem('BEARER')
  //   localStorage.setItem('BEARER',payload)
  // }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private sanitizer:DomSanitizer) { }

  settingForm:FormGroup
  fileHolder:File | null
  AvatarURL:SafeUrl | null | string
  localJSON:string

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
    console.log(formData.get('Desc'))
    console.log(formData.get('Avatar'))
  }

  afterSubmit(payload:{AvatarURL:string,Desc:string}){

  }

}

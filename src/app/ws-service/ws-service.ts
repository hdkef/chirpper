import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { MsgPayload } from "../models/msgpayload";
import * as fromAppReducer from "../redux/reducers/app-reducer"
import * as fromEndpointsAction from "../redux/actions/endpoints-action"
import { HttpClient } from "@angular/common/http";

@Injectable()
export class WSService {

    socket:WebSocket
    ID:string
    Username:string
    Email:string
    Bearer:string
    AvatarURL:string

    constructor(private store:Store<fromAppReducer.AppState>, private http:HttpClient){}

    establishWS(){
        this.socket = new WebSocket(`${environment.ws}${environment.initwsroute}`)
        
        let localJSON = JSON.parse(localStorage.getItem("BEARER"))
        
        this.ID = localJSON["ID"]
        this.Username = localJSON["Username"]
        this.Email = localJSON["Email"]
        this.Bearer = localJSON["Token"]
        this.AvatarURL = localJSON["AvatarURL"]
        
        this.socket.onopen = () => {

            let payloadToBeSent:MsgPayload = {
                Type:"initFromClient",
                ID:this.ID,
                Username:this.Username,
                Email:this.Email,
                ImageURL:null,
                Text:null,
                Bearer:this.Bearer,
                AvatarURL:this.AvatarURL,
                PostID:null,
            }

            this.socket.send(JSON.stringify(payloadToBeSent))
        }

        this.socket.onmessage = (event) => {
            let data = JSON.parse(event.data)
            switch (data["Type"]){
                case "initFromServer":
                    //implements render feed data (ngrx)
                    this.store.dispatch(new fromEndpointsAction.AppendManyFeed(data["Data"]))
                    break
                case "postFromServer":
                    //implement append new feed data (ngrx)
                    this.store.dispatch(new fromEndpointsAction.AppendOneFeed(data))
                    break
            }
        }
    }

    sendMsgPayload(Text:string){
        let payloadToBeSent:MsgPayload = {
            Type:"postFromClient",
            ID:this.ID,
            Username:this.Username,
            Email:this.Email,
            Text:Text,
            ImageURL:null,
            Bearer:this.Bearer,
            AvatarURL:this.AvatarURL,
            PostID:null,
        }
        this.socket.send(JSON.stringify(payloadToBeSent))
    }

    postWithImage(text:string, file:File | null){
        if (file){
            let formData: FormData = new FormData();
            formData.append('Type',"postFromClient")
            formData.append('ID',this.ID)
            formData.append('Username',this.Username)
            formData.append('Email',this.Email)
            formData.append('AvatarURL',this.AvatarURL)
            formData.append('Bearer',this.Bearer)
            let filename = this.ID + file.name
            formData.append('Image',file, filename)
            this.http.post(`${environment.api}${environment.postwithimageroute}`,formData).subscribe()
        }else {
            this.sendMsgPayload(text)
        }
    }

}
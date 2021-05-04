import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { MsgPayload } from "../models/msgpayload";
import * as fromAppReducer from "../redux/reducers/app-reducer"
import * as fromEndpointsAction from "../redux/actions/endpoints-action"

@Injectable()
export class WSService {

    socket:WebSocket
    ID:string
    Username:string
    Email:string
    Bearer:string
    AvatarURL:string

    constructor(private store:Store<fromAppReducer.AppState>){}

    establishWS(){
        this.socket = new WebSocket(`${environment.ws}${environment.initwsroute}`)
        
        let localJSON = JSON.parse(localStorage.getItem("BEARER"))
        
        this.ID = localJSON["ID"]
        this.Username = localJSON["Username"]
        this.Email = localJSON["Email"]
        this.Bearer = localJSON["Token"]
        this.AvatarURL = localJSON["AvatarURL"]
        
        this.socket.onopen = () => {
            console.log("websocket established")

            let payloadToBeSent:MsgPayload = {
                Type:"initFromClient",
                ID:this.ID,
                Username:this.Username,
                Email:this.Email,
                ImageURL:null,
                Text:null,
                Bearer:this.Bearer,
                AvatarURL:this.AvatarURL,
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

    sendMsgPayload(payload:{Type:string,ImageURL:string,Text:string}){
        let payloadToBeSent:MsgPayload = {
            Type:"postFromClient",
            ID:this.ID,
            Username:this.Username,
            Email:this.Email,
            Text:payload.Text,
            ImageURL:payload.ImageURL,
            Bearer:this.Bearer,
            AvatarURL:this.AvatarURL,
        }
        this.socket.send(JSON.stringify(payloadToBeSent))
    }
}
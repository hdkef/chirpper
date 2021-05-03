import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { MsgPayload } from "../models/msgpayload";

@Injectable()
export class WSService {

    socket:WebSocket
    ID:string
    Username:string
    Email:string

    constructor(){}

    establishWS(){
        this.socket = new WebSocket(`${environment.ws}${environment.initwsroute}`)
        
        let localJSON = JSON.parse(localStorage.getItem("BEARER"))
        this.ID = localJSON["ID"]
        this.Username = localJSON["Username"]
        this.Email = localJSON["Email"]
        
        this.socket.onopen = () => {
            console.log("websocket established")

            let payloadToBeSent:MsgPayload = {
                Type:"initFromClient",
                ID:this.ID,
                Username:this.Username,
                Email:this.Email,
                ImageURL:null,
                Text:null,
            }

            this.socket.send(JSON.stringify(payloadToBeSent))
        }
        this.socket.onmessage = (event) => {
            console.log(event.data)
            switch (event.data["Type"]){
                case "initFromServer":
                    //implements render feed data
                    console.log("initFromServer", event.data["Data"])
                case "postFromServer":
                    //implement append new feed data
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
        }
        this.socket.send(JSON.stringify(payloadToBeSent))
    }
}
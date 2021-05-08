import { Injectable } from "@angular/core";
import * as fromAppReducer from "../redux/reducers/app-reducer"
import * as fromEndpointsAction from "../redux/actions/endpoints-action"
import { Store } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { MsgPayload } from "../models/msgpayload";

@Injectable()
export class CommentWS {

    constructor(private store:Store<fromAppReducer.AppState>){}

    socket:WebSocket
    ID:string
    Username:string
    Email:string
    Bearer:string
    AvatarURL:string
    PostID:string

    establishCommentWS(postID:string){

        this.socket = new WebSocket(`${environment.ws}${environment.initcommentroute}`)

        let localJSON = JSON.parse(localStorage.getItem("BEARER"))
        
        this.ID = localJSON["ID"]
        this.Username = localJSON["Username"]
        this.Email = localJSON["Email"]
        this.Bearer = localJSON["Token"]
        this.AvatarURL = localJSON["AvatarURL"]
        this.PostID = postID

        this.socket.onopen = () => {

            let payloadToBeSent:MsgPayload = {
                Type:"initCommentFromClient",
                ID:this.ID,
                PostID:this.PostID,
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
                case "initCommentFromServer":
                    console.log("iniCommentFromServer")
                    //implements render feed data (ngrx)
                    this.store.dispatch(new fromEndpointsAction.AppendManyComment(data["Data"]))
                    break
                case "commentFromServer":
                    //implement append new feed data (ngrx)
                    this.store.dispatch(new fromEndpointsAction.AppendOneComment(data))
                    break
            }
        }

        
    }

    sendMsgPayload(payload:{Type:string,ImageURL:string,Text:string}){
        let payloadToBeSent:MsgPayload = {
            Type:"commentFromClient",
            ID:this.ID,
            Username:this.Username,
            Email:this.Email,
            Text:payload.Text,
            ImageURL:payload.ImageURL,
            Bearer:this.Bearer,
            AvatarURL:this.AvatarURL,
            PostID:this.PostID,
        }
        this.socket.send(JSON.stringify(payloadToBeSent))
    }

}
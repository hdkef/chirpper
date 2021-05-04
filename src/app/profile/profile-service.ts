import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class ProfileService {

    constructor(private http:HttpClient){}

    getProfileInfo(ID:string):Observable<any>{
        return this.http.post(`${environment.api}${environment.profileroute}`,JSON.stringify({ID:ID}))
    }

}
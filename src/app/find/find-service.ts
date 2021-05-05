import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class FindService {

    constructor(private http:HttpClient){}

    goFind(Searchkey){
        return this.http.post(`${environment.api}${environment.searchroute}`,JSON.stringify({Searchkey:Searchkey}))
    }
}
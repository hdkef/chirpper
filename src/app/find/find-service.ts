import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Search } from "../models/search";

@Injectable()
export class FindService {

    constructor(private http:HttpClient){}

    goFind(Searchkey){
        return this.http.post<Search[]>(`${environment.api}${environment.searchroute}`,JSON.stringify({Searchkey:Searchkey}))
    }
}
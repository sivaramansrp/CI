import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class Cancelaciones140201Service{
    constructor(private http: HttpClient) {
        //constructor
     }
}
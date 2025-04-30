import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class SeccionAduanasService {

    constructor(private http: HttpClient) { }

    getSeccionAduanas(): Observable<any> {
        
    }
}

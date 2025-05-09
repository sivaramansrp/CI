import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "@libs/shared/data-access-user/src/enviroments/enviroment";

@Injectable({
    providedIn: 'root',
})
export class CatalogoDocumentosService {
    private readonly host: string;

    constructor(
        private http: HttpClient,
    ) { 
        this.host = `${enviroment.}`
    }


}

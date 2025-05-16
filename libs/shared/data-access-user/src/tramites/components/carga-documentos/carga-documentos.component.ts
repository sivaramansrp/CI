import { Component, , ChangeDetectorRef } from '@angular/core';

@Component({
    selector: "carga-documentos",
    templateUrl: "./carga-documentos.component.html",
    styleUrls: ["./carga-documentos.component.scss"],
    standalone: true,
    imports: [],
})
export class CargaDocumentosComponent implements OnInit {
    constructor(private cdr: ChangeDetectorRef) {}
    
    ngOnInit(): void {
        // Lógica de inicialización del componente
    }

}
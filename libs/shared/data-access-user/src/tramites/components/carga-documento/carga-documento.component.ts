import { Component, Input, OnInit } from "@angular/core";
import { TipoDocumentos } from '../../../core/models/shared/anexar-documentos.model';

@Component({
    selector: 'carga-documento',
    standalone: true,
    imports: [],
    templateUrl: './carga-documento.component.html',
    styleUrl: './carga-documento.component.scss',
})
export class CargaDocumentoComponent implements OnInit {
    @Input() idTipoTRamite: number = 0;
    @Input() tipoTramite: string = '';

    catalogoDocumentosObligatorios: TipoDocumentos[] = []
    constructor(){}

    ngOnInit(): void {}

}

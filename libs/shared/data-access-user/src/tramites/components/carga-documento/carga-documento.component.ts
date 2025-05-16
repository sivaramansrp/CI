import { Component, Input, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { TipoDocumentos } from '../../../core/models/shared/anexar-documentos.model';
import { ESTATUS_CARGA_DOCUMENTO, UNIDADES_DOCUMENTOS } from '../../../core/enums/mensajes-documentos.enum';

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

    @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef>;

    /**
     * @description Constantes para la unidad del tamaño de los archivos.
     * @type {string}
     */
    readonly MB = UNIDADES_DOCUMENTOS.MB;

    /**
     * @description Constantes para la unidad de DPI.
     * @type {string}
     */
    readonly DPI = UNIDADES_DOCUMENTOS.DPI;

    /**
     * @description Estatus de la carga del documento
     * @type {string}
     */

    readonly ESTATUS_CARGA_DOCUMENTO = ESTATUS_CARGA_DOCUMENTO;



    catalogoDocumentosObligatorios: TipoDocumentos[] = [];
    catalogoDocumentosOPcionales: TipoDocumentos[] = [];


    constructor() { }

    ngOnInit(): void { }

}

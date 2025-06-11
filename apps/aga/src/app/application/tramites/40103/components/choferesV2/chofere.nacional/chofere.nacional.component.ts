import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { DatosDelChoferNacional } from '../../../models/registro-muestras-mercancias.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TituloComponent } from "../../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { DatosDeChoferesComponent } from '../data.de.choferes.dialog/data.de.choferes.component';
import { Modal } from 'bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CHOFERES_NACIONALES_ALTA } from '../../../enum/choferes-enum';
import { Chofer40103Service } from '../../../estados/chofer40103.service';
import { Chofer40103Query } from '../../../estados/chofer40103.query';
import { map, Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'app-chofere-nacional',
    templateUrl: './chofere.nacional.component.html',
    styleUrls: ['./chofere.nacional.component.scss'],
    standalone: true,
    imports: [
        TablaDinamicaComponent,
        TituloComponent,
        DatosDeChoferesComponent
    ], 
    providers: [BsModalService]
})
export class ChofereNacionalComponent implements OnInit{

    // Add your component logic here
    tipoSeleccionTabla = TablaSeleccion.CHECKBOX;


    /**
     * Configuración de las columnas de la tabla.
     * Define el encabezado, la clave de acceso a los datos y el orden de las columnas.
     */
    ConfiguracionColumna: ConfiguracionColumna<DatosDelChoferNacional>[] = CHOFERES_NACIONALES_ALTA;

    datosDelChoferNacionalAlta: DatosDelChoferNacional[] = []

    datosDelChoferNacionalAltaSelected: DatosDelChoferNacional[] = [];

    datosConsulta: any;

    modalRef!: BsModalRef | null;

  /**
   * Referencia al elemento del modal de Bootstrap para agregar mercancías.
   * @property {TemplateRef} agregarModal
   */
  @ViewChild('datosDeChoferesModal', { static: false }) agregarModalDialog!: TemplateRef<Element>;

  destroyed$: Observable<any> = new Observable();

  constructor(private bsModalService: BsModalService,
        private chofer40103Service: Chofer40103Service,
        private chofer40103Query: Chofer40103Query,
        // private consultaioQuery: ConsultaioQuery
    ) {
    }

    ngOnInit(): void {
        this.datosDelChoferNacionalAlta = [
            {
                curp: 'CURP123',
                rfc: 'RFC123',
                nombre: 'Juan Pérez',
                calle: 'Calle Falsa',
                numeroExterior: '123',
                numeroInterior: 'A',
                pais: 'México',
                estado: 'CDMX',
                municipioAlcaldia: 'Benito Juárez',
                colonia: 'Colonia del Valle',
                localidad: 'Localidad 1',
                codigoPostal: '12345',
                paisDeResidencia: 'México',
                id: 1,
                telefono: '312343124',
                correoElectronico: '12342314@sadf.com'
            }
        ];

        this.chofer40103Query.selectSolicitud$.pipe(
           takeUntil(this.destroyed$),
           map( data => {
                this.datosConsulta = data.datosDelChoferNacionalAlta ?? [];
            })
        ).subscribe();
    }

    onChofereNationalSelected($event: DatosDelChoferNacional[]) {
        this.datosDelChoferNacionalAltaSelected = $event;
        //throw new Error('Method not implemented.');
    }

    addNewRow(template: TemplateRef<unknown>) {
        this.datosChofere = {} as DatosDelChoferNacional;
        this.openModal(template);
    }
    
    editSelectedRow(template: TemplateRef<unknown>) {
        if (this.datosDelChoferNacionalAltaSelected.length === 0) {
            console.warn('No rows selected for editing.');
            return;
        }
        this.datosChofere = this.datosDelChoferNacionalAltaSelected[0];
        this.openModal(template);
    }

    deleteSelectedRow() {
        if (this.datosDelChoferNacionalAltaSelected.length > 0) {
            this.datosDelChoferNacionalAlta = this.datosDelChoferNacionalAlta.filter(
                item => !this.datosDelChoferNacionalAltaSelected.includes(item)
            );
            this.datosDelChoferNacionalAltaSelected = [];
        } else {
            console.warn('No rows selected for deletion.');
        }
    }

    @ViewChild(DatosDeChoferesComponent) modalComponent!: DatosDeChoferesComponent;
    datosChofere: DatosDelChoferNacional = {} as DatosDelChoferNacional;

    openModal(template: TemplateRef<unknown>) {
        
        console.log(`Opening modal with template:`, template);
        this.modalRef = this.bsModalService.show(template, { class: 'modal-fullscreen' });
    }

    cancelModal() {
        this.modalRef?.hide();
        this.modalRef = null;

        console.log(`Received the closeModalEvent from the child component.`);
        // do something after closing the modal if needed
    }

    addModal(datosChofere: DatosDelChoferNacional) {
        if (this.modalComponent) {
            this.datosDelChoferNacionalAlta.push(datosChofere);
            this.datosDelChoferNacionalAltaSelected = [];
        } else {
            console.error('Modal component is not initialized.');
        }
        this.cancelModal();
    }

}
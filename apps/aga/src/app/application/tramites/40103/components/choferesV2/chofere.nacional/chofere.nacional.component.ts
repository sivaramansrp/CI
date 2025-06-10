import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { DatosDelChoferNacional } from '../../../models/registro-muestras-mercancias.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TituloComponent } from "../../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { DatosDeChoferesComponent } from '../data.de.choferes.dialog/data.de.choferes.component';
import { Modal } from 'bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
export class ChofereNacionalComponent {
    // Add your component logic here
    tipoSeleccionTabla = TablaSeleccion.CHECKBOX;


    /**
     * Configuración de las columnas de la tabla.
     * Define el encabezado, la clave de acceso a los datos y el orden de las columnas.
     */
    ConfiguracionColumna: ConfiguracionColumna<DatosDelChoferNacional>[] = [
        {
            encabezado: 'CURP',
            clave: (item: DatosDelChoferNacional) => item.curp,
            orden: 1,
        },
        {
            encabezado: 'Número',
            clave: (item: DatosDelChoferNacional) => item.nombre,
            orden: 2,
        },
        {
            encabezado: 'calle',
            clave: (item: DatosDelChoferNacional) => item.calle,
            orden: 3,
        },
        {
            encabezado: 'Numero exterior',
            clave: (item: DatosDelChoferNacional) => item.numeroExterior,
            orden: 4,
        },
        {
            encabezado: 'Numero interior',
            clave: (item: DatosDelChoferNacional) => item.numeroInterior,
            orden: 5,
        },
        {
            encabezado: 'País',
            clave: (item: DatosDelChoferNacional) => item.pais,
            orden: 6,
        },
        {
            encabezado: 'Estado',
            clave: (item: DatosDelChoferNacional) => item.estado,
            orden: 7,
        },
        {
            encabezado: 'Municipio o Alcaldía',
            clave: (item: DatosDelChoferNacional) => item.municipioAlcaldia,
            orden: 8,
        },
        {
            encabezado: 'Colonia',
            clave: (item: DatosDelChoferNacional) => item.colonia,
            orden: 9,
        },
        {
            encabezado: 'Localidad',
            clave: (item: DatosDelChoferNacional) => item.localidad,
            orden: 10,
        },
        {
            encabezado: 'Codigo Postal',
            clave: (item: DatosDelChoferNacional) => item.codigoPostal,
            orden: 11,
        },
        {
            encabezado: 'País de Residencia',
            clave: (item: DatosDelChoferNacional) => item.paisDeResidencia,
            orden: 12,
        }
    ];
    DatosDelChoferNacional: DatosDelChoferNacional[] = []

    datosConsulta: any;

    modalRef!: BsModalRef | null;
      /**
   * Referencia al elemento del modal de Bootstrap para agregar mercancías.
   * @property {TemplateRef} agregarModal
   */
  @ViewChild('datosDeChoferesModal', { static: false }) agregarModalDialog!: TemplateRef<Element>;


    /**
     *
     */
    constructor(private bsModalService: BsModalService) {
    }

    addNewRow(template: TemplateRef<unknown>) {
        this.openModal(template);
    }
    
    editSelectedRow(template: TemplateRef<unknown>) {
        this.openModal(template);
    }
    deleteSelectedRow() {
        throw new Error('Method not implemented.');
    }

    @ViewChild(DatosDeChoferesComponent) modalComponent!: DatosDeChoferesComponent;
    datosChofere: DatosDelChoferNacional = {} as DatosDelChoferNacional;

    openModal(template: TemplateRef<unknown>) {
        
        console.log(`Opening modal with template:`, template);
        this.modalRef = this.bsModalService.show(this.agregarModalDialog, { class: 'modal-fullscreen' });
    }

    closeModal() {
        this.modalRef?.hide();
        this.modalRef = null;

        console.log(`Received the closeModalEvent from the child component.`);
        // do something after closing the modal if needed
    }

}
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  TablaDinamicaComponent,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { DatosDelChoferNacional } from '../../../models/registro-muestras-mercancias.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TituloComponent } from '../../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { DatosDeChoferesComponent } from '../data.de.choferes.dialog/data.de.choferes.component';
import { Modal } from 'bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CHOFERES_NACIONALES_ALTA, TEXTOS } from '../../../enum/choferes-enum';
import { Chofer40103Service } from '../../../estados/chofer40103.service';
import { Chofer40103Query } from '../../../estados/chofer40103.query';
import { map, Observable, takeUntil } from 'rxjs';
import { ConsultaioQuery, ConsultaioState, NotificacionesComponent,  } from '@ng-mf/data-access-user';


@Component({
  selector: 'app-chofere-nacional',
  templateUrl: './chofere.nacional.component.html',
  styleUrls: ['./chofere.nacional.component.scss'],
  standalone: true,
  imports: [
    TablaDinamicaComponent, 
    TituloComponent, 
    DatosDeChoferesComponent,
    NotificacionesComponent
  ],
  providers: [BsModalService],
})
export class ChofereNacionalComponent implements OnInit {
  // Add your component logic here
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla.
   * Define el encabezado, la clave de acceso a los datos y el orden de las columnas.
   */
  ConfiguracionColumna: ConfiguracionColumna<DatosDelChoferNacional>[] =
    CHOFERES_NACIONALES_ALTA;

  datosDelChoferNacional: DatosDelChoferNacional[] = [];

  datosDelChoferNacionalSelected: DatosDelChoferNacional[] = [];

  datosConsulta: any;

  modalRef!: BsModalRef | null;

  /**
   * Referencia al elemento del modal de Bootstrap para agregar mercancías.
   * @property {TemplateRef} agregarModal
   */
  @ViewChild('datosDeChoferesModal', { static: false })
  agregarModalDialog!: TemplateRef<Element>;

  destroyed$: Observable<any> = new Observable();

  constructor(
    private bsModalService: BsModalService,
    private chofer40103Service: Chofer40103Service,
    private chofer40103Query: Chofer40103Query,
    private consultaioQuery: ConsultaioQuery
  ) {}

  ngOnInit(): void {

    this.chofer40103Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((data) => {
          this.datosDelChoferNacional = this.datosDelChoferNacional.concat(data?.datosDelChoferNacionalAlta ?? []);
        })
      )
      .subscribe();

      this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          if (seccionState.readonly) {
            this.datosConsulta = seccionState;
          }
        })
      ).subscribe();

  }

  onChofereNationalSelected($event: DatosDelChoferNacional[]) {
    this.datosDelChoferNacionalSelected = $event;
  }

  addNewRow(template: TemplateRef<unknown>) {
    this.datosChofere = {} as DatosDelChoferNacional;
    this.openModal(template);
  }

  editSelectedRow(template: TemplateRef<unknown>) {
    if (this.datosDelChoferNacionalSelected.length === 0) {
      console.warn('No rows selected for editing.');
      return;
    }
    this.datosChofere = this.datosDelChoferNacionalSelected[0];
    this.openModal(template);
  }

  deleteSelectedRow() {
    if (this.datosDelChoferNacionalSelected.length > 0) {
      this.datosDelChoferNacional = this.datosDelChoferNacional.filter(
        (item) => !this.datosDelChoferNacionalSelected.includes(item)
      );
      this.datosDelChoferNacionalSelected = [];
    } else {
      console.warn('No rows selected for deletion.');
    }
  }

  @ViewChild(DatosDeChoferesComponent)
  modalComponent!: DatosDeChoferesComponent;
  datosChofere: DatosDelChoferNacional = {} as DatosDelChoferNacional;

  openModal(template: TemplateRef<unknown>) {
    console.log(`Opening modal with template:`, template);
    this.modalRef = this.bsModalService.show(template, {
      class: 'modal-fullscreen',
    });
  }

  cancelModal() {
    this.modalRef?.hide();
    this.modalRef = null;

    console.log(`Received the closeModalEvent from the child component.`);
    // do something after closing the modal if needed
  }

  addModal(data: DatosDelChoferNacional) {
    if (this.modalComponent) {
      this.datosDelChoferNacional.push(data);
      this.datosDelChoferNacionalSelected = [];
    } else {
      console.error('Modal component is not initialized.');
    }
    this.cancelModal();
  }
}

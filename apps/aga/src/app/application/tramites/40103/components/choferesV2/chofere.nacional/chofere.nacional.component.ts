import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, NotificacionesComponent } from '@ng-mf/data-access-user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  TablaDinamicaComponent,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { DatosDelChoferNacional } from '../../../models/registro-muestras-mercancias.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TituloComponent } from '@ng-mf/data-access-user';
import { DatosDeChoferesNacionalDialogComponent } from '../data.de.choferes.dialog/data.de.choferes.nacional.dialog.component';
import { CHOFERES_NACIONALES_ALTA } from '../../../enum/choferes-enum';
import { Chofer40103Service } from '../../../estados/chofer40103.service';
import { Chofer40103Query } from '../../../estados/chofer40103.query';
import { Subject, map, takeUntil } from 'rxjs';


@Component({
  selector: 'app-chofere-nacional',
  templateUrl: './chofere.nacional.component.html',
  styleUrls: ['./chofere.nacional.component.scss'],
  standalone: true,
  imports: [
    TablaDinamicaComponent, 
    TituloComponent, 
    DatosDeChoferesNacionalDialogComponent,
    NotificacionesComponent
  ],
  providers: [BsModalService],
})
export class ChofereNacionalComponent implements OnInit, OnDestroy {
  // Add your component logic here
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla.
   * Define el encabezado, la clave de acceso a los datos y el orden de las columnas.
   */
  ConfiguracionColumna: ConfiguracionColumna<DatosDelChoferNacional>[] =
    CHOFERES_NACIONALES_ALTA;


  /**
   * Datos del chofer nacional.
   * @property {DatosDelChoferNacional[]} datosDelChoferNacional
   */
  datosDelChoferNacional: DatosDelChoferNacional[] = [];

  /**
   * Datos del chofer nacional seleccionados.
   * @property {DatosDelChoferNacional[]} datosDelChoferNacionalSelected
   */
  datosDelChoferNacionalSelected: DatosDelChoferNacional[] = [];

  /**
   * Texto de la sección.
   * @property {string} textoSeccion
   */
  datosConsulta!: ConsultaioState;

  /**
   * Datos del chofer nacional que se utilizarán para agregar o editar.
   * @property {DatosDelChoferNacional} datosChofere
   */
  datosChofere: DatosDelChoferNacional = {} as DatosDelChoferNacional;


  /**
   * Referencia al modal de Bootstrap para agregar mercancías.
   * @property {BsModalRef} modalRef
   */
  modalRef!: BsModalRef | null;

  /**
   * Referencia al elemento del modal de Bootstrap para agregar mercancías.
   * @property {TemplateRef} agregarModal
   */
  @ViewChild('datosDeChoferesModal', { static: false })
  agregarModalDialog!: TemplateRef<Element>;  


  destroy$: Subject<unknown> = new Subject();
  isReadonly: boolean = false;

  constructor(
    private bsModalService: BsModalService,
    private chofer40103Service: Chofer40103Service,
    private chofer40103Query: Chofer40103Query,
    private consultaioQuery: ConsultaioQuery
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {

    this.chofer40103Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((data) => {
          this.datosDelChoferNacional = this.datosDelChoferNacional.concat(data?.datosDelChoferNacionalAlta ?? []);
        })
      )
      .subscribe();

      this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          if (seccionState.readonly) {
            this.datosConsulta = seccionState;
            this.isReadonly = this.datosConsulta.readonly;
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

  openModal(template: TemplateRef<unknown>) {
    this.modalRef = this.bsModalService.show(template, {
      class: 'modal-fullscreen',
    });
  }

  cancelModal() {
    this.modalRef?.hide();
    this.modalRef = null;
  }

  addModal(data: DatosDelChoferNacional) {
    // if (this.modalComponent) {
      this.datosDelChoferNacional.push(data);
      this.datosDelChoferNacionalSelected = [];
    // } else {
    //   console.error('Modal component is not initialized.');
    // }
    this.cancelModal();
  }
}

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
    Notificacion,
    NotificacionesComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { DatosDelChoferNacional } from '../../../../models/registro-muestras-mercancias.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TituloComponent } from '../../../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { DatosDeChoferesComponent } from '../../data.de.choferes.dialog/data.de.choferes.component';
import { Modal } from 'bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CHOFERES_NACIONALES_ALTA, TEXTOS } from '../../../../enum/choferes-enum';
import { Chofer40103Service } from '../../../../estados/chofer40103.service';
import { Chofer40103Query } from '../../../../estados/chofer40103.query';
import { map, Observable, pipe, Subject, takeUntil } from 'rxjs';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-chofere-nacional-retirada',
  templateUrl: './chofere.nacional.retirada.component.html',
  styleUrls: ['./chofere.nacional.retirada.component.scss'],
  standalone: true,
  imports: [
    TablaDinamicaComponent, 
    TituloComponent, 
    DatosDeChoferesComponent
  ],
  providers: [BsModalService],
})
export class ChofereNacionalRetiradaComponent implements OnInit {

  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla.
   * Define el encabezado, la clave de acceso a los datos y el orden de las columnas.
   */
  ConfiguracionColumna: ConfiguracionColumna<DatosDelChoferNacional>[] =
    CHOFERES_NACIONALES_ALTA;

  datosDelChoferNacional: DatosDelChoferNacional[] = [];

  datosDelChoferNacionalSelected: DatosDelChoferNacional[] = [];

  datosConsulta!: ConsultaioState;

  isReadonly: boolean = false;


  modalRef!: BsModalRef | null;

  /**
   * Referencia al elemento del modal de Bootstrap para agregar mercancías.
   * @property {TemplateRef} agregarModal
   */
  @ViewChild('datosDeChoferesModal', { static: false })
  agregarModalDialog!: TemplateRef<Element>;

  destroyed$: Subject<void> = new Subject();

  constructor(
    private bsModalService: BsModalService,
    private chofer40103Service: Chofer40103Service,
    private chofer40103Query: Chofer40103Query,
    private consultaioQuery: ConsultaioQuery
  ) {}

  ngOnInit(): void {
    
    this.isReadonly = true;

    this.chofer40103Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((data) => {
          this.datosDelChoferNacional = this.datosDelChoferNacional.concat(data.datosDelChoferNacionalRetirada ?? []);
        })
      )
      .subscribe();

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          if(seccionState.readonly) {
            this.datosConsulta = seccionState;
            this.isReadonly = seccionState?.readonly ?? true;
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
    this.modalRef = this.bsModalService.show(template, {
      class: 'modal-fullscreen',
    });
  }

  cancelModal() {
    this.modalRef?.hide();
    this.modalRef = null;
  }

  /**
   * Agrega una nueva entrada de `DatosDelChoferNacional` al arreglo `datosDelChoferNacional` si el componente modal está inicializado.
   * También reinicia el arreglo `datosDelChoferNacionalSelected` y cierra el modal.
   *
   * @param data - El objeto de datos que representa al chofer nacional que se va a agregar.
   */
  addModal(data: DatosDelChoferNacional): void {
    if (this.modalComponent) {
      this.datosDelChoferNacional.push(data);
      this.datosDelChoferNacionalSelected = [];
    }
    this.cancelModal();
  }
}

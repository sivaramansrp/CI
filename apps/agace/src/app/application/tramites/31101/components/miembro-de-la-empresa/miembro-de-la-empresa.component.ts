import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  Solicitud31101State,
  Solicitud31101Store,
} from '../../estados/solicitud31101.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud31101Query } from '../../estados/solicitud31101.query';
import { Subject, takeUntil } from 'rxjs';
import {
  DatosGeneralesDeLaSolicitudCatologo,
  DatosGeneralesDeLaSolicitudRadioLista,
  InputRadio,
} from '../../models/solicitud.model';

@Component({
  selector: 'app-miembro-de-la-empresa',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
  ],
  templateUrl: './miembro-de-la-empresa.component.html',
  styleUrl: './miembro-de-la-empresa.component.scss',
})
export class MiembroDeLaEmpresaComponent implements OnInit, OnDestroy {
  @Output() eventoCerrarModal = new EventEmitter<void>();
  miembroEmpresaForm!: FormGroup;

  seleccionarObligadoTributar: number | string = 0;
  seleccionarTipoDePersona: number = 0;
  /** Subject utilizado para destruir observables y evitar fugas de memoria */
  private destroy$: Subject<void> = new Subject<void>();

  sinoOpcion: InputRadio = {} as InputRadio;

  /** Estado actual de la solicitud 31101 */
  solicitud31101State: Solicitud31101State = {} as Solicitud31101State;

  enSuCaracterDeLista: CatalogosSelect = {} as CatalogosSelect;

  nacionalidadLista: CatalogosSelect = {} as CatalogosSelect;

  tipoDePersonaLista: CatalogosSelect = {} as CatalogosSelect;
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud31101Store: Solicitud31101Store,
    public solicitud31101Query: Solicitud31101Query
  ) {
    this.conseguirDatosGeneralesCatologo();
    this.conseguirDatosGeneralesOpcionDeRadio();
  }

  ngOnInit(): void {
    this.miembroEmpresaForm = this.fb.group({});
  }

  conseguirDatosGeneralesCatologo(): void {
    this.solicitudService
      .conseguirDatosGeneralesCatologo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitudCatologo) => {
          this.enSuCaracterDeLista = respuesta.enSuCaracterDe;
          this.nacionalidadLista = respuesta.nacionalidad;
          this.tipoDePersonaLista = respuesta.tipoDePersona;
        },
      });
  }

  /**
   * Obtiene los datos generales correspondientes a las opciones de tipo de radio.
   * Asigna los valores recibidos a las propiedades correspondientes del componente.
   */
  conseguirDatosGeneralesOpcionDeRadio(): void {
    this.solicitudService
      .conseguirDatosGeneralesOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitudRadioLista) => {
          this.sinoOpcion = respuesta.requisitos;
        },
      });
  }

  seleccionarObligadoTributarEnMexico(evento: string | number): void {
    this.seleccionarObligadoTributar = evento;
  }

  buscarRFCDatos(): void{
    //
  }

  selectionTipoDePersona(evento : Catalogo): void{
    this.seleccionarTipoDePersona = evento.id;
  }

  cerrarModal(): void {
    this.eventoCerrarModal.emit(); // Emitir evento para notificar al padre.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Finaliza todas las suscripciones observables usando el subject destroy$.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { AvisoValor, FECHA_DE_PAGO } from '../../models/aviso.model';
import { Catalogo, CatalogoSelectComponent, InputCheckComponent, InputFecha, InputFechaComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, takeUntil } from 'rxjs';
import { AvisoUnicoService } from '../../services/aviso-unico.service';
import { CommonModule } from '@angular/common';
import { PreOperativo } from '../../models/aviso.model';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { UnicoQuery } from '../../estados/queries/unico.query';
import { UnicoState } from '../../estados/renovacion.store';
import { UnicoStore } from '../../estados/renovacion.store';

/**
 * @component
 * @name AvisoDeRenovacionComponent
 * @description
 * Componente que representa el aviso de renovación.
 * Este componente es responsable de inicializar el formulario, cargar datos desde servicios y manejar el estado de la aplicación.
 */
@Component({
  selector: 'app-aviso-de-renovacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
    InputCheckComponent,
  ],
  templateUrl: './aviso-de-renovacion.component.html',
  styleUrls: ['./aviso-de-renovacion.component.scss'],
})
export class AvisoDeRenovacionComponent implements OnInit, OnDestroy {
  /**
   * Fecha inicial para el campo de fecha.
   * Se obtiene de la constante FECHA_DE_PAGO.
   */
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  /**
   * Lista de localidades obtenidas desde el servicio.
   */
  public localidadList!: Catalogo[];

  /**
   * Observable para manejar la destrucción del componente.
   * Se usa para limpiar suscripciones cuando el componente es destruido.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Opciones de tipo de persona obtenidas desde el servicio.
   */
  tipoPersonaOptions: PreOperativo[] = [];

  /**
   * Formulario reactivo para el aviso de renovación.
   * Este formulario captura los datos de la solicitud de renovación.
   */
  avisoForm!: FormGroup;

  /**
   * Estado actual de la solicitud.
   * Contiene los datos actuales que se están gestionando en el estado de la aplicación.
   */
  public solicitudState!: UnicoState;

  /**
   * Constructor del componente.
   * Inicializa las dependencias necesarias, como el servicio, el almacén y la consulta de estado.
   * @param fb Constructor de formularios reactivos.
   * @param service Servicio para obtener datos relacionados con el aviso único.
   * @param unicoStore Almacén para manejar el estado de la aplicación.
   * @param unicoQuery Consultas para obtener el estado actual de la aplicación.
   */
  constructor(
    private fb: FormBuilder,
    private service: AvisoUnicoService,
    private unicoStore: UnicoStore,
    private unicoQuery: UnicoQuery
  ) {
    // Constructor del componente: inicializa las dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario, carga datos iniciales y se suscribe al estado de la aplicación.
   */
  ngOnInit(): void {
    this.unicoQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.initializeForm();
    this.loadLocalidad();
    this.loadAsignacionData();
    this.cargarRadio();
  }

  /**
   * Inicializa el formulario reactivo con valores predeterminados basados en el estado actual de la solicitud.
   */
  private initializeForm(): void {
    this.avisoForm = this.fb.group({
      mapTipoTramite: [this.solicitudState?.mapTipoTramite],
      mapDeclaracionSolicitud: [this.solicitudState?.mapDeclaracionSolicitud],
      envioAviso: [this.solicitudState?.envioAviso],
      numeroAviso: [this.solicitudState?.numeroAviso],
      claveReferencia: [{ value: '', disabled: true }],
      numeroOperacion: [this.solicitudState?.numeroOperacion],
      cadenaDependencia: [{ value: '', disabled: true }],
      banco: [this.solicitudState?.banco],
      llavePago: [this.solicitudState?.llavePago],
      fechaPago: [this.solicitudState?.fechaPago],
      importePago: [{ value: '', disabled: true }],
    });
  }

  /**
   * Carga datos de asignación desde el servicio y actualiza el formulario con la clave de referencia, cadena de dependencia y importe de pago.
   */
  loadAsignacionData(): void {
    this.service.getSolicitante()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: AvisoValor) => {
        this.avisoForm.patchValue({
          claveReferencia: data.claveReferencia,
          cadenaDependencia: data.cadenaDependencia,
          importePago: data.importePago,
        });
      });
  }

  /**
   * Carga la lista de localidades desde el servicio y las almacena en la propiedad `localidadList`.
   */
  loadLocalidad(): void {
    this.service.obtenerDatosLocalidad()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data): void => {
        this.localidadList = data as Catalogo[];
      });
  }

  /**
   * Carga las opciones de tipo de persona desde el servicio y las almacena en la propiedad `tipoPersonaOptions`.
   */
  cargarRadio(): void {
    this.service.obtenerRadio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        this.tipoPersonaOptions = resp;
      });
  }

  /**
   * Maneja el cambio de valor en el campo de fecha de pago.
   * @param nuevo_valor Nuevo valor de la fecha.
   */
  public onFechaCambiada(nuevo_valor: string): void {
    this.avisoForm.get('fechaPago')?.setValue(nuevo_valor);
    this.avisoForm.get('fechaPago')?.markAsUntouched();
    this.unicoStore.setfechaPago(nuevo_valor);
  }

  /**
   * Resetea los datos relacionados con el pago en el formulario, borrando el número de operación, banco, llave de pago y fecha de pago.
   */
  resetPagoDatos(): void {
    this.avisoForm.patchValue({
      numeroOperacion: '',
      banco: '',
      llavePago: '',
      fechaPago: '',
    });
  }

  /**
   * Establece valores en el almacén desde el formulario.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Nombre del método en el almacén.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof UnicoStore): void {
    const VALOR = form.get(campo)?.value;
    (this.unicoStore[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Libera recursos y cancela las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

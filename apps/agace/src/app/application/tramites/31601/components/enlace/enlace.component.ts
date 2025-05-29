import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Solicitud31601State, Tramite31601Store } from '../../../../estados/tramites/tramite31601.store';
import { Subject,map, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite31601Query } from '../../../../estados/queries/tramite31601.query';
import enlace from '@libs/shared/theme/assets/json/31601/enlace.json';
import enlaceData from '@libs/shared/theme/assets/json/31601/enlace-data.json';

/**
 * @component EnlaceComponent
 * @description Componente para gestionar el enlace de un representante, incluyendo su información en un formulario reactivo. Forma parte del trámite 31601.
 * 
 * Este componente:
 * - Muestra una tabla con datos precargados.
 * - Muestra y gestiona un formulario reactivo con datos del representante.
 * - Permite edición si no está en modo solo lectura.
 * - Usa datos precargados desde archivos JSON.
 * - Maneja el estado mediante un store y un query personalizados.
 * - Controla un modal para ingresar o editar información del representante.
 * 
 * @example
 * <app-enlace></app-enlace>
 * 
 * @imports
 * - TableComponent
 * - TituloComponent
 * - ReactiveFormsModule
 * - FormsModule
 * 
 * @author Equipo Angular
 */
@Component({
  selector: 'app-enlace',
  standalone: true,
  imports: [
    TableComponent,
    TituloComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './enlace.component.html',
  styleUrl: './enlace.component.scss',
})
export class EnlaceComponent implements OnInit, OnDestroy {
  /**
   * Notificador para anular suscripciones y evitar fugas de memoria.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Encabezados de la tabla de enlace.
   */
  public enlaceHeaderData: string[] = [];

  /**
   * Cuerpo de la tabla de enlace (actualmente no usado directamente).
   */
  public enlanceBodyData: unknown = [];

  /**
   * Datos de la tabla precargados desde un archivo JSON.
   */
  public enlaceTableData = enlace;

  /**
   * Formulario reactivo del representante.
   */
  public represtantante!: FormGroup;

  /**
   * Datos precargados del representante, desde archivo JSON.
   */
  public representativeData = enlaceData;

  /**
   * Estado actual del trámite.
   */
  public solicitudState!: Solicitud31601State;

  /**
   * Controla la visibilidad del modal.
   */
  public modal: string = 'modal';

  /**
   * Referencia al botón o elemento de cierre del modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Constructor del componente.
   * 
   * @param fb Instancia de FormBuilder para creación de formularios.
   * @param tramite31601Store Store personalizado para manejar el estado.
   * @param tramite31601Query Query para leer el estado del trámite.
   * @param consultaioQuery Query para obtener estado de la sección "consultaio".
   */
  constructor(
    private fb: FormBuilder,
    private tramite31601Store: Tramite31601Store,
    private tramite31601Query: Tramite31601Query,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.getRegistroForm();
        })
      )
      .subscribe();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.getRegistroForm();
    this.getEnlace();
  }

  /**
   * Obtiene y asigna los encabezados de la tabla desde el JSON.
   */
  public getEnlace(): void {
    this.enlaceHeaderData = this.enlaceTableData.tableHeader;
  }

  /**
   * Abre el modal y carga los datos del formulario.
   */
  public abrirModal(): void {
    this.modal = 'show';
    this.getRegistroForm();
  }

  /**
   * Crea y configura el formulario del representante, usando datos del estado o valores por defecto.
   */
  public getRegistroForm(): void {
    this.tramite31601Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.represtantante = this.fb.group({
      resigtroReprestantante: [
        this.solicitudState?.resigtroReprestantante ?? this.representativeData.resigtro,
        Validators.required,
      ],
      rfcReprestantante: [
        this.solicitudState?.rfcReprestantante ?? this.representativeData.rfc,
        Validators.required,
      ],
      nombreReprestante: [
        this.solicitudState?.nombreReprestante ?? this.representativeData.nombre,
        Validators.required,
      ],
      apellidoPaterno: [
        this.solicitudState?.apellidoPaterno ?? this.representativeData.apellidoPaterno,
        Validators.required,
      ],
      apellidoMaterno: [
        this.solicitudState?.apellidoMaterno ?? this.representativeData.apellidoMaterno,
        Validators.required,
      ],
      cargo: [
        this.solicitudState?.cargo ?? this.representativeData.cargo,
        Validators.required,
      ],
      cuidad: [
        this.solicitudState?.cuidad ?? this.representativeData.cuidad,
        Validators.required,
      ],
      telefonoReprestantante: [
        this.solicitudState?.telefonoReprestantante ?? this.representativeData.telefono,
        Validators.required,
      ],
      correoReprestantante: [
        this.solicitudState?.correoReprestantante ?? this.representativeData.correo,
        Validators.required,
      ],
      suplente: [
        this.solicitudState?.suplente,
        Validators.required,
      ],
    });

    if (this.esFormularioSoloLectura) {
      Object.keys(this.represtantante.controls).forEach((key) =>
        this.represtantante.get(key)?.disable()
      );
    } else {
      Object.keys(this.represtantante.controls).forEach((key) =>
        this.represtantante.get(key)?.enable()
      );
    }

    this.patchData();
  }

  /**
   * Parchea ciertos campos del formulario como solo lectura.
   */
  public patchData(): void {
    this.represtantante.get('rfc')?.disable();
    this.represtantante.get('nombre')?.disable();
    this.represtantante.get('apellidoPaterno')?.disable();
    this.represtantante.get('apellidoMaterno')?.disable();
    this.represtantante.get('cuidad')?.disable();
  }

  /**
   * Establece un valor en el store de Tramite31601 desde el formulario.
   * 
   * @param form Formulario del cual se toma el valor.
   * @param campo Nombre del campo del formulario.
   * @param metodoNombre Nombre del método del store al que se enviará el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite31601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite31601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método de limpieza que se ejecuta al destruir el componente. Cancela suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}


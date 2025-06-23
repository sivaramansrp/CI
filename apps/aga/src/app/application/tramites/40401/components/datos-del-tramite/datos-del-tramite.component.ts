import {
  Catalogo,
  CatalogoSelectComponent,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import {Tramite40401State,Tramite40401Store,} from '../../../../core/estados/tramites/tramite40401.store';
import { CatalogoLista } from '../../models/certi-registro.model';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DATOS_ALERT } from '../../enum/datos-del-tramite.enum';
import { RegistroCaatAereoService } from '../../services/RegistroCaatAereoController.service';
import { Tramite40401Query } from '../../../../core/queries/tramite40401.query';



/**
 * Componente `DatosDelTramiteComponent`.
 * 
 * Este componente es responsable de gestionar el formulario de datos del trámite, 
 * cargar información desde servicios externos y actualizar el estado del trámite en el store.
 */
@Component({
  selector: 'datos-del-tramite',
  templateUrl: './datos-del-tramite.component.html',
  styleUrls: ['./datos-del-tramite.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent
],
})
export class DatosDelTramiteComponent implements OnInit, OnDestroy {

   DATOS_ALERT= DATOS_ALERT
  /**
   * Formulario reactivo para gestionar los datos del trámite.
   */
  datosDelTramiteForm!: FormGroup;

  /**
   * Opciones de países obtenidas desde el catálogo de CAAT Aéreo.
   */
  optionsPais!: Catalogo[];

  /**
   * Notificador para gestionar la destrucción de suscripciones y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la solicitud del trámite.
   */
  public solicitudState!: Tramite40401State;
  
  /**
   * Indica si el formulario es de solo lectura.
   */
  readonly: boolean = false;

  /**
   * Constructor del componente.
   * 
   * @param formBuilder Servicio para construir formularios reactivos.
   * @param registroCaatAereoService Servicio para obtener datos del catálogo de CAAT Aéreo.
   * @param store Store del estado del trámite.
   * @param tramiteQuery Query para seleccionar datos del estado del trámite.
   * @param validacionesService Servicio para validar formularios.
   */
  constructor(
    private formBuilder: FormBuilder,
    private registroCaatAereoService: RegistroCaatAereoService,
    public store: Tramite40401Store,
    public tramiteQuery: Tramite40401Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaQuery: ConsultaioQuery,
    
  ) {
    // Constructor vacío
  }

  /**
   * Método del ciclo de vida `OnInit`.
   * 
   * Inicializa el formulario y carga los datos necesarios para el componente.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.initializeForm();
    this.cargarCAATAereo();

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$), 
        map((seccionState) => {
          // seccionState.update = true; // Asegura que se actualice el estado 
          if( seccionState.readonly ) {
            this.readonly = seccionState.readonly;
            this.datosDelTramiteForm.disable();
          }
        })
      )
      .subscribe();
  }

  /**
   * Método privado para inicializar el formulario reactivo.
   * 
   * Configura los campos del formulario con valores iniciales y validaciones.
   */
  private initializeForm(): void {
    this.datosDelTramiteForm = this.formBuilder.group({
      pais: [
        this.solicitudState?.pais,
        [Validators.required],
      ],
      codigo: [
        this.solicitudState?.codigo,
        [Validators.required],
      ],
      transportacion: [
        this.solicitudState?.transportacion,
        [Validators.required, Validators.maxLength(3)],
      ],
    });
  }

  /**
   * Carga los datos del catálogo de CAAT Aéreo desde el servicio correspondiente.
   * 
   * Este método utiliza el servicio `registroCaatAereoService` para obtener los datos
   * del catálogo de CAAT Aéreo y los asigna a la propiedad `optionsPais`. La suscripción
   * al observable se gestiona utilizando el operador `takeUntil` para evitar fugas de memoria.
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  cargarCAATAereo(): void {
    this.registroCaatAereoService
      .obtenerCAATAereo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionsPais = datos.datos;
      });
  }

  /**
   * Actualiza un valor en el store del trámite.
   *
   * Este método permite actualizar un valor específico en el store del trámite utilizando el formulario y el método correspondiente.
   *
   * @param {FormGroup} form - El formulario que contiene el valor a actualizar.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite40401Store} metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite40401Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método para validar el formulario.
   * 
   * Este método utiliza el servicio de validaciones para verificar si un campo específico del formulario es válido.
   * 
   * @param form Formulario a validar.
   * @param field Campo a validar.
   * @returns {boolean} Regresa un booleano si el campo es válido o no.
   */
  isValid(form: FormGroup, field: string): boolean | null {
    return this.validacionesService.isValid(form, field);
  }

  /**
   * Limpia el formulario de datos del trámite.
   * Este método resetea el formulario a su estado inicial y actualiza los valores en el store
   * para los campos 'pais', 'codigo' y 'transportacion'.
   */
  limpiar(): void {
   this.datosDelTramiteForm.reset();
    this.setValoresStore(this.datosDelTramiteForm, 'pais', 'setPais');
    this.setValoresStore(this.datosDelTramiteForm, 'codigo', 'setCodigo');
    this.setValoresStore(this.datosDelTramiteForm, 'transportacion', 'setTransportacion');
    
  }

  /**
   * Método del ciclo de vida `OnDestroy`.
   * 
   * Libera los recursos y completa el `Subject` para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
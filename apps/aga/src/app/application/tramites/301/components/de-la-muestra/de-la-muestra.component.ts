/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud301State,
  Tramite301Store,
} from '../../../../core/estados/tramites/tramite301.store';
import { Subject, Subscription, map, takeUntil } from 'rxjs';

import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery, TieneConsultaio } from '@ng-mf/data-access-user';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite301Query } from '../../../../core/queries/tramite301.query';

/**
 * Componente `DeLaMuestraComponent`
 *
 * Este componente gestiona una solicitud que incluye un formulario relacionado
 * con la toma de muestras de un producto. Ofrece funcionalidades como la
 * habilitación/deshabilitación de campos según la selección de un valor en
 * un catálogo, validación de formularios y la inicialización de datos relevantes.
 *
 * @component
 * @example
 * <app-de-la-muestra></app-de-la-muestra>
 */
@Component({
  selector: 'app-de-la-muestra',
  templateUrl: './de-la-muestra.component.html',
  styleUrls: ['./de-la-muestra.component.scss'],
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent],
  standalone: true,
})
export class DeLaMuestraComponent implements OnInit, OnDestroy {

  @Input() public procedureState!: TieneConsultaio;
  /**
   * Datos del catálogo relacionados con la mercancía.
   *
   * @type {Catalogo[]}
   */
  public mercancia!: Catalogo[];

  /**
   * Formulario reactivo que contiene los datos de la solicitud.
   * Incluye el campo obligatorio `folio` dentro de `datosImportadorExportador`.
   *
   * @type {FormGroup}
   */
  Informaciondela!: FormGroup;

  /**
   * Suscripción a los cambios en el formulario react
   */
  private subscription: Subscription = new Subscription();

  /**
   * Estado de la solicitud de la sección 301.
   */
  public solicitudState!: Solicitud301State;

  /**
  * Indica si el formulario está en modo de actualización (patch).
  * Si es `true`, el formulario se utiliza para editar un registro existente.
  */
  public esFormularioActualizacion: boolean = false; 

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  
  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 

  /**
   * Constructor del componente `DeLaMuestraComponent`.
   *
   * Inicializa el formulario utilizando el `FormBuilder` de Angular.
   *
   * @param {FormBuilder} fb - Inyecta el servicio `FormBuilder` para la creación del formulario.
   */
  constructor(
    private fb: FormBuilder,
    private tramite301Store: Tramite301Store,
    private tramite301Query: Tramite301Query,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.esFormularioActualizacion = [
          'FLUJO_FUNCIONARIO_ATENDER_REQUERIMIENTO',
          'FLUJO_FUNCIONARIO_AUTORIZACION',
          'FLUJO_FUNCIONARIO_EVALUAR'
        ].includes(seccionState.parameter);
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe()
  }

  /**
   * Método placeholder para la validación del formulario.
   * Este método no tiene implementación actual, pero puede ser extendido
   * para realizar validaciones adicionales en el futuro.
   *
   * @returns {void} No retorna nada, ya que es un método sin lógica por el momento.
   */
  validarFormulario(): void {}

  /**
   * Método del ciclo de vida que se ejecuta al iniciar el componente.  
   * Llama a la función para inicializar el estado del formulario.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioActualizacion) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }  
    this.getMercancia();
  }

  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
    this.subscription.add(
      this.tramite301Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe()
    );
    this.Informaciondela = this.fb.group({
      datosImportadorExportador: this.fb.group({
        folio: [this.solicitudState?.folio, Validators.required],
        mercancia: [this.solicitudState?.mercancia, Validators.required],
      }),
    });
    if(this.esFormularioSoloLectura) {
      this.getProcedureDatos();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.Informaciondela.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.Informaciondela.enable();
      } else {
        // No se requiere ninguna acción en el formulario
      }
  }

  /**
   * Método que inicializa el objeto `mercancia` con datos predeterminados.
   * Estos datos se utilizan para llenar el catálogo de opciones disponibles para el usuario,
   * que incluyen "Sí" y "No" como posibles respuestas a una pregunta sobre el registro de muestras.
   *
   * @returns {void} No retorna nada, ya que solo inicializa el objeto `mercancia`.
   *
   * @example
   * component.getMercancia();
   */
  public getMercancia(): void {
    this.mercancia = [
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
    ];
  }

  /**
   * Habilita o deshabilita el campo `folio` dependiendo del valor seleccionado en `mercancia`.
   * Si se selecciona "No", se deshabilita el campo `folio`, de lo contrario se habilita.
   *
   * @returns {void} No retorna nada.
   */
  mercanciaSeleccion(): void {
    if (
      this.Informaciondela.get('datosImportadorExportador.mercancia')?.value ===
      '2'
    ) {
      this.Informaciondela.get('datosImportadorExportador.folio')?.disable();
    } else {
      this.Informaciondela.get('datosImportadorExportador.folio')?.enable();
    }
  }

  public getProcedureDatos(): void {
    this.Informaciondela.get('datosImportadorExportador.folio')?.disable();
    this.Informaciondela.get('datosImportadorExportador.mercancia')?.disable();
    // this.Informaciondela.get('datosImportadorExportador.mercancia')?.setValue(this.procedureDatos[0].registroPara.mercancia);
    // this.Informaciondela.get('datosImportadorExportador.folio')?.setValue(this.procedureDatos[0].registroPara.folio);
  }

  /**
   * Método del ciclo de vida `ngOnDestroy()` de Angular.
   *
   * Este método se ejecuta cuando el componente es destruido y realiza las siguientes acciones:
   * - Desuscribe la suscripción al observable `subscription`.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite301Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida `ngOnDestroy()`.
   * Este método se ejecuta cuando el componente es destruido y realiza las siguientes acciones:
   * - Desuscribe la suscripción al observable `subscription`.
   *
   * @memberof PagoDeDerechosComponent
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
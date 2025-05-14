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
  imports: [TituloComponent, ReactiveFormsModule, CatalogoSelectComponent],
  standalone: true,
})
export class DeLaMuestraComponent implements OnInit, OnDestroy {

  @Input() public procedureDatos:Array<any> = [];
  @Input() public procedureState: any;
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
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

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
    private tramite301Query: Tramite301Query
  ) {
    // add initialization code here
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
   * Método del ciclo de vida `ngOnInit()` de Angular.
   *
   * Este método se ejecuta una vez que el componente ha sido inicializado.
   * Realiza las siguientes acciones:
   * - Llama al método `getMercancia()` para inicializar el objeto `mercancia`.
   * - Crea el formulario reactivo `FormSolicitud` y lo inicializa con un campo obligatorio `folio`.
   */
  ngOnInit(): void {
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
    this.getMercancia();
    this.Informaciondela = this.fb.group({
      datosImportadorExportador: this.fb.group({
        folio: [this.solicitudState?.folio, Validators.required],
        mercancia: [this.solicitudState?.mercancia, Validators.required],
      }),
    });
    if(this.procedureDatos.length > 0) {
      this.getProcedureDatos();
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
    if(this.procedureState.readonly) {
      this.Informaciondela.get('datosImportadorExportador.folio')?.disable();
      this.Informaciondela.get('datosImportadorExportador.mercancia')?.disable();
    }
    this.Informaciondela.get('datosImportadorExportador.mercancia')?.setValue(this.procedureDatos[0].registroPara.mercancia);
    this.Informaciondela.get('datosImportadorExportador.folio')?.setValue(this.procedureDatos[0].registroPara.folio);
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
  }
}
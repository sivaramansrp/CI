/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Aviso,
  Importante,
  TieneConsultaio,
} from '@ng-mf/data-access-user';
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
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { BtnContinuarComponent } from 'libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { DatosPasos } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite301Query } from '../../../../core/queries/tramite301.query';

/**
 * Componente para el registro de productos relacionados con importaciones y exportaciones.
 * Presenta un formulario interactivo que permite registrar si un producto ha sido importado o exportado previamente.
 * Utiliza varios componentes reutilizables como alertas, botones y selectores.
 *
 * @export
 * @class RegistroParaLaComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-registro-para-la',
  templateUrl: './registro-para-la.component.html',
  styleUrls: ['./registro-para-la.component.scss'], // Corregido de styleUrl a styleUrls
  imports: [
    AlertComponent,
    TituloComponent,
    CatalogoSelectComponent,
    BtnContinuarComponent,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class RegistroParaLaComponent implements OnInit, OnDestroy {


  @Input() public procedureDatos:Array<any> = [];
  @Input() public procedureState!: TieneConsultaio;
  /**
   * Formulario principal del componente.
   * Este formulario contiene el campo de registro de importaciones/exportaciones.
   *
   * @type {FormGroup}
   * @memberof RegistroParaLaComponent
   */
  registroParaLaForm!: FormGroup;

  /**
   * Constantes importadas desde el archivo de enumeración que contienen textos importantes y de advertencia.
   *
   * @type {Importante}
   * @memberof RegistroParaLaComponent
   */
  public TEXTOS = Importante;

  /**
   * Constantes importadas desde el archivo de enumeración para los mensajes de advertencia.
   *
   * @type {Aviso}
   * @memberof RegistroParaLaComponent
   */
  public ADVERTENCIA = Aviso;

  /**
   * Índice del paso actual en el formulario.
   * Inicialmente, se establece en 1. Este índice es utilizado para navegar entre los pasos del formulario.
   *
   * @type {number}
   * @memberof RegistroParaLaComponent
   */
  indice: number = 1;

  /**
   * Objeto de tipo `CatalogosSelect` que representa las opciones del formulario de importaciones/exportaciones.
   * Este objeto es inicializado en el método `getRegistro()`.
   *
   * @type {CatalogosSelect}
   * @memberof RegistroParaLaComponent
   */
  public registroOptions!: Catalogo[];

  /**
   * Lista de pasos en el flujo del formulario.
   * Inicialmente está vacía, pero se llenará dependiendo de los datos de la aplicación.
   *
   * @type {ListaPasosWizard[]}
   * @memberof RegistroParaLaComponent
   */
  pasos: ListaPasosWizard[] = [];

  /**
   * Objeto que contiene los datos del flujo de pasos del formulario.
   * Este objeto es utilizado para mostrar información relevante al usuario como el número de pasos,
   * el paso actual y los textos de los botones de navegación (anterior y siguiente).
   *
   * @type {DatosPasos}
   * @memberof RegistroParaLaComponent
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length, // El número de pasos se obtiene dinámicamente de la lista `pasos`
    indice: this.indice, // Índice del paso actual en el formulario
    txtBtnAnt: 'Anterior', // Texto para el botón de retroceso
    txtBtnSig: 'Continuar', // Texto para el botón de siguiente
  };

  /**
   * Suscripción a los cambios en el formulario reactivo.
   *
   * @type {Subscription}
   * @memberof RegistroParaLaComponent
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
   * Constructor del componente `RegistroParaLaComponent`.
   *
   * Inicializa la instancia de `Tramite301Store` y `Tramite301Query` para manejar el estado de la aplicación.
   *
   * @param {Tramite301Store} tramite301Store
   */
  constructor(
    private fb: FormBuilder,
    private tramite301Store: Tramite301Store,
    private tramite301Query: Tramite301Query
  ) {}

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   * Este método se encarga de obtener los datos necesarios para inicializar el formulario de registro,
   * incluyendo las opciones para el campo de importaciones/exportaciones.
   *
   * @memberof RegistroParaLaComponent
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
    this.getRegistro(); // Llama al método para obtener los datos de registro

    this.registroParaLaForm = this.fb.group({
      registro: [{value: this.solicitudState?.registro, disabled: false}, Validators.required],
    });

    if(this.procedureDatos.length > 0 && this.procedureState.readonly) {
        this.registroParaLaForm.get('registro')?.disable();
        this.registroParaLaForm.get('registro')?.setValue(this.procedureDatos[0].registroPara.registro);
    }
  }

  /**
   * Inicializa el objeto `registro` con los datos predeterminados para el formulario.
   * Este método establece los valores iniciales para la etiqueta, las opciones de respuesta y si el campo es obligatorio.
   *
   * @memberof RegistroParaLaComponent
   */
  public getRegistro(): void {
    this.registroOptions = [
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
    ];

    // Aquí deberías cargar los pasos reales del flujo de trabajo de tu aplicación
    this.pasos = []; // Llenar la lista `pasos` con los pasos correspondientes

    // Actualiza el número de pasos en el objeto `datosPasos` después de cargar la lista de pasos
    this.datosPasos.nroPasos = this.pasos.length;
  }

  /**
   * Método que maneja la navegación entre los pasos del formulario.
   * Este método se encarga de actualizar el índice del paso actual y los textos de los botones de navegación.
   *
   * @param {string} accion - Acción a realizar (anterior o siguiente).
   * @returns {void}
   * @memberof RegistroParaLaComponent
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
   * Método que se ejecuta cuando el componente es destruido.
   * Este método se encarga de limpiar las suscripciones a eventos y notificar la destrucción del componente.
   *
   * @memberof RegistroParaLaComponent
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
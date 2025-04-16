import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { Solicitud221603State, Tramite221603Store } from '../../estados/tramite221603.store';
import { Tramite221603Query } from '../../estados/tramite221603.query';
import realizar from '@libs/shared/theme/assets/json/221603/realizar.json';


/**
 * Componente encargado de gestionar el pago de derechos dentro del trámite 221603.
 * Permite al usuario ingresar los datos correspondientes al pago de derechos, como clave, dependencia, banco,
 * llave, fecha e importe. También interactúa con el store para almacenar los datos del trámite.
 * 
 * Este componente utiliza un formulario reactivo para gestionar los datos del pago de derechos, y actualiza el store 
 * con los valores proporcionados.
 * 
 * @component
 * @example
 * <app-pago-de-derechos></app-pago-de-derechos>
 * 
 * @imports
 * - `TituloComponent`: Componente para mostrar el título en la interfaz.
 * - `FormsModule`: Módulo necesario para trabajar con formularios basados en plantillas.
 * - `ReactiveFormsModule`: Módulo necesario para trabajar con formularios reactivos en Angular.
 * - `CatalogoSelectComponent`: Componente para seleccionar valores de un catálogo.
 * 
 */
@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [
    TituloComponent,
    FormsModule,
    ReactiveFormsModule,
    CatalogoSelectComponent
  ],
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss']
})

/**
 * Componente encargado de gestionar el pago de derechos del trámite 221603.
 * Utiliza un formulario reactivo para que el usuario ingrese datos como la clave, dependencia, banco, 
 * llave, fecha e importe. Además, actualiza el estado del trámite en el store.
 * 
 * @class
 * @implements OnInit, OnDestroy
 * @example
 * <app-pago-de-derechos></app-pago-de-derechos>
 * 
 * @constructor
 * El constructor inicializa las dependencias necesarias y prepara el formulario reactivo para gestionar los 
 * datos del pago de derechos.
 * 
 * @property {FormGroup} pagoDerechosForm - Formulario reactivo que gestiona los datos relacionados con el 
 * pago de derechos, como clave, dependencia, banco, llave, fecha e importe.
 * @property {Catalogo[]} bancocatalogo - Lista de opciones de bancos obtenidas del catálogo.
 * @property {Solicitud221603State} solicitudState - Estado de la solicitud 221603 que contiene los valores actuales de la solicitud.
 * 
 * @method ngOnInit() - Método que se ejecuta cuando el componente es inicializado. Inicializa el formulario reactivo
 * y carga los datos de la solicitud.
 * @method setValoresStore() - Método para actualizar el store del trámite con los valores del formulario.
 * @method ngOnDestroy() - Método que se ejecuta cuando el componente es destruido, liberando recursos y completando
 * la notificación de destrucción.
 */
export class PagoDeDerechosComponent implements OnInit, OnDestroy {

  /**
   * Lista de opciones de banco obtenidas de un catálogo.
   */
  public bancocatalogo: Catalogo[] = realizar.banco;

  /**
   * Estado de la solicitud 221603, que contiene los valores actuales de la solicitud.
   */
  public solicitudState!: Solicitud221603State;

  /**
   * Formulario reactivo que gestiona los datos relacionados con el pago de derechos, como clave, dependencia, banco,
   * llave, fecha e importe.
   */
  pagoDerechosForm!: FormGroup;

  /**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente. Inicializa las dependencias necesarias y prepara el formulario reactivo.
   * 
   * @param fb - FormBuilder utilizado para crear el formulario reactivo.
   * @param tramite221603Store - Store que gestiona los valores persistentes del trámite 221603.
   * @param tramite221603Query - Query que se utiliza para obtener el estado actual de la solicitud 221603.
   */
  constructor(
    private fb: FormBuilder,
    private tramite221603Store: Tramite221603Store,
    private tramite221603Query: Tramite221603Query
  ) { // Constructor que inyecta las dependencias necesarias
  }

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   * 
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
  }

  /**
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   * 
   * Configura el formulario para gestionar los campos relacionados con el pago de derechos, como clave, 
   * dependencia, banco, llave, fecha e importe. También asigna valores predeterminados a algunos campos.
   */
  private inicializarFormulario(): void {
    this.tramite221603Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud221603State;
        })
      )
      .subscribe();

    this.pagoDerechosForm = this.fb.group({
      clave: [this.solicitudState.clave, Validators.required],
      dependencia: [this.solicitudState.dependencia, Validators.required],
      banco: [this.solicitudState.banco, Validators.required],
      llave: [this.solicitudState.llave, Validators.required],
      fecha: [this.solicitudState.fecha, Validators.required],
      importe: [this.solicitudState.importe, [Validators.required, Validators.min(1)]]
    });

    this.pagoDerechosForm.get('clave')?.disable();
    this.pagoDerechosForm.get('dependencia')?.disable();
    this.pagoDerechosForm.get('importe')?.disable();
    this.pagoDerechosForm.get('clave')?.setValue(realizar.formData.clave);
    this.pagoDerechosForm.get('dependencia')?.setValue(realizar.formData.dependencia);
    this.pagoDerechosForm.get('importe')?.setValue(realizar.formData.importe);
  }

  /**
   * Método que actualiza el store con los valores del formulario.
   * 
   * @param form - Formulario reactivo con los datos actuales.
   * @param campo - El campo que debe actualizarse en el store.
   * @param metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite221603Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite221603Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * 
   * Libera los recursos y completa la notificación de destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}


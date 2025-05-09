import { Catalogo,CatalogoSelectComponent,InputFechaComponent,TituloComponent } from '@libs/shared/data-access-user/src';
import { Component,OnDestroy,OnInit} from '@angular/core';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { Solicitud221601State, Tramite221601Store } from '../../../../estados/tramites/tramite221601.store';
import { Subject,map,takeUntil } from 'rxjs';
import { INPUT_FECHA_CONFIG } from '@libs/shared/data-access-user/src/core/enums/221601/fecha.enum';
import { Tramite221601Query } from '../../../../estados/queries/tramite221601.query';
import realizar from '@libs/shared/theme/assets/json/221601/zoosanitario.json';

/**
 * Componente encargado de gestionar el pago de derechos dentro del trámite 221601.
 * Permite al usuario ingresar los datos correspondientes al pago de derechos, como clave, dependencia, banco,
 * llave, fecha e importe. También interactúa con el store para almacenar los datos del trámite.
 * 
 * Este componente utiliza un formulario reactivo para gestionar los datos del pago de derechos, y actualiza el store 
 * con los valores proporcionados.
 * 
 * @component
 * @example
 * <app-pago-de-derechos221601></app-pago-de-derechos221601>
 * 
 * @imports
 * - `TituloComponent`: Componente para mostrar el título en la interfaz.
 * - `FormsModule`: Módulo necesario para trabajar con formularios basados en plantillas.
 * - `ReactiveFormsModule`: Módulo necesario para trabajar con formularios reactivos en Angular.
 * - `CatalogoSelectComponent`: Componente para seleccionar valores de un catálogo.
 * 
 */
@Component({
  selector: 'app-pago-de-derechos221601',
  standalone: true,
  imports: [
    TituloComponent,
    FormsModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,InputFechaComponent
  ],
  templateUrl: './pago-de-derechos221601.component.html',
  styleUrls: ['./pago-de-derechos221601.component.scss']
})

/**
 * Componente encargado de gestionar el pago de derechos del trámite 221601.
 * Utiliza un formulario reactivo para que el usuario ingrese datos como la clave, dependencia, banco, 
 * llave, fecha e importe. Además, actualiza el estado del trámite en el store.
 * 
 * @class
 * @implements OnInit, OnDestroy
 * @example
 * <app-pago-de-derechos221601></app-pago-de-derechos221601>
 * 
 * @constructor
 * El constructor inicializa las dependencias necesarias y prepara el formulario reactivo para gestionar los 
 * datos del pago de derechos.
 * 
 * @property {FormGroup} pagoDerechosForm - Formulario reactivo que gestiona los datos relacionados con el 
 * pago de derechos, como clave, dependencia, banco, llave, fecha e importe.
 * @property {Catalogo[]} bancocatalogo - Lista de opciones de bancos obtenidas del catálogo.
 * @property {Solicitud221601State} solicitudState - Estado de la solicitud 221601 que contiene los valores actuales de la solicitud.
 * 
 * @method ngOnInit() - Método que se ejecuta cuando el componente es inicializado. Inicializa el formulario reactivo
 * y carga los datos de la solicitud.
 * @method setValoresStore() - Método para actualizar el store del trámite con los valores del formulario.
 * @method ngOnDestroy() - Método que se ejecuta cuando el componente es destruido, liberando recursos y completando
 * la notificación de destrucción.
 */
export class PagoDeDerechos221601Component implements OnInit, OnDestroy {

  /**
   * Lista de opciones de banco obtenidas de un catálogo.
   */
  public bancocatalogo: Catalogo[] =realizar.banco;

  /**
   * Estado de la solicitud 221601, que contiene los valores actuales de la solicitud.
   */
  public solicitudState!: Solicitud221601State;

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
   * @param tramite221601Store - Store que gestiona los valores persistentes del trámite 221601.
   * @param tramite221601Query - Query que se utiliza para obtener el estado actual de la solicitud 221601.
   */
  constructor(
    private fb: FormBuilder,
    private tramite221601Store: Tramite221601Store,
    private tramite221601Query: Tramite221601Query
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
    this.tramite221601Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud221601State;
        })
      )
      .subscribe();

    this.pagoDerechosForm = this.fb.group({
      claves: [this.solicitudState.claves, Validators.required],
      dependencia: [this.solicitudState.dependencia, Validators.required],
      banco: [this.solicitudState.banco, Validators.required],
      llave: [this.solicitudState.llave, Validators.required],
      fecha: [this.solicitudState.fecha, Validators.required],
      importe: [this.solicitudState.importe, [Validators.required, Validators.min(1)]]
    });
    
    this.pagoDerechosForm.get('claves')?.disable();
    this.pagoDerechosForm.get('dependencia')?.disable();
    this.pagoDerechosForm.get('importe')?.disable();
    this.pagoDerechosForm.get('claves')?.setValue(realizar.formData.claves);
    this.pagoDerechosForm.get('dependencia')?.setValue(realizar.formData.dependencia);
    this.pagoDerechosForm.get('importe')?.setValue(realizar.formData.importe);
    this.updateStoreWithFormData();
  }
  /**
 * Actualiza el estado del store `tramite221601Store` con los datos del formulario `MedioForm`.
 *
 * Extrae los valores de los campos `transporte` y `empresa` del formulario y los fusiona con el
 * estado actual `solicitudState`, creando un nuevo objeto que se usa para actualizar el store.
 *
 * @private
 * @returns void
 */
  private updateStoreWithFormData(): void {
    const UPDATE_PAGO_FORM: Solicitud221601State = {
      ...this.solicitudState,
      claves: this.pagoDerechosForm.get('claves')?.value,
      dependencia: this.pagoDerechosForm.get('dependencia')?.value,
      importe: this.pagoDerechosForm.get('importe')?.value
    };
  
   // Actualiza el store con el estado modificado
    this.tramite221601Store.update(UPDATE_PAGO_FORM);
  }
  /**
   * Método que actualiza el store con los valores del formulario.
   * 
   * @param form - Formulario reactivo con los datos actuales.
   * @param campo - El campo que debe actualizarse en el store.
   * @param metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite221601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite221601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
   /**
   * Maneja los cambios en el campo "Fecha de Pago".
   * Actualiza el estado del almacén con la fecha de pago proporcionada.  
   */
   cambioFechaFinal(nuevo_valor: string): void {
    this.pagoDerechosForm.patchValue({
      fecha: nuevo_valor,
    });
    this.tramite221601Store.setFecha(nuevo_valor);
  }
    /**
   * Constante para configurar el input de fecha.
   * Define las propiedades del campo de entrada de fecha.
   */
    INPUT_FECHA_CONFIG = INPUT_FECHA_CONFIG;
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


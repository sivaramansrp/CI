import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Solicitud230201State, Tramite230201Store } from '../../estados/tramite230201.store';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DESTINATARIO_BANCO } from '../../enum/destinatario-tabla.enum';
import { FormGroup } from '@angular/forms';
import { MediodetransporteService } from '../../services/medio-de-transporte.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Tramite230201Query } from '../../estados/tramite230201.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-pago-de-derecho',
  templateUrl: './pago-de-derecho.component.html',
  styleUrl: './pago-de-derecho.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent
  ],
})
export class PagoDeDerechoComponent implements OnInit, OnDestroy {

  /**
   * @property {Solicitud230201State} derechoState
   * @description Estado actual del trámite 230201, que contiene información relevante
   * para la sección de pago de derechos.
   */
  public derechoState!: Solicitud230201State;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Sujeto utilizado para notificar la destrucción del componente.
   * Se emplea para limpiar suscripciones y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {FormGroup} FormSolicitud
   * @description Grupo de formularios principal que contiene los controles de formulario
   * relacionados con el pago de derechos. Este formulario incluye validaciones y se utiliza
   * para capturar y gestionar los datos del usuario en esta sección.
   */
  FormSolicitud!: FormGroup;

  /**
   * @property {string} respuesta
   * @description Almacena la respuesta obtenida de alguna operación o servicio.
   * Este campo puede ser utilizado para mostrar mensajes o resultados en la interfaz de usuario.
   */
  respuesta: string = '';

  /**
   * @property {Catalogo} bancoSeleccionado
   * @description Representa el banco seleccionado por el usuario en el formulario de pago de derechos.
   * Este campo se utiliza para almacenar y gestionar la información del banco seleccionado.
   */
  bancoSeleccionado!: Catalogo;

  /**
   * @property {CatalogosSelect} bancoCatalogo - Representa la configuración del catálogo de bancos.
   * 
   * @description
   * Este objeto define las propiedades necesarias para configurar un catálogo de selección
   * relacionado con los bancos. Incluye el nombre del campo, si es obligatorio, la primera opción
   * que se muestra al usuario y una lista de catálogos disponibles.
   * 
   * @property {string} labelNombre - Etiqueta que describe el nombre del campo (en este caso, "Banco").
   * @property {boolean} required - Indica si este campo es obligatorio.
   * @property {string} primerOpcion - Texto que se muestra como la primera opción en el selector.
   * @property {Array<any>} catalogos - Lista de opciones disponibles en el catálogo.
   */
  public bancoCatalogo: CatalogosSelect = DESTINATARIO_BANCO;

  /**
   * Constructor de la clase PagoDeDerechoComponent.
   * 
   * @param fb - Servicio `FormBuilder` para la creación y gestión de formularios reactivos.
   * @param captuaservice - Servicio `CapturaSolicitudeService` para manejar la captura de solicitudes.
   * @param solicitud230201Store - Almacén `Tramite230201Store` para gestionar el estado de la solicitud 230201.
   * @param solicitud230201Query - Consulta `Solicitud230201Query` para obtener datos del estado de la solicitud 230201.
   * @param validacionesService - Servicio `ValidacionesFormularioService` para realizar validaciones personalizadas en formularios.
   * @param mediodetransporteService - Servicio `MediodetransporteService` para gestionar datos relacionados con medios de transporte.
   */
  constructor(
    private fb: FormBuilder,
    private solicitud230201Store: Tramite230201Store,
    private solicitud230201Query: Tramite230201Query,
    private validacionesService: ValidacionesFormularioService,
    private mediodetransporteService: MediodetransporteService
  ) {
    this.fetchBancoData();
  }

  /**
   * @method fetchBancoData
   * @description Obtiene los datos del catálogo de bancos desde el servicio de medio de transporte
   * y los asigna al catálogo de bancos en el componente.
   * 
   * @returns {void}
   * 
   * @example
   * this.fetchBancoData();
   * 
   * @remarks
   * Este método utiliza el servicio `mediodetransporteService` para obtener los datos
   * y se asegura de limpiar las suscripciones utilizando el operador `takeUntil` con `destroyNotifier$`.
   */
  fetchBancoData(): void {
    this.mediodetransporteService
      .getMedioDeTransporte()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((request): void => {
        this.bancoCatalogo.catalogos = request?.data ;
      });
  }

  /**
   * Hook del ciclo de vida de Angular que se llama después de que la vista del componente se ha inicializado completamente.
   *
   * Este método realiza las siguientes acciones:
   * - Llama al método `getMercancia` para inicializar el objeto `mercancia`.
   * - Inicializa el grupo de formularios `FormSolicitud` con controles de formulario anidados y validadores.
   */
  ngOnInit(): void {
    this.solicitud230201Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.derechoState = seccionState;
        })
      )
      .subscribe();

    this.FormSolicitud = this.fb.group({
      pagodeDerechos: this.fb.group({
        claveDeReferencia: [{ value: this.derechoState?.claveDeReferencia, disabled: true }, [Validators.required, Validators.maxLength(50)]],
        cadenaPagoDependencia: [{ value: this.derechoState?.cadenaPagoDependencia, disabled: true }, [Validators.required, Validators.maxLength(50)]],
        banco: [this.derechoState?.banco, Validators.required],
        llaveDePago: [this.derechoState?.llaveDePago, [Validators.required, Validators.maxLength(10)]],
        fecPago: [this.derechoState?.fecPago, Validators.required],
        impPago: [{ value: this.derechoState?.impPago, disabled: true }, [Validators.required, Validators.maxLength(16)]]
      }),
    });

  }

  /**
   * Este método se utiliza para validar la forma del transporte. - 230201
   * @param form: Forma del transporte
   * @param field: campo del formulario
   * @returns Validaciones del formulario
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Establece los valores en el store de tramite5701.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite230201Store): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud230201Store[metodoNombre] as (value: string | number | boolean) => void)(VALOR);
  }

  /**
  * Obtiene el grupo de formulario 'pagodeDerechos' del formulario principal 'FormSolicitud'.
  *
  * @returns {FormGroup} El grupo de formulario 'pagodeDerechos'.
  */
  get pagodeDerechos(): FormGroup {
    return this.FormSolicitud.get('pagodeDerechos') as FormGroup;
  }

  /**
   * @override
   * @method
   * @name ngOnDestroy
   * @description Este método se ejecuta automáticamente cuando el componente se destruye. 
   * Se utiliza para limpiar recursos y evitar fugas de memoria.
   * 
   * @example
   * // Ejemplo de uso:
   * ngOnDestroy(): void {
   *   this.destroyNotifier$.next();
   *   this.destroyNotifier$.complete();
   * }
   * 
   * @remarks
   * Este método envía notificaciones a los observables `destroyNotifier$` 
   * para indicar que el componente está siendo destruido, y luego completa ambos observables.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}

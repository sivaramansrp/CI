import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Input, OnInit,Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AlertComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { ComplementarPlantaComponent } from '../complementar-planta/complementar-planta.component';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { EXPRESAS_EXTRANJERAS, EmpresasEXtranjeras, ExpresasConfiguration, FederatariosEncabezado } from '../../models/federatarios-y-plantas.model';
import { FederatariosYPlantasConfiguration } from '../../models/federatarios-y-plantas.model';
import { PlantasDisponibles } from '../../models/federatarios-y-plantas.model';
import { PlantasImmex } from '../../models/federatarios-y-plantas.model';
import { TEXTO_DE_ALERTA } from '../../models/federatarios-y-plantas.model';

import { DATOS_FEDERATARIOS, EXPRESAS, FECHA_DE_PAGO } from '../../constantes/federatarios-y-plantas.enum';
import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';
import { CapacidadInstaladaComponent } from '../capacidad-instalada/capacidad-instalada.component';
import { EmpleadosComponent } from '../empleados/empleados.component';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { MontosDeInversionComponent } from '../montos-de-inversion/montos-de-inversion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';


import { FederatoriosState, FederatoriosStore } from '../../../estados/tramites/federatarios.store';
import { Subject,map,takeUntil } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FederatoriosQuery } from '../../../estados/queries/federatarios.query';

/**
 * Componente para los federatarios y plantas
 * @export FederatariosYPlantasComponent
 */
@Component({
  selector: 'app-federatarios-y-planta',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    AlertComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    FormsModule,
    FormasDinamicasComponent,
    ComplementarPlantaComponent,
    MontosDeInversionComponent,
    EmpleadosComponent,
    CapacidadInstaladaComponent,
    AnexarDocumentosComponent
  ],
  templateUrl: './federatarios-y-plantas.component.html',
  styleUrl: './federatarios-y-plantas.component.scss',
})
export class FederatariosYPlantasComponent implements OnInit {


  /**
   * Contiene los datos de los federatarios utilizados en el formulario de representante legal.
   * Esta propiedad se inicializa con la constante `DATOS_FEDERATARIOS`.
   */
  public representanteLegalFormData = DATOS_FEDERATARIOS;

  /**
   * Datos del formulario relacionados con las expresas.
   * Esta propiedad utiliza la constante `EXPRESAS` para inicializar
   * los datos necesarios en el componente.
   */
  public expresasFormData = EXPRESAS;

  /**
   * Referencia al elemento del DOM asociado al modal "complementarPlanta".
   * Utilizado para interactuar directamente con el elemento HTML desde el componente.
   */
  @ViewChild('complementarPlanta') modalElement!: ElementRef;

  /**
   * Referencia al elemento DOM identificado con el nombre 'montos'.
   * Utiliza el decorador `@ViewChild` para acceder al elemento en la plantilla
   * asociado a esta propiedad. Este elemento puede ser utilizado para manipular
   * directamente el DOM o acceder a sus propiedades y métodos.
   */
  @ViewChild('montos') montos!: ElementRef;

  /**
   * Referencia al elemento del DOM asociado con 'empleadosAcciones'.
   * Este elemento se utiliza para interactuar directamente con el DOM
   * dentro del componente, permitiendo realizar operaciones específicas
   * sobre el elemento HTML correspondiente.
   */
  @ViewChild('empleadosAcciones') empleadosAcciones!: ElementRef;

  /**
   * Referencia al elemento del DOM identificado como 'capacidadInstalada'.
   * Utiliza el decorador `@ViewChild` para acceder al elemento directamente
   * desde el componente después de que la vista haya sido inicializada.
   * 
   * @type {ElementRef}
   */
  @ViewChild('capacidadInstalada') capacidadInstalada!: ElementRef;

  /**
   * Referencia al elemento del DOM identificado como 'cargaPorPrchivo'.
   * Este elemento se utiliza para interactuar directamente con el DOM,
   * permitiendo realizar operaciones relacionadas con la carga de archivos.
   */
  @ViewChild('cargaPorPrchivo') cargaPorPrchivo!: ElementRef;


  /**
   * Configuración para la tabla de federatarios
   * @property {FederatariosYPlantasConfiguration<FederatariosEncabezado>} federatariosConfig
   */
  @Input()
  federatariosConfig!: FederatariosYPlantasConfiguration<FederatariosEncabezado>;

  /**
   * Configuración para la gestión de empresas extranjeras en el componente.
   * 
   * @property {TablaSeleccion} TablaSeleccion - Define el tipo de selección que se utilizará en la tabla (por ejemplo, CHECKBOX).
   * @property {typeof EXPRESAS_EXTRANJERAS} TablaEncabezado - Encabezado de la tabla que contiene la configuración de las columnas para las empresas extranjeras.
   */
  ExpresasConfig: ExpresasConfiguration<EmpresasEXtranjeras> = {
    TablaSeleccion: TablaSeleccion.CHECKBOX,
    TablaEncabezado: EXPRESAS_EXTRANJERAS
    ,
  };



  /**
   * Configuración para la tabla de plantas disponibles
   * @property {FederatariosYPlantasConfiguration<PlantasDisponibles>} plantasDisponiblesConfig
   */
  @Input()
  plantasDisponiblesConfig!: FederatariosYPlantasConfiguration<PlantasDisponibles>;

  /**
   * Configuración para la tabla de plantas IMMEX
   * @property {FederatariosYPlantasConfiguration<PlantasImmex>} plantasImmexConfig
   */
  @Input() plantasImmexConfig!: FederatariosYPlantasConfiguration<PlantasImmex>;

  /**
   * Datos de federatarios para mostrar en la tabla
   * @property {FederatariosEncabezado[]} federatariosDatos
   */
  @Input() federatariosDatos!: FederatariosEncabezado[];

  /**
   * Datos de empresas extranjeras para mostrar en la tabla
   * @property {EmpresasEXtranjeras[]} expresasDatos
   */
  expresasDatos: EmpresasEXtranjeras[] = [];

  /**
   * Datos de plantas disponibles para mostrar en la tabla
   * @property {PlantasDisponibles[]} plantasDisponiblesDatos
   */
  @Input() plantasDisponiblesDatos!: PlantasDisponibles[];

  /**
   * Datos de plantas IMMEX para mostrar en la tabla
   * @property {PlantasImmex[]} plantasImmexDatos
   */
  @Input() plantasImmexDatos!: PlantasImmex[];

 
  /**
   * Indica si la sección de "Expresas" debe ser visible o no.
   * @type {boolean}
   * @default false
   */
  @Input() esExpresasVisible: boolean = false;


  /**
   * Configuración del input de fecha de inicio
   * @property {InputFecha} fechaInicioInput
   */
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  /**
   * Opciones de estados disponibles
   * @property {[]} estadoOptions
   */
    @Input() estadoOptions!:Catalogo[];

  /**
   * Texto para mostrar en la alerta
   * @property {string} textodAlerta
   */

  public textodAlerta = TEXTO_DE_ALERTA;
/**
   * Estado de la solicitud 250101, que contiene los valores actuales de la solicitud.
   */
  public solicitudState!: FederatoriosState;
 
  /**
   * Formulario para los datos de federatarios
   * @property {FormGroup} federatariosFormGroup
   */
  public federatariosFormGroup!: FormGroup;
/**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destroyNotifier$: Subject<void> = new Subject();
 
  /** Indica si el formulario debe mostrarse en modo solo lectura.  
 *  Controla la habilitación o deshabilitación de los campos. */
 esFormularioSoloLectura: boolean = false;

  public expresasFormGroup!: FormGroup;
plantasForm!: FormGroup;
  /**
   * Emisor de eventos para los datos del formulario de federatarios.
   * @type {EventEmitter<FederatariosEncabezado>}
   */
  @Output() datosFormaFedratario: EventEmitter<FederatariosEncabezado> =
    new EventEmitter<FederatariosEncabezado>(true);

  /**
   * Constructor de la clase FederatariosYPlantasComponent.
   * @param {Router} router - Servicio de Angular para la navegación.
   * @param {ActivatedRoute} activatedRoute - Servicio de Angular para obtener información sobre la ruta actual.
   */
  constructor(private router: Router, private activatedRoute: ActivatedRoute ,private federatoriosQuery:FederatoriosQuery,private federatoriosStore:FederatoriosStore,private consultaioQuery: ConsultaioQuery,)
   {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
       
          this.inicializarCertificadoFormulario();
        })
      )
      .subscribe()
  }
/**
   * Método que se ejecuta cuando el componente es inicializado.
   * 
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   */
  ngOnInit(): void {
   this.inicializarCertificadoFormulario();
  }
 /**
   * Método para inicializar el formulario reactivo con los datos de la solicitud.
   * 
   * Este método configura los campos del formulario con los valores actuales del estado de la solicitud
   * y aplica las validaciones necesarias. También deshabilita ciertos campos y establece valores predeterminados.
   */
  inicializarCertificadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
     this.inicializarFormulario()
    }  
  }
    /**
   * @comdoc
   * Guarda los datos del formulario de combinación requerida.
   * 
   * Inicializa el formulario y ajusta su estado de habilitación según si es de solo lectura.
   * - Si el formulario es de solo lectura, lo deshabilita.
   * - Si no es de solo lectura, lo habilita.
   * - Si no aplica ninguna de las condiciones anteriores, no realiza ninguna acción adicional.
   */
  guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
       this.federatariosFormGroup.disable();
       this.expresasFormGroup.disable();
       this.plantasForm.disable();
      } else {
      this.federatariosFormGroup.enable();
      this.expresasFormGroup.enable();
       this.plantasForm.enable();
      }
  }
   /** Inicializa los datos del formulario suscribiéndose al estado del trámite.  
 *  Asigna el estado actual al modelo local del componente. */
   inicializarFormulario(): void {
      this.federatoriosQuery.selectSolicitud$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.solicitudState = seccionState as FederatoriosState;
            })
          )
          .subscribe();
    this.initFederatariosFormGroup();
    this.initExpresasFormGroup();
    
   }
  /**
   * Inicializa el formulario de federatarios con sus campos y validaciones
   * @method initFederatariosFormGroup
   * @returns {void}
   */
  initFederatariosFormGroup(): void {
    this.federatariosFormGroup = new FormGroup({
      nombre: new FormControl( this.solicitudState['nombre'], Validators.required),
      fechaDelActa: new FormControl(this.solicitudState['fechaDelActa']),
      primerApellido: new FormControl(this.solicitudState['primerApellido']),
      segundoApellido: new FormControl(this.solicitudState['segundoApellido']),
      numeroDeActa: new FormControl(this.solicitudState['numeroDeActa']),
      numeroDeNotaria: new FormControl(this.solicitudState['numeroDeNotaria']),
      estado: new FormControl(this.solicitudState['estado']),
      estadoOptions: new FormControl(this.solicitudState['estadoOptions']),
    });
  }

  /**
   * Inicializa el formulario reactivo `expresasFormGroup` con los controles necesarios
   * para capturar información de una empresa. Cada control incluye validaciones requeridas.
   * 
   * Controles del formulario:
   * - `taxId`: Identificación fiscal de la empresa (obligatorio).
   * - `nombreDelEmpresa`: Nombre de la empresa (obligatorio).
   * - `pais`: País de la empresa (obligatorio).
   * - `direccion`: Dirección de la empresa (obligatorio).
   */
  initExpresasFormGroup(): void {
    this.expresasFormGroup = new FormGroup({
      taxId: new FormControl(this.solicitudState['taxId'], Validators.required),
      nombreDelEmpresa: new FormControl(this.solicitudState['nombreDelEmpresa'], Validators.required),
      pais: new FormControl(this.solicitudState['pais'], Validators.required),
      direccion: new FormControl(this.solicitudState['direccion'], Validators.required),
    });
     this.plantasForm = new FormGroup({
    estadoDos: new FormControl(this.solicitudState['estadoDos'], Validators.required),
    representacionFederal: new FormControl(this.solicitudState['representacionFederal'], Validators.required),
    actividadProductiva: new FormControl(this.solicitudState['actividadProductiva'], Validators.required),
  });
  }
  /**
   * Navega a la ruta de acciones
   * @param accionesPath
   */
  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }
  /**
   * Método que actualiza el store con los valores del formulario.
   * 
   * @param form - Formulario reactivo con los datos actuales.
   * @param campo - El campo que debe actualizarse en el store.
   * @param metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof FederatoriosStore): void {
    const VALOR = form.get(campo)?.value;
    (this.federatoriosStore[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  /**
   * Agrega los datos del formulario de federatarios y los emite.
   * @returns {void}
   */
  aggregarDatos(): void {
    this.datosFormaFedratario.emit(this.federatariosFormGroup.value);
  }

  /**
   * Abre un diálogo modal para complementar información de la planta.
   * 
   * Este método verifica si el elemento modal (`modalElement`) está definido
   * y, en caso afirmativo, crea una instancia de la clase `Modal` utilizando
   * el elemento nativo asociado. Luego, muestra el modal llamando al método `show`.
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  abrirDialogoComplementarPlanta(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Abre un cuadro de diálogo modal para mostrar los montos asociados.
   * 
   * @remarks
   * Este método verifica si la propiedad `montos` está definida. 
   * Si es así, crea una instancia de `Modal` utilizando el elemento nativo 
   * referenciado por `montos` y muestra el cuadro de diálogo.
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  abrirDialogoMontos(): void {
    if (this.montos) {
      const MODAL_INSTANCE = new Modal(this.montos.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Abre un cuadro de diálogo modal para realizar acciones relacionadas con empleados.
   * 
   * Este método verifica si el elemento `empleadosAcciones` está definido y, en caso afirmativo,
   * crea una instancia de un modal utilizando el elemento nativo asociado. Luego, muestra el modal.
   * 
   * @returns {void} No retorna ningún valor.
   */
  abrirDialogoempleadosAcciones(): void {
    if (this.empleadosAcciones) {
      const MODAL_INSTANCE = new Modal(this.empleadosAcciones.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Abre un cuadro de diálogo modal para mostrar la capacidad instalada.
   * 
   * Este método verifica si el elemento `capacidadInstalada` está definido.
   * Si está disponible, crea una instancia de un modal utilizando el elemento
   * nativo asociado y lo muestra en pantalla.
   * 
   * @remarks
   * Asegúrese de que `capacidadInstalada` esté correctamente inicializado antes
   * de llamar a este método para evitar errores.
   */
  abrirDialogocapacidadInstalada(): void {
    if (this.capacidadInstalada) {
      const MODAL_INSTANCE = new Modal(this.capacidadInstalada.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Abre un cuadro de diálogo modal utilizando un archivo de carga.
   * 
   * Este método verifica si la referencia `cargaPorPrchivo` está definida
   * y, en caso afirmativo, crea una instancia de un modal utilizando el 
   * elemento nativo asociado. Luego, muestra el modal.
   * 
   * @returns {void} No retorna ningún valor.
   */
  abrirDialogocargaPorPrchivo(): void {
    if (this.cargaPorPrchivo) {
      const MODAL_INSTANCE = new Modal(this.cargaPorPrchivo.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Agrega los datos del formulario actual al arreglo `expresasDatos`.
   * 
   * Este método toma los valores del formulario `expresasFormGroup` y los 
   * añade al arreglo `expresasDatos`. Es útil para acumular información 
   * ingresada por el usuario en el formulario.
   */
  aggregarExpresasDatos(): void {
    this.expresasDatos.push(this.expresasFormGroup.value);
  }
    /**
  * compo doc
  * @method establecerCambioDeValor
  * @description
  * Este método se utiliza para manejar los cambios en los valores de un formulario dinámico.
  * Recibe un evento que contiene el nombre del campo y su nuevo valor, y actualiza el estado
  * dinámico del formulario en el store correspondiente.
  * 
  * @param event - Un objeto que contiene el campo que ha cambiado y su nuevo valor.
  * El objeto tiene la estructura: `{ campo: string; valor: any }`.
  * 
  * @example
  * establecerCambioDeValor({ campo: 'nombre', valor: 'Juan' });
  * // Actualiza el campo 'nombre' con el valor 'Juan' en el store dinámico.
  */
  establecerCambioDeValor(event: { campo: string; valor: object | string }): void {
    if (event) {
      this.federatoriosStore.setDynamicFieldValue(event.campo, event.valor);
      
    }
  }

}

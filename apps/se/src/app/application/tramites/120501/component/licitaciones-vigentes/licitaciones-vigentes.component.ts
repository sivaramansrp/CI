import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { FormGroup } from '@angular/forms';

import { Adquiriente, AlertComponent, Complementaria, ConsultaioQuery } from '@ng-mf/data-access-user';
import { Complementaria1, DetallesLicitacion } from '@ng-mf/data-access-user';
import { CONFIGURACION_ACCIONISTAS_TABLA } from '@ng-mf/data-access-user';
import { CONFIGURACION_ACCIONISTAS_TABLA1 } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TableData } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';


import { TituloComponent } from '@ng-mf/data-access-user';

import { LicitacionesDisponiblesService } from '../../services/licitaciones-disponibles.service';

import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

import { Subject } from 'rxjs';


import { TablaSeleccion } from '@ng-mf/data-access-user'

import { Solicitud120501State, Tramite120501Store } from '../../estados/tramites/tramite120501.store';

import { Tramite120501Query } from '../../estados/queries/tramite120501.query';


/**
 *  AccionBoton
 *  Interfaz que describe la estructura de un objeto de acción de botón.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Componente para mostrar las licitaciones vigentes.
 *
 * Este componente maneja la visualización y la lógica de las licitaciones vigentes,
 * incluyendo la interacción con un formulario, tablas de datos y un asistente (wizard).
 */
@Component({
  selector: 'app-licitaciones-vigentes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent,CatalogoSelectComponent,AlertComponent,TablaDinamicaComponent],
  templateUrl: './licitaciones-vigentes.component.html',
  styleUrls: ['./licitaciones-vigentes.component.scss'],
})
export class LicitacionesVigentesComponent implements OnInit, OnDestroy {
  /**
   * Datos del encabezado de la tabla.
   */
  tableHeaderData: string[] = [];
  /**
   * Datos del cuerpo de la tabla.
   */
  tableBodyData: { tbodyData: string[] }[] = [];
  /**
   * Indica si la barra de desplazamiento está habilitada.
   */
  enableScrollbar: boolean = false;
  /**
   * Lista de pasos para el asistente (wizard).
   */
  pasos: ListaPasosWizard[] = PASOS;
  /**
   * Índice actual del paso en el asistente.
   */
  indice: number = 1;
  /**
   * Opciones para la tabla.
   */
  tableOptions = {
    checkbox : false
  };
  /**
   * Texto de mensaje.
   */
  texto: string = 'La solicitud ha quedado registrada con el número temporal 202758644. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.';
  /**
   * Estado de la selección de radio en la tabla.
   */
  tableRadio = TablaSeleccion.UNDEFINED;
  /**
   * Fila seleccionada en la tabla.
   */
  selectedRow = 1;
  /**
   * Configuración para la tabla de accionistas.
   */
  configTableArray = CONFIGURACION_ACCIONISTAS_TABLA;

  /**
   * Configuración para la tabla de accionistas.
   */
  configTableArray1 = CONFIGURACION_ACCIONISTAS_TABLA1;

  /**
   * Datos de ejemplo para la tabla.
   */
  datos:Complementaria[] = [];
  
   /**
   * Datos de ejemplo para la tabla.
   */
  datos1:Complementaria1[] = []

  /**
   * Datos de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  /**
   * Formulario para el recuento total de filas.
   */
  formForTotalCount!: FormGroup;
  /**
   * Formulario principal.
   */
  formulario!: FormGroup;
  /**
   * Formulario para el detalle de la licitación.
   */
  detalledelaLicitacionForm!: FormGroup;
  /**
   * Formulario para el adquiriente.
   */
  adquiriente!:FormGroup;
  /**
   * Catálogo de entidades federativas.
   */
  entidadFederativaOptions: Catalogo[] = [];
  /**
   * Catálogo de representaciones federales.
   */
  representacionFederalOptions: Catalogo[] = [];
  /**
   * Datos de la tabla.
   */
  public tableData!: TableData;

    /**
     * Lista de entidades federativas.
     *  LicitacionesVigentesComponent
     * 
     */
    entidadFederativa: Catalogo[] = [];

    /**
     * Lista de representaciones federales.
     * LicitacionesVigentesComponent
     * 
     */
    representacionFederal: Catalogo[] = [];
  
  /**
   * Subject para la destrucción del componente.
   */
  private destroyed$ = new Subject<void>();
  /**
   * Referencia al componente del asistente (wizard).
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Indica si se muestra la representación federal.
   */
  showRepresentacionFederal: boolean = false;

   /**
   * Indica si se muestra la selección de participante.
   */
  showSeleccionarParticipante: boolean = false;
  
  /**
 * Indica si el formulario está en modo solo lectura.
 * Cuando se establece en `true`, todos los controles del formulario y elementos interactivos
 * se deshabilitan, impidiendo que el usuario realice cambios. Esta propiedad normalmente se
 * configura según el estado de la aplicación, por ejemplo, al visualizar una solicitud enviada
 * o cuando el usuario no tiene permisos de edición.
 */
  esFormularioSoloLectura: boolean = false;

  /**
 * Estado actual de la sección del trámite 120501.
 * Esta propiedad almacena los datos del estado de la sección, obtenidos generalmente
 * desde el store o desde una consulta al backend. Se utiliza para inicializar y actualizar
 * los formularios del componente con los valores correspondientes a la solicitud en curso.
 */
   private seccionState!: Solicitud120501State;
  /**
   * Constructor del componente.
   * Servicio para obtener datos de licitaciones disponibles.
   */
  constructor(private service:LicitacionesDisponiblesService,private fb: FormBuilder,
    private tramite120501Store: Tramite120501Store, 
    private tramite120501Query: Tramite120501Query,
    private consultaioQuery: ConsultaioQuery,) {
     
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
       
  }
  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    
    this.inicializarEstadoFormulario();
    this.getEntidadFederativa();
    this.getRepresentacionFederal();
    this.getDetallesDelalicitacion();
    this.getAdquiriente();
    this.obtenerDatosDeTabla();

  }
  /**
 * Inicializa los formularios principales del componente con los valores actuales del estado.
 */
  inicializarFormulario(): void {
    this.obtenerEstadoSolicitud();
    this.formulario = this.fb.group({
      entidadFederativa: [this.seccionState?.entidadFederativa, Validators.required],
      representacionFederal: [this.seccionState?.representacionFederal, Validators.required],
    });
    this.detalledelaLicitacionForm = this.fb.group({
      numeraDelicitacion: [{value:this.seccionState?.numeraDelicitacion,disabled: true}, Validators.required ],
      fechaDelEventoDelicitacion: [{value:this.seccionState?.fechaDelEventoDelicitacion,disabled: true}, Validators.required],
      descripcionDelProducto:[{value:this.seccionState?.descripcionDelProducto, disabled: true}, Validators.required],
      unidadTarifaria:[{value:this.seccionState?.unidadTarifaria, disabled: true}, Validators.required],
      regimenAduanero: [{value: this.seccionState?.regimenAduanero, disabled: true}, Validators.required],
      fraccionArancelaria: [{value:this.seccionState?.fraccionArancelaria, disabled: true}, Validators.required],
      fechaDeiniciodeVigenciadelCupo: [{value:this.seccionState?.fechaDeiniciodeVigenciadelCupo, disabled: true}, Validators.required],
      fechaDefindeVigenciadelCupo:[{value:this.seccionState?.fechaDefindeVigenciadelCupo, disabled: true}, Validators.required],
      obserVaciones: [{value:this.seccionState?.obserVaciones, disabled: true}, Validators.required],
      bloqueComercial: [{value:this.seccionState?.bloqueComercial, disabled: true}, Validators.required],
      paises: [{value:this.seccionState?.paises, disabled: true}, Validators.required],
      montoadJudicado: [{value:this.seccionState?.montoadJudicado, disabled: true}, Validators.required],
      montoDisponible: [{value:this.seccionState?.montoDisponible, disabled: true}, Validators.required],
      montoMaximo: [{value:this.seccionState?.montoMaximo, disabled: true}, Validators.required],
    })
    this.adquiriente = this.fb.group({
      rfc: [{value:this.seccionState?.rfc,disabled: true}, Validators.required],
      adquirienteMontoDisponible: [{value:this.seccionState?.adquirienteMontoDisponible,disabled: true}],
      montoRecibir: [this.seccionState?.montoRecibir, Validators.required],
      rfc1: [this.seccionState?.rfc1],
    })
  }

  
  /**
   * Suscribe al observable `selectSolicitud$` del query `tramite120501Query` para obtener el estado actual de la solicitud y actualizar la propiedad `seccionState` con los datos recibidos. La suscripción se mantiene activa hasta que se emite un valor en `destroyed$`, evitando fugas de memoria.
   */
  obtenerEstadoSolicitud(): void {
    this.tramite120501Query.selectSolicitud$?.pipe(takeUntil(this.destroyed$))
      .subscribe((data: Solicitud120501State) => {
        this.seccionState = data;
      });
  }
  /**
 * Inicializa el estado de los formularios según el modo de solo lectura.
 *
 * Si el formulario está en modo solo lectura (`esFormularioSoloLectura`), llama a `guardarDatosFormulario()`
 * para deshabilitar todos los controles. En caso contrario, inicializa los formularios normalmente.
 */
   inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); 
    } else {
      this.inicializarFormulario();
    }
  }
  /**
 * Guarda y actualiza el estado de los formularios según el modo de solo lectura.
 *
 * Inicializa los formularios y luego los deshabilita si el formulario está en modo solo lectura,
 * o los habilita si está en modo edición.
 */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.formulario.disable();
      this.detalledelaLicitacionForm.disable();
      this.adquiriente.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formulario.enable();
      this.detalledelaLicitacionForm.enable();
      this.adquiriente.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
}
 
  /**
   * Obtiene la lista de entidades federativas.
   */
  getEntidadFederativa(): void {
      this.service.getEntidadFederativa().pipe(
        takeUntil(this.destroyed$)
      ).subscribe(
        (data) => {
          this.entidadFederativaOptions = data;
        }
      );
     
  }
/**
   * Obtiene la lista de representaciones federales.
   */
getRepresentacionFederal(): void {
  this.service.getRepresentacionFederal().pipe(
    takeUntil(this.destroyed$)
  ).subscribe(
    (data) => {
      this.representacionFederalOptions = data;
    }
  );
}

/**
 * Verifica si un control del formulario 'adquiriente' es inválido.
 */
isInvalid(id: string): boolean | null {
  const CONTROL = this.adquiriente.get(id);
  return CONTROL ? CONTROL.invalid && CONTROL.touched : null;
}

/**
 * Método de destrucción del componente.
 *
 * Limpia las suscripciones al Subject `destroyed$`.
 */
ngOnDestroy(): void {
  this.destroyed$.next();
  this.destroyed$.complete();
}

/**
 * Maneja el valor del índice del asistente (wizard) basado en la acción del botón.
 *
 * Objeto que contiene la acción y el valor del botón.
 */
getValorIndice(e: AccionBoton):void{
  if (e.valor > 0 && e.valor < 5) {
    this.indice = e.valor;
    if (this.wizardComponent) {
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    } 
  }

}

/**
 * Obtiene y establece los detalles de la licitación en el formulario 'detalledelalicitacionForm'.
 *
 * Utiliza el servicio `LicitacionesDisponiblesService` para obtener los datos.
 */
getDetallesDelalicitacion():void{
  this.service.getDetallesDelalicitacion().subscribe(
    (data:DetallesLicitacion)=>{
      this.detalledelaLicitacionForm.patchValue({
        numeraDelicitacion:data.numeraDelicitacion,
        fechaDelEventoDelicitacion:data.fechaDelEventoDelicitacion,
        descripcionDelProducto:data.descripcionDelProducto,
        unidadTarifaria:data.unidadTarifaria,
        regimenAduanero:data.regimenAduanero,
        fraccionArancelaria:data.fraccionArancelaria,
        fechaDeiniciodeVigenciadelCupo:data.fechaDeiniciodeVigenciadelCupo,
        fechaDefindeVigenciadelCupo:data.fechaDefindeVigenciadelCupo,
        obserVaciones:data.obserVaciones,
        bloqueComercial:data.bloqueComercial,
        paises:data.paises,
        montoadJudicado:data.montoadJudicado,
        montoDisponible:data.montoDisponible,
        montoMaximo:data.montoMaximo
      })
    })
}
   /**
     * Obtiene los datos de la tabla desde el servicio.
     *
     * LicitacionesVigentesComponent
     * 
     */ 
  obtenerDatosDeTabla(): void {
    this.service.getTableData().subscribe(
        (data: Complementaria[]) => {
            this.datos = data;
        }
    );
  }
/**
 * Obtiene y establece los datos del adquiriente en el formulario 'adquiriente'.
 *
 * Utiliza el servicio `LicitacionesDisponiblesService` para obtener los datos.
 */
getAdquiriente():void{
  this.service.getAdquiriente().subscribe(
    (data:Adquiriente)=>{
      this.adquiriente.patchValue({
        rfc:data.rfc,
        adquirienteMontoDisponible:data.adquirienteMontoDisponible,
      })
    })
  
}
/**
     * Establece los valores en el store del trámite 120501.
     *
     * LicitacionesVigentesComponent
     * El formulario que contiene los valores.
     * El nombre del campo en el formulario.
     * El nombre del método en el store a invocar.
     * 
     */
setValoresStore(form: FormGroup, campo: string): void {
  const VALOR = form.get(campo)?.value;
  this.tramite120501Store.actualizarEstado({ [campo]: VALOR });
}

/**
 * Abre el modal para modificar la información.
 *
 * LicitacionesVigentesComponent
 * 
 */
abrirModificarModal(_event: Complementaria): void {
  if(this.esFormularioSoloLectura){
    return
  }
  this.showRepresentacionFederal = true;
  
}

/**
 * Muestra la sección para seleccionar un participante.
 * Cambia el valor de la propiedad `showSeleccionarParticipante` a `true`,
 * lo que habilita la visualización de la interfaz correspondiente.
 */
seleccionarParticipante():void{
  this.showSeleccionarParticipante = true;
}

/**
 * Agrega el valor del campo 'rfc1' al array 'datos1'.
 * Si el campo está vacío, no realiza ninguna acción.
 */
agregarRFC1(): void {
  const RFC1VALUE = this.adquiriente.get('rfc1')?.value;
  if (RFC1VALUE) {
    this.datos1.push({ registrofederaldecontribuyentes: RFC1VALUE });
    this.adquiriente.get('rfc1')?.reset();
  }
}
/**
 * Mueve el valor seleccionado de 'datos1' al campo 'rfc'.
 * Índice del elemento seleccionado en el array 'datos1'.
 */
moverRFC1(selectedEntry: Complementaria1): void {
  const INDEX = this.datos1.indexOf(selectedEntry); 
  if (INDEX !== -1 && selectedEntry.registrofederaldecontribuyentes) {
    this.adquiriente.get('rfc')?.setValue(selectedEntry.registrofederaldecontribuyentes);
    this.datos1.splice(INDEX, 1);
  }
}
  

}
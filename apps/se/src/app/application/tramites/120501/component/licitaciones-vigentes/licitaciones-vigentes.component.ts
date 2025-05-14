/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { FormGroup } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, Complementaria, Complementaria1 } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TableData } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

import { TableComponent } from '@ng-mf/data-access-user';

import { TituloComponent } from '@ng-mf/data-access-user';

import { LicitacionesDisponiblesService } from '@ng-mf/data-access-user';

import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs';

import { Subject } from 'rxjs';


import { TablaSeleccion } from '@ng-mf/data-access-user'

import { CONFIGURACION_ACCIONISTAS_TABLA } from '@ng-mf/data-access-user';
import { CONFIGURACION_ACCIONISTAS_TABLA1 } from '@ng-mf/data-access-user';
import { Tramite120501Store } from '../../estados/tramites/tramite120501.store';

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
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, TableComponent, CatalogoSelectComponent, BtnContinuarComponent,AlertComponent,TablaDinamicaComponent],
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
 * Configuración para la tabla de accionistas (segunda tabla).
 */
  configTableArray1 = CONFIGURACION_ACCIONISTAS_TABLA1;
  /**
   * Datos de ejemplo para la tabla.
   */
  datos:Complementaria[] = [];
  
  /**
   *Datos de ejemplo para la segunda tabla.
  */
  datos1: Complementaria1[] = [];

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
  formForTotalCount: FormGroup;
  /**
   * Formulario principal.
   */
  formulario: FormGroup;
  /**
   * Formulario para el detalle de la licitación.
   */
  detalledelaLicitacionForm!: FormGroup;
  /**
   * Formulario para el adquiriente.
   */
  adquiriente:FormGroup;
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
     * Observable para la entidad federativa.
     * LicitacionesVigentesComponent
     * 
     */
  entidadFederativa$: Observable<Catalogo | null> = this.tramite120501Query.entidadFederativa$;

  /**
   * Observable para la representación federal.
   * LicitacionesVigentesComponent
   * 
   */
  representacionFederal$: Observable<Catalogo | null> = this.tramite120501Query.representacionFederal$;

  /**
   * Observable para el monto a recibir.
   * LicitacionesVigentesComponent
   * 
   */
  montoRecibir$: Observable<string | null> = this.tramite120501Query.montoRecibir$;
  
  
  /**
   * Indica si se muestra la representación federal.
   */
  showRepresentacionFederal: boolean = false;

   /**
   * Indica si se muestra la selección de participante.
   */
  showSeleccionarParticipante: boolean = false;
  /**
   * Constructor del componente.
   *
   * @param service Servicio para obtener datos de licitaciones disponibles.
   * @param fb Constructor de formularios.
   */
  constructor(private service:LicitacionesDisponiblesService,private fb: FormBuilder,
    private tramite120501Store: Tramite120501Store, 
    private tramite120501Query: Tramite120501Query) {
    this.formForTotalCount = this.fb.group({})
    this.formulario = this.fb.group({
      entidadFederativa: ["", Validators.required],
      representacionFederal: ["", Validators.required],
    });
    this.detalledelaLicitacionForm = this.fb.group({
      numeraDelicitacion: ["", Validators.required],
      fechaDelEventoDelicitacion: ["", Validators.required],
      descripcionDelProducto:["", Validators.required],
      unidadTarifaria:["", Validators.required],
      regimenAduanero: ["", Validators.required],
      fraccionArancelaria: ["", Validators.required],
      fechaDeiniciodeVigenciadelCupo: ["", Validators.required],
      fechaDefindeVigenciadelCupo:["", Validators.required],
      obserVaciones: ["", Validators.required],
      bloqueComercial: ["", Validators.required],
      paises: ["", Validators.required],
      montoadJudicado: ["", Validators.required],
      montoDisponible: ["", Validators.required],
      montoMaximo: ["", Validators.required],
    })
    this.adquiriente = this.fb.group({
      rfc: ["", Validators.required],
      adquirienteMontoDisponible: [""],
      montoRecibir: ["", Validators.required],
      rfc1: [""],
    })

  }
  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.formularioTotalCount();
    this.actualizarRecuentoTotalDeFilas();
    this.getEntidadFederativa();
    this.getRepresentacionFederal();
    this.getDetallesDelalicitacion();
    this.getAdquiriente();
    this.obtenerDatosDeTabla();

    this.montoRecibir$.subscribe((montoRecibir) => {
      if(montoRecibir){
        this.adquiriente.get('montoRecibir')?.setValue(montoRecibir);
      }
    });

    this.entidadFederativa$.subscribe((entidadFederativa) => {
      if (entidadFederativa) {
        this.formulario.get('entidadFederativa')?.setValue(entidadFederativa);
      }
    });

    this.representacionFederal$.subscribe((representacionFederal) => {
      if (representacionFederal) {
        this.formulario.get('representacionFederal')?.setValue(representacionFederal);
      }
    });
  }
  /**
   * Inicializa el formulario para el recuento total de filas.
   */
  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      recuentoTotalDeFilas: [{ value: '', disabled: true }],
    });
  }
  /**
   * Actualiza el recuento total de filas en el formulario.
   */
  public actualizarRecuentoTotalDeFilas(): void {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const totalRowCount = this.tableBodyData.length;
    this.formForTotalCount.patchValue({ recuentoTotalDeFilas: totalRowCount });
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
 *
 * @param id El nombre del control a verificar.
 * @returns `true` si el control es inválido y ha sido tocado, `null` en caso contrario.
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
 * @param e Objeto que contiene la acción y el valor del botón.
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
    (data:any)=>{
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
    (data:any)=>{
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
setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite120501Store): void {
  const VALOR = form.get(campo)?.value;
  (this.tramite120501Store[metodoNombre] as (value: any) => void)(VALOR);
}

/**
* Actualiza el valor de la entidad federativa en el store.
*
* LicitacionesVigentesComponent
* 
*/
onChangeEntiadFederative(): void {
  const ENTITAD_FEDERATIVA = this.formulario.get('entidadFederativa')?.value;
  this.tramite120501Store.setEntidadFederativa(ENTITAD_FEDERATIVA);
}

/**
* Actualiza el valor de la representación federal en el store.
*
* LicitacionesVigentesComponent
*
*/
onChangeRepresentacionFederal(): void {
  const REPRESENTACION_FEDERAL = this.formulario.get('representacionFederal')?.value;
  this.tramite120501Store.setRepresentacionFederal(REPRESENTACION_FEDERAL);
}

/**
* Actualiza el valor del monto a recibir en el store.
*
* LicitacionesVigentesComponent
* 
*/
montoRecibirValue(): void {
  const MONTO_RECIBIR = this.adquiriente.get('montoRecibir')?.value;
  this.tramite120501Store.setmontoRecibir(MONTO_RECIBIR);
}
/**
 * Abre el modal para modificar la información.
 *
 * LicitacionesVigentesComponent
 * 
 */
abrirModificarModal(event: Complementaria): void {
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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { FormGroup } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent } from '@ng-mf/data-access-user';
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

import { map, merge, Subject, takeUntil } from 'rxjs';

import { TablaSeleccion } from '@ng-mf/data-access-user'

import { CONFIGURACION_ACCIONISTAS_TABLA } from '@ng-mf/data-access-user';
import { Solicitud120501State, Tramite120501Store } from '../../../../estados/tramites/tramite120501.store';

import { Tramite120501Query } from '../../../../estados/queries/tramite120501.query';

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
  tableoptions = {
    checkbox : false
  };
  /**
   * Texto de mensaje.
   */
  texto: string = 'La solicitud ha quedado registrada con el número temporal 202758644. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.';
  /**
   * Estado de la selección de radio en la tabla.
   */
  tableradio = TablaSeleccion.UNDEFINED;
  /**
   * Fila seleccionada en la tabla.
   */
  selectedRow = 1;
  /**
   * Configuración para la tabla de accionistas.
   */
  configTableArray = CONFIGURACION_ACCIONISTAS_TABLA;
  /**
   * Datos de ejemplo para la tabla.
   */
  datos:any;
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
  detalledelalicitacionForm!: FormGroup;
  /**
   * Formulario para el adquiriente.
   */
  adquiriente:FormGroup;
  /**
   * Catálogo de entidades federativas.
   */
  entidadFederativa!: Catalogo[];
  /**
   * Catálogo de representaciones federales.
   */
  representacionFederal!: Catalogo[];
  /**
   * Datos de la tabla.
   */
  public tableData!: TableData;
  /**
   * Subject para la destrucción del componente.
   */
  private destroyed$ = new Subject<void>();
  /**
   * Referencia al componente del asistente (wizard).
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  public entidadFederativaState!: Solicitud120501State;
  private destroyNotifier$: Subject<void> = new Subject();
  
  /**
   * Constructor del componente.
   *
   * @param service Servicio para obtener datos de licitaciones disponibles.
   * @param fb Constructor de formularios.
   */
  constructor(private service:LicitacionesDisponiblesService,private fb: FormBuilder,private tramite120501Store: Tramite120501Store, 
    private tramite120501Query: Tramite120501Query) {
    this.formForTotalCount = this.fb.group({})
    this.formulario = this.fb.group({
      entidadFederativa: ["", Validators.required],
      representacionFederal: ["", Validators.required],
    });
    this.detalledelalicitacionForm = this.fb.group({
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
    this.getTabledatas();
    this.entidadFederativaSelection();
    this.tramite120501Query.selectSolicitud$.subscribe(
      (data)=>{
          this.adquiriente.patchValue(
          {
            montoRecibir:data
          }
        )
      }
    )
    
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
   this.service.getEntidadFederativa().subscribe((response) =>{
        if(response){
             this.entidadFederativa = response.data;
            }
          }
      )
      // this.tramite120501Query.selectSolicitud$.subscribe((response)=>{
      //   if(response){
      //     this.entidadFederativa = response;
      //    }
      //  }

      //  this.tramite120501Query.selectSolicitud$
      // .pipe(
      //   takeUntil(this.destroyNotifier$),
      //   map((seccionState) => {
      //     this.entidadFederativaState = seccionState;
      //     console.log("this.entidadFederativaState",this.entidadFederativaState)
      //   })
      // )
      // .subscribe();
      

      
      
     
  }
/**
   * Obtiene la lista de representaciones federales.
   */
getRepresentacionFederal(): void {
  this.service.getRepresentacionFederal().subscribe((response) => {
    if(response){
      this.representacionFederal = response.data;
    }
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
      this.detalledelalicitacionForm.patchValue({
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
getTabledatas():void{
  this.service.getTableData().subscribe(
    (data:any)=>{
      this.datos = data;
    }
    
  )
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
setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite120501Store): void {
  const VALOR = form.get(campo)?.value;
  (this.tramite120501Store[metodoNombre] as (value: any) => void)(VALOR);
}

entidadFederativaSelection(): void {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const entidadFederativa = this.formulario.get('entidadFederativa')?.value;
  this.tramite120501Store.setEntidadFederativa(entidadFederativa);
}

}
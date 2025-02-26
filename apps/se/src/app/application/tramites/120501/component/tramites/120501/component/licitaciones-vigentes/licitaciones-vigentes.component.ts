import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { FormGroup } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent, Catalogo, DatosPasos, ListaPasosWizard, PASOS, TablaDinamicaComponent, TableData, WizardComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

import { TableComponent } from '@ng-mf/data-access-user';

import { TituloComponent } from '@ng-mf/data-access-user';

import { LicitacionesDisponiblesService } from 'libs/shared/data-access-user/src/core/services/120501/licitaciones-disponibles.service';

import { Subject, takeUntil } from 'rxjs';

import { TablaSeleccion } from '@ng-mf/data-access-user'

import { CONFIGURACION_ACCIONISTAS } from 'libs/shared/data-access-user/src/tramites/constantes/120501/licitaciones-disponibles-table-data.enum';
//import { DatosPasos } from '@ng-mf/data-access-user';


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
  configTableArray = CONFIGURACION_ACCIONISTAS;
  /**
   * Datos de ejemplo para la tabla.
   */
  datos = [
    {
      numerodelicitacion:"002/2024 ",
      fechadelicitacion:"2024-03-22 ",
      descripcion:"",
      montoadjudicado:"9985",
      fechainiciovigencia:"2024-03-01",
      fechafinvigencia:"2024-12-31"
    }
  ]
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
  federalentity!: Catalogo[];
  /**
   * Catálogo de representaciones federales.
   */
  representationfederal!: Catalogo[];
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
  /**
   * Constructor del componente.
   *
   * @param service Servicio para obtener datos de licitaciones disponibles.
   * @param fb Constructor de formularios.
   */
  constructor(private service:LicitacionesDisponiblesService,private fb: FormBuilder) {
    this.formForTotalCount = this.fb.group({})
    this.formulario = this.fb.group({
      federalentity: [null, Validators.required],
      representationfederal: [null, Validators.required],
    });
    this.detalledelalicitacionForm = this.fb.group({
      numeradelicitacion: [null, Validators.required],
      biddingeventdate: [null, Validators.required],
      productdescription:[null, Validators.required],
      tariffunit:[null, Validators.required],
      customsregime: [null, Validators.required],
      tarifffraction: [null, Validators.required],
      quotaeffectivedate: [null, Validators.required],
      quotaenddate:[null, Validators.required],
      observaciones: [null, Validators.required],
      bloquecomercial: [null, Validators.required],
      Paises: [null, Validators.required],
      montoadjudicado: [null, Validators.required],
      montodisponible: [null, Validators.required],
      montomaximo: [null, Validators.required],
    })
    this.adquiriente = this.fb.group({
      rfc: [null, Validators.required],
      montodisponible: [null],
      montorecibir: [null, Validators.required],
    })
  }
  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.formularioTotalCount();
    this.actualizarRecuentoTotalDeFilas();
    this.entidadFederativa();
    this.representacionFederal();
    this.getDetallesdelalicitacion();
    this.getAdquiriente();
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
  entidadFederativa(): void {
    this.service.getEntidadfederativa().subscribe((response) => {
      if(response){
        this.federalentity = response.data;
      }
    }
    );
  }
/**
   * Obtiene la lista de representaciones federales.
   */
representacionFederal(): void {
  this.service.getRepresentacionfederal().subscribe((response) => {
    if(response){
      this.representationfederal = response.data;
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
  console.log("e",e)
  console.log("e valor",e.valor)

  if (e.valor > 0 && e.valor < 5) {
    console.log("first if loop")
    this.indice = e.valor;
    if (this.wizardComponent) {
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    } else {
      console.error('wizardComponent is not initialized');
    }
  }

}

/**
 * Obtiene y establece los detalles de la licitación en el formulario 'detalledelalicitacionForm'.
 *
 * Utiliza el servicio `LicitacionesDisponiblesService` para obtener los datos.
 */
getDetallesdelalicitacion():void{
  this.service.getDetallesdelalicitacion().pipe(takeUntil(this.destroyed$)).subscribe(
    (data:any)=>{
      this.detalledelalicitacionForm.patchValue({
        numeradelicitacion:data.numeradelicitacion,
        biddingeventdate:data.biddingeventdate,
        productdescription:data.productdescription,
        tariffunit:data.tariffunit,
        customsregime:data.customsregime,
        tarifffraction:data.tarifffraction,
        quotaeffectivedate:data.quotaeffectivedate,
        quotaenddate:data.quotaenddate,
        observaciones:data.observaciones,
        bloquecomercial:data.bloquecomercial,
        Paises:data.Paises,
        montoadjudicado:data.montoadjudicado,
        montodisponible:data.montodisponible,
        montomaximo:data.montomaximo
      })
    })
}

/**
 * Obtiene y establece los datos del adquiriente en el formulario 'adquiriente'.
 *
 * Utiliza el servicio `LicitacionesDisponiblesService` para obtener los datos.
 */
getAdquiriente():void{
  this.service.getAdquiriente().pipe(takeUntil(this.destroyed$)).subscribe(
    (data:any)=>{
      this.adquiriente.patchValue({
        rfc:data.rfc,
        montodisponible:data.montodisponible,
        montorecibir:data.montorecibir
      })
    })
}
}
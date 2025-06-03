
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';

import {Subject,map,takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AlertComponent,Catalogo,TablaDinamicaComponent,TableComponent,TableData,TituloComponent} from '@ng-mf/data-access-user';
import { CONFIGURACION_ACCIONISTAS_TABLA,DetalledelaLicitacion, DistribucionSaldo, LicitacionesDisponibles } from '../../../../shared/models/expedicion-certificado.model';
import { Expedicion120204State, Expedicion120204Store } from '../../estados/tramites/expedicion120204.store';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { Expedicion120204Query } from '../../estados/queries/expedicion120204.query';
import { ExpedicionCertificadoService } from '../../services/expedicion-certificado.service';
import { InputCheckComponent } from "@libs/shared/data-access-user/src/tramites/components/input-check/input-check.component";
import { REGEX_ALTO } from '@ng-mf/data-access-user'
 
/**
 * Componente para mostrar las licitaciones vigentes.
 *
 * Este componente maneja la visualización y la lógica de las licitaciones vigentes,
 * incluyendo la interacción con un formulario, tablas de datos y un asistente (wizard).
 */
@Component({
  selector: 'app-capturar-expedicion',
  standalone: true,
  imports: [AlertComponent,CatalogoSelectComponent,CommonModule,InputCheckComponent,ReactiveFormsModule,TablaDinamicaComponent,TableComponent,TituloComponent],
  templateUrl: './capturar-expedicion-certificados.component.html',
  styleUrls: ['./capturar-expedicion-certificados.component.scss'],
})
export class CapturarExpedicionCertificadosComponent implements OnInit, OnDestroy {

  /**
   * Configuración para la tabla de accionistas.
   */
  public configTableArray = CONFIGURACION_ACCIONISTAS_TABLA;
  /**
   * Datos de ejemplo para la tabla.
   */
  
  public datos:LicitacionesDisponibles[]=[];

  /**
   * Formulario principal.
   */
  public formulario!: FormGroup;
  /**
   * Formulario para el detalle de la licitación.
   */
  public detalledelaLicitacionForm!: FormGroup;
  /**
   * Formulario para el adquiriente.
   */
  public distribucionSaldoForm!:FormGroup;
  /**
   * Catálogo de entidades federativas.
   */
  public entidadFederativaOptions!: Catalogo[];
  /**
   * Catálogo de representaciones federales.
   */
  public representacionFederalOptions!: Catalogo[];
  /**
   * Datos de la tabla.
   */
  public tableData!: TableData;
  
  /**
   * Subject para la destrucción del componente.
   */
  private destroyed$ = new Subject<void>();

   /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  public esFormularioSoloLectura: boolean = false; 


/**
   * Estado de la solicitud para el componente.
   * Este estado se utiliza para gestionar la lógica del formulario y las interacciones del usuario.
   */
  public solicitudState!: Expedicion120204State;
   
  /**
   * Indica si el componente es de solo lectura.
   * Cuando es `true`, los campos del componente no pueden ser editados.
   */
  @Input() public readonly:boolean = false;
   
  /**
   * Constructor del componente CapturarExpedicionCertificados.
   * 
   * @param service Servicio para la gestión de expedición de certificados.
   * @param fb Constructor de formularios reactivos.
   * @param expedicion120204Store Almacén para el manejo del estado de expedición.
   * @param expedicion120204Query Consulta el estado de expedición.
   * 
   * Inicializa la suscripción al estado de la sección de IO para determinar si el formulario debe estar en modo solo lectura.
   */
  constructor(private service:ExpedicionCertificadoService,private fb: FormBuilder,
    private expedicion120204Store: Expedicion120204Store, 
    private expedicion120204Query: Expedicion120204Query
  ) {
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * Este método se encarga de realizar las siguientes acciones:
   * - Obtener la lista de entidades federativas.
   * - Obtener la lista de representaciones federales.
   * - Obtener los detalles de la licitación.
   * - Obtener la distribución del saldo.
   * - Inicializar el formulario.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnInit(): void { 
    this.esFormularioSoloLectura = this.readonly;
    this.getEntidadFederativa();
    this.getRepresentacionFederal();
    this.getDetallesDelalicitacion();
    this.getDistribucionSaldo();
    this.obtenerDatosTabla(); 
    this.inicializarFormulario();
  }

  /**
   * Obtiene la lista de entidades federativas.
   */
  getEntidadFederativa(): void {
      this.service.getEntidadFederativa().pipe(
        takeUntil(this.destroyed$)
      ).subscribe(
        (data) => {
          this.entidadFederativaOptions = Array.isArray(data) ? data : [data];
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
      this.representacionFederalOptions = Array.isArray(data) ? data : [data];
    }
  );
}


/**
 * Verifica si un control de formulario es inválido y ha sido tocado.
 *
 * @param id - El identificador del control dentro del formulario `distribucionSaldoForm`.
 * @returns `true` si el control es inválido y ha sido tocado, `false` si es válido o no ha sido tocado, 
 *          o `null` si el control no existe.
 */
isInvalid(id: string): boolean | null {
  const CONTROL = this.distribucionSaldoForm.get(id);
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
 * Obtiene los detalles de la licitación desde el servicio y actualiza el formulario con los datos recibidos.
 * 
 * Este método realiza una suscripción al servicio `getDetallesDelalicitacion` para obtener los datos
 * de la licitación y luego utiliza `patchValue` para actualizar los valores del formulario `detalledelaLicitacionForm`.
 * 
 * @returns {void} No retorna ningún valor.
 */
getDetallesDelalicitacion():void{
  this.service.getDetallesDelalicitacion().pipe(
    takeUntil(this.destroyed$)
  ).subscribe(
    (data:DetalledelaLicitacion)=>{
      this.detalledelaLicitacionForm.patchValue({
      numeraDelicitacion: data.numeraDelicitacion,
      fechaDelEventoDelicitacion: data.fechaDelEventoDelicitacion,
      descripcionDelProducto: data.descripcionDelProducto,
      });
    })
}
 
  /**
   * Obtiene los datos de la tabla desde el servicio y los asigna a la propiedad `datos`.
   * 
   * @remarks
   * Este método realiza una suscripción al servicio `obtenerDatosTabla` para obtener los datos
   * correspondientes y los almacena en un arreglo con un único elemento.
   * 
   * @returns {void} No retorna ningún valor.
   */
  obtenerDatosTabla():void {
    this.service.obtenerDatosTabla().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (datos:LicitacionesDisponibles) => {
        this.datos = Array.isArray(datos) ? datos : [datos];
      }
    );
  }


/**
 * Obtiene la distribución del saldo desde el servicio y actualiza el formulario
 * `distribucionSaldoForm` con los valores recibidos.
 *
 * @remarks
 * Este método realiza una suscripción al servicio `getDistribucionSaldo` para
 * obtener los datos de distribución del saldo. Una vez obtenidos, se actualizan
 * los campos del formulario con los valores correspondientes.
 *
 * @returns {void} Este método no retorna ningún valor.
 */
getDistribucionSaldo():void{
  this.service.getDistribucionSaldo().pipe(
    takeUntil(this.destroyed$)
  ).subscribe(
        (data:DistribucionSaldo) => { 
      this.distribucionSaldoForm.patchValue({
      montoDisponible: data.montoDisponible,
    })
        })
}

/**
 * Maneja el evento de cambio en el campo de "entidad federativa" del formulario.
 * Obtiene el valor actual del campo "entidadFederativa" del formulario y lo 
 * establece en el estado de la tienda `expedicion120204Store`.
 *
 * @returns {void} No retorna ningún valor.
 */
onCambiarEntiadFederative(): void {
  const ENTITAD_FEDERATIVA = this.formulario.get('entidadFederativa')?.value;
  this.expedicion120204Store.setEntidadFederativa(ENTITAD_FEDERATIVA);
}


/**
 * Maneja el evento de cambio para el campo "representacionFederal".
 * Obtiene el valor actual del formulario y lo establece en el estado
 * de la tienda `expedicion120204Store`.
 *
 * @returns {void} Esta función no retorna ningún valor.
 */
onCambiarRepresentacionFederal(): void {
  const REPRESENTACION_FEDERAL = this.formulario.get('representacionFederal')?.value;
  this.expedicion120204Store.setRepresentacionFederal(REPRESENTACION_FEDERAL);
}

/**
 * Maneja el evento de cambio en el campo "montoAExpedir".
 * Obtiene el valor actual del formulario asociado y lo establece en el store correspondiente.
 *
 * @returns {void} No retorna ningún valor.
 */
onCambiarMontoAExpedir():void{
  const MONTOAEXPEDIR = this.distribucionSaldoForm.get('montoAExpedir')?.value;
  this.expedicion120204Store.setMontoExpedir(MONTOAEXPEDIR);
}

/**
 * Maneja el evento de cambio para el checkbox "montoAExpedirCheck".
 * Obtiene el valor actual del formulario asociado y lo establece en el estado
 * de la tienda `expedicion120204Store`.
 *
 * @returns {void} No retorna ningún valor.
 */
onCambiarMontoAExpedirCheck():void{
  const MONTOAEXPEDIRCHECK = this.distribucionSaldoForm.get('montoAExpedirCheck')?.value;
  this.expedicion120204Store.setMontoExpedirCheck(MONTOAEXPEDIRCHECK);
}


/**
 * Agrega un monto al total a expedir en el formulario de distribución de saldo.
 * 
 * Este método toma el valor del campo 'montoAExpedir' del formulario, lo suma al valor
 * actual del campo 'totalAExpedir' y actualiza ambos el formulario y el estado de la tienda
 * con el nuevo total calculado.
 * 
 * @returns {void} No retorna ningún valor.
 */
AgregarMontoExpedir():void{
  const MONTOAEXPEDIR = this.distribucionSaldoForm.get('montoAExpedir')?.value;
  let totalAExpedir = this.distribucionSaldoForm.get('totalAExpedir')?.value || '0';
  const MONTOAEXPEDIRVALUE = MONTOAEXPEDIR || '0';
  totalAExpedir = parseFloat(totalAExpedir) + parseFloat(MONTOAEXPEDIRVALUE); 
  
  this.distribucionSaldoForm.patchValue({
    totalAExpedir: totalAExpedir.toString()
  })
  
  this.expedicion120204Store.setTotalExpedir(totalAExpedir);
}

/**
 * Inicializa el formulario y sus valores a partir del estado de la solicitud.
 *
 * Este método se suscribe al observable `selectSolicitud$` del `expedicion120204Query`
 * para obtener el estado actual de la solicitud y luego inicializa el formulario
 * con los valores correspondientes.
 *
 * @returns {void} No retorna ningún valor.
 */
inicializarFormulario(): void {
this.expedicion120204Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyed$),
          map((seccionState) => {
            this.solicitudState = seccionState;
            
           })

          ).subscribe()
  this.inicializarExpedicionCertificadoFormulario();
}

  /**
   * Inicializa los formularios reactivos utilizados en el componente para la expedición de certificados.
   * 
   * - `formulario`: Contiene los campos de entidad federativa y representación federal, ambos requeridos.
   * - `detalledelaLicitacionForm`: Incluye información detallada de la licitación como número, fecha del evento y descripción del producto, todos en modo solo lectura y requeridos.
   * - `distribucionSaldoForm`: Maneja los montos disponibles y a expedir, con validaciones de requerimiento y patrón, algunos campos en solo lectura.
   * 
   * Si el formulario está en modo solo lectura (`esFormularioSoloLectura`), todos los formularios se deshabilitan para evitar modificaciones.
   */
  inicializarExpedicionCertificadoFormulario(): void {  
     this.formulario = this.fb.group({
      entidadFederativa: [this.solicitudState?.entidadFederativa, Validators.required],
      representacionFederal: [this.solicitudState?.representacionFederal, Validators.required],
    });
    this.detalledelaLicitacionForm = this.fb.group({
      numeraDelicitacion: [{value:this.solicitudState?.numeraDelicitacion,disabled: true}, Validators.required],
      fechaDelEventoDelicitacion: [{value:this.solicitudState?.fechaDelEventoDelicitacion,disabled: true}, Validators.required],
      descripcionDelProducto:[{value:this.solicitudState?.descripcionDelProducto,disabled: true}, Validators.required],
    })
    this.distribucionSaldoForm = this.fb.group({
      montoDisponible: [{value:this.solicitudState?.montoDisponible,disabled: true}, Validators.required],
      montoAExpedir: [this.solicitudState?.montoAExpedir, [Validators.required,Validators.pattern(REGEX_ALTO)],],
      montoAExpedirCheck: [this.solicitudState?.montoAExpedirCheck, Validators.required],
      totalAExpedir:[{value:this.solicitudState?.totalAExpedir,disabled: true}, [Validators.required,
        Validators.pattern(REGEX_ALTO)]]
    })

    if(this.esFormularioSoloLectura){
      this.formulario.disable();
      this.detalledelaLicitacionForm.disable();
      this.distribucionSaldoForm.disable();
    }
  }
}
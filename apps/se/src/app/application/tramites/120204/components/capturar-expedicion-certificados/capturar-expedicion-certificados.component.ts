
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';

import {Observable,Subject,map,takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AlertComponent,Catalogo,CatalogoSelectComponent,InputCheckComponent,TablaDinamicaComponent,TableComponent,TableData,TituloComponent } from '@ng-mf/data-access-user';
import {CONFIGURACION_ACCIONISTAS_TABLA,DetalledelaLicitacion, DistribucionSaldo, LicitacionesDisponibles} from '../../../../shared/models/expedicion-certificado.model';
import { Expedicion120204Query } from '../../estados/queries/expedicion120204.query';
import { Expedicion120204Store } from '../../estados/tramites/expedicion120204.store';
import { ExpedicionCertificadoService } from '../../services/expedicion-certificado.service';
import {REGEX_ALTO} from '@ng-mf/data-access-user'
 
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
  configTableArray = CONFIGURACION_ACCIONISTAS_TABLA;
  /**
   * Datos de ejemplo para la tabla.
   */
  
  datos:LicitacionesDisponibles[]=[];

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
  distribucionSaldoForm!:FormGroup;
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
     * Arreglo que contiene el catálogo de entidades federativas.
     * Cada elemento del arreglo es de tipo `Catalogo`.
     */
    entidadFederativa: Catalogo[] = [];


    
    
    /**
     * Arreglo que contiene elementos del tipo `Catalogo`, representando 
     * la información relacionada con la representación federal.
     */
    representacionFederal: Catalogo[] = [];
  
  /**
   * Subject para la destrucción del componente.
   */
  private destroyed$ = new Subject<void>();

  

  /**
   * Observable que emite el catálogo de la entidad federativa o null.
   * Este observable está vinculado a la consulta `entidadFederativa$` 
   * del servicio `expedicion120204Query`.
   */
  entidadFederativa$: Observable<Catalogo | null> = this.expedicion120204Query.entidadFederativa$;

  

  /**
   * Observable que representa la representación federal asociada.
   * Este observable emite un objeto de tipo `Catalogo` o `null`.
   * 
   * @observable
   * @type {Observable<Catalogo | null>}
   */
  representacionFederal$: Observable<Catalogo | null> = this.expedicion120204Query.representacionFederal$;



  /**
   * Observable que representa el monto a expedir.
   * Este observable emite un valor de tipo `string` o `null`,
   * y está vinculado a la consulta `expedicion120204Query.montoAExpedir$`.
   */
  montoAExpedir$: Observable<string | null> = this.expedicion120204Query.montoAExpedir$;



  /**
   * Observable que representa el estado del chequeo de "monto a expedir".
   * 
   * Este observable emite un valor booleano que indica si el chequeo de 
   * "monto a expedir" está activado (true) o desactivado (false). También 
   * puede emitir `null` si el estado no está definido.
   * 
   * @observable
   */
  montoAExpedirCheck$ : Observable<boolean | null> = this.expedicion120204Query.montoAExpedirCheck$;

  /**
   * Observable que emite el valor total a expedir en forma de cadena o null.
   * Este observable está vinculado a la consulta `totalAExpedir$` del servicio `expedicion120204Query`.
   */
  totalAExpedir$ : Observable<string | null> = this.expedicion120204Query.totalAExpedir$;

  /**
   * Constructor del componente.
   *
   * @param service Servicio para obtener datos de licitaciones disponibles.
   * @param fb Constructor de formularios.
   */

   /**
   * Notificador utilizado para destruir suscripciones activas en el componente.
   * Se utiliza comúnmente en el patrón de diseño para evitar fugas de memoria
   * al desuscribirse de observables cuando el componente se destruye.
   *
   * @example
   * ```typescript
   * this.someObservable.pipe(
   *   takeUntil(this.destroyNotifier$)
   * ).subscribe(data => {
   *   // Manejo de datos
   * });
   * ```
   *
   * @see {@link Subject}
   */
   public destroyNotifier$: Subject<void> = new Subject();

   
  constructor(private service:ExpedicionCertificadoService,private fb: FormBuilder,
    private expedicion120204Store: Expedicion120204Store, 
    private expedicion120204Query: Expedicion120204Query
  ) {
    this.formulario = this.fb.group({
      entidadFederativa: ["", Validators.required],
      representacionFederal: ["", Validators.required],
    });
    this.detalledelaLicitacionForm = this.fb.group({
      numeraDelicitacion: [{value:"",disabled: true}, Validators.required],
      fechaDelEventoDelicitacion: [{value:"",disabled: true}, Validators.required],
      descripcionDelProducto:[{value:"",disabled: true}, Validators.required],
    })
    this.distribucionSaldoForm = this.fb.group({
      montoDisponible: [{value:"",disabled: true}, Validators.required],
      montoAExpedir: ["", [Validators.required,Validators.pattern(REGEX_ALTO)],],
      montoAExpedirCheck: ["", Validators.required],
      totalAExpedir:[{value:"",disabled: true}, [Validators.required,
        Validators.pattern(REGEX_ALTO)],]
    })

  }
  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.getEntidadFederativa();
    this.getRepresentacionFederal();
    this.getDetallesDelalicitacion();
    this.getDistribucionSaldo();
    this.obtenerDatosTabla();
    this.inicializarFormulario();
  }

  /**
   * Inicializa el formulario con datos del estado.
   */
    inicializarFormulario(){

    this.entidadFederativa$.pipe(
              takeUntil(this.destroyNotifier$),
              map((entidadFederativa) => {
      if (entidadFederativa) {
        this.formulario.get('entidadFederativa')?.setValue(entidadFederativa);
      }
    })).subscribe();

    this.representacionFederal$.pipe(
      takeUntil(this.destroyNotifier$),
      map((representacionFederal) => {
      if (representacionFederal) {
        this.formulario.get('representacionFederal')?.setValue(representacionFederal);
      }
    })).subscribe();

    this.montoAExpedir$.pipe(
      takeUntil(this.destroyNotifier$),
      map((montoAExpedir) => {
      if (montoAExpedir) {
        this.distribucionSaldoForm.get('montoAExpedir')?.setValue(montoAExpedir);
      }

    })).subscribe();

    this.montoAExpedirCheck$.pipe(
      takeUntil(this.destroyNotifier$),
      map((montoAExpedirCheck) => {
      if (montoAExpedirCheck) {
        this.distribucionSaldoForm.get('montoAExpedirCheck')?.setValue(montoAExpedirCheck);
      }

    })).subscribe();

    this.totalAExpedir$.pipe(
      takeUntil(this.destroyNotifier$),
      map((totalAExpedir) => {
      if (totalAExpedir) {
        this.distribucionSaldoForm.get('totalAExpedir')?.setValue(totalAExpedir);
      }

    })).subscribe();
  }

  /**
   * Obtiene la lista de entidades federativas.
   */
  getEntidadFederativa(): void {
      this.service.getEntidadFederativa().pipe(
        takeUntil(this.destroyed$)
      ).subscribe(
        (data:Catalogo) => {
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
        numeraDelicitacion:data.numeraDelicitacion,
        fechaDelEventoDelicitacion:data.fechaDelEventoDelicitacion,
        descripcionDelProducto:data.descripcionDelProducto,
      })
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
}
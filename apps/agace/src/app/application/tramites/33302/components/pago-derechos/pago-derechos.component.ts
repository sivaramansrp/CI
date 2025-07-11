import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFecha, InputFechaComponent } from '@libs/shared/data-access-user/src';
import { Subject,map, takeUntil } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import {Solicitud32301Service} from '../../services/solicitud.service';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite33302Query } from '../../estados/tramite33302.query';
import { Tramite33302State } from '../../estados/tramite33302.store';
import { Tramite33302Store } from '../../estados/tramite33302.store';


@Component({
  selector: 'app-pago-derechos',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    InputRadioComponent,
    InputFechaComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './pago-derechos.component.html',
 
})
export class PagoDerechosComponent implements OnInit, OnDestroy {

  /**
    * Formulario reactivo para gestionar los datos del pago de derechos.
    */
  pagosDerechosForm!: FormGroup;



  tramiteState: Tramite33302State={} as Tramite33302State;

   
  /**
   * Lista de datos relacionados con bancos obtenidos desde el servicio.
   */
  public bancoList!: Catalogo[];

  /**
 * @property {InputFecha} configuracionFechaFinVigencia
 * @description
 * Configuración del campo de fecha de fin de vigencia para el formulario de pago de derechos.
 * @type {InputFecha}
 */
  configuracionFechaFinVigencia: InputFecha = {
    labelNombre: 'Fecha de pago',
    required: false,
    habilitado: true,
  };
  /**
 * @method cambioFechaDePago
 * @description
 * Maneja los cambios en el campo de fecha de inicio.
 * @param {string} nuevo_valor - El nuevo valor de fecha seleccionado.
 * @returns {void}
 */
cambioFechaDePago(nuevo_valor: string): void {
  this.tramiteStore.setFechaDePago(nuevo_valor);
}


   /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
   esFormularioSoloLectura: boolean = false; 

   /**
    * Indica si el campo debe ser deshabilitado.
    * @property {boolean} campoDeshabilitar
    */
   campoDeshabilitar:boolean= false;
 
  /**
   * Subject utilizado para gestionar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * 
   * @param fb Servicio de FormBuilder para crear formularios reactivos.
   * @param fitosanitarioService Servicio para interactuar con la lógica de negocio relacionada con la acuicultura.
   */
  constructor(
    private readonly fb: FormBuilder,
     private tramiteStore: Tramite33302Store,
    private solicitudService: Solicitud32301Service,
    private tramiteStoreQuery: Tramite33302Query,
    
    
    private readonly consultaioQuery: ConsultaioQuery
     ) {
       this.consultaioQuery.selectConsultaioState$
         .pipe(
           takeUntil(this.destroyNotifier$),
           map((seccionState) => {
             this.esFormularioSoloLectura = seccionState.readonly;
             this.inicializarEstadoFormulario();
           })
         ).subscribe();
      }

   /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
     this.iniciarFormulario();
    }  

  }

  
  ngOnInit(): void {
    this.obtenerBancoList();
    this.tramiteStoreQuery.selectTramite33302$.pipe(
      takeUntil(this.destroyNotifier$),
      map((datos: Tramite33302State) => {
       this.tramiteState = datos;
        this.pagosDerechosForm.patchValue({
          claveDeReferencia: this.tramiteState.claveDeReferencia,
          cadenaDependencia: this.tramiteState.cadenaDependencia,
          banco: this.tramiteState.banco,
          llaveDePago: this.tramiteState.llaveDePago,
          importeDePago: this.tramiteState.importeDePago,
          numeroDe: this.tramiteState.numeroDe,
        });
      })
    )
      .subscribe();
  }
 
    
    setValoresStore(campo: string): void {
      switch (campo) {
        case 'claveDeReferencia':
          this.tramiteStore.setClaveDeReferencia(this.pagosDerechosForm.get('claveDeReferencia')?.value);
          break;
    
        case 'numeroDe':
          this.tramiteStore.setNumeroDe(this.pagosDerechosForm.get('numeroDe')?.value);
          break;
    
        case 'banco':
          this.tramiteStore.setBanco(this.pagosDerechosForm.get('banco')?.value);
          break;
    
        case 'llaveDePago':
          this.tramiteStore.setLlaveDePago(this.pagosDerechosForm.get('llaveDePago')?.value);
          break;
    
        case 'fechaDePago':
          this.tramiteStore.setFechaDePago(this.pagosDerechosForm.get('fechaDePago')?.value);
          break;
    
        case 'importeDePago':
          this.tramiteStore.setImporteDePago(this.pagosDerechosForm.get('importeDePago')?.value);
          break;
    
        case 'cadenaDependencia':
          this.tramiteStore.setCadenaDependencia(this.pagosDerechosForm.get('cadenaDependencia')?.value);
          break;
        default:
        
    }}
  
  /**
   * Guarda los datos del formulario y actualiza el estado del componente.
   * Si el formulario está en modo solo lectura, deshabilita los campos.
   * Si no, habilita los campos para permitir la edición.
   *
   * @method guardarDatosFormulario
   * @returns {void} Este método no retorna ningún valor.
   */
  guardarDatosFormulario(): void {
    this.iniciarFormulario();
    if (this.esFormularioSoloLectura) {
      this.campoDeshabilitar=true;
      this.pagosDerechosForm.disable();
    } else {
      this.campoDeshabilitar=false;
      this.pagosDerechosForm.enable();
    }

  }

  
  iniciarFormulario(): void {
    this.pagosDerechosForm = this.fb.group({
      claveDeReferencia: [{ value:this.tramiteState.claveDeReferencia }, Validators.required],
      numeroDe: [{ value:this.tramiteState.numeroDe }, Validators.required],
      banco: [{ value:this.tramiteState.banco}, Validators.required],
      llaveDePago: [{ value:this.tramiteState.llaveDePago}, Validators.required],
      fechaDePago: [{ value:this.tramiteState.fechaDePago}, Validators.required],
      importeDePago: [{ value:this.tramiteState.importeDePago}, Validators.required],
      cadenaDependencia: [{ value:this.tramiteState.cadenaDependencia}, Validators.required],
      
    });
  }
  obtenerBancoList(): void {
    this.solicitudService.onBancoList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: Catalogo[]) => {
        this.bancoList = data;
      });
  }
  public borrarDatosDelPago(): void {
    this.pagosDerechosForm.reset();
  }
  /**
   * Método que se ejecuta al destruir el componente.
   * Se encarga de liberar las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.unsubscribe();
  }
}

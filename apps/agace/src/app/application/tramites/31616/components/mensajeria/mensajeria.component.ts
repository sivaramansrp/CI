import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud31616MensajeriaState, Tramite31616MensajeriaStore } from '../../../../estados/tramites/tramite31616_mensajeria.store';
import { Tramite31616MensajeriaQuery } from '../../../../estados/queries/tramite31616_mensajeria.query';
import { SolicitudDeRegistroInvocarService } from '../../services/solicitudDeRegistroInvocar/solicitud-de-registro-invocar.service';
import { map, Subject, takeUntil } from 'rxjs';
import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, InputFecha, InputFechaComponent, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FECHA_DE_FACTURA, OPCIONES_DE_BOTON_DE_RADIO, OPCIONES_INFORMACION, OPCIONES_RECONOCIMIENTO } from '@libs/shared/data-access-user/src/tramites/constantes/31616/datos-comunes.enum';
import { MERCANCIA_TABLA, MercanciasInfo } from '@libs/shared/data-access-user/src/core/models/31616/dato-comunes.model';
import { Modal } from 'bootstrap';
import productivo from 'libs/shared/theme/assets/json/31616/productivo.json';

@Component({
  selector: 'app-mensajeria',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    TituloComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    InputFechaComponent
  ],
  templateUrl: './mensajeria.component.html',
  styleUrl: './mensajeria.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MensajeriaComponent implements OnInit{
  mensajeriaGroup!:FormGroup
  susFilialesForm!:FormGroup
  lasEmpresasForm!:FormGroup

  private destroyNotifier$: Subject<void> = new Subject();

  public solicitudState!: Solicitud31616MensajeriaState;

  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
  opcionReconocimiento = OPCIONES_RECONOCIMIENTO;
  opcionInformacionProporcionada = OPCIONES_INFORMACION;

  isLaSolicitante = false;
  isSusFiliales = false;
  isLasEmpresas = false;
  /**
   * Configuración del input de fecha de factura.
   */
  public fechaFacturaInput: InputFecha = FECHA_DE_FACTURA;

  /**
   * Configuración de las columnas de la tabla de mercancías.
   */
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIA_TABLA;
  
  /**
   * Datos de la tabla de mercancías.
   */
  mercanciasTablaDatos: MercanciasInfo[] = [];

  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  @ViewChild('tablaModal', { static: false }) tablaModal!: ElementRef;
  @ViewChild('tablaDosModal', { static: false }) tablaDosModal!: ElementRef;
  tablaInstance!: Modal;
  tablaDosInstance!: Modal;
  /**
   * Lista de sectores productivos obtenidos desde un archivo JSON.
   */
  sectorProductivoAgace: Catalogo[] = productivo;

  constructor(
      private fb: FormBuilder,
      private service: SolicitudDeRegistroInvocarService,
      private tramite31616Store: Tramite31616MensajeriaStore,
      private tramite31616Query: Tramite31616MensajeriaQuery,
    ) {}
    
  ngOnInit(): void {
    this.tramite31616Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.crearFormulario()
    this.obtenerTablaDatos()
  }

  ngAfterViewInit() {
      // Inicializa el modal de modificación
      if (this.tablaModal) {
        this.tablaInstance = new Modal(this.tablaModal.nativeElement);
      }
      if (this.tablaDosModal) {
        this.tablaDosInstance = new Modal(this.tablaDosModal.nativeElement);
      }
  
  }

  crearFormulario():void{
    this.mensajeriaGroup = this.fb.group({
      laSolicitante:[this.solicitudState?.laSolicitante],
      susFiliales:[this.solicitudState?.susFiliales],
      lasEmpresas:[this.solicitudState?.lasEmpresas],
      finDeVigencia:[this.solicitudState?.finDeVigencia],
      numeroDeOficio:[this.solicitudState?.numeroDeOficio],
      fechaDePresentacion:[this.solicitudState?.fechaDePresentacion],
      mensajeriaPaqueteria:[this.solicitudState?.mensajeriaPaqueteria],
      laSolicitanteInterna:[this.solicitudState?.laSolicitanteInterna],
      subsidiaria:[this.solicitudState?.subsidiaria],
      filiales:[this.solicitudState?.filiales],
      matrices:[this.solicitudState?.matrices],
      aeronauticaCivil:[this.solicitudState?.aeronauticaCivil],
      conformidadArticulos:[this.solicitudState?.conformidadArticulos],
      documentosMercancias:[this.solicitudState?.documentosMercancias],
      generalAeronauticaCivil:[this.solicitudState?.generalAeronauticaCivil],
      exteriorConformidad:[this.solicitudState?.exteriorConformidad],
      reconocimientoMutuo:[this.solicitudState?.reconocimientoMutuo],
      rfcListado:[this.solicitudState?.rfcListado],
      nombreRazonSocialListado:[this.solicitudState?.nombreRazonSocialListado],
      direccionFiscalListado:[this.solicitudState?.direccionFiscalListado],
      paginaElectronicaListado:[this.solicitudState?.paginaElectronicaListado],
      correoElectronicaListado:[this.solicitudState?.correoElectronicaListado],
      telefonoContactoListado:[this.solicitudState?.telefonoContactoListado],
      informacionProporcionada:[this.solicitudState?.informacionProporcionada],
      claveReferencia:[this.solicitudState?.claveReferencia,Validators.required],
      numeroOperacion:[this.solicitudState?.numeroOperacion,Validators.required],
      cadenaDependencia:[this.solicitudState?.cadenaDependencia,Validators.required],
      banco:[this.solicitudState?.banco,Validators.required],
      llavePago:[this.solicitudState?.llavePago,Validators.required],
      fechaFactura: [this.solicitudState?.fechaFactura],
      importePago:[this.solicitudState?.importePago,Validators.required]
    })

    this.susFilialesForm = this.fb.group({
      rfc:[this.solicitudState?.rfc],
      rfcDos:[{value:'',disabled:true}],
      denominacionRazonSocial:[{value:'',disabled:true}],
      domicilio:[{value:'',disabled:true}],
    })

    this.lasEmpresasForm = this.fb.group({
      rfcLasEmpresas:[this.solicitudState?.rfcLasEmpresas],
      denominacionRazonSocial:[{value:'',disabled:true}],
      domicilio:[{value:'',disabled:true}],
    })

    this.isLaSolicitante = this.solicitudState?.laSolicitante =='1' ? true : false;
    this.isSusFiliales = this.solicitudState?.susFiliales =='1' ? true : false;
    this.isLasEmpresas = this.solicitudState?.lasEmpresas =='1' ? true : false;
  }

  /**
   * Obtiene los datos de la tabla de mercancías.
   */
  obtenerTablaDatos(): void {
    this.service.obtenerTablaDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.mercanciasTablaDatos.push(DATOS[0]);
      });
  }

  openTablaModal() {
    if (this.tablaInstance) {
      this.tablaInstance.show();
    }
  }

  closeTablaModal() {
    if (this.tablaInstance) {
      this.tablaInstance.hide();
    }
  }

  openTablaDosModal() {
    if (this.tablaDosInstance) {
      this.tablaDosInstance.show();
    }
  }

  closeTablaDosModal() {
    if (this.tablaDosInstance) {
      this.tablaDosInstance.hide();
    }
  }

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   *
   * @param {FormGroup} form - El grupo de formularios que contiene el campo.
   * @param {string} campo - El nombre del campo cuyo valor se va a establecer.
   * @param {keyof Tramite31601Store} metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite31616MensajeriaStore): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite31616Store[metodoNombre] as (value: string) => void)(VALOR);
    if(campo == 'laSolicitante'){
      this.isLaSolicitante = VALOR =='1' ? true : false;
    }
    if(campo == 'susFiliales'){
      this.isSusFiliales = VALOR =='1' ? true : false;
    }
    if(campo == 'lasEmpresas'){
      this.isLasEmpresas = VALOR =='1' ? true : false;
    }
  }

   /**
   * Cambia la fecha de la factura en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha.
   * @param form Formulario reactivo.
   * @param campo Campo del formulario.
   * @param metodoNombre Método del store a ejecutar.
   */
   public cambioFechaFactura(
    nuevo_valor: string,
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite31616MensajeriaStore
  ): void {
    this.mensajeriaGroup.get('fechaFactura')?.setValue(nuevo_valor);
    this.mensajeriaGroup.get('fechaFactura')?.markAsUntouched();
    const VALOR = form.get(campo)?.value;
    (this.tramite31616Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}

import { ALERTA_COM,OPCIONES_DE_BOTON_DE_RADIO } from '@libs/shared/data-access-user/src/tramites/constantes/31616/datos-comunes.enum';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INSTALACIONES_PRINCIPALES_TABLA, InstalacionesPrincipalesTablaInfo, MERCANCIA_TABLA, MercanciasInfo } from '@libs/shared/data-access-user/src/core/models/31616/dato-comunes.model';
import { Solicitud31616State, Tramite31616Store } from '../../../../estados/tramites/tramite31616.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { SolicitudDeRegistroInvocarService } from '../../services/solicitudDeRegistroInvocar/solicitud-de-registro-invocar.service';
import { Tramite31616Query } from '../../../../estados/queries/tramite31616.query';
import productivo from '@libs/shared/theme/assets/json/31616/productivo.json';
import serviciosAgace from '@libs/shared/theme/assets/json/31616/serviciosAgace.json';

@Component({
  selector: 'app-dato-comunes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    AlertComponent,
    InputRadioComponent,
    TablaDinamicaComponent,
    TituloComponent
  ],
  templateUrl: './dato-comunes.component.html',
  styleUrl: './dato-comunes.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DatoComunesComponent implements OnInit, OnDestroy, AfterViewInit {
  datosComunesForma!:FormGroup
  tablaModalForma!:FormGroup
  tablaDosModalForma!:FormGroup
  miembroDeLaEmpresa!:FormGroup
  
  /**
   * Lista de sectores productivos obtenidos desde un archivo JSON.
   */
  sectorProductivoAgace: Catalogo[] = productivo;

  /**
   * Lista de servicios Agace obtenidos desde un archivo JSON.
   */
  serviciosAgace: Catalogo[] = serviciosAgace;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud31616State;

  /**
   * Notificador para destruir observables.
   */

  
  /**
   * Constante de alerta utilizada en el componente.
   * @type {typeof ALERTA_COM}
   */
  alerta = ALERTA_COM;

  /**
   * Opciones de botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  private destroyNotifier$: Subject<void> = new Subject();

  @ViewChild('confirmModal', { static: false }) confirmModal!: ElementRef;
  @ViewChild('tablaModal', { static: false }) tablaModal!: ElementRef;
  @ViewChild('instalacionesPrincipalesTablaModal', { static: false }) instalacionesPrincipalesTablaModal!: ElementRef;
  @ViewChild('miembroDeLaEmpresaModal', { static: false }) miembroDeLaEmpresaModal!: ElementRef;
  /**
   * Instancia del modal de modificación.
   */
  confirmInstance!: Modal;
  tablaInstance!: Modal;
  instalacionesPrincipalesTablaInstance!: Modal;
  miembroDeLaEmpresaInstance!: Modal;

  showSenaleCuentaEmpleados = false
  showSenaleSiAlMomento = false
  changed = false
  
  /**
   * Configuración de las columnas de la tabla de mercancías.
   */
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIA_TABLA;
  
  /**
   * Datos de la tabla de mercancías.
   */
  mercanciasTablaDatos: MercanciasInfo[] = [];

  /**
   * Configuración de las columnas de la tabla de mercancías.
   */
  instalacionesPrincipalesTabla: ConfiguracionColumna<InstalacionesPrincipalesTablaInfo>[] = INSTALACIONES_PRINCIPALES_TABLA;
  
  /**
   * Datos de la tabla de mercancías.
   */
  instalacionesPrincipalesTablaDatos: InstalacionesPrincipalesTablaInfo[] = [];

  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  constructor(
    private fb: FormBuilder,
    private service: SolicitudDeRegistroInvocarService,
    private tramite31616Store: Tramite31616Store,
    private tramite31616Query: Tramite31616Query,
  ) {
    // Añade lógica aquí
  }

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

      if(parseInt(this.solicitudState?.senaleCuentaEmpleados,10) === 1){
        this.showSenaleCuentaEmpleados = true
      }
      if(parseInt(this.solicitudState?.senaleSiAlMomento,10) === 1){
        this.showSenaleSiAlMomento = true
      }

    this.obtenerTablaDatos()
    this.obtenerInstalacionesPrincipalesTablaDatos()
  }

  ngAfterViewInit():void {
    // Inicializa el modal de modificación
    if (this.confirmModal) {
      this.confirmInstance = new Modal(this.confirmModal.nativeElement);
    }
    if (this.tablaModal) {
      this.tablaInstance = new Modal(this.tablaModal.nativeElement);
    }
    if (this.instalacionesPrincipalesTablaModal) {
      this.instalacionesPrincipalesTablaInstance = new Modal(this.instalacionesPrincipalesTablaModal.nativeElement);
    }
    if (this.miembroDeLaEmpresaModal) {
      this.miembroDeLaEmpresaInstance = new Modal(this.miembroDeLaEmpresaModal.nativeElement);
    }

  }

  openConfirmModal():void {
    if (this.confirmInstance) {
      this.confirmInstance.show();
    }
  }

  closeConfirmModal():void {
    if (this.confirmInstance) {
      this.confirmInstance.hide();
    }
  }

  openTablaModal():void {
    if (this.tablaInstance) {
      this.tablaInstance.show();
    }
  }

  closeTablaModal():void {
    if (this.tablaInstance) {
      this.tablaInstance.hide();
    }
  }

  openMiembroDeLaEmpresaModal():void {
    if (this.miembroDeLaEmpresaInstance) {
      this.miembroDeLaEmpresaInstance.show();
    }
  }

  closeMiembroDeLaEmpresaModal():void {
    if (this.miembroDeLaEmpresaInstance) {
      this.miembroDeLaEmpresaInstance.hide();
    }
  }

  crearTablaDatos():void{
    this.obtenerTablaDatos()
    this.closeTablaModal()
  }

  crearTablaDosDatos():void{
    this.obtenerInstalacionesPrincipalesTablaDatos()
    this.closeTablaDosModal()
  }

  openTablaDosModal():void {
    if (this.instalacionesPrincipalesTablaInstance) {
      this.instalacionesPrincipalesTablaInstance.show();
    }
  }

  closeTablaDosModal():void {
    if (this.instalacionesPrincipalesTablaInstance) {
      this.instalacionesPrincipalesTablaInstance.hide();
    }
  }

  crearFormulario():void{
    this.datosComunesForma = this.fb.group({
      sectorProductivo:[this.solicitudState?.sectorProductivo],
      servicio:[this.solicitudState?.servicio],
      solicitudDeInspeccion:[this.solicitudState?.solicitudDeInspeccion,Validators.required],
      indiqueAutorizo:[this.solicitudState?.indiqueAutorizo,Validators.required],
      senaleCuentaEmpleados:[this.solicitudState?.senaleCuentaEmpleados,Validators.required],
      numeroDeEmpleados:[this.solicitudState?.numeroDeEmpleados],
      bimestre:[this.solicitudState?.bimestre],
      cumpleConLaObligacion:[this.solicitudState?.cumpleConLaObligacion,Validators.required],
      acreditaRealizar:[this.solicitudState?.acreditaRealizar,Validators.required],
      senaleSiAlMomento:[this.solicitudState?.senaleSiAlMomento,Validators.required],
      acreditaCumplir:[this.solicitudState?.acreditaCumplir,Validators.required],
      fraccionVI:[this.solicitudState?.fraccionVI,Validators.required],
      novenoParrafoDelCff:[this.solicitudState?.novenoParrafoDelCff,Validators.required],
      digitalesEstanVigentes:[this.solicitudState?.digitalesEstanVigentes,Validators.required],
      ultimosDoceMeses:[this.solicitudState?.ultimosDoceMeses,Validators.required],
      prestacionDeServicios:[this.solicitudState?.prestacionDeServicios],
      articuloDelCff:[this.solicitudState?.articuloDelCff,Validators.required],
      exportadoresSectorial:[this.solicitudState?.exportadoresSectorial,Validators.required],
      archivoNacionales:[this.solicitudState?.archivoNacionales],
      proveedores:[this.solicitudState?.proveedores],
      solicitudDeCertificacion:[this.solicitudState?.solicitudDeCertificacion,Validators.required],
      controlInventarios:[this.solicitudState?.controlInventarios,Validators.required],
      nombreDelSistema:[this.solicitudState?.nombreDelSistema,Validators.required],
      lugarDeRadicacion:[this.solicitudState?.lugarDeRadicacion,Validators.required],
      previstas:[this.solicitudState?.previstas],
      delCffLasReglas:[this.solicitudState?.delCffLasReglas,Validators.required],
      conformidad:[this.solicitudState?.conformidad,Validators.required],
      esquemaIntegralCertificacion:[this.solicitudState?.esquemaIntegralCertificacion,Validators.required],
      modificadasRevocadas:[this.solicitudState?.modificadasRevocadas,Validators.required]
    })

    this.tablaModalForma = this.fb.group({
      rfc:[this.solicitudState?.rfc,Validators.required],
      registroFederalDeContribuyentes:[{value:'',disabled:true},Validators.required],
      razonSocial:[{value:'',disabled:true},Validators.required],
      numeroDeEmpleadosForma:[this.solicitudState?.numeroDeEmpleadosForma,Validators.required],
      bimestreForma:[this.solicitudState?.bimestreForma,Validators.required],
    })

    this.tablaDosModalForma = this.fb.group({
      instalacionesPrincipales:[this.solicitudState?.instalacionesPrincipales,Validators.required],
      municipioAlcaldia:[{value:this.solicitudState?.municipioAlcaldia,disabled:true}],
      tipoDeInstalcion:[this.solicitudState?.tipoDeInstalcion,Validators.required],
      entidadFederative:[{value:'',disabled:true}],
      registroAnte:[{value:'',disabled:true}],
      colonia:[{value:'',disabled:true}],
      codigoPostal:[{value:'',disabled:true}],
      procesoProductivo:[this.solicitudState?.procesoProductivo,Validators.required],
      acreditacionDelUso:[this.solicitudState?.acreditacionDelUso,Validators.required],
      prefilMensajeria:[this.solicitudState?.prefilMensajeria]
    })
    this.miembroDeLaEmpresa = this.fb.group({
      enSeCaracter:[this.solicitudState?.enSeCaracter,Validators.required],
      obligadoTributar:[this.solicitudState?.obligadoTributar,Validators.required],
      nacionalidad:[this.solicitudState?.nacionalidad,Validators.required]
    })

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

   obtenerInstalacionesPrincipalesTablaDatos(): void {
    this.service.obtenerInstalacionesPrincipalesTablaDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.instalacionesPrincipalesTablaDatos.push(DATOS[0]);
      });
  }

  /**
   * Establece valores en el store del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite31616Store,
    comprobarModal?:boolean,
    comprobarModalValor?:number
  ): void {
    const VALOR = form.get(campo)?.value;
    if(comprobarModal && parseInt(VALOR,10) === comprobarModalValor){
      this.openConfirmModal()
    }
    if(campo === "senaleCuentaEmpleados"){
      if(parseInt(VALOR,10) === comprobarModalValor){

        this.showSenaleCuentaEmpleados = true
      }else{
        this.showSenaleCuentaEmpleados = false
      }
    }
    if(campo === "senaleSiAlMomento"){
      if(parseInt(VALOR,10) === comprobarModalValor){

        this.showSenaleSiAlMomento = true
      }else{
        this.showSenaleSiAlMomento = false
      }
    }
    (this.tramite31616Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Maneja el evento de cambio de valor.
   */
  enCambioDeValor(): void {
    // Implementar la lógica para evento de cambio de valor.
    this.changed = !this.changed
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

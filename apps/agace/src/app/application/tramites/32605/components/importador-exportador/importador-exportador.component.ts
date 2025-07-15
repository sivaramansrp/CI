import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionColumna, ConsultaioQuery, InputFecha, InputFechaComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@ng-mf/data-access-user';
import { EMPRESA_DEL_GRUPO, EMPRESA_DEL_GRUPO_CON_FECHA, EmpresaDelGrupo, FECHA_DE_INICIO, FECHA_DE_PAGO, INFORMACION_EMPRESA_OPTIONS, OPCIONES_DE_BOTON_DE_RADIO, PANELS, PANELS1, REGISTRO_ESQUEMA_CERTIFICACION_OPTIONS, TRANSPORTISTAS_CONFIGURACION, TransportistasTable } from '../../constants/datos-comunes.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud32605State, Solicitud32605Store } from '../../estados/solicitud32605.store';
import { map, takeUntil } from 'rxjs';
import { AgregarTransportistasComponent } from '../agregar-transportistas/agregar-transportistas.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FECHA_DELA_ULTIMA_OPERACION } from'../../constants/datos-comunes.enum';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { RFCEnlaceOperativo } from '../../models/solicitud.model';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TemplateRef } from '@angular/core';
/**
 * Componente principal para gestionar los datos de importador y exportador
 * en el formulario, incluyendo la integración con transportistas y validaciones
 * dinámicas.
 */
@Component({
  selector: 'app-importador-exportador',
  standalone: true,
  providers: [BsModalService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    InputFechaComponent,
    TablaDinamicaComponent,
    TituloComponent,
    AgregarTransportistasComponent
  ],
  templateUrl: './importador-exportador.component.html',
  styleUrl: './importador-exportador.component.scss',
})
export class ImportadorExportadorComponent implements OnInit, OnDestroy {

  /** Sujeto que maneja la destrucción de suscripciones */
  private destroy$: Subject<void> = new Subject<void>();
  importadorExportadorForm!: FormGroup;
  agregarEnlaceOperativoForm!: FormGroup;
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
  registroEsquemaCertificacionOptions = REGISTRO_ESQUEMA_CERTIFICACION_OPTIONS;
  informacionEmpresaOptions = INFORMACION_EMPRESA_OPTIONS;
  solicitudState!: Solicitud32605State;
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;
  fechaDeFinDeVigencia: InputFecha = FECHA_DE_INICIO;
  fechaDeLaUltimaOperacion: InputFecha = FECHA_DELA_ULTIMA_OPERACION;
  comercioExteriorActivo: boolean = false;
  noComercioExteriorActivo: boolean = false;
  parteGrupoComercioExterior: boolean = false;
  esFusionOEscisionConComercioExterior: boolean = false;
  esEmpresaExtranjeraIMMEX: boolean = false;
  noFusionEscisionConOperacionExterior: boolean = false;
  mostrarError: boolean = false;
  registroEsquemaCertificacion: boolean = false;
  tipoInformacionEmpresa: boolean = false;
  tableHeaderDatos: ConfiguracionColumna<EmpresaDelGrupo>[] = EMPRESA_DEL_GRUPO;
  transportistasConfiguracionColumnas: ConfiguracionColumna<TransportistasTable>[] =
    TRANSPORTISTAS_CONFIGURACION;
  transportistasLista: TransportistasTable[] = [];
  tablaDatos: EmpresaDelGrupo[] = [];
  mostrarColumnaFecha: boolean = false;
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  modalRef?: BsModalRef;
  modalRefabir?: BsModalRef;
  isEditMode: boolean = false;
  selectedEmpresa: EmpresaDelGrupo | null = null;
  mensajeSeleccion: string = '';
  panels = PANELS;
  panels1 = PANELS1;
  esFormularioSoloLectura: boolean = false;
  @ViewChild('template') template!: TemplateRef<void>;
  @ViewChild('templateFechaInvalida') templateFechaInvalida!: TemplateRef<void>;
  @ViewChild('templateExito') templateExito!: TemplateRef<void>;
  @ViewChild('templateRFCDuplicado') templateRFCDuplicado!: TemplateRef<void>;
  @ViewChild('templateDatosObligatorios') templateDatosObligatorios!: TemplateRef<void>;
  @ViewChild('templateConfirmacionEliminacion') templateConfirmacionEliminacion!: TemplateRef<void>;
  @ViewChild('templateSeleccionRequerida') templateSeleccionRequerida!: TemplateRef<void>;
  /**
   * Constructor del componente
   */
  constructor( public fb: FormBuilder,
    @Inject(BsModalService)
    private modalService: BsModalService,
    private solicitudService: SolicitudService,
    private tramite32605Store: Solicitud32605Store,
    private tramite32605Query: Solicitud32605Query,
    private consultaioQuery: ConsultaioQuery
  ) {
      this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); 
    } else {
      this.inicializarFormulario();
    }
  }
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.importadorExportadorForm.disable();
     
    } else {
      this.importadorExportadorForm.enable();
    }
}
  /**
   * Método llamado al inicializar el componente, configura el formulario con los valores del estado de solicitud
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }


  inicializarFormulario(): void {
    this.obtenerEstadoSolicitud();
    this.importadorExportadorForm = this.fb.group({
      comercioExteriorRealizado : [this.solicitudState?.comercioExteriorRealizado, Validators.required],
      fechaDePago: [this.solicitudState?.fechaDePago, Validators.required],
      fechaInicioComercio: [this.solicitudState?.fechaInicioComercio, Validators.required],
      esParteGrupoComercioExterior: [this.solicitudState?.esParteGrupoComercioExterior, Validators.required],
      fusionEscisionConOperacionExterior: [this.solicitudState?.fusionEscisionConOperacionExterior, Validators.required],
      empresaExtranjeraIMMEX: [this.solicitudState?.empresaExtranjeraIMMEX, Validators.required],
      monto:[ this.solicitudState?.monto, Validators.required],
      operacionesBancarias:[this.solicitudState?.operacionesBancarias, Validators.required],
      llavePago: [this.solicitudState?.llavePago, Validators.required],
      registroEsquemaCertificacion: [this.solicitudState?.registroEsquemaCertificacion, Validators.required],
      tipoInformacionEmpresa: [this.solicitudState?.tipoInformacionEmpresa, Validators.required],
    })
    this.agregarEnlaceOperativoForm = this.fb.group({
      rfcEnclaveOperativo:[this.solicitudState?.rfcEnclaveOperativo, Validators.required],
      enlaceOperativorfc: [
        {value:this.solicitudState?.enlaceOperativorfc, disabled: true}
      ],
      denominacionRazonsocial: [
        {value:this.solicitudState?.denominacionRazonsocial, disabled: true}
      ],
      domicilio: [{value:this.solicitudState?.domicilio, disabled: true}],
      inputfechaDeLaUltimaOperacion: [{value:this.solicitudState?.inputfechaDeLaUltimaOperacion, disabled: true}],
    });
     if (this.solicitudState?.tablaDatos) {
      this.tablaDatos = [...this.solicitudState.tablaDatos];
    }
  }

    /**
   * Maneja el cambio de valor en el campo de fecha.
   *  Nuevo valor de la fecha.
   */
   onFechaCambiada(nuevo_valor: string): void {
    this.importadorExportadorForm.get('fechaDePago')?.setValue(nuevo_valor);
    this.importadorExportadorForm.get('fechaDePago')?.markAsUntouched();
    
    if (ImportadorExportadorComponent.esFechaFutura(nuevo_valor)) {
    this.mostrarModalFechaInvalida();
  }
   this.validarCamposPago();
  }

   actualizarFechaInicioComercio(nuevo_valor: string): void {
    this.importadorExportadorForm.get('fechaInicioComercio')?.setValue(nuevo_valor);
    this.importadorExportadorForm.get('fechaInicioComercio')?.markAsUntouched();
  }

  actualizarFechaDeLaUltimaOperacion(nuevo_valor: string): void {
    this.agregarEnlaceOperativoForm.get('inputfechaDeLaUltimaOperacion')?.setValue(nuevo_valor);
    this.agregarEnlaceOperativoForm.get('inputfechaDeLaUltimaOperacion')?.markAsUntouched(); 
   // Validar si la fecha seleccionada es mayor que la fecha actual
   
    if (ImportadorExportadorComponent.esFechaFutura(nuevo_valor)) {
    this.mostrarModalFechaInvalida();
  }

 
  }
   /**
   * Verifica si la fecha seleccionada es mayor que la fecha actual
   * Fecha en formato DD/MM/YYYY o similar
   * true si la fecha es futura, false en caso contrario
   */
static esFechaFutura(fechaSeleccionada: string): boolean {
  if (!fechaSeleccionada)
  {
    return false;
  }
  
  // Analizar la fecha - asumiendo formato DD/MM/YYYY
  let fechaSeleccionadaDate: Date;
  
  if (fechaSeleccionada.includes('/')) {
    const FECHA_PARTS = fechaSeleccionada.split('/');
    if (FECHA_PARTS.length !== 3) 
      {
        return false;
      }
    const DIA = parseInt(FECHA_PARTS[0], 10);
    const MES = parseInt(FECHA_PARTS[1], 10) - 1; // El mes está indexado desde 0
    const ANIO = parseInt(FECHA_PARTS[2], 10);

    fechaSeleccionadaDate = new Date(ANIO, MES, DIA);
  } else {
    // Intentar analizar como formato de fecha estándar
    fechaSeleccionadaDate = new Date(fechaSeleccionada);
  }

  const FECHA_ACTUAL = new Date();

  // Reiniciar horas para comparar solo fechas
  FECHA_ACTUAL.setHours(0, 0, 0, 0);
  fechaSeleccionadaDate.setHours(0, 0, 0, 0);

  return fechaSeleccionadaDate > FECHA_ACTUAL;
}

 mostrarModalFechaInvalida(): void {
  const MODAL_CONFIG = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm'
  };

  this.modalRef = this.modalService.show(this.templateFechaInvalida, MODAL_CONFIG);
}
cancelarModal():void{
  this.modalRefabir?.hide();
  this.agregarEnlaceOperativoForm.reset();
  this.resetEditMode();
}
 cerrarModalFechaInvalida(): void {
  this.modalRef?.hide();
}
   
abrirModal(template: TemplateRef<void>): void {
    this.modalRefabir = this.modalService.show(template, { class: 'modal-lg',});
  }

buscarRFC():void{
    const RFC = this.agregarEnlaceOperativoForm.get('rfcEnclaveOperativo')?.value;
    if (RFC) {
      // Verificar si el RFC ya existe en la tabla
      if (this.existeRFCEnTabla(RFC)) {
        this.mostrarModalRFCDuplicado();
        return;
      }
      
      this.buscarDatosPorRFC(RFC);
    }
}

existeRFCEnTabla(rfc: string): boolean {
    return this.tablaDatos.some(empresa => 
      empresa.rfcEnclaveOperativo?.toLowerCase() === rfc.toLowerCase()
    );
}
   mostrarModalRFCDuplicado(): void {
    const MODAL_CONFIG = {
      animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-sm'
    };

    this.modalRef = this.modalService.show(this.templateRFCDuplicado, MODAL_CONFIG);
  }
   cerrarModalRFCDuplicado(): void {
    this.modalRef?.hide();
   
  }
   buscarDatosPorRFC(rfc: string): void {
    this.solicitudService.conseguirDatosPorRFC(rfc)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (datos) => {
          const EMPRESA_DATA = datos[rfc];
          if (EMPRESA_DATA) {
            this.patchearDatosEmpresa(EMPRESA_DATA);
          } else {
            this.limpiarCamposEmpresa();
          }
        },
        error: (error) => {
          console.error('Error al buscar datos del RFC:', error);
          this.limpiarCamposEmpresa();
        }
      });
  }

   patchearDatosEmpresa(empresaData: RFCEnlaceOperativo): void {
    this.agregarEnlaceOperativoForm.patchValue({
      enlaceOperativorfc: empresaData.enlaceOperativorfc,
      denominacionRazonsocial: empresaData.denominacionRazonsocial,
      domicilio: empresaData.domicilio
    });
  }
   limpiarCamposEmpresa(): void {
    this.agregarEnlaceOperativoForm.patchValue({
      enlaceOperativorfc: '',
      denominacionRazonsocial: '',
      domicilio: '',
      inputfechaDeLaUltimaOperacion: ''
    });
  }
   
aceptarEnlaceOperativo(): void {
  const RFC_VALUE = this.agregarEnlaceOperativoForm.get('rfcEnclaveOperativo')?.value;
  const DATE_VALUE = this.agregarEnlaceOperativoForm.get('inputfechaDeLaUltimaOperacion')?.value;
  
  // Verificar que el campo RFC requerido esté lleno
  if (!RFC_VALUE?.trim()) {
    this.agregarEnlaceOperativoForm.get('rfcEnclaveOperativo')?.markAsTouched();
    return;
  }
  
  // En modo edición, verificar si el RFC existe en otros registros (excluyendo el actual)
  if (this.isEditMode && this.existeRFCEnTablaExcluyendo(RFC_VALUE, this.selectedEmpresa?.rfcEnclaveOperativo)) {
    this.mostrarModalDatosObligatorios();
    return;
  }
  // En modo agregar, verificar si el RFC ya existe
  if (!this.isEditMode && this.existeRFCEnTabla(RFC_VALUE)) {
    this.mostrarModalDatosObligatorios();
    return;
  }
  // Verificar si la fecha es futura (si se proporciona)
  if (DATE_VALUE && ImportadorExportadorComponent.esFechaFutura(DATE_VALUE)) {
    this.mostrarModalFechaInvalida();
    return;
  }
  
  // Proceder con agregar los datos
  const FORMDATOS = this.agregarEnlaceOperativoForm.getRawValue();
  
  const EMPRESA_DATA: EmpresaDelGrupo = {
    rfcEnclaveOperativo: FORMDATOS.rfcEnclaveOperativo,
    denominacionRazonsocial: FORMDATOS.denominacionRazonsocial,
    domicilio: FORMDATOS.domicilio,
    inputfechaDeLaUltimaOperacion: FORMDATOS.inputfechaDeLaUltimaOperacion
  };

    if (this.isEditMode && this.selectedEmpresa) {
    const INDEX = this.tablaDatos.findIndex(emp => 
      emp.rfcEnclaveOperativo === this.selectedEmpresa?.rfcEnclaveOperativo
    );
    if (INDEX !== -1) {
      this.tablaDatos[INDEX] = EMPRESA_DATA;
      this.tablaDatos = [...this.tablaDatos]; 
    }
  } else {
    this.tablaDatos = [...this.tablaDatos, EMPRESA_DATA];
  }
  
  
  this.actualizarTablaDatosEnStore();

  
  // Mostrar la columna de fecha después de agregar el primer elemento
  if (!this.mostrarColumnaFecha) {
    this.mostrarColumnaFecha = true;
    this.tableHeaderDatos = EMPRESA_DEL_GRUPO_CON_FECHA;
  }
  
  this.limpiarFormulario();
  this.isEditMode = false;
  this.limpiarSeleccion();
  this.modalRefabir?.hide();
  this.mostrarModalExito();
}
existeRFCEnTablaExcluyendo(rfc: string, rfcExcluir?: string): boolean {
  return this.tablaDatos.some(empresa => 
    empresa.rfcEnclaveOperativo?.toLowerCase() === rfc.toLowerCase() &&
    empresa.rfcEnclaveOperativo?.toLowerCase() !== rfcExcluir?.toLowerCase()
  );
}
resetEditMode(): void {
  this.isEditMode = false;
}
limpiarSeleccion(): void {
  this.selectedEmpresa = null;
}
mostrarModalDatosObligatorios(): void {
  const MODAL_CONFIG = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm'
  };

  this.modalRef = this.modalService.show(this.templateDatosObligatorios, MODAL_CONFIG);
}

cerrarModalDatosObligatorios(): void {
  this.modalRef?.hide();
}
   limpiarFormulario(): void {
    this.agregarEnlaceOperativoForm.reset();
    this.agregarEnlaceOperativoForm.patchValue({
      rfcEnclaveOperativo: '',
      enlaceOperativorfc: '',
      denominacionRazonsocial: '',
      domicilio: '',
      inputfechaDeLaUltimaOperacion:''
    });
    this.isEditMode = false;
  }
    /**
   * Marca todos los campos del formulario como tocados para mostrar errores de validación
   */
  marcarCamposComoTocados(): void {
    Object.keys(this.agregarEnlaceOperativoForm.controls).forEach(key => {
      this.agregarEnlaceOperativoForm.get(key)?.markAsTouched();
    });
  }
  mostrarModalExito(): void {
    const MODAL_CONFIG = {
      animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-sm'
    };

    this.modalRef = this.modalService.show(this.templateExito, MODAL_CONFIG);
  }

  cerrarModalExito(): void {
    this.modalRef?.hide();
  }
  onFilaSeleccionada(empresa: EmpresaDelGrupo): void {
  this.selectedEmpresa = empresa;
}
 
  modificarEmpresa(): void {
  if (this.tablaDatos.length === 0 || !this.selectedEmpresa) {
    this.mensajeSeleccion = 'Debe seleccionar un elemento';
    this.mostrarModalSeleccionRequerida();
    return;
  }
  
  this.isEditMode = true;
  
  this.agregarEnlaceOperativoForm.patchValue({
    rfcEnclaveOperativo: '',
    enlaceOperativorfc: this.selectedEmpresa.rfcEnclaveOperativo,
    denominacionRazonsocial: this.selectedEmpresa.denominacionRazonsocial,
    domicilio: this.selectedEmpresa.domicilio,
    inputfechaDeLaUltimaOperacion: this.selectedEmpresa.inputfechaDeLaUltimaOperacion || ''
  });
  
 
  // Open the modal
  this.abrirModal(this.template);
}

eliminarEmpresa(): void {
 if (this.tablaDatos.length === 0 || !this.selectedEmpresa) {
    this.mensajeSeleccion = 'Debe seleccionar un elemento';
    this.mostrarModalSeleccionRequerida();
    return;
  }
  
  // Mostrar modal de confirmación antes de eliminar
  this.mostrarModalConfirmacionEliminacion();
}
// Agregar método para confirmar y ejecutar eliminación
confirmarEliminacionEmpresa(): void {
  if (!this.selectedEmpresa) {
    return;
  }
  
  // Eliminar la empresa seleccionada de la tabla
  this.tablaDatos = this.tablaDatos.filter(empresa => 
    empresa.rfcEnclaveOperativo !== this.selectedEmpresa?.rfcEnclaveOperativo
  );

  this.actualizarTablaDatosEnStore();
  this.limpiarSeleccion();
  
  //  Cerrar modal de confirmación y mostrar éxito
  this.modalRef?.hide();
   this.mensajeSeleccion = 'Datos eliminados correctamente';
   this.mostrarModalSeleccionRequerida();
}
// Agregar modal para mensaje de selección requerida
mostrarModalSeleccionRequerida(): void {
  const MODAL_CONFIG = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm'
  };

  this.modalRef = this.modalService.show(this.templateSeleccionRequerida, MODAL_CONFIG);
}
mostrarModalConfirmacionEliminacion(): void {
  const MODAL_CONFIG = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-m'
  };

  this.modalRef = this.modalService.show(this.templateConfirmacionEliminacion, MODAL_CONFIG);
}

cerrarModalSeleccionRequerida(): void {
  this.modalRef?.hide();
}

cerrarModalConfirmacionEliminacion(): void {
  this.modalRef?.hide();
}

  mostrar_colapsable(index: number): void {
    const IS_CURRENTLY_OPEN = this.panels[index].isCollapsed;
    this.panels.forEach((panel, i) => {
      panel.isCollapsed = i === index ? !IS_CURRENTLY_OPEN : true;
    });
  }
 
  validarLlavePago(): void {
     this.validarCamposPago();
  }
  validarCamposPago(): void {
  const FECHADEPAGE = this.importadorExportadorForm.get('fechaDePago')?.value;
  const MONTO = this.importadorExportadorForm.get('monto')?.value;
  const OPERACIONESBANCARIAS = this.importadorExportadorForm.get('operacionesBancarias')?.value;
  const LLAVEPAGO = this.importadorExportadorForm.get('llavePago')?.value;

  this.mostrarError = !FECHADEPAGE || !MONTO || !OPERACIONESBANCARIAS || !LLAVEPAGO;
}
  mostrar_colapsable1(index: number): void {
    const IS_CURRENTLY_OPEN = this.panels1[index].isCollapsed;
    this.panels1.forEach((panel1, i) => {
      panel1.isCollapsed = i === index ? !IS_CURRENTLY_OPEN : true;
    });
  }

   soloNumeros(event: KeyboardEvent): boolean {
    // Verificar que el formulario existe
    if (!this.importadorExportadorForm) {
      return false;
    }

    const CHARCODE = event.which ? event.which : event.keyCode;
    
    // Permitir: backspace (8), delete (46), tab (9), escape (27), enter (13)
    if ([8, 9, 27, 13, 46].indexOf(CHARCODE) !== -1 ||
        // Permitir: Ctrl+A (65), Ctrl+C (67), Ctrl+V (86), Ctrl+X (88)
        (CHARCODE === 65 && event.ctrlKey === true) ||
        (CHARCODE === 67 && event.ctrlKey === true) ||
        (CHARCODE === 86 && event.ctrlKey === true) ||
        (CHARCODE === 88 && event.ctrlKey === true) ||
        // Permitir: Home (36), End (35), flecha izquierda (37), flecha derecha (39)
        (CHARCODE >= 35 && CHARCODE <= 39)) {
      return true;
    }
    
    // Bloquear si no es un número (0-9)
    if (CHARCODE < 48 || CHARCODE > 57) {
      event.preventDefault();
      return false;
    }
    
    return true;
  }
pegarSoloNumeros(event: ClipboardEvent, fieldName: string): void {
  event.preventDefault();
  const TEXTO_PEGADO = event.clipboardData?.getData('text') || '';
  const SOLO_NUMEROS = TEXTO_PEGADO.replace(/[^0-9]/g, '');
  
  const ELEMENTO_DESTINO = event.target as HTMLInputElement;
  const LONGITUD_MAXIMA = parseInt(ELEMENTO_DESTINO.getAttribute('maxlength') || '10', 10);
  const NUEVO_VALOR = SOLO_NUMEROS.substring(0, LONGITUD_MAXIMA);
  
  // Actualizar el control del formulario
  this.importadorExportadorForm.get(fieldName)?.setValue(NUEVO_VALOR);
}
  soloAlfanumericosConEspacios(event: KeyboardEvent): boolean {
  // Verificar que el formulario existe (usa this)
  if (!this.importadorExportadorForm) {
    return false;
  }

  const CHARCODE = event.which ? event.which : event.keyCode;
  
  // Permitir: backspace (8), delete (46), tab (9), escape (27), enter (13), espacio (32)
  if ([8, 9, 27, 13, 46, 32].indexOf(CHARCODE) !== -1 ||
      // Permitir: Ctrl+A (65), Ctrl+C (67), Ctrl+V (86), Ctrl+X (88)
      (CHARCODE === 65 && event.ctrlKey === true) ||
      (CHARCODE === 67 && event.ctrlKey === true) ||
      (CHARCODE === 86 && event.ctrlKey === true) ||
      (CHARCODE === 88 && event.ctrlKey === true) ||
      // Permitir: Home (36), End (35), flecha izquierda (37), flecha derecha (39)
      (CHARCODE >= 35 && CHARCODE <= 39)) {
    return true;
  }
  
  // Permitir: números (48-57), letras mayúsculas (65-90), letras minúsculas (97-122)
  if ((CHARCODE >= 48 && CHARCODE <= 57) ||// 0-9
      (CHARCODE >= 65 && CHARCODE <= 90) ||// A-Z
      (CHARCODE >= 97 && CHARCODE <= 122)) { // a-z
    return true;
  }
  
  // Bloquear cualquier otro caracter
  event.preventDefault();
  return false;
}

  pegarSoloAlfanumericos(event: ClipboardEvent, fieldName: string): void {
  event.preventDefault();
  const TEXTO_PEGADO = event.clipboardData?.getData('text') || '';
  const SOLO_ALFANUMERICOS = TEXTO_PEGADO.replace(/[^a-zA-Z0-9\s]/g, '');
  
  const ELEMENTO_DESTINO = event.target as HTMLInputElement;
  const LONGITUD_MAXIMA = parseInt(ELEMENTO_DESTINO.getAttribute('maxlength') || '25', 10);
  const NUEVO_VALOR = SOLO_ALFANUMERICOS.substring(0, LONGITUD_MAXIMA);
  
  // Actualizar el control del formulario
  this.importadorExportadorForm.get(fieldName)?.setValue(NUEVO_VALOR);
}

 setValoresStore(form: FormGroup | null, campo: string): void {
    if (!form) {
      return;
    }
    const CONTROL = form.get(campo);
    if (CONTROL && CONTROL.value !== null && CONTROL.value !== undefined) {
      this.tramite32605Store.actualizarEstado({ [campo]: CONTROL.value });
    }
  }
 obtenerEstadoSolicitud(): void {
    this.tramite32605Query.selectSolicitud$?.pipe(takeUntil(this.destroy$))
      .subscribe((data: Solicitud32605State) => {
        this.solicitudState = data;
         if (data.tablaDatos) {
        this.tablaDatos = [...data.tablaDatos];
      }
      });
  }
  actualizarTablaDatosEnStore(): void {
    this.tramite32605Store.actualizarEstado({ tablaDatos: this.tablaDatos });
  }
   /**
   * Método llamado al destruir el componente, limpia las suscripciones
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

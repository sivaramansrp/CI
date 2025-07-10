import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionColumna, InputFecha, InputFechaComponent, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion } from '@ng-mf/data-access-user';
import { EMPRESA_DEL_GRUPO, EMPRESA_DEL_GRUPO_CON_FECHA, EmpresaDelGrupo, FECHA_DE_INICIO, FECHA_DE_PAGO, OPCIONES_DE_BOTON_DE_RADIO } from '../../constants/datos-comunes.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FECHA_DELA_ULTIMA_OPERACION } from'../../constants/datos-comunes.enum';
import { RFCEnlaceOperativo } from '../../models/solicitud.model';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { SolicitudService } from '../../services/solicitud.service';
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
    TablaDinamicaComponent
   
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
  solicitudState!: Solicitud32605State;
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;
  fechaDeFinDeVigencia: InputFecha = FECHA_DE_INICIO;
  fechaDeLaUltimaOperacion: InputFecha = FECHA_DELA_ULTIMA_OPERACION;
  comercioExteriorActivo: boolean = false;
  noComercioExteriorActivo: boolean = false;
  parteGrupoComercioExterior: boolean = false;
  esFusionOEscisionConComercioExterior: boolean = false;
  tableHeaderDatos: ConfiguracionColumna<EmpresaDelGrupo>[] = EMPRESA_DEL_GRUPO;
  tablaDatos: EmpresaDelGrupo[] = [];
  mostrarColumnaFecha: boolean = false;
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  modalRef?: BsModalRef;
  modalRefabir?: BsModalRef;
  isEditMode: boolean = false;
  selectedEmpresa: EmpresaDelGrupo | null = null;
  mensajeSeleccion: string = '';
  @ViewChild('template') template!: TemplateRef<void>;
  @ViewChild('templateFechaInvalida') templateFechaInvalida!: TemplateRef<void>;
  @ViewChild('templateExito') templateExito!: TemplateRef<void>;
  @ViewChild('templateRFCDuplicado') templateRFCDuplicado!: TemplateRef<void>;
  @ViewChild('templateDatosObligatorios') templateDatosObligatorios!: TemplateRef<void>;
  @ViewChild('templateConfirmacionEliminacion') templateConfirmacionEliminacion!: TemplateRef<void>;
  @ViewChild('templateSeleccionRequerida') templateSeleccionRequerida!: TemplateRef<void>;
  /**
   * Constructor del componente
   * @param fb FormBuilder para crear formularios reactivos
   * @param solicitudService Servicio para manejar la lógica de solicitudes
   * @param solicitud32605Store Store para manejar el estado de la solicitud
   * @param solicitud32605Query Consulta para obtener el estado de la solicitud
   */
  constructor( public fb: FormBuilder,
    @Inject(BsModalService)
    private modalService: BsModalService,
    private solicitudService: SolicitudService,
  ) {
  // Inicialización de dependencias
  }

  /**
   * Método llamado al inicializar el componente, configura el formulario con los valores del estado de solicitud
   */
  ngOnInit(): void {
    this.inicializarFormulario();
  }


  inicializarFormulario(): void {
    this.importadorExportadorForm = this.fb.group({
      comercioExteriorRealizado : [this.solicitudState?.comercioExteriorRealizado, Validators.required],
      fechaDePago: [this.solicitudState?.fechaDePago, Validators.required],
      fechaInicioComercio: [this.solicitudState?.fechaInicioComercio, Validators.required],
      esParteGrupoComercioExterior: [this.solicitudState?.esParteGrupoComercioExterior, Validators.required],
      fusionEscisionConOperacionExterior: [this.solicitudState?.fusionEscisionConOperacionExterior, Validators.required],
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
  }

    /**
   * Maneja el cambio de valor en el campo de fecha.
   * @param nuevo_valor Nuevo valor de la fecha.
   */
   onFechaCambiada(nuevo_valor: string): void {
    this.importadorExportadorForm.get('fechaDePago')?.setValue(nuevo_valor);
    this.importadorExportadorForm.get('fechaDePago')?.markAsUntouched();
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
   * @param fechaSeleccionada Fecha en formato DD/MM/YYYY o similar
   * @returns true si la fecha es futura, false en caso contrario
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
  
  // In edit mode, check if RFC exists in other records (excluding current one)
  if (this.isEditMode && this.existeRFCEnTablaExcluyendo(RFC_VALUE, this.selectedEmpresa?.rfcEnclaveOperativo)) {
    this.mostrarModalDatosObligatorios();
    return;
  }
  // In add mode, check if RFC already exists
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
    // Update existing record
    const INDEX = this.tablaDatos.findIndex(emp => 
      emp.rfcEnclaveOperativo === this.selectedEmpresa?.rfcEnclaveOperativo
    );
    if (INDEX !== -1) {
      this.tablaDatos[INDEX] = EMPRESA_DATA;
      this.tablaDatos = [...this.tablaDatos]; // Trigger change detection
    }
  } else {
    // Add new record
    this.tablaDatos = [...this.tablaDatos, EMPRESA_DATA];
  }
  
  // Mostrar la columna de fecha después de agregar el primer elemento
  if (!this.mostrarColumnaFecha) {
    this.mostrarColumnaFecha = true;
    this.tableHeaderDatos = EMPRESA_DEL_GRUPO_CON_FECHA;
  }
  
  this.limpiarFormulario();
  this.resetEditMode();
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
  this.selectedEmpresa = null;
  
  // Disable fields again
  // this.agregarEnlaceOperativoForm.get('enlaceOperativorfc')?.disable();
  // this.agregarEnlaceOperativoForm.get('denominacionRazonsocial')?.disable();
  // this.agregarEnlaceOperativoForm.get('domicilio')?.disable();
  // this.agregarEnlaceOperativoForm.get('inputfechaDeLaUltimaOperacion')?.disable();
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
    this.resetEditMode();
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
  
  // Clear only the RFC field and patch other fields from selected row
  this.agregarEnlaceOperativoForm.patchValue({
    rfcEnclaveOperativo: '', // Blank RFC
    enlaceOperativorfc: this.selectedEmpresa.rfcEnclaveOperativo,
    denominacionRazonsocial: this.selectedEmpresa.denominacionRazonsocial,
    domicilio: this.selectedEmpresa.domicilio,
    inputfechaDeLaUltimaOperacion: this.selectedEmpresa.inputfechaDeLaUltimaOperacion || ''
  });
  
  // // Enable the fields for editing
  // this.agregarEnlaceOperativoForm.get('enlaceOperativorfc')?.enable();
  // this.agregarEnlaceOperativoForm.get('denominacionRazonsocial')?.enable();
  // this.agregarEnlaceOperativoForm.get('domicilio')?.enable();
  // this.agregarEnlaceOperativoForm.get('inputfechaDeLaUltimaOperacion')?.enable();
  
  // Open the modal
  this.abrirModal(this.template);
}

eliminarEmpresa(): void {
 if (this.tablaDatos.length === 0 || !this.selectedEmpresa) {
    this.mensajeSeleccion = 'Debe seleccionar un elemento';
    this.mostrarModalSeleccionRequerida();
    return;
  }
  
  // Show confirmation modal before deleting
  this.mostrarModalConfirmacionEliminacion();
}
// Add method to confirm and execute deletion
confirmarEliminacionEmpresa(): void {
  if (!this.selectedEmpresa) {
    return;
  }
  
  // Remove the selected company from the table
  this.tablaDatos = this.tablaDatos.filter(empresa => 
    empresa.rfcEnclaveOperativo !== this.selectedEmpresa?.rfcEnclaveOperativo
  );
  
  // Clear selection
  this.selectedEmpresa = null;
  
  // Close confirmation modal and show success
  this.modalRef?.hide();
   this.mensajeSeleccion = 'Datos eliminados correctamente';
   this.mostrarModalSeleccionRequerida();
}
// Add modal for selection required message
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
// Add close methods for new modals
cerrarModalSeleccionRequerida(): void {
  this.modalRef?.hide();
}

cerrarModalConfirmacionEliminacion(): void {
  this.modalRef?.hide();
}
onRadioChange(controlName: string): void {
  const VALOR = this.importadorExportadorForm.get(controlName)?.value;
  const IS_TRUE = VALOR === '1' || VALOR === true;
  const IS_FALSE = VALOR === '0' || VALOR === false;

  switch (controlName) {
    case 'comercioExteriorRealizado':
      this.comercioExteriorActivo = IS_TRUE;
      this.noComercioExteriorActivo = IS_FALSE;
      this.esFusionOEscisionConComercioExterior = IS_FALSE
      break;
      
    case 'esParteGrupoComercioExterior':
      this.parteGrupoComercioExterior = IS_TRUE;
      this.esFusionOEscisionConComercioExterior = IS_TRUE
      break;
      
    case 'fusionEscisionConOperacionExterior':
      //logic
      break;
      
    default:
      console.warn(`Unhandled radio control: ${controlName}`);
      break;
  }
}
   /**
   * Método llamado al destruir el componente, limpia las suscripciones
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

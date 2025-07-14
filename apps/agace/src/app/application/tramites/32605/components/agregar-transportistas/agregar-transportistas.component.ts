import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { ConfiguracionColumna,TablaDinamicaComponent, TablaSeleccion } from '@ng-mf/data-access-user';
import { PANELS1, TRANSPORTISTAS_CONFIGURACION, TransportistasTable } from '../../constants/datos-comunes.enum';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TransportistasListaInterface } from '../../models/solicitud.model';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

/**
 * Decorador que define el componente 'AgregarTransportistasComponent'.
 * Incluye configuración de selector, template, estilos y módulos importados.
 */
@Component({
  selector: 'app-agregar-transportistas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TablaDinamicaComponent],
  templateUrl: './agregar-transportistas.component.html',
  styleUrl: './agregar-transportistas.component.scss',
})
/**
 * Decorador que define el componente 'AgregarTransportistasComponent'.
 * Incluye configuración de selector, template, estilos y módulos importados.
 */
export class AgregarTransportistasComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para capturar datos del transportista */
  transportistaCertificacionForm!: FormGroup;

  /** Sujeto utilizado para cancelar suscripciones y evitar fugas de memoria */
  private destroy$: Subject<void> = new Subject<void>();

  /** Estado actual de la solicitud obtenido desde el store */
  solicitudState!: Solicitud32605State;

  panels1 = PANELS1

  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  transportistasLista: TransportistasTable[] = [];

  transportistasConfiguracionColumnas: ConfiguracionColumna<TransportistasTable>[] = TRANSPORTISTAS_CONFIGURACION;
  modalRefabir?: BsModalRef;
  modalRefExito?: BsModalRef; // Add separate reference for success modal
  modalRefDatosObligatorios?: BsModalRef;
  modalRefDatos?: BsModalRef;
  isEditMode: boolean = false;
  mensajeSeleccion: string = '';
  selectedTransportista: TransportistasTable | null = null;
  
  @ViewChild('templateTransposrtistas') templateTransposrtistas!: TemplateRef<void>;
  @ViewChild('templateRFCDuplicado') templateRFCDuplicado!: TemplateRef<void>;
  @ViewChild('templateExito') templateExito!: TemplateRef<void>;
  @ViewChild('templateDatosObligatorios') templateDatosObligatorios!: TemplateRef<void>;
  @ViewChild('templateDatos') templateDatos!: TemplateRef<void>;
  @ViewChild('templateSeleccionRequerida') templateSeleccionRequerida!: TemplateRef<void>;
  @ViewChild('templateConfirmacionEliminacion') templateConfirmacionEliminacion!: TemplateRef<void>;
  /**
   * Constructor del componente. Se inyectan los servicios necesarios para formularios y gestión de estado.
   */
  constructor(
    private fb: FormBuilder,
    @Inject(BsModalService)
    private modalService: BsModalService,
    public solicitudService: SolicitudService,
    public solicitud32605Store: Solicitud32605Store,
    public solicitud32605Query: Solicitud32605Query,
    
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
   
  }

  /**
   * Ciclo de vida ngOnInit: inicializa el formulario y se suscribe al estado de la solicitud.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
  }



   /**
   * Inicializa el formulario `transportistaCertificacionForm` con los valores actuales
   * del estado `solicitud32605State`.
   *
   * Algunos campos están deshabilitados porque no deben ser editables por el usuario.
   * Aplica validaciones como `required`, `email`, y un patrón para el teléfono.
   *
   * Además, se suscribe a los cambios del estado de la solicitud (`selectSolicitud$`)
   * y actualiza los valores del formulario mediante `patchValue`.
   *
   * @returns {void}
   */
  inicializarFormulario(): void {
    this.transportistaCertificacionForm = this.fb.group({
      rfcEnclaveOperativo:[this.solicitudState?.rfcEnclaveOperativo, Validators.required],
      enlaceOperativorfc: [
        {value:this.solicitudState?.enlaceOperativorfc, disabled: true}
      ],
      denominacionRazonsocial: [
        {value:this.solicitudState?.denominacionRazonsocial, disabled: true}
      ],
      domicilio: [{value:this.solicitudState?.domicilio, disabled: true}],
      ccat: [{value:this.solicitudState?.ccat, disabled: true}],
  
    })
  }

  mostrar_colapsable1(index: number): void {
    const IS_CURRENTLY_OPEN = this.panels1[index].isCollapsed;
    this.panels1.forEach((panel1, i) => {
      panel1.isCollapsed = i === index ? !IS_CURRENTLY_OPEN : true;
    });
  }
   abrirModal1(templateTransposrtistas: TemplateRef<void>): void {
      this.modalRefabir = this.modalService.show(templateTransposrtistas, { class: 'modal-lg',});
    }

     buscarRFC():void{
    const RFC = this.transportistaCertificacionForm.get('rfcEnclaveOperativo')?.value;
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
    return this.transportistasLista.some(empresa => 
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

    this.modalRefabir = this.modalService.show(this.templateRFCDuplicado, MODAL_CONFIG);
  }

   buscarDatosPorRFC(rfc: string): void {
    this.solicitudService.conseguirTransportistasLista(rfc)
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
  patchearDatosEmpresa(empresaData: TransportistasListaInterface): void {
      this.transportistaCertificacionForm.patchValue({
        enlaceOperativorfc: empresaData.enlaceOperativorfc,
        denominacionRazonsocial: empresaData.denominacionRazonsocial,
        domicilio: empresaData.domicilio,
        ccat: empresaData.ccat
      });
    }
     limpiarCamposEmpresa(): void {
      this.transportistaCertificacionForm.patchValue({
        enlaceOperativorfc: '',
        denominacionRazonsocial: '',
        domicilio: '',
        ccat: ''
      });
    }
 aceptarTransportista(): void {
  // if (this.transportistaCertificacionForm.valid) {
  //   const FORM_DATA = this.transportistaCertificacionForm.getRawValue();
    
  //   const NEW_TRANSPORTISTA: TransportistasTable = {
  //     rfcEnclaveOperativo: FORM_DATA.rfcEnclaveOperativo,
  //     denominacionRazonsocial: FORM_DATA.denominacionRazonsocial,
  //     domicilio: FORM_DATA.domicilio,
  //     ccat: FORM_DATA.ccat
  //   };


  //   if (this.isEditMode) {
  //     // If editing, find and update the existing item
  //     // You'll need to implement edit logic with an index or ID
  //     // For now, just adding to the list
  //     this.transportistasLista.push(NEW_TRANSPORTISTA);
  //   } else {
  //     // Add new transportista to the list
  //     this.transportistasLista.push(NEW_TRANSPORTISTA);
  //   }

  //   // Close modal and reset form
  //   this.modalRefabir?.hide();
  //   this.limpiarTransportista();
  //   this.isEditMode = false;
  // } else {
  //   // Mark all fields as touched to show validation errors
  //   Object.keys(this.transportistaCertificacionForm.controls).forEach(key => {
  //     this.transportistaCertificacionForm.get(key)?.markAsTouched();
  //   });
  // }
  //this.mostrarModalExito();
    const RFC_VALUE = this.transportistaCertificacionForm.get('rfcEnclaveOperativo')?.value;
    
    // Verificar que el campo RFC requerido esté lleno
    if (!RFC_VALUE?.trim()) {
      this.transportistaCertificacionForm.get('rfcEnclaveOperativo')?.markAsTouched();
      this.mostrarModalDatos();
      return;
    }
     // Check if user entered RFC but didn't search (other fields are empty)
  const DENOMINACION = this.transportistaCertificacionForm.get('denominacionRazonsocial')?.value;
  const DOMICILIO = this.transportistaCertificacionForm.get('domicilio')?.value;
  const ENLACE_RFC = this.transportistaCertificacionForm.get('enlaceOperativorfc')?.value;
  
  if (RFC_VALUE?.trim() && (!DENOMINACION?.trim() && !DOMICILIO?.trim() && !ENLACE_RFC?.trim())) {
    this.mostrarModalDatosObligatorios();
    return;
  }
    // In edit mode, check if RFC exists in other records (excluding current one)
    if (this.isEditMode && this.existeRFCEnTablaExcluyendo(RFC_VALUE, this.selectedTransportista?.rfcEnclaveOperativo)) {
      this.mostrarModalDatosObligatorios();
      return;
    }
    // In add mode, check if RFC already exists
    if (!this.isEditMode && this.existeRFCEnTabla(RFC_VALUE)) {
      this.mostrarModalDatosObligatorios();
      return;
    }
    
    // Proceder con agregar los datos
    const FORMDATOS = this.transportistaCertificacionForm.getRawValue();
    
    const EMPRESA_DATA: TransportistasTable = {
      rfcEnclaveOperativo: FORMDATOS.rfcEnclaveOperativo,
      denominacionRazonsocial: FORMDATOS.denominacionRazonsocial,
      domicilio: FORMDATOS.domicilio,
      ccat: FORMDATOS.ccat
    };

    if (this.isEditMode && this.selectedTransportista) {
      // Update existing record
      const INDEX = this.transportistasLista.findIndex(emp => 
        emp.rfcEnclaveOperativo === this.selectedTransportista?.rfcEnclaveOperativo
      );
      if (INDEX !== -1) {
        this.transportistasLista[INDEX] = EMPRESA_DATA;
        this.transportistasLista = [...this.transportistasLista]; // Trigger change detection
      }
    } else {
      // Add new record
      this.transportistasLista = [...this.transportistasLista, EMPRESA_DATA];
    }
    
    this.modalRefabir?.hide();
    this.limpiarFormulario();
    this.resetEditMode();
    
    this.mostrarModalExito();
}

existeRFCEnTablaExcluyendo(rfc: string, rfcExcluir?: string): boolean {
  return this.transportistasLista.some(empresa => 
    empresa.rfcEnclaveOperativo?.toLowerCase() === rfc.toLowerCase() &&
    empresa.rfcEnclaveOperativo?.toLowerCase() !== rfcExcluir?.toLowerCase()
  );
}
  mostrarModalExito(): void {
    const MODAL_CONFIG = {
      animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-sm'
    };

    this.modalRefExito = this.modalService.show(this.templateExito, MODAL_CONFIG);
  }
limpiarTransportista(): void {
  this.transportistaCertificacionForm.reset();
  this.inicializarFormulario();
}
  limpiarFormulario(): void {
    this.transportistaCertificacionForm.reset();
    this.transportistaCertificacionForm.patchValue({
      rfcEnclaveOperativo: '',
      enlaceOperativorfc: '',
      denominacionRazonsocial: '',
      domicilio: '',
      ccat:''
    });
    this.resetEditMode();
  }
resetEditMode(): void {
  this.isEditMode = false;
  this.selectedTransportista = null;
 
}
    cancelarModal(): void {
      this.modalRefabir?.hide();
      this.limpiarTransportista();
    }
    cerrarModalExito(): void {
    this.modalRefExito?.hide();
  }
  cerrarModalDatosObligatorios(): void {
  this.modalRefDatosObligatorios?.hide();
}
mostrarModalDatosObligatorios(): void {
  const MODAL_CONFIG = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm'
  };

  this.modalRefDatosObligatorios = this.modalService.show(this.templateDatosObligatorios, MODAL_CONFIG);
}
  mostrarModalDatos(): void {
    const MODAL_CONFIG = {
      animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-sm'
    };

    this.modalRefDatos = this.modalService.show(this.templateDatos, MODAL_CONFIG);
  }
   cerrarModalDatos(): void {
    this.modalRefDatos?.hide();
  }
  modificarTransportista(): void {
 if (this.transportistasLista.length === 0 || !this.selectedTransportista) {
    this.mensajeSeleccion = 'Seleccione un registro.';
    this.mostrarModalSeleccionRequerida();
    return;
  }
  
  this.isEditMode = true;
  
  // Clear only the RFC field and patch other fields from selected row
  this.transportistaCertificacionForm.patchValue({
    rfcEnclaveOperativo: '', // Blank RFC
    enlaceOperativorfc: this.selectedTransportista.rfcEnclaveOperativo,
    denominacionRazonsocial: this.selectedTransportista.denominacionRazonsocial,
    domicilio: this.selectedTransportista.domicilio,
    ccat: this.selectedTransportista.ccat || ''
  });
  // Open the modal
  this.abrirModal1(this.templateTransposrtistas);
}
mostrarModalSeleccionRequerida(): void {
  const MODAL_CONFIG = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm'
  };

  this.modalRefabir = this.modalService.show(this.templateSeleccionRequerida, MODAL_CONFIG);
}
cerrarModalSeleccionRequerida(): void {
  this.modalRefabir?.hide();
}
 onFilaSeleccionada(empresa: TransportistasTable): void {
  this.selectedTransportista = empresa;
}
eliminarTransportista(): void {
 if (this.transportistasLista.length === 0 || !this.selectedTransportista) {
    this.mensajeSeleccion = 'Debe seleccionar un elemento';
    this.mostrarModalSeleccionRequerida();
    return;
    
  }
  this.mostrarModalConfirmacionEliminacion();
}
mostrarModalConfirmacionEliminacion(): void {
  const MODAL_CONFIG = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-m'
  };

  this.modalRefabir = this.modalService.show(this.templateConfirmacionEliminacion, MODAL_CONFIG);
}

confirmarEliminacionTransportista(): void {
  if (!this.selectedTransportista) {
    return;
  }
  
  // Remove the selected company from the table
  this.transportistasLista = this.transportistasLista.filter(empresa => 
    empresa.rfcEnclaveOperativo !== this.selectedTransportista?.rfcEnclaveOperativo
  );
  
  // Clear selection
  this.selectedTransportista = null;
  
  // Close confirmation modal and show success
  this.modalRefabir?.hide();
  this.mensajeSeleccion = 'Datos eliminados correctamente';
  this.mostrarModalSeleccionRequerida();
}
cerrarModalConfirmacionEliminacion(): void {
  this.modalRefabir?.hide();
}
  /**
   * Ciclo de vida ngOnDestroy: finaliza el observable para prevenir fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

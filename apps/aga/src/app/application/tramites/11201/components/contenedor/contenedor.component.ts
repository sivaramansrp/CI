import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosTramiteService } from 'libs/shared/data-access-user/src/core/services/11201/datos-tramite.service';
// import mockData from 'libs/shared/theme/assets/json/11202/contenedor-mockdata.json';
@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrl: './contenedor.component.scss',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class ContenedorComponent implements OnInit {

  solicitudForm!: FormGroup;
  showAdjuntarArchivo: boolean = false;
  showSeccionAduanaaFecha: boolean = false;
  showSeccionContenedor: boolean = false;
  showSeccionNoManifiesto: boolean = false;
  showSeccionExcel: boolean = false;
  mostrarMensaje: boolean = false;
  mensajeCamposObligatorios: string = 'Faltan campos por capturar.';
  aduanas: any[] = [];
  contenedores: any[] = [];
  requiereGuardadoParcial: boolean = false;
  currentIdx: number = 0;

  constructor(
    private fb: FormBuilder,
    private datosTramiteService: DatosTramiteService,
    // private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.cargarCatalogos();
    this.tabSeleccionado();
  }

  initializeForm(): void {
    this.solicitudForm = this.fb.group({
      solicitud: this.fb.group({
        idSolicitud: [''],
      }),
      esPendiente: [''],
      tipoBusqueda: ['', Validators.required],
      aduana: ['', Validators.required],
      fechaIngreso: [{ value: '', disabled: true }, Validators.required],
      inicialesContenedor: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[a-zA-Z0-9]+$')]],
      numeroContenedor: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],
      digitoDeControl: ['', [Validators.maxLength(1), Validators.pattern('^[0-9]$')]],
      contenedores: ['', Validators.required],
      tipoTransporte: ['', Validators.required],
      numManifiesto: ['', [Validators.required, Validators.maxLength(50)]],
      archivoSeleccionado: [{ value: '', disabled: true }, Validators.required]
    });
    this.solicitudForm
      .get('inicialesContenedor')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          const sanitized = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
          this.solicitudForm
            .get('inicialesContenedor')
            ?.setValue(sanitized, { emitEvent: false });
        }
      });

    this.solicitudForm
      .get('numeroContenedor')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          const sanitized = value.replace(/[^a-zA-Z0-9]/g, '');
          this.solicitudForm
            .get('numeroContenedor')
            ?.setValue(sanitized, { emitEvent: false });
        }
      });
    this.solicitudForm
      .get('digitoDeControl')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          const sanitized = value.replace(/[^0-9]/g, '');
          this.solicitudForm
            .get('digitoDeControl')
            ?.setValue(sanitized, { emitEvent: false });
        }
      });
    // Escuchar cambios en tipoBusqueda para mostrar secciones
    this.solicitudForm.get('tipoBusqueda')?.valueChanges.subscribe(() => {
      this.mostrarCampos();
    });

    // Escuchar cambios en tipoTransporte
    this.solicitudForm.get('tipoTransporte')?.valueChanges.subscribe(value => {
      this.seleccionCatalogo(value);
    });
  }

  cargarCatalogos(): void {
    // Cargar catálogo de aduanas
    this.datosTramiteService.getAduanas().subscribe(
      (data) => {
        this.aduanas = data;
      },
      (error) => {
        console.error('Error al cargar aduanas', error);
      }
    );

    // Cargar catálogo de contenedores
    this.datosTramiteService.getContenedores().subscribe(
      (data) => {
        this.contenedores = data;
      },
      (error) => {
        console.error('Error al cargar contenedores', error);
      }
    );

    // Verificar si requiere guardado parcial
    // this.datosTramiteService.checkRequiereGuardadoParcial().subscribe(
    //   (data) => {
    //     this.requiereGuardadoParcial = data;
    //   },
    //   (error) => {
    //     console.error('Error al verificar guardado parcial', error);
    //   }
    // );
  }

  mostrarCampos(): void {
    const tipoBusqueda = this.solicitudForm.get('tipoBusqueda')?.value;
    this.showAdjuntarArchivo = false;
    this.showSeccionAduanaaFecha = false;
    this.showSeccionContenedor = false;
    this.showSeccionNoManifiesto = false;
    this.showSeccionExcel = false;

    switch (tipoBusqueda) {
      case 'Contenedor':
        this.showSeccionContenedor = true;
        this.showSeccionAduanaaFecha = true;
        break;
      case 'No. de Manifiesto':
        this.showSeccionNoManifiesto = true;
        break;
      case 'Archivo CSV':
        this.showSeccionExcel = true;
        break;
      default:
        break;
    }
  }

  limpiarCampos(): void {
    this.solicitudForm.reset();
    // Resetear banderas y estados adicionales
    this.showAdjuntarArchivo = false;
    this.showSeccionAduanaaFecha = false;
    this.showSeccionContenedor = false;
    this.showSeccionNoManifiesto = false;
    this.showSeccionExcel = false;
    this.mostrarMensaje = false;
    // Deshabilitar controles específicos si es necesario
    this.solicitudForm.get('fechaIngreso')?.disable();
    this.solicitudForm.get('archivoSeleccionado')?.disable();
  }

  validarDigitoVerificador(): void {
    const digito = this.solicitudForm.get('digitoDeControl')?.value;
    if (digito && digito.length === 1 && /^[0-9]$/.test(digito)) {
      // Dígito válido, proceder con la lógica de agregar
      this.agregarSolicitud();
    } else {
      // Mostrar mensaje de validación
      this.mostrarMensaje = true;
    }
  }

  seleccionCatalogo(value: string): void {
    // Manejar selección de tipoTransporte
    if (value === '1') {
      // Lógica para FERROVIARIO
    } else if (value === '2') {
      // Lógica para MARÍTIMO
    }
    // Lógica adicional si es requerida
  }

  adjuntarArchivo(): void {
    // Implementar lógica de subida de archivos
    // Por ejemplo, activar un input de tipo file y subir el archivo mediante el servicio
    // Asegurarse de tener un <input type="file"> en el template con (change) event
  }

  enviarManifiesto(): void {
    if (this.solicitudForm.get('numManifiesto')?.valid && this.solicitudForm.get('tipoTransporte')?.valid) {
      const manifiestoData = this.solicitudForm.value;
      // this.datosTramiteService.enviarManifiesto(manifiestoData).subscribe(
      //   (response) => {
      //     // Manejar éxito, posiblemente mostrar mensaje o navegar
      //   },
      //   (error) => {
      //     console.error('Error al enviar manifiesto', error);
      //     // Mostrar mensaje de error
      //   }
      // );
    } else {
      this.mostrarMensaje = true;
    }
  }

  esPago(): void {
    if (this.solicitudForm.valid) {
      // Implementar lógica de pago y envío del formulario
      const solicitudData = this.solicitudForm.value;
      this.datosTramiteService.submitSolicitud(solicitudData).subscribe(
        (response) => {
          // Manejar envío exitoso
        },
        (error) => {
          console.error('Error al enviar solicitud', error);
          // Mostrar mensaje de error
        }
      );
    } else {
      this.mostrarMensaje = true;
    }
  }

  tabSeleccionado(): void {
    const currentIdx = localStorage.getItem('currentIdx');
    if (currentIdx !== null) {
      this.currentIdx = +currentIdx;
      // Implementar lógica para establecer la pestaña activa basada en currentIdx
      // Si se usa una librería de pestañas, establecer el índice activo según corresponda
    }
  }

  abrirModalCancelarTramite(): void {
    // this.modalService.open(content, { ariaLabelledBy: 'modalCancelarTraniteLabel' }).result.then((result) => {
    //   // Manejar acción al cerrar el modal si es necesario
    // }, (reason) => {
    //   // Manejar rechazo del modal si es necesario
    // });
  }
  guardarParcial(): void {

  }

  abrirModalEliminarPendiente(content: any): void {
    // this.modalService.open(content, { ariaLabelledBy: 'modalEliminarPendienteLabel' }).result.then((result) => {
    //   // Manejar acción al cerrar el modal si es necesario
    // }, (reason) => {
    //   // Manejar rechazo del modal si es necesario
    // });
  }

  cancelarRadioButton(): void {
    // Resetear botones de radio y campos relacionados
    this.solicitudForm.get('tipoBusqueda')?.setValue('');
    this.limpiarCampos();
  }

  eliminarTramitePendienteITC(): void {
    // const idSolicitud = this.solicitudForm.get('solicitud.idSolicitud')?.value;
    // this.datosTramiteService.eliminarTramitePendiente(idSolicitud).subscribe(
    //   (response) => {
    //     // Manejar éxito, posiblemente resetear formulario o mostrar mensaje
    //     this.limpiarCampos();
    //   },
    //   (error) => {
    //     console.error('Error al eliminar trámite pendiente', error);
    //     // Mostrar mensaje de error
    //   }
    // );
  }

  agregarSolicitud(): void {
    const solicitudData = this.solicitudForm.value;
    // this.datosTramiteService.agregarSolicitud(solicitudData).subscribe(
    //   (response) => {
    //     // Manejar éxito, posiblemente refrescar la grilla o mostrar mensaje
    //   },
    //   (error) => {
    //     console.error('Error al agregar solicitud', error);
    //     // Mostrar mensaje de error
    //   }
    // );
  }

  quitarErrorInput(selector: string): void {
    // Implementar lógica para quitar errores de entrada
    // Si se utiliza validación de formularios de Angular, esto puede no ser necesario
  }

}
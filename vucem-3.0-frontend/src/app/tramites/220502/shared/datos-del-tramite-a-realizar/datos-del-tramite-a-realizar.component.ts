import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { DatosDelTramiteRealizar } from '../../../../core/models/220502/solicitud-pantallas.model';
import { FECHA_INSPECCION } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { InputFecha } from '../../../../core/models/shared/components.model';
import { InputFechaComponent } from '../../../../shared/components/input-fecha/input-fecha.component';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudPantallasService } from '../../../../core/services/220502/solicitud-pantallas.service';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { Validators } from '@angular/forms';
import { inject } from '@angular/core';

/**
 * Componente para gestionar los datos del trámite a realizar.
 */
@Component({
  selector: 'app-datos-del-tramite-a-realizar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () =>
        inject<ControlContainer>(ControlContainer, { skipSelf: true }),
    },
  ],
  providers: [SolicitudPantallasService],
  templateUrl: './datos-del-tramite-a-realizar.component.html',
  styleUrl: './datos-del-tramite-a-realizar.component.scss',
})
/** Componente para gestionar los datos del trámite a realizar */
export class DatosDelTramiteARealizarComponent implements OnInit, OnDestroy {
  /**
   * Clave de entrada utilizada para identificar el control dentro del grupo de formulario principal.
   */
  @Input() claveDeControl: string = '';

  /**
   * Inyecta el contenedor de control del formulario principal.
   */
  parentContainer = inject(ControlContainer);

  /**
   * Getter para acceder al grupo de formularios principal.
   */
  get grupoFormularioPadre(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  /**
   * Opciones de selección de formulario para diferentes datos del catálogo.
   */
  certificadosAutorizados!: CatalogosSelect;

  /** Opciones de selección de formulario para diferentes datos del catálogo. */
  horaDeInspeccion!: CatalogosSelect;

  /** Opciones de selección de formulario para diferentes datos del catálogo. */
  aduanaDeIngreso!: CatalogosSelect;

  /** Opciones de selección de formulario para diferentes datos del catálogo. */
  sanidadAgropecuaria!: CatalogosSelect;

  /** Opciones de selección de formulario para diferentes datos del catálogo. */
  puntoDeInspeccion!: CatalogosSelect;

  /**
   * Campo de entrada de fecha inicializado con la constante FECHA_INSPECCION.
   */
  fechaInicioInput: InputFecha = FECHA_INSPECCION;

  /** Constructor para inyectar el servicio de solicitud de pantallas. */
  constructor(private solicitudService: SolicitudPantallasService) {
    // Se puede agregar aquí el código de inicialización si es necesario en el futuro.
  }

  /**
   * Gancho de ciclo de vida que inicializa los controles de formulario cuando se carga el componente.
   */
  ngOnInit(): void {
    if (this.claveDeControl) {
      this.grupoFormularioPadre.addControl(
        this.claveDeControl,
        new FormGroup({
          certificadosAutorizados: new FormControl('', [Validators.required]),
          horaDeInspeccion: new FormControl('', [Validators.required]),
          aduanaDeIngreso: new FormControl('', [Validators.required]),
          sanidadAgropecuaria: new FormControl('', [Validators.required]),
          puntoDeInspeccion: new FormControl('', [Validators.required]),
          fechaDeInspeccion: new FormControl('', [Validators.required]),
        })
      );
    }
    /** Cargar datos iniciales */
    this.cargarDatosIniciales();
  }

  /**
   * Maneja la selección de 'Certificados Autorizados' y actualiza el control del formulario.
   * @param e El artículo del catálogo seleccionado.
   */
  certificadosSeleccion(e: Catalogo): void {
    this.actualizarFormValue('certificadosAutorizados', e.descripcion);
  }

  /**
   * Maneja la selección de 'Hora de Inspección' y actualiza el control del formulario.
   * @param e El artículo del catálogo seleccionado.
   */
  horaDeSeleccion(e: Catalogo): void {
    this.actualizarFormValue('horaDeInspeccion', e.descripcion);
  }

  /**
   * Maneja la selección de 'Aduana de Ingreso' y actualiza el control del formulario.
   * @param e El artículo del catálogo seleccionado.
   */
  aduanaDeSeleccion(e: Catalogo): void {
    this.actualizarFormValue('aduanaDeIngreso', e.descripcion);
  }

  /**
   * Maneja la selección de 'Sanidad Agropecuaria' y actualiza el control del formulario.
   * @param e El artículo del catálogo seleccionado.
   */
  sanidadSeleccion(e: Catalogo): void {
    this.actualizarFormValue('sanidadAgropecuaria', e.descripcion);
  }

  /**
   * Maneja la selección de 'Punto de Inspección' y actualiza el control del formulario.
   * @param e El artículo del catálogo seleccionado.
   */
  puntoDeSeleccion(e: Catalogo): void {
    this.actualizarFormValue('puntoDeInspeccion', e.descripcion);
  }

  /**
   * Actualiza un control de formulario específico con un nuevo valor.
   * @param nombreDeControl El nombre del control a actualizar.
   * @param value El nuevo valor a establecer.
   */
  private actualizarFormValue(nombreDeControl: string, value: string): void {
    if (
      this.claveDeControl &&
      this.grupoFormularioPadre.contains(this.claveDeControl)
    ) {
      this.grupoFormularioPadre.controls[this.claveDeControl].patchValue({
        [nombreDeControl]: value,
      });
    }
  }

  /**
   * Carga datos del catálogo inicial para las selecciones de formulario.
   */
  cargarDatosIniciales(): void {
    const catalogoTemplate = (
      label: string,
      required: boolean,
      catalogos: Catalogo[]
    ): CatalogosSelect => ({
      labelNombre: label,
      required,
      primerOpcion: 'Selecciona un valor',
      catalogos: catalogos,
    });
  
    this.solicitudService.getData().subscribe({
      next: (data: DatosDelTramiteRealizar) => {
        this.certificadosAutorizados = catalogoTemplate(
          'Certificados autorizados pendientes',
          true,
          data.pendientesCertificados
        );
        this.horaDeInspeccion = catalogoTemplate(
          'Hora de inspección',
          true,
          data.horaInspeccion
        );
        this.aduanaDeIngreso = catalogoTemplate(
          'Aduana de ingreso',
          false,
          data.aduanaIngreso
        );
        this.sanidadAgropecuaria = catalogoTemplate(
          'Oficina de inspección de Sanidad Agropecuaria',
          false,
          data.sanidadAgropecuaria
        );
        this.puntoDeInspeccion = catalogoTemplate(
          'Punto de inspección',
          false,
          data.puntoInspeccion
        );
      }
    });
  }
  

  /**
   * Getter para acceder al grupo de formularios 'datosServicio'.
   */
  get datosServicio(): FormGroup {
    return this.grupoFormularioPadre.get('datosServicio') as FormGroup;
  }

  /**
   * Maneja los cambios en el campo de fecha de inicio.
   * @param nuevo_valor El nuevo valor de fecha seleccionado.
   */
  cambioFechaInicio(nuevo_valor: string): void {
    this.actualizarFormValue('fechaDeInspeccion', nuevo_valor);
  }

  /**
   * Gancho de ciclo de vida para limpiar los controles de formulario cuando se destruye el componente.
   */
  ngOnDestroy(): void {
    if (
      this.claveDeControl &&
      this.grupoFormularioPadre.contains(this.claveDeControl)
    ) {
      this.grupoFormularioPadre.removeControl(this.claveDeControl);
    }
  }
}

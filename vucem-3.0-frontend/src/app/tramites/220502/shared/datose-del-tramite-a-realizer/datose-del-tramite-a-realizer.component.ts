import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { FECHA_INSPECCION } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { InputFecha } from '../../../../core/models/shared/components.model';
import { InputFechaComponent } from '../../../../shared/components/input-fecha/input-fecha.component';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { Validators } from '@angular/forms';
import { inject } from '@angular/core';

@Component({
  selector: 'app-datose-del-tramite-a-realizer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TituloComponent,
    SelectCatalogosComponent,
    InputFechaComponent,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () =>
        inject<ControlContainer>(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './datose-del-tramite-a-realizer.component.html',
  styleUrl: './datose-del-tramite-a-realizer.component.scss',
})
export class DatoseDelTramiteARealizerComponent implements OnInit, OnDestroy {
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
  get grupoformulariopadre(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  /**
   * Opciones de selección de formulario para diferentes datos del catálogo.
   */
  certificadosAutorizados!: CatalogosSelect;
  horaDeInspeccion!: CatalogosSelect;
  aduanaDeIngreso!: CatalogosSelect;
  sanidadAgropecuaria!: CatalogosSelect;
  puntoDeInspeccion!: CatalogosSelect;

  /**
   * Campo de entrada de fecha inicializado con la constante FECHA_INSPECCION.
   */
  fechaInicioInput: InputFecha = FECHA_INSPECCION;

  /**
   * Gancho de ciclo de vida que inicializa los controles de formulario cuando se carga el componente.
   */
  ngOnInit(): void {
    if (this.claveDeControl) {
      this.grupoformulariopadre.addControl(
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
    if (this.claveDeControl && this.grupoformulariopadre.contains(this.claveDeControl)) {
      this.grupoformulariopadre.controls[this.claveDeControl].patchValue({
        [nombreDeControl]: value,
      });
    }
  }

  /**
   * Carga datos del catálogo inicial para las selecciones de formulario.
   */
  cargarDatosIniciales(): void {
    const catalogoTemplate = (label: string, required: boolean, catalogos: Catalogo[]) => ({
      labelNombre: label,
      required,
      primerOpcion: 'Selecciona un valor',
      catalogos: catalogos,
    });

    const pendientesCertificados = [
      { id: 1, descripcion: 'Certificado de Exportación', tam: 'A4', dpi: '1234567890' },
      { id: 2, descripcion: 'Certificado Fitosanitario', tam: 'Carta', dpi: '0987654321' },
      { id: 3, descripcion: 'Certificado de Origen', tam: 'Legal', dpi: '1122334455' },
    ];
  
    const horaInspeccion = [
      { id: 1, descripcion: '08:00 AM - 10:00 AM', tam: '2 horas', dpi: 'INS001' },
      { id: 2, descripcion: '10:00 AM - 12:00 PM', tam: '2 horas', dpi: 'INS002' },
      { id: 3, descripcion: '01:00 PM - 03:00 PM', tam: '2 horas', dpi: 'INS003' },
    ];
  
    const aduanaIngreso = [
      { id: 1, descripcion: 'Aduana La Aurora', tam: 'Zona 13', dpi: 'ADU001' },
      { id: 2, descripcion: 'Aduana Puerto Quetzal', tam: 'Escuintla', dpi: 'ADU002' },
      { id: 3, descripcion: 'Aduana Santo Tomás', tam: 'Izabal', dpi: 'ADU003' },
    ];
  
    const sanidadAgropecuaria = [
      { id: 1, descripcion: 'Oficina Central de Sanidad', tam: 'Ciudad Capital', dpi: 'SAN001' },
      { id: 2, descripcion: 'Sanidad Agropecuaria Zona Norte', tam: 'Petén', dpi: 'SAN002' },
      { id: 3, descripcion: 'Sanidad Agropecuaria Puerto Barrios', tam: 'Izabal', dpi: 'SAN003' },
    ];
  
    const puntoInspección = [
      { id: 1, descripcion: 'Punto de Inspección Aérea', tam: 'Terminal de Carga', dpi: 'PIN001' },
      { id: 2, descripcion: 'Punto de Inspección Marítima', tam: 'Muelle Principal', dpi: 'PIN002' },
      { id: 3, descripcion: 'Punto de Inspección Terrestre', tam: 'Frontera Tecún Umán', dpi: 'PIN003' },
    ];
    this.certificadosAutorizados = catalogoTemplate('Certificados autorizados pendientes', true, pendientesCertificados);
    this.horaDeInspeccion = catalogoTemplate('Hora de inspección', true, horaInspeccion);
    this.aduanaDeIngreso = catalogoTemplate('Aduana de ingreso', false, aduanaIngreso);
    this.sanidadAgropecuaria = catalogoTemplate('Oficina de inspección de Sanidad Agropecuaria', false, sanidadAgropecuaria);
    this.puntoDeInspeccion = catalogoTemplate('Punto de inspección', false, puntoInspección);
  }

  /**
   * Getter para acceder al grupo de formularios 'datosServicio'.
   */
  get datosServicio(): FormGroup {
    return this.grupoformulariopadre.get('datosServicio') as FormGroup;
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
    if (this.claveDeControl && this.grupoformulariopadre.contains(this.claveDeControl)) {
      this.grupoformulariopadre.removeControl(this.claveDeControl);
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AlertComponent, Catalogo, CatalogoSelectComponent, CatalogosSelect, Importante, ImportanteCatalogoSeleccion, RenovacionesMuestrasMercanciasService, TituloComponent } from '@ng-mf/data-access-user';

/**
 * Componente para el registro de renovaciones de muestras de mercancías.
 * 
 * Este componente permite gestionar el formulario reactivo para el registro de muestras de mercancías,
 * incluyendo la obtención de opciones desplegables y la manipulación de varios controles de formulario.
 * 
 * @class
 * @implements {OnInit}
 */
@Component({
  selector: 'app-registro-renovaciones-muestras-mercancias',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertComponent,
    CatalogoSelectComponent,
    TituloComponent,
  ],
  providers: [RenovacionesMuestrasMercanciasService],
  templateUrl: './registro-renovaciones-muestras-mercancias.component.html',
  styleUrl: './registro-renovaciones-muestras-mercancias.component.scss',
})
export class RegistroRenovacionesMuestrasMercanciasComponent implements OnInit {
  /**
   * Formulario reactivo para el registro de muestras de mercancías.
   */
  formRegistroMuestras!: FormGroup;
  /**
   * Constante que contiene los textos importantes.
   */
  TEXTOS = Importante;
  /**
   * Variable que contiene las opciones del importador.
   */
  opcionDeImportador!: CatalogosSelect;
  /**
   * Variable que contiene las opciones de fracción arancelaria AGA.
   */
  fraccionArancelariaAga!: CatalogosSelect;
  /**
   * Propiedad que representa un catálogo de selección.
   * 
   * @type {CatalogosSelect}
   */
  nico!: CatalogosSelect;
  /**
   * Propiedad que representa un catálogo de selección genérico.
   * 
   * @type {CatalogosSelect}
   */
  ideGenerica!: CatalogosSelect;
  /**
   * Representa la selección de catálogo para la toma de muestra de despacho.
   * 
   * @type {CatalogosSelect}
   */
  tomaMuestraDespacho!: CatalogosSelect;
  /**
   * Indica si el panel de despacho o mercancía está activo.
   * 
   * @type {boolean}
   */
  panelDespachoOrMercancia: boolean = false;

  /**
   * Constructor de RegistroRenovacionesMuestrasMercanciasComponent.
   * 
   * @param fb - Instancia de FormBuilder para la creación y gestión de formularios reactivos.
   * @param renovacionesService - Servicio para manejar las operaciones relacionadas con renovaciones de muestras de mercancías.
   */
  constructor(
    public fb: FormBuilder,
    public renovacionesService: RenovacionesMuestrasMercanciasService
  ) {
     // Si es necesario, se puede agregar aquí la lógica de inicialización
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta una vez que el componente ha sido inicializado.
   * 
   * En este método se inicializa el formulario `formRegistroMuestras` con varios controles de formulario,
   * algunos de los cuales están deshabilitados y tienen valores predeterminados.
   * 
   * También se llama al método `getOpcionImportador` para obtener las opciones del importador.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.formRegistroMuestras = this.fb.group({
      opcionDeImportador: [''],
      tomaMuestraDespacho: [''],
      descMotivoFaltaMuestra: [{ value: 'no', disabled: true }],
      comboFraccionConcatenada: [''],
      fraccionConcatenada: [''],
      fracciondescripcion: [{ value: 'Vacas lecheras.', disabled: true }],
      comboNicos: [''],
      nicoDescripcion: [{ value: 'Vacas lecheras.', disabled: true }],
      nombreQuimico: [
        { value: 'Nombre Quimico', disabled: true },
        [Validators.maxLength(256)],
      ],
      nombreComercial: [
        { value: 'Nombre Comercial', disabled: true },
        [Validators.maxLength(256)],
      ],
      numeroCAS: [
        { value: '34524', disabled: true },
        [Validators.maxLength(120)],
      ],
      ideGenerica: [{ value: 'gaseoso', disabled: true }],
      descClobGenerica: [{ value: '', disabled: true }],
    });
    this.getOpcionImportador();
  }

  /**
   * Obtiene las opciones desplegables del importador y las asigna a las propiedades correspondientes.
   * 
   * Este método realiza una solicitud al servicio `renovacionesService` para obtener las opciones
   * desplegables relacionadas con el importador y las asigna a las propiedades de la clase.
   * 
   * @returns {void} No retorna ningún valor.
   */
  getOpcionImportador(): void {
    this.renovacionesService.obtenerOpcionesDesplegables().subscribe({
      next: (res: ImportanteCatalogoSeleccion) => {
        this.opcionDeImportador = res.importadorExportadorPrevio;
        this.fraccionArancelariaAga = res.fraccionArancelariaAga;
        this.nico = res.nico;
        this.ideGenerica = res.ideGenerica;
        this.tomaMuestraDespacho = res.tomaMuestraDespacho;
      },
    });
  }

  /**
   * Muestra la descripción de la fracción arancelaria.
   * 
   * @param {Catalogo} valor - El objeto de catálogo que contiene la descripción de la fracción arancelaria.
   * 
   * Actualiza el campo oculto y el control de descripción en el formulario con la descripción de la fracción arancelaria.
   * Si la descripción contiene un guion (' - '), se toma la parte después del guion como la descripción.
   */
  mostrarDescFraccArancelaria(valor: Catalogo): void {
    let descripcion = '';
    if (valor) {
      const parts = valor.descripcion.split(' - ');
      if (parts.length >= 2) {
        descripcion = parts[1];
      }
    }
    this.formRegistroMuestras.patchValue({
      fraccionConcatenada: valor.descripcion,
      fracciondescripcion: descripcion,
    });
  }

  /**
   * Muestra u oculta el panel de trámite basado en el evento recibido.
   *
   * @param {Catalogo} event - El evento que contiene el id para determinar la acción.
   * @returns {void}
   */
  mostrarOcultarPanelTramite(event: Catalogo): void {
    const valor = event.id;
    if (valor === 1) {
      this.panelDespachoOrMercancia = true;
    } else {
      this.panelDespachoOrMercancia = false;
    }
  }

  /**
   * Cambia el estado del campo 'descMotivoFaltaMuestra' en el formulario 'formRegistroMuestras'
   * basado en el valor del evento recibido.
   *
   * @param {Catalogo} event - El evento que contiene el id para determinar el estado del campo.
   * 
   * - Si el id del evento es 1, habilita el campo 'descMotivoFaltaMuestra'.
   * - Si el id del evento es 0, deshabilita el campo 'descMotivoFaltaMuestra' y limpia su valor.
   * - Para cualquier otro valor del id, deshabilita el campo 'descMotivoFaltaMuestra'.
   */
  cambiaEstadoMotivo(event: Catalogo): void {
    const valor = event.id;
    if (valor === 1) {
      this.formRegistroMuestras.get('descMotivoFaltaMuestra')?.enable();
    } else if (valor === 0) {
      this.formRegistroMuestras.patchValue({ descMotivoFaltaMuestra: '' });
      this.formRegistroMuestras.get('descMotivoFaltaMuestra')?.disable();
    } else {
      this.formRegistroMuestras.get('descMotivoFaltaMuestra')?.disable();
    }
  }
}

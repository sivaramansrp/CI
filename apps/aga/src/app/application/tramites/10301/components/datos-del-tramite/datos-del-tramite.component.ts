import { AlertComponent, CatalogoSelectComponent, CatalogosSelect, CrosslistComponent, InputRadioComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportadorExportadorService } from '@ng-mf/data-access-user';

/**
 * Texto de adjuntar para terceros.
 */
const TERCEROS_TEXTO_DE_ADJUNTAR =
  'Debes capturar la descripción de la mercancía en los mismos términos de la carta de donación';
/**
 * Componente que representa los datos del trámite.
 */
@Component({
  selector: 'app-datos-del-tramite',
  templateUrl: './datos-del-tramite.component.html',
  styles: [`.scrollable-table-container {
    max-height: 400px;
    overflow-y: auto;
    overflow-x: auto;
    border: 1px solid #ddd;
    display: block;
  }
  
  .alert-with-checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .alert-with-checkbox input[type="checkbox"] {
    margin-right: 10px;
  }
  
  .table-active {
    background-color: #e9ecef;
    cursor: pointer;
  }
  
  .table-hover tr:hover {
    background-color: #f8f9fa;
    cursor: pointer;
  }
  
  .btn {
    white-space: nowrap;
  }
  .table-container {
    max-height: 400px;
    overflow-y: auto;
    overflow-x: scroll;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
  }
  
  table td {
    word-wrap: break-word;
  }
  table {
    margin-bottom: 0;
    table-layout: fixed;
  }
  
  .transfer-list {
    height: 200px;
    border: 2px solid #dee2e6;
    border-radius: 0.25rem;
    overflow-y: scroll;
  }
  
  .transfer-list option {
    padding: 8px 12px;
    cursor: pointer;
  }
  
  .transfer-list option:hover {
    background-color: #f8f9fa;
  }
  
  .transfer-list option:checked {
    background-color: #e9ecef;
  }
  
  .btn {
    white-space: nowrap;
  }
  `],
  standalone: true,
  imports:[CommonModule,CatalogoSelectComponent,TituloComponent,TableComponent,AlertComponent,CrosslistComponent,InputRadioComponent, FormsModule,ReactiveFormsModule]
})
export class DatosDelTramiteComponent implements OnInit {
  /**
   * Texto de adjuntar para terceros.
   */
  TEXTO_DE_ADJUNTAR: string = TERCEROS_TEXTO_DE_ADJUNTAR;

  /**
   * Indica si la tabla debe mostrarse.
   */
  showTabla = true;

  /**
   * Indica si el popup está abierto.
   */
  isPopupOpen = false;

  /**
   * Indica si el popup está cerrado.
   */
  isPopupClose = true;

  /**
   * Lista de fines elegidos.
   */
  finesElegidos: string[] = [];

  /**
   * Lista de fines elegidos seleccionados.
   */
  elegidosSeleccionados: string[] = [];

  /**
   * Catálogo de aduanas.
   */
  aduana!: CatalogosSelect;

  /**
   * Catálogo de años.
   */
  ano!: CatalogosSelect;

  /**
   * Catálogo de condiciones.
   */
  condicion!: CatalogosSelect;

  /**
   * Catálogo de países.
   */
  pais!: CatalogosSelect;

  /**
   * Lista de rangos de días seleccionados.
   */
  selectRangoDias: string[] = [];

  /**
   * Lista de fechas seleccionadas.
   */
  fechasSeleccionadas: string[] = [
    'Enseñanza',
    'Investigación',
    'Salud Publica',
    'Servicio Social',
    'Culturales',
  ];

  /**
   * Lista de datos de fechas disponibles.
   */
  fechasDatos: string[] = [];
  /**
   * Control de formulario para la fecha.
   */
  fecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha seleccionada.
   */
  fechaSeleccionada: FormControl = new FormControl('');

  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  botonField = [
    {
      btnNombre: 'Agregar',
      class: 'btn-primary',
      funcion: () => this.agregar(''),
    },
    {
      btnNombre: 'Agregar todo',
      class: 'btn-default',
      funcion: () => this.agregar('t'),
    },
    {
      btnNombre: 'Remover',
      class: 'btn-danger',
      funcion: () => this.quitar(''),
    },
    {
      btnNombre: 'Remover todo',
      class: 'btn-default',
      funcion: () => this.quitar('t'),
    },
  ];

  /**
   * Constructor que se utiliza para la inyección de dependencias.
   * @param importarExportar Servicio de importador/exportador.
   */
  constructor(private importarExportar: ImportadorExportadorService) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.getAduanaIngresara();
    this.getAno();
    this.getCondicion();
    this.getPais();
  }

  /**
   * Agrega elementos a la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  agregar(tipo: string) {
    if (tipo === 't') {
      this.fechasSeleccionadas = [...this.selectRangoDias];
      this.fechasDatos = [];
    } else {
      const FECHA_VALOR = this.fecha.value.map(Number);
      this.fechasSeleccionadas.push(this.fechasDatos[FECHA_VALOR]);
      this.fechasDatos.splice(FECHA_VALOR, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitar(tipo: string = '') {
    if (tipo === 't') {
      this.fechasDatos = [...this.fechasSeleccionadas];
      this.fechasSeleccionadas = [];
    } else {
      const FECHA_VALOR = this.fechaSeleccionada.value.map(Number);
      this.fechasDatos.push(this.fechasSeleccionadas[FECHA_VALOR]);
      this.fechasSeleccionadas.splice(FECHA_VALOR, 1);
    }
  }

  /**
   * Opciones de radio.
   */
  radioOpcions = [
    { label: 'Sí', value: 'sí' },
    { label: 'No', value: 'no' },
  ];

  /**
   * Valor seleccionado del radio.
   */
  valorSeleccionado: string | null = null;

  /**
   * Encabezados de la tabla.
   */
  encabezadosTabla: string[] = [
    'Fines a los que se destinará la mercancía',
    'Tipo de mercancía',
    'Both',
    'Año',
    'Modelo',
    'Marca',
    'Número de serie',
    'Uso específico de la mercancía',
  ];

  /**
   * Cambia el valor seleccionado del radio.
   * @param value Valor seleccionado.
   */
  cambiarRadio(value: string | number) {
    this.valorSeleccionado = value as string;
  }

  /**
   * Obtiene el catálogo de aduanas.
   */
  getAduanaIngresara(): void {
    this.importarExportar.getAduanaIngresara().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.aduana = {
          labelNombre: 'Aduana por la que ingresará la mercancía',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene el catálogo de años.
   */
  getAno(): void {
    this.importarExportar.getAno().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.ano = {
          labelNombre: 'Año',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene el catálogo de condiciones.
   */
  getCondicion(): void {
    this.importarExportar.getCondicion().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.condicion = {
          labelNombre: 'Condición de la mercancía',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene el catálogo de países.
   */
  getPais(): void {
    this.importarExportar.getPais().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.pais = {
          labelNombre: 'País',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Abre el popup.
   */
  openPopup() {
    this.isPopupOpen = true;
  }

  /**
   * Cierra el popup.
   */
  closePopup() {
    this.isPopupOpen = false;
    this.isPopupClose = false;
  }

  /**
   * Muestra la siguiente tabla.
   */
  nextTabla() {
    this.showTabla = false;
  }
}

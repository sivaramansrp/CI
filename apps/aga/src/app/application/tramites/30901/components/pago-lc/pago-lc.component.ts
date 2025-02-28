import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ImportanteCatalogoSeleccion } from '@ng-mf/data-access-user';
import { OnInit } from '@angular/core';
import { RenovacionesMuestrasMercanciasService} from '@ng-mf/data-access-user';
import { TableData } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';

/**
 * Componente para el manejo del pago de la línea de captura.
 *
 * @component
 * @selector 'app-pago-lc'
 * @templateUrl './pago-lc.component.html'
 * @styleUrl './pago-lc.component.scss'
 */
@Component({
  selector: 'app-pago-lc',
  templateUrl: './pago-lc.component.html',
  styleUrl: './pago-lc.component.scss',
})
export class PagoLCComponent implements OnInit {
  /**
   * Formulario para el pago de la línea de captura.
   */
  formPagoLC!: FormGroup;
  /**
   * Datos de la tabla utilizados en el componente Pago LC.
   * @type {TableData}
   */
  tableData!: TableData;

  /**
   * Constructor de la clase PagoLcComponent.
   *
   * @param fb - Instancia de FormBuilder para la creación y manejo de formularios reactivos.
   * @param renovacionesService - Servicio para manejar las renovaciones de muestras de mercancías.
   */
  constructor(
    public fb: FormBuilder,
    private renovacionesService: RenovacionesMuestrasMercanciasService
  ) {
    // Si es necesario, se puede agregar aquí la lógica de inicialización
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * En este método se inicializa el formulario `formPagoLC` con dos campos:
   * - `lineaCaptura`: Campo de texto con una longitud máxima de 20 caracteres.
   * - `valorPago`: Campo de texto con un valor predeterminado de '4845' que está deshabilitado y tiene una longitud máxima de 20 caracteres.
   *
   * Además, se llama al método `obtenerDatosIniciales` para cargar los datos necesarios al iniciar el componente.
   */
  ngOnInit(): void {
    this.formPagoLC = this.fb.group({
      lineaCaptura: ['', [Validators.maxLength(20)]],
      valorPago: [
        { value: '4845', disabled: true },
        [Validators.maxLength(20)],
      ],
    });
    this.obtenerDatosIniciales();
  }

  /**
   * Método para obtener los datos iniciales necesarios para el componente.
   * Realiza una llamada al servicio de renovaciones para obtener las opciones desplegables
   * y asigna los datos de la tabla de tarifas de pago a la propiedad `tableData`.
   *
   * @returns {void}
   */
  obtenerDatosIniciales(): void {
    this.renovacionesService.obtenerOpcionesDesplegables().subscribe({
      next: (res: ImportanteCatalogoSeleccion) => {
        this.tableData = res.tablaDeTarifasDePago;
      },
    });
  }

  /**
   * Valida y formatea el campo 'lineaCaptura' del formulario 'formPagoLC'.
   *
   * Este método elimina todos los caracteres no alfanuméricos de la cadena
   * y convierte todos los caracteres a mayúsculas.
   *
   * @returns {void}
   */
  validarLineaCaptura(): void {
    this.formPagoLC.patchValue({
      lineaCaptura: this.formPagoLC
        .get('lineaCaptura')
        ?.value.replace(/[^a-zA-Z0-9]/g, '')
        .toUpperCase(),
    });
  }

  /**
   * Limpia los campos del formulario de pago LC.
   *
   * Este método restablece el campo 'lineaCaptura' del formulario 'formPagoLC' a su estado inicial.
   *
   * @returns {void} No retorna ningún valor.
   */
  limpiarCampos(): void {
    this.formPagoLC.get('lineaCaptura')?.reset();
  }
}

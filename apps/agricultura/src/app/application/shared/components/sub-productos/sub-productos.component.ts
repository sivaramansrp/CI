import { CatalogoSelectComponent, ConfiguracionColumna, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DetallasDatos, ProductoDetallaEventos, ProductosCatalogosDatos } from '../../models/datos-de-la-solicitue.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONFIGURACION_DETALLAS_DATOS } from '../../constantes/datos-de-la-solicitue.enum';
import { EventEmitter } from '@angular/core';
import { RadioOpcion } from '../../../tramites/220201/models/220201/certificado-zoosanitario.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sub-productos',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, TituloComponent, ReactiveFormsModule, TablaDinamicaComponent],
  templateUrl: './sub-productos.component.html',
  styleUrl: './sub-productos.component.scss',
})
export class SubProductosComponent implements OnInit, OnDestroy{
  /**
   * Representa el formulario reactivo utilizado para gestionar los datos de la mercancía
   * en el componente de detalles de animales vivos.
   * 
   * @type {FormGroup}
   */
  productosForm!: FormGroup;

public configuracionDetallasDatosTabla: ConfiguracionColumna<DetallasDatos>[] = CONFIGURACION_DETALLAS_DATOS;

public detallasDatosTablaDatos: DetallasDatos[] = [];

public detallasDatosTablaSeleccionada: DetallasDatos[] = [];
  /**
   * Representa el formulario reactivo utilizado para gestionar los detalles específicos
   * de los animales vivos, como número de lote, color de pelaje, edad, etc.
   * 
   * @type {FormGroup}
   */
  detalleForm!: FormGroup;

  /**
   * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
   * 
   * @type {Subject<void>}
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * Datos de la solicitud que se recibirán como entrada en el componente.
   * 
   * @type {ProductosCatalogosDatos}
   */
  @Input() catalogosDatos!: ProductosCatalogosDatos;

  /**
   * Opciones para el botón de radio.
   * @property {RadioOpcion[]} opcionDeBotonDeRadio
   */
  opcionDeBotonDeRadio: RadioOpcion[] = [
    {
      "label": "No",
      "value": "no"
    },
    {
      "label": "Sí",
      "value": "si"
    },
  ];

  /**
   * Evento que se emite cuando se agregan datos al formulario de solicitud de animales vivos.
   * Este evento permite al componente padre recibir los datos del formulario para su procesamiento.
   * 
   * @type {EventEmitter<ProductoDetallaEventos>}
   */
  @Output() agregarDatosFormulario = new EventEmitter<ProductoDetallaEventos>();

  /**
 * Constructor del componente.
 * 
 * @param fb FormBuilder para crear formularios reactivos.
 */
  constructor(private fb: FormBuilder,
    private ubicaccion: Location,
  ) {
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Aquí se crea el formulario reactivo y se configuran los campos necesarios.
   */
  ngOnInit(): void {
    this.crearFormulario();
  }


    crearFormulario(): void {
      this.productosForm = this.fb.group({
        tipoRequisito: ['', Validators.required],
        requisito: ['', Validators.required],
        numeroCertificado: ['', [Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
        fraccionArancelaria: ['', Validators.required],
        descripcionFraccion: [''],
        nico: ['', Validators.required],
        descripcionNico: [''],
        descripcion: ['', [Validators.maxLength(1000), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
        cantidadUMT: ['', [Validators.pattern(/^\d{1,12}(\.\d{1,3})?$/)]],
        umt: [{ value: '', disabled: true }, Validators.required],
        cantidadUMC: ['', [Validators.pattern(/^\d{1,12}(\.\d{1,3})?$/)]],
        umc: ['', Validators.required],
        especie: ['', Validators.required],
        uso: ['', Validators.required],
        paisOrigen: ['', Validators.required],
        paisDeProcedencia: ['', Validators.required],
        presentacion: [''],
        cantidadPresentacion: [''],
        tipoPresentacion: [''],
        tipoPlanta: [''],
        plantaAutorizadaOrigen: ['']
      });

      this.detalleForm = this.fb.group({
        numeroLote: ['', [Validators.maxLength(16), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
        rangoDeFecha: [''],

      });
    }

  /**
* Maneja la selección del botón de radio y actualiza el store.
* @method radioBotonSeleccionado
*/
  radioBotonSeleccionado(): void {
    const VALOR = this.detalleForm.value.rangoDeFecha;
    this.detalleForm.patchValue({
      rangoDeFecha: VALOR ? VALOR : ''
    });
  }

  /**
* Navega a la ubicación anterior en el historial de navegación.
* Utiliza el servicio de ubicación para retroceder una página.
*/
  cancelar(): void {
    this.ubicaccion.back();
  }

    /**
   * Método para agregar animales a la lista de datos sensibles.
   * Actualmente no implementa ninguna funcionalidad, pero se puede extender en el futuro.
   */
  agregarAnimales(): void {
    this.agregarDatosFormulario.emit(
      {
        formulario: this.productosForm.value,
        // tablaDatos: this.sensiblesTablaDatos
      }
    );
    this.ubicaccion.back();
  }
  
    /**
   * Limpia los datos relacionados con los animales vivos.
   * 
   * Este método vacía el arreglo `sensiblesTablaDatos` y reinicia el formulario `mercanciaForm`,
   * dejando ambos en su estado inicial. Útil para restablecer el formulario y los datos de la tabla
   * cuando se requiere comenzar una nueva operación o descartar los cambios actuales.
   */
  limpiarAnimalesVivo(): void {
    this.productosForm.reset();
  }

      /**
   * Método del ciclo de vida de Angular que se llama justo antes de destruir el componente.
   * Emite una señal a través del observable `destroy$` para notificar a los suscriptores que deben limpiar recursos y cancelar suscripciones.
   * Posteriormente, completa el observable para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

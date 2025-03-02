import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Componente para agregar mercancía.
 */
@Component({
  selector: 'app-agregar-mercancia',
  templateUrl: './agregar-mercancia.component.html',
  styleUrl: './agregar-mercancia.component.scss'
})
export class AgregarMercanciaComponent implements OnChanges, OnInit {
  /**
   * Formulario para agregar mercancía.
   */
  agregarMercanciaForm!: FormGroup;

  /**
   * Datos de mercancías recibidos como entrada.
   */
  @Input() mercanciasDatos = [{
    tbodyData: [] as string[]
  }];

  /**
   * Evento emitido cuando se cancela la acción.
   */
  @Output() cancelarEvento = new EventEmitter<boolean>();

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios.
   */
  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  /**
   * Método que se ejecuta cuando el componente se inicializa.
   * Aquí se debe inicializar el formulario con los datos de entrada.
   */
  ngOnInit(): void {
    if (this.mercanciasDatos && this.mercanciasDatos.length > 0) {
      this.setFormData();
    }
  }

  /**
   * Método para crear el formulario de agregar mercancía.
   */
  crearFormulario(): void {
    this.agregarMercanciaForm = this.fb.group({
      agregarMercancia: this.fb.group({
        fraccionArancelaria: [{ value: '', disabled: true }],
        descripcionFraccion: [{ value: '', disabled: true }],
        nico: [{ value: '', disabled: true }],
        descripcion: [{ value: '', disabled: true }],
        unidaddeMedidaDeUMT: [{ value: '', disabled: true }],
        cantidadTotalUMT: [{ value: '', disabled: true }],
        saldoPendiente: [{ value: '', disabled: true }],
        saldoACapturar: ['', [Validators.required, Validators.maxLength(16)]]
      })
    });
  }

  /**
   * Método para configurar los datos en el formulario con los valores de mercanciasDatos.
   */
  setFormData(): void {
    const DATA = this.mercanciasDatos[0].tbodyData;

    this.agregarMercanciaForm.patchValue({
      agregarMercancia: {
        fraccionArancelaria: DATA[0],
        descripcionFraccion: DATA[1],
        nico: DATA[2],
        descripcion: DATA[3],
        saldoACapturar: DATA[4],
        unidaddeMedidaDeUMT: DATA[5],
        saldoPendiente:  DATA[6],
        cantidadTotalUMT:  DATA[7]        
      }
    });
  }

  /**
   * Método que se ejecuta cuando cambian las propiedades de entrada.
   * @param changes Cambios detectados en las propiedades de entrada.
   */
  ngOnChanges(changes: SimpleChanges): void {
    const MERCANCIASDATOS = "mercanciasDatos"
    if (changes[MERCANCIASDATOS] && this.mercanciasDatos) {
      this.setFormData();
    }
  }

  /**
   * Método para cancelar la acción y emitir el evento correspondiente.
   */
  cerrarModal(estaConfirmado: boolean): void {
    if (estaConfirmado) {
      this.cancelarEvento.emit(false);
    }
  }
}

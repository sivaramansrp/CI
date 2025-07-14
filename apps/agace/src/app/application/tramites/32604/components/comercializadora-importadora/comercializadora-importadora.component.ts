import { Component } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FECHA_DE_PAGO } from '../../constants/empresas-comercializadoras.enum';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { Solicitud32604Store } from '../../estados/solicitud32604.store';
import { Solicitud32604Query } from '../../estados/solicitud32604.query';
import { EmpresasComercializadorasService } from '../../services/empresas-comercializadoras.service';

@Component({
  selector: 'app-comercializadora-importadora',
  standalone: true,
  imports: [ReactiveFormsModule, InputFechaComponent],
  templateUrl: './comercializadora-importadora.component.html',
  styleUrl: './comercializadora-importadora.component.scss',
})
export class ComercializadoraImportadoraComponent {
  /** Formulario reactivo para el componente importador-exportador */
  modalidadForm!: FormGroup;

  /**
   * Fecha de pago asociada a la solicitud.
   * Se inicializa con el valor constante `FECHA_DE_PAGO` que contiene la fecha predeterminada de pago.
   */
  fechaDePago: InputFecha = FECHA_DE_PAGO;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente donde se inicializan servicios y se cargan catálogos necesarios.
   */
  constructor(
    public fb: FormBuilder,
    public empresasComercializadorasService: EmpresasComercializadorasService,
    public solicitud32604Store: Solicitud32604Store,
    public solicitud32604Query: Solicitud32604Query,
    public consultaioQuery: ConsultaioQuery
  ) {}

  /**
   * Actualiza la fecha de pago en el store
   * @param evento Fecha de pago
   */
  actualizarFechaPago(evento: string): void {
    this.solicitud32604Store.actualizarFechaPago(evento);
  }
}

import { Component, Input, output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { Pedimento } from '../../../../core/models/shared/components.model';
import { DatosComponentePedimento } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { BooleanoSiNoPipe } from '../../../../shared/pipes/booleanoSiNo/booleano-si-no.pipe';

@Component({
  selector: 'c-pedimento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SharedModule, BooleanoSiNoPipe],
  templateUrl: './pedimento.component.html',
  styleUrl: './pedimento.component.scss',
})
export class PedimentoComponent {
  @Input({ required: true }) validacion!: boolean;
  @Input({ required: true }) datosNroPedimento!: DatosComponentePedimento;

  validaCampos = output<void>();

  pedimentoForm: FormControl = new FormControl('', [Validators.maxLength(7)]);

  hTabla: Array<string> = [
    'Patente',
    'Pedimento',
    'Aduana',
    'Tipo de pedimento',
    'Número(s)',
    'Comprobante Valor',
    'Pedimento Validado',
    'Accion',
  ];

  pedimentos: Array<Pedimento> = [];

  constructor(private validacionesService: ValidacionesFormularioService) {}

  get isValid() {
    return this.pedimentoForm.errors && this.pedimentoForm.touched;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['validacion']) {
      this.validacion = changes['validacion'].currentValue;
    }

    if (changes['datosNroPedimento']) {
      this.datosNroPedimento = changes['datosNroPedimento'].currentValue;
    }
  }
  agregaPedimento() {
    this.validaCampos.emit();
    this.acciones();
  }

  acciones() {
    if (this.validacion) {
      const nroPedimento = this.pedimentoForm.value
        ? parseInt(this.pedimentoForm.value)
        : 0;

      if (nroPedimento !== 0) {
        const pedimento = {
          patente: this.datosNroPedimento.patente,
          pedimento: nroPedimento,
          aduana: this.datosNroPedimento.idAduana,
          idTipoPedimento: 0,
          descTipoPedimento: 'Por evaluar',
          numero: '',
          comprobanteValor: '',
          pedimentoValidado: false,
        };
        this.pedimentos.push(pedimento);
      } else {
        alert('Necesita agregar un número de pedimento');
      }

      // 'No se pudo validar el pedimento, favor de capturar los datos de pedimento faltante y anexar documento.'
    } else {
      alert(
        'Necesita seleccionar una aduana de despacho y agregar un número de pedimento'
      );
    }
  }

  eliminar(i: number) {
    this.pedimentos.splice(i, 1)
    //modal de confirmacion de elimincacion
  }
}

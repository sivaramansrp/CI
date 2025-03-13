import { Component, Input, SimpleChanges, forwardRef, output } from '@angular/core';
import { DatosComponentePedimento, Pedimento } from '../../../../core/models/5701/tramite5701.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooleanoSiNoPipe } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

@Component({
  selector: 'c-pedimento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SharedModule, forwardRef(() => BooleanoSiNoPipe)],
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

  constructor(private validacionesService: ValidacionesFormularioService) { }

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
  agregaPedimento(): void {
    this.validaCampos.emit();
    this.acciones();
  }

  acciones(): void {
    if (this.validacion) {
      const nroPedimento = this.pedimentoForm.value
        ? parseInt(this.pedimentoForm.value, 10)
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

  eliminar(i: number): void {
    this.pedimentos.splice(i, 1)
    //modal de confirmacion de elimincacion
  }
}

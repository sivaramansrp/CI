import { Component } from '@angular/core';
import { InputFecha } from '../../../../core/models/shared/components.model';
import { FECHA_DE_PAGO } from '../../../../shared/constantes/issuance-extension-modification.enum';

@Component({
  selector: 'pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss'
})
export class PagoDeDerechosComponent {
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;
}

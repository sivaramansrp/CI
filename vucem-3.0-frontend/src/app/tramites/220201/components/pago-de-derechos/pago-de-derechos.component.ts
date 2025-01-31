import { Component } from '@angular/core';
import { FECHA_DE_PAGO } from '../../../../shared/constantes/issuance-extension-modification.enum';
import { InputFecha } from '../../../../core/models/shared/components.model';

@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss'
})
export class PagoDeDerechosComponent {
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;
}

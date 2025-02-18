import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-anexar-equisitos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anexar-equisitos.component.html',
  styleUrl: './anexar-equisitos.component.scss'
})
export class AnexarEquisitosComponent {
  documentos = [
    { tipo: 'Contrato de maquila, de compraventa, orden de compra o de servicios, o pedidos en firme vigentes.', fileUrl: '' },
    { tipo: 'Para acreditar el requisito de inversión en territorio nacional...', fileUrl: '' },
    { tipo: 'Comprobante de pago de derechos', fileUrl: '' },
    { tipo: 'Diagrama de flujo con una descripción detallada del proceso productivo...', fileUrl: '' },
    { tipo: 'Comprobante de pago de la contraprestación por el servicio recibido.', fileUrl: '' },
    { tipo: 'Comprobante de pago de las cuotas obrero patronales de los trabajadores.', fileUrl: '' }
  ];

  availableFiles = ['documento1.pdf', 'documento2.docx', 'documento3.xlsx'];

}

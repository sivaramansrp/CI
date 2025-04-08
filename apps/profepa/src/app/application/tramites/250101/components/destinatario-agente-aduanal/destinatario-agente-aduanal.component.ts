import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DESTINATARIO_OPCIONES_DE_BOTON_DE_RADIO } from '../../constantes/flora-fauna.enum';

import {
  CatalogoSelectComponent,
  InputRadioComponent,
  TableComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { DestinatarioService } from '../../services/destinatario.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-destinatario-agente-aduanal',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    InputRadioComponent,
    TituloComponent,
    ModalComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './destinatario-agente-aduanal.component.html',
  styleUrl: './destinatario-agente-aduanal.component.scss',
})
export class DestinatarioAgenteAduanalComponent implements OnInit {

  showTableDiv = true;

  showDestinatarioModal = false;

   destinatarioOpcionDeBotonDeRadio = DESTINATARIO_OPCIONES_DE_BOTON_DE_RADIO;

  constructor(private destinatarioService: DestinatarioService) {
    //
  }

  ngOnInit(): void {
    this.destinatarioService.getDestinatarioEncabezadoDeTabla().subscribe((data: any) => {
      this.tablaDestinatarioData = data.columns;
    });

    this.destinatarioService.getAduanalEncabezadoDeTabla().subscribe((data: any) => {
      this.tablaAgenteAduanalData = data.columns;
    });
  }

  tablaDestinatarioData: string[] = [];
  tablaAgenteAduanalData: string[] = [];

  cambiarDestinatario(): void {
    this.showTableDiv = !this.showTableDiv;
    this.showDestinatarioModal = !this.showDestinatarioModal;
  }

}

import { Component } from '@angular/core';

import { Catalogo } from '@ng-mf/data-access-user';
import { TEXTOS_REQUISITOS } from '../../constants/immex-ampliacion-sensibles.enums';


@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent {
  catalogoDocumentos: Catalogo[] = [];
  infoAlert = 'alert-info';
  TEXTOS = TEXTOS_REQUISITOS;
}

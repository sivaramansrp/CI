import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { TableComponent } from '@libs/shared/data-access-user/src';

import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';

import {OBRA_DE_ARTE_HEADER_DATA} from '../../constantes/aviso-siglos.enum';

import { AlertComponent } from '@libs/shared/data-access-user/src';

const MANIFIESTO_ALERT =
  'Manifiesto que la información sobre la propiedád de la obra(s) y los datos técnicos de la obra(s) son ciertos y verdaderos.*';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CatalogoSelectComponent,TableComponent, TablaDinamicaComponent,TituloComponent,AlertComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent{
dropdownData: Catalogo[]=[];

obraDeArteHeader = OBRA_DE_ARTE_HEADER_DATA;

TEXTO_MANIFIESTO_ALERT = MANIFIESTO_ALERT;

}

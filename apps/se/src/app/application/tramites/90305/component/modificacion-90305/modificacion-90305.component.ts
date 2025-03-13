/**
 * component Modification90305Component
 * @description
 * Este componente gestiona la modificación de datos en el trámite 90305.
 * Contiene múltiples subcomponentes que representan diferentes secciones del proceso de modificación.
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BtnContinuarComponent, DatosPasos, ListaPasosWizard, PASOS } from '@ng-mf/data-access-user';

import { ConsultadDomicilios90305Component } from '../consultad-domicilios-90305/consultad-domicilios-90305.component';
import { ListaDomicilios90305Component } from '../lista-domicilios-90305/lista-domicilios-90305.component';
import { Mercancias90305Component } from '../mercancias-90305/mercancias-90305.component';
import { ModificacionInfo90305Component } from '../modificacion-info-90305/modificacion-info-90305.component';
import { Plantas90305Component } from '../plantas-90305/plantas-90305.component';
import { ProductorIndirecto90305Component } from '../productorIndirecto-90305/productorIndirecto-90305.component';
import { Sector90305Component } from '../sector-90305/sector-90305.component';

/**
 * selector app-modification-90305
 * @standalone true
 */
@Component({
  selector: 'app-modificacion-90305',
  standalone: true,
  imports: [
    CommonModule,
    ConsultadDomicilios90305Component,
    ListaDomicilios90305Component,
    Plantas90305Component,
    Sector90305Component,
    Mercancias90305Component,
    ProductorIndirecto90305Component,
    ModificacionInfo90305Component,
    BtnContinuarComponent,
  ],
  templateUrl: './modificacion-90305.component.html',
  styleUrl: './modificacion-90305.component.scss',
})
export class Modificacion90305Component {
  /** Lista de pasos del asistente de modificación */
  pasos: ListaPasosWizard[] = PASOS;
  /** Índice actual del asistente */
  indice: number = 1;
  /** Datos relacionados con los pasos del asistente */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
}

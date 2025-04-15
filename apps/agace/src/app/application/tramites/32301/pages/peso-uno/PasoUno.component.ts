import { AdicionFraccionComponent } from '../../components/adicionFraccion/adicionFraccion.component'
import {AdicionProcesosComponent} from '../../components/adicionProcesos/adicionProcesos.component'
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FusionOEscisionComponent } from '../../components/fusionOEscision/fusionOEscision.component'
import { ModificacionGoceInmuebleComponent } from '../../components/modificacionGoceInmueble/modificacionGoceInmueble.component'
import { ModificacionSociosComponent } from '../../components/modificacionSocios/modificacionSocios.component'
import { ProveedorExtranjeroComponent } from '../../components/proveedorExtranjero/proveedorExtranjero.component'
import { SolicitanteComponent } from "@ng-mf/data-access-user";
import { TipoDeAvisoComponent } from "../../components/tipoDeAviso/tipoDeAviso.component"
export interface TipoDevAviso {
  foreignClientsSuppliers: boolean,
  nationalSuppliers: boolean,
  modificationsMembers: boolean,
  changesToLegalDocuments: boolean,
  mergerOrSplitNotice: boolean,
  additionFractions: boolean,
}

@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, TipoDeAvisoComponent, ProveedorExtranjeroComponent, ModificacionSociosComponent, ModificacionGoceInmuebleComponent, FusionOEscisionComponent, AdicionFraccionComponent, AdicionProcesosComponent],
  templateUrl: './PasoUno.component.html',
})
export class PasoUnoComponent {
  indice: number = 1;

  datosInputCheck :TipoDevAviso = {
    foreignClientsSuppliers: false,
    nationalSuppliers: false,
    modificationsMembers: false,
    changesToLegalDocuments: false,
    mergerOrSplitNotice: false,
    additionFractions: false,
    
  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }
  getValoreEnable(event: TipoDevAviso): void {
this.datosInputCheck = event
  }
}

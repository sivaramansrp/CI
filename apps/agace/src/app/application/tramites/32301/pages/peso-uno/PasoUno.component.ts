import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitanteComponent } from "@ng-mf/data-access-user";
import { TipoDeAvisoComponent } from "../../components/tipoDeAviso/tipoDeAviso.component"
import { ProveedorExtranjeroComponent } from '../../components/proveedorExtranjero/proveedorExtranjero.component'
import { ModificacionSociosComponent } from '../../components/modificacionSocios/modificacionSocios.component'
import { ModificacionGoceInmuebleComponent } from '../../components/modificacionGoceInmueble/modificacionGoceInmueble.component'
import { FusionOEscisionComponent } from '../../components/fusionOEscision/fusionOEscision.component'
import { AdicionFraccionComponent } from '../../components/adicionFraccion/adicionFraccion.component'
import {AdicionProcesosComponent} from '../../components/adicionProcesos/adicionProcesos.component'
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

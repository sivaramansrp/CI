import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { DatosDelSeguroComponent } from "../datos-del-seguro/datos-del-seguro.component";
import { DatosDelSolicitanteComponent } from "../datos-del-solicitante/datos-del-solicitante.component";
import { InformacionDeCompaniaComponent } from "../informacion-de-compania/informacion-de-compania.component";
import { RepresentanteLegalComponent } from "../representante-legal/representante-legal.component";
import { TituloComponent } from "@ng-mf/data-access-user";

/**
 * Componente para gestionar los certificados de origen.
 * Se encarga de manejar los formularios, la carga de catálogos, la validación y la interacción con el store.
 */
@Component({
  selector: 'app-information-general-solicitante',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    DatosDelSolicitanteComponent,
    DatosDelSeguroComponent,
    RepresentanteLegalComponent,
    InformacionDeCompaniaComponent
],
  templateUrl: './information-general-solicitante.component.html',
  styleUrl: './information-general-solicitante.component.scss',
})
/**
 * Representa el componente InformationGeneralSolicitanteComponent, que es responsable
 * de gestionar y mostrar la información general del solicitante.
 * 
 * Este componente forma parte del módulo "Trámites" y se utiliza para manejar
 * funcionalidades específicas relacionadas con la información general del solicitante.
 * 
 * @remarks
 * Asegúrese de que este componente esté correctamente integrado con su módulo padre
 * y que se inyecten todos los servicios o dependencias requeridos.
 * 
 * @example
 * <app-information-general-solicitante></app-information-general-solicitante>
 * 
 * @see {@link SomeRelatedComponent} para funcionalidades relacionadas.
 */
export class InformationGeneralSolicitanteComponent {}

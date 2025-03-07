import { EncabezadoRequerimientoComponent, TituloComponent } from "@ng-mf/data-access-user";
import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { DatosUsuarioComponent } from "../notificacion-components/datos-usuario/datos-usuario.component";
import { TITULO_NOTIFICACION } from "../../constantes/5701/notificacion.enum";

@Component({
    templateUrl: './notificacion-page.component.html',
    standalone: true,
    styles: ``,
    imports: [CommonModule, TituloComponent, DatosUsuarioComponent, EncabezadoRequerimientoComponent],
})
export class NotificacionPageComponent {
    readonly TITULO_NOTIFICACION = TITULO_NOTIFICACION

    numFolioTramite: string = '02309482934723832';
    tipoTramite: string = 'Registro de solicitud de servicios extraordinarios';

    
}
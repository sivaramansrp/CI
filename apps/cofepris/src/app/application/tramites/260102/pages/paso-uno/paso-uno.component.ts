import { SeccionLibStore, SolicitanteComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { SECCIONES_TRAMITE_260102 } from '../../constantes/consumo-personal.enum';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vista/terceros-relacionados-vista.component';

@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    SolicitanteComponent,
    ContenedorDeDatosSolicitudComponent,
    TercerosRelacionadosVistaComponent,
    // PagoDeDerechosComponent,
    PagoDeDerechosContenedoraComponent
  ],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent {
  indice: number = 1;
  constructor(private seccionStore: SeccionLibStore){
    this.asignarSecciones();
  }
  seleccionaTab(i: number): void {
    this.indice = i;
  }

    /**
  * Método para asignar las secciones existentes al stored
  */
    private asignarSecciones(): void {
      const SECCIONES: boolean[] = [];
      const FORMA_VALIDA: boolean[] = [];
      const PREDETERMINADO = SECCIONES_TRAMITE_260102
      for (const LLAVE_SECCION in PREDETERMINADO.PASO_1) {
        if (Object.prototype.hasOwnProperty.call(PREDETERMINADO.PASO_1, LLAVE_SECCION)) {
          // @ts-expect-error - fix this
          SECCIONES.push(PREDETERMINADO.PASO_1[LLAVE_SECCION]);
          FORMA_VALIDA.push(false);
        }
      }
      this.seccionStore.establecerSeccion(SECCIONES);
      this.seccionStore.establecerFormaValida(FORMA_VALIDA);
    }
}

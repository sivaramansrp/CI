import { Component, OnDestroy, OnInit } from '@angular/core';
import { SolicitanteComponent, TercerosComponent } from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user'
import { DatosDeLaSolicitudComponent } from '../../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { ExportaccionAcuicolaService } from '../../services/exportaccion-acuicola.service';
import { PagoDeDerechosComponent } from '../../components/pago-de-derechos/pago-de-derechos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransporteComponent } from '../../components/transporte/transporte.component';



@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.css',
  standalone: true,
  imports: [SolicitanteComponent, DatosDeLaSolicitudComponent, PagoDeDerechosComponent, TransporteComponent, TercerosComponent, ReactiveFormsModule, CommonModule],
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
     * @property {number} indice - El índice de la pestaña seleccionada.
     */
    indice: number = 1;

    /**
   * @descripcion
   * Subject utilizado para notificar y completar las suscripciones activas al destruir el componente,
   * evitando fugas de memoria.
   * Se utiliza junto con el operador `takeUntil`.
   * @private
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * @descripcion
   * Indica si el formulario debe estar deshabilitado (solo lectura).
   * Cuando es verdadero, los controles del formulario estarán deshabilitados y no se podrán editar.
   */
  formularioDeshabilitado: boolean = false;

  constructor(private exportaccionAcuicolaService: ExportaccionAcuicolaService, private consultaQuery: ConsultaioQuery) {
    // Constructor no realiza ninguna acción en este caso
  }
  
    /**
     * @method seleccionaTab
     * @description Selecciona una pestaña y actualiza el índice.
     * @param {number} i - El índice de la pestaña seleccionada.
     */
    seleccionaTab(i: number): void {
      this.indice = i;
    }

  /**
   * @method ngOnInit
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Realiza la suscripción al estado de consulta para habilitar o deshabilitar el formulario según corresponda.
   */
  ngOnInit(): void {

    this.consultaQuery.selectConsultaioState$
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((seccionState) => {
      if(seccionState.update){
        this.formularioDeshabilitado = false;
              this.guardarDatosFormulario();
      }
      if (seccionState.readonly) {
        this.formularioDeshabilitado = true;
      }
    });
  }

  /**
   * @descripcion
   * Obtiene los datos de acuicultura y actualiza el estado del formulario.
   * 
   * @remarks
   * Realiza una suscripción al observable que retorna los datos de acuicultura.
   * Utiliza `takeUntil` para evitar fugas de memoria al destruir el componente.
   * Si la respuesta es válida, actualiza el estado del formulario con los datos recibidos.
   */
  guardarDatosFormulario(): void {
    this.exportaccionAcuicolaService
      .getAcuiculturaData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.exportaccionAcuicolaService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Cancela suscripciones activas mediante `destroyNotifier$`.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}


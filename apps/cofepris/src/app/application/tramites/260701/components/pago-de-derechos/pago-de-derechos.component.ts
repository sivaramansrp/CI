import { Catalogo, CatalogoSelectComponent, InputFechaComponent, JSONResponse, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CertificadosLicenciasService } from '../../services/certificados-licencias.service';
import { CommonModule } from '@angular/common';
import { INPUT_FECHA_CONFIG } from '../../services/certificados-licencias.enum';

@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    InputFechaComponent,
    TituloComponent,
    ReactiveFormsModule
  ],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss',
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {

  /**
     * Formulario de la solicitud.
     */
    formSolicitud!: FormGroup;
  
    /**
     * Subject para notificar la destrucción del componente.
     */
    private destroyNotifier$: Subject<void> = new Subject();
  
    /**
     * Constante para configurar el input de fecha.
     */
    INPUT_FECHA_CONFIG = INPUT_FECHA_CONFIG;
    /**
     * Constructor del componente.
     */
    constructor(
      private fb: FormBuilder,
      private certificadosLicenciasSvc: CertificadosLicenciasService
    ) {
      this.fetchBancoData();
    }
  
    /**
     * Catálogo de bancos.
     */
    public bancoCatalogo!: Catalogo[];
  
    /**
     * Método para actualizar el banco seleccionado.
     * @param e {Catalogo} Banco seleccionado.
     */
    ngOnInit(): void {
  
      this.formSolicitud = this.fb.group({
        datosImportadorExportador: this.fb.group({
          claveDeReferencia: [''],
          cadenaDependencia: [''],
          banco: [''],
          llaveDePago: [''],
          fechaPago: [''],
          importePago: [''],
        }),
      });
    }
  
    /**
     * Método para actualizar el banco seleccionado.
     * @param e {Catalogo} Banco seleccionado.
     */
    fetchBancoData(): void {
      this.certificadosLicenciasSvc.getBancoDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response:JSONResponse) => {
          const DATOS = JSON.parse(JSON.stringify(response));
          this.bancoCatalogo = DATOS.data
        });
    }
  
    /**
     * Método para actualizar el banco seleccionado.
     * @param e {Catalogo} Banco seleccionado.
     */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
  
    /**
     * Método para actualizar el banco seleccionado.
     * @param e {Catalogo} Banco seleccionado.
     */
    get datosImportadorExportador(): FormGroup {
      return this.formSolicitud.get('datosImportadorExportador') as FormGroup;
    }


}

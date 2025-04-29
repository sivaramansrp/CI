import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosGeneralesDeLaSolicitudCatologo } from '../../models/solicitud.model';
import { DatosGeneralesDeLaSolicitudRadioLista } from '../../models/solicitud.model';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadio } from '../../models/solicitud.model';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente para modificar el programa IMMEX.
 */
@Component({
  selector: 'app-modificar-immex-program',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputRadioComponent,
  ],
  providers: [SolicitudService],
  templateUrl: './modificar-immex-program.component.html',
  styleUrl: './modificar-immex-program.component.scss',
})
/**
 *  Componente para modificar el programa IMMEX.
 */
export class ModificarImmexProgramComponent implements OnInit, OnDestroy {
  /**
   *  Formulario reactivo para modificar el programa IMMEX.
   */
  modificarImmexProgramForm!: FormGroup;

  /**
   *  Opciones de radio para selección de sí o no.
   */
  sinoOpcion: InputRadio = {} as InputRadio;

  /**
   *  Observable para gestionar la destrucción del componente.
   */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   *  Catálogo de tipos de instalación.
   */
  tipoDeInstalacion: CatalogosSelect = {} as CatalogosSelect;

  /**
   *  Evento de salida para modificar el valor del programa IMMEX.
   */
  @Output() modificarImmexValor = new EventEmitter<boolean>();

  /**
   *  Constructor del componente.
   * @param {FormBuilder} fb - Servicio de construcción de formularios reactivos.
   * @param {SolicitudService} solicitudService - Servicio de solicitud de datos.
   */
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService
  ) {
    this.conseguirDatosGeneralesOpcionDeRadio();
    this.conseguirDatosGeneralesCatologo();
  }

  /**
   *  Inicializa el formulario al montar el componente.
   */
  ngOnInit(): void {
    this.modificarImmexProgramForm = this.fb.group({});
  }

  /**
   *  Obtiene los datos generales de las opciones de radio.
   */
  conseguirDatosGeneralesOpcionDeRadio(): void {
    this.solicitudService
      .conseguirDatosGeneralesOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitudRadioLista) => {
          this.sinoOpcion = respuesta.requisitos;
        },
      });
  }

  /**
   *  Obtiene los datos generales del catálogo.
   */
  conseguirDatosGeneralesCatologo(): void {
    this.solicitudService
      .conseguirDatosGeneralesCatologo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitudCatologo) => {
          this.tipoDeInstalacion = respuesta.tipoDeInstalacion;
        },
      });
  }

  /**
   *  Acepta y emite el evento para modificar el programa IMMEX.
   */
  aceptarImmexProgram(): void {
    this.modificarImmexValor.emit(true);
  }

  /**
   *  Se ejecuta al destruir el componente, limpiando los observables.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

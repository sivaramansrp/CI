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
export class ModificarImmexProgramComponent implements OnInit, OnDestroy {
  modificarImmexProgramForm!: FormGroup;
  sinoOpcion: InputRadio = {} as InputRadio;
  private destroy$: Subject<void> = new Subject<void>();
  tipoDeInstalacion: CatalogosSelect = {} as CatalogosSelect;
  @Output() modificarImmexValor = new EventEmitter<boolean>();
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService
  ) {
    this.conseguirDatosGeneralesOpcionDeRadio();
    this.conseguirDatosGeneralesCatologo();
  }

  ngOnInit(): void {
    this.modificarImmexProgramForm = this.fb.group({});
  }

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

  aceptarImmexProgram(): void {
    this.modificarImmexValor.emit(true)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

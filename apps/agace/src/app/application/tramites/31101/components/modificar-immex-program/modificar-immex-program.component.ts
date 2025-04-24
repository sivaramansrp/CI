import { CatalogoSelectComponent, CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DatosGeneralesDeLaSolicitudCatologo,
  DatosGeneralesDeLaSolicitudRadioLista,
  InputRadio,
} from '../../models/solicitud.model';
import { Subject, takeUntil } from 'rxjs';
import { SolicitudService } from '../../services/solicitud.service';

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
  tipoDeInstalacion : CatalogosSelect = {} as CatalogosSelect;
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

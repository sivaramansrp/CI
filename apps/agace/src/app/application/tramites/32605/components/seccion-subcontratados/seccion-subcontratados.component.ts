import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NumeroDeEmpleados } from '../../models/solicitud.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SeccionSubcontratados } from '../../models/solicitud.model';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudCatologoSelectLista } from '../../models/solicitud.model';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-seccion-subcontratados',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
  ],
  providers: [SolicitudService],
  templateUrl: './seccion-subcontratados.component.html',
  styleUrl: './seccion-subcontratados.component.scss',
})
export class SeccionSubcontratadosComponent implements OnInit, OnDestroy {
  subcontratadosForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  bimestre: CatalogosSelect = {} as CatalogosSelect;
  solicitud32605State: Solicitud32605State = {} as Solicitud32605State;
  @Output() seccionSubcontratados = new EventEmitter<NumeroDeEmpleados>();
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32605Store: Solicitud32605Store,
    public solicitud32605Query: Solicitud32605Query
  ) {
    this.conseguirSolicitudCatologoSelectLista();
  }

  ngOnInit(): void {
    this.subcontratadosForm = this.fb.group({
      subcontrataRFCBusqueda: [
        '',
        [Validators.required, Validators.maxLength(13)],
      ],
      subcontrataRFC: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(13)],
      ],
      subcontrataRazonSocial: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(254)],
      ],
      subcontrataEmpleados: [
        '',
        [Validators.required, Validators.maxLength(5)],
      ],
      subcontrataBimestre: ['', [Validators.required]],
    });

    this.solicitud32605Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32605State) => {
          this.solicitud32605State = respuesta;
          this.subcontratadosForm.patchValue({
            subcontrataRFCBusqueda:
              this.solicitud32605State.subcontrataRFCBusqueda,
            subcontrataRFC: this.solicitud32605State.subcontrataRFC,
            subcontrataRazonSocial:
              this.solicitud32605State.subcontrataRazonSocial,
            subcontrataEmpleados: this.solicitud32605State.subcontrataEmpleados,
            subcontrataBimestre: this.solicitud32605State.subcontrataBimestre,
          });
        })
      )
      .subscribe();
  }

  conseguirSolicitudCatologoSelectLista(): void {
    this.solicitudService
      .conseguirSolicitudCatologoSelectLista()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudCatologoSelectLista) => {
          this.bimestre = respuesta.bimestre;
        },
      });
  }

  buscarRFC(): void {
    this.solicitudService
      .conseguirSeccionSubcontratados()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SeccionSubcontratados) => {
          this.solicitud32605Store.actualizarSubcontrataRFC(
            respuesta.subcontrataRFC
          );
          this.solicitud32605Store.actualizarSubcontrataRazonSocial(
            respuesta.subcontrataRazonSocial
          );
        },
      });
  }

  actualizarSubcontrataRFCBusqueda(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarSubcontrataRFCBusqueda(VALOR);
  }

  actualizarSubcontrataRFC(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarSubcontrataRFC(VALOR);
  }

  actualizarSubcontrataRazonSocial(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarSubcontrataRazonSocial(VALOR);
  }

  actualizarSubcontrataEmpleados(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarSubcontrataEmpleados(VALOR);
  }

  actualizarSubcontrataBimestre(evento: Catalogo): void {
    this.solicitud32605Store.actualizarSubcontrataBimestre(evento.id);
  }

  cerrarModal(): void {
    const OBJETO_JSON = {
      denominacion: this.subcontratadosForm.get('subcontrataRazonSocial')
        ?.value,
      RFC: this.subcontratadosForm.get('subcontrataRFC')?.value,
      numeroDeEmpleados: this.subcontratadosForm.get('subcontrataEmpleados')
        ?.value,
      bimestre: this.subcontratadosForm.get('subcontrataBimestre')?.value,
    };

    this.seccionSubcontratados.emit(OBJETO_JSON);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

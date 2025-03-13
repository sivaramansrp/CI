import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line sort-imports
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { TablaDinamicaComponent, TablaSeleccion, } from '@libs/shared/data-access-user/src';

import { Cancelaciones140201Service } from '../../services/cancelaciones-140201.service'

import { CancellationOfAuthorizations } from '../../models/cancelacions.model'

import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cancelacion-de-autorizaciones-140201',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './cancelacion-de-autorizaciones-140201.component.html',
  styleUrl: './cancelacion-de-autorizaciones-140201.component.scss',
})
export class CancelacionDeAutorizaciones140201Component implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder,
    private cancelacionesService: Cancelaciones140201Service
  ) {
    //constructor
  }
  private destroy$ = new Subject<void>();
  cancelacion!: FormGroup;
  mostrarContenido = false;
  configuracionTabla: ConfiguracionColumna<CancellationOfAuthorizations>[] = [
    {
      encabezado: 'Folio de programa',
      clave: (ele: CancellationOfAuthorizations): string => ele.FolioDePrograma,
      orden: 1,
    },
    {
      encabezado: 'Tipo programa',
      clave: (ele: CancellationOfAuthorizations): string => ele.TipoPrograma,
      orden: 2,
    },
    {
      encabezado: 'Selecciona la modalidad',
      clave: (ele: CancellationOfAuthorizations): string => ele.SeleccionaLaModalidad,
      orden: 3,
    }
  ]

  TablaSeleccion = TablaSeleccion;
  cancelacionData: CancellationOfAuthorizations[] = [];

  ngOnInit(): void {
    this.cancelacion = this.fb.group({
      rfcIngresado: ['', [Validators.required, Validators.maxLength(13)]],
      motivoCancelacion: ['', Validators.required]
    });

    this.getCancelacioneServiceData();
  }

  alternarContenido(): void {
    this.mostrarContenido = !this.mostrarContenido;
  }
  getCancelacioneServiceData(): void {
    this.cancelacionesService
      .getCancelacionDeAutorizaciones()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.cancelacionData = resp;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  TableComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { CertificadosService } from '../../services/certificados.service';
import { ModalComponent } from '../modal/modal.component';
import { Subject } from 'rxjs';

export interface CertificadosTablaDatos {
  columns: string[];
}

@Component({
  selector: 'app-certificados',
  standalone: true,
  imports: [CommonModule, TituloComponent, TableComponent, ModalComponent],
  templateUrl: './certificados.component.html',
  styleUrl: './certificados.component.scss',
})
export class CertificadosComponent implements OnInit,OnDestroy {
  private destroy$ = new Subject<void>();
  showTableDiv = true;

  showFitosanitariosModal = false;
  showAutorizacionesModal = false;

  tablaCertificadosData: string[] = [];


  constructor(private certificadosService: CertificadosService) {
    //
  }

  ngOnInit(): void {

    this.certificadosService
      .getFitosanitoriosEncabezadoDeTabla()
      .subscribe((data: CertificadosTablaDatos) => {
        this.tablaFitosanitoriosData = data.columns;
      });

    this.certificadosService
      .getPermisoCertificadosDeTabla()
      .subscribe((data: CertificadosTablaDatos) => {
        this.tablaPermisoCertificadosData = data.columns;
      });

      this.certificadosService
      .getCertificadosDeTabla()
      .subscribe((data: CertificadosTablaDatos) => {
        this.tablaCertificadosData = data.columns;
      });
  }

  tablaFitosanitoriosData: string[] = [];
  tablaPermisoCertificadosData: string[] = [];

  cambiarCertificadosFitosanitarios(): void {
    this.showTableDiv = !this.showTableDiv;
    this.showFitosanitariosModal = !this.showFitosanitariosModal;
  }

  cambiarCertificadosAutorizaciones(): void {
    this.showTableDiv = !this.showTableDiv;
    this.showAutorizacionesModal = !this.showAutorizacionesModal;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

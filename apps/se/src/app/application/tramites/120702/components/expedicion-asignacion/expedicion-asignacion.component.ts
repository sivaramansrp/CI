import {
  Catalogo,
  CatalogoSelectComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DescripcionCupoComponent } from '../descripcion-cupo/descripcion-cupo.component';
import { ExpedicionCertificadosFronteraService } from '../../services/expedicion-certificados-frontera.service';
@Component({
  selector: 'app-expedicion-asignacion',
  standalone: true,
  imports: [TituloComponent, CatalogoSelectComponent,DescripcionCupoComponent],
  templateUrl: './expedicion-asignacion.component.html',
  styleUrl: './expedicion-asignacion.component.scss',
})
export class ExpedicionAsignacionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  anoOficioDatos: Catalogo[] = [];
  numeroOficioDatos: Catalogo[] = [];

  constructor(
    private expedicionCertificadosFronteraService: ExpedicionCertificadosFronteraService
  ) {
    //
  }

  ngOnInit(): void {
    this.expedicionCertificadosFronteraService
      .getAnoOficioDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.anoOficioDatos = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

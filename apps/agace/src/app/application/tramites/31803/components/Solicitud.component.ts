import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  InputFecha,
  TituloComponent,
  InputFechaComponent
} from '@libs/shared/data-access-user/src';
import { FECHAFINAL, FECHAINICIAL, FETCHAPAGO } from '../models/registro.model';
import { RegistroSolicitudService } from '../services/registro-solicitud-service.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Solicitud31803Enum } from '../constantes/solicitud31803.enum';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
  ],
  providers: [RegistroSolicitudService],
  templateUrl: './Solicitud.component.html',
  styleUrl: './Solicitud.component.css',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  fechaInicialInput: InputFecha = FECHAINICIAL;
  fechaFinalInput: InputFecha = FECHAFINAL;
  fechaPagoInput: InputFecha = FETCHAPAGO;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  solicitudEnum = Solicitud31803Enum;
  public bancoCatalogo: CatalogosSelect = {
    labelNombre: 'Banco',
    required: false,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  constructor(private registroSolicitud: RegistroSolicitudService) {}

  ngOnInit(): void {
    this.getBancoData();
  }

  getBancoData(): void {
    this.registroSolicitud
      .getBancoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.bancoCatalogo.catalogos = resp as Catalogo[];
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

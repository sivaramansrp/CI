import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFechaComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component";
import { CatalogoSelectComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component";
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { Catalogo, CatalogosSelect, InputFecha } from '@libs/shared/data-access-user/src';
import { FECHAPAGO } from '../../models/consulta.model';
import { ConsultaService } from '../../service/consulta.service';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, TituloComponent, InputFechaComponent],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.css',
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  fechaPagoInput: InputFecha = FECHAPAGO;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public destroyNotifier$: Subject<void> = new Subject();
  public bancoCatalogo: CatalogosSelect = {
    labelNombre: 'Banco',
    required: false,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };
constructor(private consulta: ConsultaService) {
    
  }
  ngOnInit(): void {
    this.obtenerDatosBanco();
  }
  
  obtenerDatosBanco(): void {
    this.consulta
      .obtenerDatosBanco()
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

import { Component, inject, OnInit, signal } from '@angular/core';
import { AirWaybillService } from '../../../services/air-waybill.service';
import { TableBodyData, TableData } from '@/shared/interfaces/table.interface';
import { catchError, of, take, tap } from 'rxjs';
import { HouseGuidesResponse } from '../../../interfaces/air-waybill-forms.interface';
import { TableComponent } from '@/shared/components/table/table.component';
import { SessionStorageService } from '@/shared/services/session-storage.service';
import { RoutingService } from '@/core/services/routing.service';
import { APP_ROUTES } from '@/app.routes.constants';
import { STORE_FRONT_ROUTES } from '@/routes.constants';
import { GUIAS_AEREAS_ROUTES } from '../../../guias-aereas.routes.constants';

@Component({
  selector: 'app-house-table',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './house-table.component.html',
})
export class HouseTableComponent implements OnInit {
  private airWaybillService = inject(AirWaybillService);

  tableHousesData = signal<TableData>({
    headers: [
      'No. Guía house',
      'CAAT',
      'Lugar de carga',
      'Lugar de descarga',
      'Fecha Arribo',
      'Fecha de transmisión',
      'No.Piezas',
    ],
    body: [],
  });
  hiddenHousesData = signal<Object[]>([]);
  errorHousesData = false;
  isLoadingHousesDataTable = signal<boolean>(true);

  ngOnInit(): void {
    this.getHouseGuides();
  }

  getHouseGuides() {
    this.airWaybillService
      .getHouses()
      .pipe(
        tap((resp: HouseGuidesResponse) => {
          if (resp.codigo === '00') {
            const houses = this.airWaybillService.houseGuides();
            const body = houses.map((item) => [
              item.numGuia,
              item.caat,
              item.lugarCarga,
              item.lugarDescarga,
              item.fechaArribo,
              item.fechaTransmision,
              item.numPiezas,
            ]);
            this.hiddenHousesData.set(houses);
            this.tableHousesData.set({ ...this.tableHousesData(), body });
          }
          this.isLoadingHousesDataTable.set(false);
        }),
        catchError(() => {
          this.errorHousesData = true;
          this.isLoadingHousesDataTable.set(false);
          return of();
        }),
        take(1),
      )
      .subscribe();
  }

  houseSelected(tableData: TableBodyData) {
    this.airWaybillService.redirectHouseDetails(tableData.hiddenData, false);
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { AirWaybillService } from '../../../services/air-waybill.service';
import { catchError, of, take, tap } from 'rxjs';
import {
  Flight,
  FlightsResponse,
  MasterResponse,
} from '../../../interfaces/air-waybill-forms.interface';
import { TableBodyData, TableData } from '@/shared/interfaces/table.interface';
import { TableComponent } from '@/shared/components/table/table.component';
import { RoutingService } from '@/core/services/routing.service';
import { SessionStorageService } from '@/shared/services/session-storage.service';

@Component({
  selector: 'app-flight-table',
  standalone: true,
  imports: [TableComponent, NgIf],
  templateUrl: './flight-table.component.html',
})
export class FlightTableComponent implements OnInit {
  private airWaybillService = inject(AirWaybillService);
  private sessionStorage = inject(SessionStorageService);
  tableFlightsData = signal<TableData>({
    headers: [
      'Empresa transportista',
      'No. vuelo',
      'No. manifiesto',
      'Lugar de carga',
      'Lugar de descarga',
      'Fecha de transmisión',
      'RFC transmisor',
    ],
    body: [],
  });
  hiddenFlightsData = signal<Object[]>([]);
  errorFlightsData = false;
  isLoadingFlightsDataTable = signal<boolean>(true);
  tableFlightSelectedData = signal<TableData>({
    headers: [
      'Empresa transportista',
      'No. Vuelo',
      'No. Manifiesto',
      'Lugar de carga',
      'Lugar de descarga',
      'Fecha de transmisión',
      'RFC Transmisor',
    ],
    body: [],
  });
  errorFlightSelectedData = false;
  isLoadingFlightSelectedDataTable = signal<boolean>(true);
  tableMasterData = signal<TableData>({
    headers: [
      'No. Guía Master',
      'CAAT',
      'Lugar de carga',
      'Lugar de descarga',
      'Fecha arribo',
      'Fecha de transmisión',
      'No. Piezas',
    ],
    body: [],
  });
  hiddenMasterData = signal<Object[]>([]);
  errorMasterData = false;
  isLoadingMasterDataTable = signal<boolean>(true);
  flightSelected = signal<boolean>(false);

  ngOnInit(): void {
    this.getFlights();
    const flightClicked = this.sessionStorage.get<Flight>('flightClicked');
    if (this.airWaybillService.checkFlightClicked() && flightClicked) {
      this.buildFlightSelectedTable(flightClicked);
      this.getMasterByManifest(flightClicked);
    }
  }

  getFlights() {
    this.airWaybillService
      .getFlights()
      .pipe(
        tap((resp: FlightsResponse) => {
          if (resp.codigo === '00') {
            const houses = this.airWaybillService.flights();
            const body = houses.map((item) => [
              item.empresaTransportista,
              item.numVuelo,
              item.numManifiesto,
              item.lugarCarga,
              item.lugarDescarga,
              item.fechaHora,
              item.rfc,
            ]);
            this.hiddenFlightsData.set(houses);
            this.tableFlightsData.set({ ...this.tableFlightsData(), body });
          }
          this.isLoadingFlightsDataTable.set(false);
        }),
        catchError(() => {
          this.errorFlightsData = true;
          this.isLoadingFlightsDataTable.set(false);
          return of();
        }),
        take(1),
      )
      .subscribe();
  }

  getMasterByManifest(flight: Flight) {
    this.buildFlightSelectedTable(flight);
    const { idHead } = flight;
    this.airWaybillService.idHeadManifest.set(idHead);
    this.airWaybillService
      .getMasterByManifest()
      .pipe(
        tap((resp: MasterResponse) => {
          if (resp.codigo === '00') {
            const masters = this.airWaybillService.masterByManifest();
            const body = masters.map((item) => [
              item.numGuia,
              item.caat,
              item.lugarCarga,
              item.lugarDescarga,
              item.fechaArribo,
              item.fechaTransmision,
              item.numPiezas,
            ]);
            this.hiddenMasterData.set(masters);
            this.tableMasterData.set({ ...this.tableMasterData(), body });
          }
          this.isLoadingMasterDataTable.set(false);
        }),
        catchError(() => {
          this.errorMasterData = true;
          this.isLoadingMasterDataTable.set(false);
          return of();
        }),
        take(1),
      )
      .subscribe();
  }

  buildFlightSelectedTable(flight: Flight) {
    this.sessionStorage.set('flightClicked', flight);
    const body = [
      [
        flight.empresaTransportista,
        flight.numVuelo,
        flight.numManifiesto,
        flight.lugarCarga,
        flight.lugarDescarga,
        flight.fechaHora,
        flight.rfc,
      ],
    ];
    this.tableFlightSelectedData.set({ ...this.tableFlightSelectedData(), body });
    this.isLoadingFlightSelectedDataTable.set(false);
    this.flightSelected.set(true);
  }

  masterSelected(master: TableBodyData) {
    this.airWaybillService.redirectMasterDetails(master.hiddenData);
  }
}

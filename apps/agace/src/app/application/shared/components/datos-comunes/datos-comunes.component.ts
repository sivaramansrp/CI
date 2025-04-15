import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosComunesService } from '../../services/datos-comunes.service';
import { Subject, takeUntil } from 'rxjs';
import { AlertComponent, Catalogo, CatalogoSelectComponent, InputCheckComponent, InputRadioComponent } from '@libs/shared/data-access-user/src';
import dinamicaradio from 'libs/shared/theme/assets/json/31602/dinamica-radio-datos.json';
import radio_si_no from 'libs/shared/theme/assets/json/31601/radio_si_no.json';
import { DATOS_COMUNES_TEXTOS, DATOS_COMUNES_TEXTOS_DOS } from '../../models/datos-comunes.model';
import { FederalDeTrabajaoComponent } from '../federal-de-trabajao/federal-de-trabajao.component';
import { DatosComunesDosComponent } from '../datos-comunes-dos/datos-comunes-dos.component';

@Component({
  selector: 'shared-datos-comunes',
  standalone: true,
  imports: [
    CommonModule,
    InputRadioComponent,
    InputCheckComponent,
    CatalogoSelectComponent,
    AlertComponent,
    FederalDeTrabajaoComponent,
    DatosComunesDosComponent
  ],
  templateUrl: './datos-comunes.component.html',
  styleUrl: './datos-comunes.component.scss',
})
export class DatosComunesComponent implements OnInit, OnDestroy {


  public dinamicaRadio = dinamicaradio;
  private destroyNotifier$: Subject<void> = new Subject();
  public radioOptions = radio_si_no;
  public sectorProductivoAgace: Catalogo[] = [];
  public serviciosAgace: Catalogo[] = [];
  public TEXTOS = DATOS_COMUNES_TEXTOS;
  public comboBimestresIDC: Catalogo[] = [];
  public TEXTOSDOS = DATOS_COMUNES_TEXTOS_DOS;
  public infoAlert = 'alert-danger';
  public cambioObj = {
    empleadosPropios: false,
    deTrabajao: false,
  }


  constructor(
    private datosComunesSvc: DatosComunesService,
  ) {
    // Constructor de la clase DatosComunesComponent
  }

  ngOnInit(): void {
    this.getSectorProductivoAgace();
    this.getServiciosAgace();
  }

  public getSectorProductivoAgace(): void {
    this.datosComunesSvc.getProductivoDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.sectorProductivoAgace = JSON.parse(JSON.stringify(response));
    });
  }

  public getServiciosAgace(): void {
    this.datosComunesSvc.getServiciosAgaceDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.serviciosAgace = JSON.parse(JSON.stringify(response));
    });
  }

  public onRadioCambio(value: string | number,nombre:string): void {
    if(nombre === 'empleadosPropios') {
      this.cambioObj.empleadosPropios = value === 'Si' ? true : false;
    }
    if(nombre === 'deTrabajao') {
      this.cambioObj.deTrabajao = value === 'Si' ? true : false;
    }
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}

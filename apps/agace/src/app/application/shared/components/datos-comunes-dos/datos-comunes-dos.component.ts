import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { DatosComunesService } from '../../services/datos-comunes.service';
import { Subject, takeUntil } from 'rxjs';
import { DATOS_COMUNES_TEXTOS_TRES } from '../../models/datos-comunes.model';

@Component({
  selector: 'app-datos-comunes-dos',
  standalone: true,
  imports: [CommonModule,CatalogoSelectComponent,AlertComponent],
  templateUrl: './datos-comunes-dos.component.html',
  styleUrl: './datos-comunes-dos.component.scss',
})
export class DatosComunesDosComponent implements OnInit,OnDestroy {

  private destroyNotifier$: Subject<void> = new Subject();
  public comboBimestresIDC: Catalogo[] = [];
  public TEXTOS = DATOS_COMUNES_TEXTOS_TRES;

  constructor(
    private datosComunesSvc: DatosComunesService
  ) {
    // Constructor de la clase DatosComunesDosComponent
  }

  ngOnInit(): void {
    this.getComboBimestres();
  }


  public getComboBimestres(): void {
    this.datosComunesSvc.getComboBimestres().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.comboBimestresIDC = DATOS.data;
    });
  }


  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }


}

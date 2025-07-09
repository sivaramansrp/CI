import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, InputRadioComponent } from '@libs/shared/data-access-user/src';
import { BIOMESTRE_CATALOGO, DOMICILIO_CATALOGO, RADIO_01, SECTOR_PRODUCTIVO, SERVICIO_CATALOGO } from '../../constantes/adace32606.enum';
import { EconomicoService } from '../../services/economico.service';
import { map, ReplaySubject, takeUntil } from 'rxjs';
import { Tramite32606Query } from '../../state/Tramite32508.query';
import { Solicitud32606State, Tramite32606Store } from '../../state/Tramite32508.store';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-comunes',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, InputRadioComponent, ReactiveFormsModule],
  templateUrl: './datos-comunes.component.html',
  styleUrl: './datos-comunes.component.css',
})
export class DatosComunesComponent implements OnInit, OnDestroy {
  /**
    * Observable para gestionar la destrucción del componente.
    */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public sectorProductivo = SECTOR_PRODUCTIVO;
  public servicioCatalogo = SERVICIO_CATALOGO;
  public biomestreCatalogo = BIOMESTRE_CATALOGO;
  public domicilioCatalogo = DOMICILIO_CATALOGO;
  public solicitudState!: Solicitud32606State;
  radioOpcions01 = RADIO_01;
  public datosComunesForm!: FormGroup;
 
  constructor(private economico: EconomicoService,
    public query: Tramite32606Query,
    public store: Tramite32606Store,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.donanteDomicilio();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.obtenerSectorProductivo();
    this.obtenerServicio();
    this.obtenerBimestre();
    this.obtenerDomicillio();
  }

  donanteDomicilio(): void {
    this.datosComunesForm = this.fb.group({
      sectorProductivo: [''],
      servicio: [''],
      tipoRadio01: [''],
      tipoRadio02: [''],
      tipoRadio03: [''],
      tipoRadio04: [''],
      tipoRadio05: [''],
      tipoRadio06: [''],
      domicilio: [''],
      biomestre: [''],
      numeroEmpleados: ['']
    });
  }
  obtenerSectorProductivo(): void {
    this.economico
      .obtenerSectorProductivo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.sectorProductivo.catalogos = resp as Catalogo[];
      });
  }

  obtenerServicio(): void {
    this.economico
      .obtenerServicio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.servicioCatalogo.catalogos = resp as Catalogo[];
      });
  }

  obtenerBimestre(): void {
    this.economico
      .obtenerBimestre()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.biomestreCatalogo.catalogos = resp as Catalogo[];
      });
  }

  obtenerDomicillio(): void {
    this.economico
      .obtenerDomicillio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.domicilioCatalogo.catalogos = resp as Catalogo[];
      });
  }















  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}

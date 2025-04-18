import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, InputRadioComponent } from '@libs/shared/data-access-user/src';
import radio_si_no from 'libs/shared/theme/assets/json/31601/radio_si_no.json';
import { ComercioExteriorService } from '../../services/comercio-exterior.service';
import { map, Subject, takeUntil } from 'rxjs';
import { NumeroDeEmpleadosComponent } from '../numero-de-empleados/numero-de-empleados.component';
import { Solicitud31602IvaeiepsState, Tramite31602IvaeiepsStore } from '../../estados/stores/tramite31602ivaeieps.store';
import { Tramite31602IvaeiepsQuery } from '../../estados/queries/tramite31602ivaeieps.query';

@Component({
  selector: 'app-conceptos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    CatalogoSelectComponent,
    NumeroDeEmpleadosComponent
  ],
  templateUrl: './conceptos.component.html',
  styleUrl: './conceptos.component.scss',
})
export class ConceptosComponent implements OnInit,OnDestroy {

  public conceptosForm!: FormGroup;
  public radioOpcions = radio_si_no;
  public valorSeleccionado: string | number = '';
  public conEmpleadosSeleccionado: string | number = '';
  public bimestreUnoCatalogo: Catalogo[] = [];
  public bimestreDosCatalogo: Catalogo[] = [];
  public bimestreTresCatalogo: Catalogo[] = [];
  private destroyNotifier$: Subject<void> = new Subject();
  public solicitudState!: Solicitud31602IvaeiepsState;

  constructor(
    private fb: FormBuilder,
    private comercioExteriorSvc: ComercioExteriorService,
    private tramite31602Store: Tramite31602IvaeiepsStore,
    private tramite31602Query: Tramite31602IvaeiepsQuery
  ) {
    // Constructor vacío
  }

  ngOnInit(): void {
    this.tramite31602Query.selectSolicitud$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
        this.solicitudState = seccionState;
    })).subscribe();
    this.crearConceptosForm();
    this.getBancoCatalogDatos();
  }
  

  public crearConceptosForm(): void {
    this.conceptosForm = this.fb.group({
      transferencias: [this.solicitudState?.transferencias],
      transferenciasVir:[this.solicitudState?.transferenciasVir],
      retornos:[this.solicitudState?.retornos],
      retornosSe:[this.solicitudState?.retornosSe],
      constancias: [this.solicitudState?.constancias],
      constanciasDe: [this.solicitudState?.constanciasDe],
      total: [this.solicitudState?.total],
      totalDos: [this.solicitudState?.totalDos],
      empleadosPropios: [this.solicitudState?.empleadosPropios],
      conEmpleados: [this.solicitudState?.conEmpleados],
      indiqueSiLosSocios: [this.solicitudState?.indiqueSiLosSocios],
      numeroEmpleados: [this.solicitudState?.numeroEmpleados],
      numeroEmpleadosDos: [this.solicitudState?.numeroEmpleadosDos],
      numeroEmpleadosTres: [this.solicitudState?.numeroEmpleadosTres],
      comboBimestresUno: [this.solicitudState?.comboBimestresUno],
      comboBimestresDos: [this.solicitudState?.comboBimestresDos],
      comboBimestresTres: [this.solicitudState?.comboBimestresTres],
    });
  }

  public onEmpleadosPropiosCambio(value: string | number): void {
    this.valorSeleccionado = value;
  }

  public onConEmpleados(value: string | number): void {
    this.conEmpleadosSeleccionado = value;
  }

  public getBancoCatalogDatos(): void {
    this.comercioExteriorSvc.getBancoDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const API_DATOS = JSON.parse(JSON.stringify(response));
      this.bimestreUnoCatalogo = API_DATOS.data;
      this.bimestreDosCatalogo = API_DATOS.data;
      this.bimestreTresCatalogo = API_DATOS.data;
    });
  }

  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite31602IvaeiepsStore): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite31602Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}

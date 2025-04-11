import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, InputRadioComponent } from '@libs/shared/data-access-user/src';
import radio_si_no from 'libs/shared/theme/assets/json/31601/radio_si_no.json';
import { ComercioExteriorService } from '../../services/comercio-exterior.service';
import { Subject, takeUntil } from 'rxjs';
import { NumeroDeEmpleadosComponent } from '../numero-de-empleados/numero-de-empleados.component';

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
export class ConceptosComponent implements OnInit {

  public conceptosForm!: FormGroup;
  public radioOpcions = radio_si_no;
  public valorSeleccionado: string | number = '';
  public conEmpleadosSeleccionado: string | number = '';
  public bimestreUnoCatalogo: Catalogo[] = [];
  public bimestreDosCatalogo: Catalogo[] = [];
  public bimestreTresCatalogo: Catalogo[] = [];
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private comercioExteriorSvc: ComercioExteriorService,
  ) {
    // Constructor vacío
  }

  ngOnInit(): void {
    this.crearConceptosForm();
    this.getBancoCatalogDatos();
  }
  

  public crearConceptosForm(): void {
    this.conceptosForm = this.fb.group({
      transferencias: [''],
      transferenciasVir:[''],
      retornos:[''],
      retornosSe:[''],
      constancias: [''],
      constanciasDe: [''],
      total: [''],
      totalDos: [''],
      empleadosPropios: [''],
      conEmpleados: [''],
      indiqueSiLosSocios: [''],
      numeroEmpleados: [''],
      numeroEmpleadosDos: [''],
      numeroEmpleadosTres: [''],
      comboBimestresUno: [''],
      comboBimestresDos: [''],
      comboBimestresTres: ['']
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
}

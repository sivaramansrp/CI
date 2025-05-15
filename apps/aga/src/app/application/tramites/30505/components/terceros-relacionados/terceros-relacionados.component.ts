import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {TERCEROS_ENCABEZADO_DE_TABLA,TercerosRelacionados } from '../../models/aviso-modificacion.model';
import { TablaAcciones, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { TercerosRelacionadosService } from '../../services/terceros-relacionados.service';

@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrls: ['./terceros-relacionados.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    TituloComponent
  ]
})
export class TercerosRelacionadosComponent implements OnDestroy,OnInit {
 
  public tercerosRelacionadosDatos:TercerosRelacionados[] = [];

  public TERCEROS_CONFIGURATION_TABLA = TERCEROS_ENCABEZADO_DE_TABLA;

  public acciones:TablaAcciones[] = [];

  public destroyNotifier$: Subject<void> = new Subject();


  constructor(
    private TercerosService:TercerosRelacionadosService
  ) { 
    
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

 
  cargarDatos(): void {
    this.TercerosService.obtenerDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.tercerosRelacionadosDatos = Array.isArray(data) ? data : [data];
        // this.tramite140101Store.setDatosData(this.datosTabla);
      });
    
  }

   ngOnDestroy(): void {
     this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  
}
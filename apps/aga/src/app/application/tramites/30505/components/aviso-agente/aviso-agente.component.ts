import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {AvisoAgente,AVISO_AGENTE_DE_TABLA } from '../../models/aviso-modificacion.model';
import { TablaAcciones, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { TercerosRelacionadosService } from '../../services/terceros-relacionados.service';
import { AgregarAgenteComponent } from '../agregar-agente/agregar-agente.component';

@Component({
  selector: 'app-aviso-agente',
  templateUrl: './aviso-agente.component.html',
  styleUrls: ['./aviso-agente.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    TituloComponent,
    AgregarAgenteComponent
  ]
})
export class AvisoAgenteComponent implements OnInit {
  
  formAgente!:FormGroup;

  modal: string = 'modal';

  public avisoAgenteDatos:AvisoAgente[] = [];

  public AGENTE_CONFIGURATION_TABLA = AVISO_AGENTE_DE_TABLA;

  public acciones:TablaAcciones[] = [];

  public destroyNotifier$: Subject<void> = new Subject();

    constructor(private fb: FormBuilder,private router:Router, private route:ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.cargarDatos();
    this.formAgente = this.fb.group({
        nombres: ['', [Validators.required]],
        segundoApellido:['', [Validators.required]],
        primerApellido: ['', [Validators.required]],
        tipoFigura: ['', [Validators.required]],
        patenteAutorizacion: ['', [Validators.required]],
        se: ['', [Validators.required]],
  
    });
  }

 
  cargarDatos(): void {
    // this.TercerosService.obtenerDatos()
    //   .pipe(takeUntil(this.destroyNotifier$))
    //   .subscribe((data) => {
    //     this.avisoAgenteDatos = Array.isArray(data) ? data : [data];
    //   });
    
  }

  AgregarTransportias():void{
    this.router.navigate(['../agregar-agente'],{
      relativeTo:this.route

    });
  }
  
}
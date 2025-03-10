/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

import { CERTIFICADO_TABLA } from '@libs/shared/data-access-user/src/tramites/constantes/110218/certificado-tecnico-japon.enum';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-certificado',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,TablaDinamicaComponent,CatalogoSelectComponent],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss',
})
export class DatosCertificadoComponent implements OnInit {
  datosdelcertificado : FormGroup ;
  configTableArray = CERTIFICADO_TABLA;
  tableradio = TablaSeleccion.RADIO
  datos:any;
  selectedRow: any;  
  selectedRows: any[] = [];  
  
  tipodeFactura: Catalogo[] =[];
  unidaddeMedidadeComercializacion: Catalogo[] = [];
  
  constructor(private fb: FormBuilder, private service:CertificadoTecnicoJaponService ,private router: Router) { 
    this.datosdelcertificado = this.fb.group({
      lugar: [""],
      observaciones: [""],
      
    })
    
  }
  ngOnInit(): void {
    this.getTabledatas();
  }

  getTabledatas():void{
    this.service.getDatosCertificado().subscribe(
      (data:any)=>{
        this.datos = data;
        console.log(this.datos)
      }
      
    )
  }
  
  handleFilaSeleccionada(fila: any): void {
    this.selectedRow = fila;
  }
  
  handleListaDeFilaSeleccionada(filasSeleccionadas: any[]): void {
    this.selectedRows = filasSeleccionadas;
  }

  onModifyForm(): void {
    this.router.navigate(['se/certificado-tecnico-japon/mercancias-seleccionadas-form']);
  }
 
}

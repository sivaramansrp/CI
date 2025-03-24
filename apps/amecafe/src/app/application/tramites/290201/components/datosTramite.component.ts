import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Catalogo, CatalogosSelect, TituloComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarSolicitudService } from '../services/registrar-solicitud.service';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { TableComponent } from '@libs/shared/data-access-user/src';
import { DatosDelCafeComponent } from './datos-del-cafe/datos-del-cafe.component';
@Component({
  selector: 'app-datos-tramite',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,CatalogoSelectComponent,TableComponent,DatosDelCafeComponent],
  templateUrl: './datosTramite.component.html',
  styleUrl: './datosTramite.component.scss',
})
export class DatosTramiteComponent implements OnInit {
  informationCafeForm!: FormGroup;
  tableData = {
    tableBody: [],
    tableHeader: [],
  };

  public tiposData: CatalogosSelect = {
    labelNombre: 'Tipos',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public formasdelcafeData: CatalogosSelect = {
    labelNombre: 'Formas del cafe',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public calidadData: CatalogosSelect = {
    labelNombre: 'Calidad',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public procesosData: CatalogosSelect = {
    labelNombre: 'Procesos',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public certificationsData: CatalogosSelect = {
    labelNombre: 'Cerfticiones',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  public adunadesalidaData: CatalogosSelect = {
    labelNombre: 'Aduna de salida',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public paisdestinoData: CatalogosSelect = {
    labelNombre: 'Paid destino',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public entidaddeprocedenciaData: CatalogosSelect = {
    labelNombre: 'Entidad de procedencia',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public ciclocafetaleroData: CatalogosSelect = {
    labelNombre: 'Ciclo cafetalero',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  constructor(
    private registrarsolicitud: RegistrarSolicitudService
  ){}

  ngOnInit(): void {
    this.getTiposData();
    this.getFormasdelcafeData();
    this.getCalidadData();
    this.getProcesosData();
    this.getAduanadesalidaData();
    this.getEntidadDeProcedenciaData();
    this.getCiclocafetaleroData();
  }
  getTiposData(){
    this.registrarsolicitud.getTiposData().subscribe((data) => {
      this.tiposData.catalogos = data as Catalogo[];
    })
  }
  getFormasdelcafeData(){
    this.registrarsolicitud.getFormasdelcafeData().subscribe((data) => {
      this.formasdelcafeData.catalogos = data as Catalogo[];
    })
  }

getCalidadData(){
  this.registrarsolicitud.getCalidadData().subscribe((data) => {
    this.calidadData.catalogos = data as Catalogo[];
  })
}
getProcesosData(){
  this.registrarsolicitud.getProcesosData().subscribe((data) => {
    this.procesosData.catalogos = data as Catalogo[];
  })
}
getAduanadesalidaData(){
  this.registrarsolicitud.getAduanadesalidaData().subscribe((data) => {
    this.adunadesalidaData.catalogos = data as Catalogo[];
  })
}
getEntidadDeProcedenciaData(){
  this.registrarsolicitud.getEntidadDeProcedenciaData().subscribe((data) => {
    this.entidaddeprocedenciaData.catalogos = data as Catalogo[];
  })
}
getCiclocafetaleroData(){
  this.registrarsolicitud.getCiclocafetaleroData().subscribe((data) => {
    this.ciclocafetaleroData.catalogos = data as Catalogo[];
  })
}
}

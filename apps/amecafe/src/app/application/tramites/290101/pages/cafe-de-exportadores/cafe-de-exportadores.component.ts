import { Component, OnInit, ViewChild } from '@angular/core';import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CafeExportacionService } from '../../servicios/cafe-exportacion.service';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosSelect,CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-bodegas',
  templateUrl: './cafe-de-exportadores.component.html',
})
export class CafeDeExportadoresComponent implements OnInit {
  cafexportForm!: FormGroup;
  clasificacion: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };
  estado: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };



  constructor(private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private cafeExportacionService:CafeExportacionService,
  ) {}
  
  ngOnInit(): void {
    this.iniciarFormulario();
    
    this.cargarClasificacion();
    
  }
  iniciarFormulario() : void {
     this.cafexportForm = this.fb.group({
      descripcionMercancia: ['', [Validators.required, Validators.maxLength(15)]],
      catalogoDClave: ['', Validators.required],
      clasificacion: [''],
      porcentajeConcentracion: ['', Validators.required]
    });
  }

  cargarClasificacion(): void {
    this.cafeExportacionService.cargarClasificacion()
     // .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.clasificacion = {
            labelNombre: 'Clasificacion/Tipo*',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  
  cancelarBodega(): void {
    this.cafexportForm.reset();
    
  }


  
}
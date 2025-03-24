import { Component, OnInit, ViewChild } from '@angular/core';import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { BodegasService } from '../../servicios/bodegas.service';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosSelect,CatalogoSelectComponent } from '@ng-mf/data-access-user';
import {ProductoTablaServicios} from '../../servicios/regiones-compra.service';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-regiones',
  templateUrl: './regiones.component.html',
})
export class RegionesComponent implements OnInit {
  regionForm!: FormGroup;
  productoCafe: CatalogosSelect = {
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
  descripTipoCafe: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };



  constructor(private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private bodegasService:BodegasService,
    private productoTablaServicios:ProductoTablaServicios
  ) {}
  navigateToCafeExportadores() {
    this.router.navigate(['/pago/cafe-exportadores/cafe-exportadores']);
    
  }
  ngOnInit(): void {
    this.iniciarFormulario();
    this.cargarEstadoCatalog();
    this.cargarProductoCafe();
    this.cargarTipoDeCafe();
    
  }
  iniciarFormulario() : void {
    this.regionForm = this.fb.group({
      estado: ['', Validators.required],
      productoCafe:['', Validators.required],
      descRegionCompra: ['', [Validators.required, Validators.maxLength(12)]],
      descripTipoCafe:['', Validators.required],
      volumen: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  cargarProductoCafe(): void {
    this.bodegasService.cargarBodegaPropiaAlquilad()
     // .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.productoCafe = {
            labelNombre: 'Café compra*',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  cargarTipoDeCafe(): void {
    this.productoTablaServicios.cargarTipoDeCafe()
     // .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.descripTipoCafe = {
            labelNombre: 'Tipo de café*',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  cargarEstadoCatalog(): void {
    this.bodegasService.cargarEstadoCatalog()
     // .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.estado = {
            labelNombre: 'Estado*',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  cancelarBodega(): void {
    this.regionForm.reset();
    
  }


  
}
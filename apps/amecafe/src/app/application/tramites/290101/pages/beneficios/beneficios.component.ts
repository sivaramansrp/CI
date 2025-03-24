import { Component, OnInit, ViewChild } from '@angular/core';import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { BodegasService } from '../../servicios/bodegas.service';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosSelect,CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-beneficios',
  templateUrl: './beneficios.component.html',
})
export class BeneficiosComponent implements OnInit {
  beneficiosForm!: FormGroup;
  propAlquil: CatalogosSelect = {
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
    private bodegasService:BodegasService,
  ) {}
  
  ngOnInit(): void {
    this.iniciarFormulario();
    this.cargarEstadoCatalog();
    this.cargarBodegaPropiaAlquilad();
    
  }
  iniciarFormulario() : void {
    this.beneficiosForm = this.fb.group({
      razonSocial: ['', [Validators.required, Validators.maxLength(200)]],
      propAlquil: ['', Validators.required],
      
      calle: ['', [Validators.required, Validators.maxLength(100)]],
      numeroExterior: ['', Validators.required],
      numeroInterior: ['', Validators.maxLength(50)],
      colonia: ['', [Validators.required, Validators.maxLength(100)]],
      estado: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.maxLength(12)]],
      capacidadAlmacenaje: ['', [Validators.required, Validators.maxLength(20)]],
      volumenAlmacenaje:['',[Validators.required]]
    });
  }

  cargarBodegaPropiaAlquilad(): void {
    this.bodegasService.cargarBodegaPropiaAlquilad()
     // .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.propAlquil = {
            labelNombre: 'Propia o alquilada*',
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
    this.beneficiosForm.reset();
    
  }


  
}
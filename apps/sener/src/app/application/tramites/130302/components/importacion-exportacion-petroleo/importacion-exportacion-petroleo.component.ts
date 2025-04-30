import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Catalogo, ConfiguracionColumna, MENSAJEDEALERTA } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { NICO_TABLA, PermisoModel } from '../../models/permiso-importacion.model';
import {PermisoPetroleoService} from '../../services/permiso-petroleo.service' 
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-importacion-exportacion-petroleo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,TituloComponent,TablaDinamicaComponent],
  templateUrl: './importacion-exportacion-petroleo.component.html',
  styleUrls: ['./importacion-exportacion-petroleo.component.css']
})
export class ImportacionExportacionPetroleoComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  private destroyed$ = new Subject<void>();

  /**
   * property TablaSeleccion
   * description Configuración de la tabla de selección.
   */
  tipoSeleccionTabla = TablaSeleccion;

  /**
   * property tercerosProd
   * description Lista de productos de terceros.
   */
  tercerosProd: PermisoModel[] = [];

  constructor(private fb: FormBuilder, private service:PermisoPetroleoService) {}

  configuracionTabla: ConfiguracionColumna<PermisoModel>[] = NICO_TABLA;

  ngOnInit(): void {
    this.form = this.fb.group({
      folioTramite: ['', Validators.required],
      tipoSolicitud: ['', Validators.required],
      regimen: ['', Validators.required],
      clasificacionRegimen: ['', Validators.required],
      periodoVigencia: ['', Validators.required],
      unidadMedida: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      cantidadAutorizada: ['', Validators.required],
      valorAutorizado: ['', Validators.required],
      nico: ['', Validators.required],
      descripcionNico: ['', Validators.required],
      acotacion: [''],
      permisoValidoDesde: ['', Validators.required],
      permisoValidoHasta: ['', Validators.required]
    });
    this.loadMercancias();
  }

  loadMercancias(): void {
    this.service.obtenerTabla()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        this.tercerosProd = resp;
      });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
    }
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

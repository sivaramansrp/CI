/* eslint-disable sort-imports */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Catalogo ,CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-domicilio-del-establecimiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
  templateUrl: './domicilio-del-establecimiento.component.html',
  styleUrl: './domicilio-del-establecimiento.component.scss',
})
export class DomicilioDelEstablecimientoComponent implements OnInit, OnDestroy {
  domicilioForm!: FormGroup;
  estadoData:Catalogo[] = [];
  private destroy$ = new Subject<void>();
  constructor(private fb: FormBuilder, private datosService: DatosService
  ) {
    //constructor
  }

  ngOnInit(): void {
    this.domicilioForm = this.fb.group({
      codigoPostal: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required ],
      lada: [''],
      telefono: [''],
    });
    this.cargarEstadoData();
  } 

  cargarEstadoData(): void {
    this.datosService.obtenerEstadoData()
      .pipe(takeUntil(this.destroy$))
        .subscribe((resp:Catalogo[]) => { 
          // eslint-disable-next-line no-console
          console.log('estadoData', resp);
        this.estadoData = resp;
      });
  }
    /*
    * Método del ciclo de vida de Angular - destruye el componente
  */
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";

import { MercanciaAsociadaService } from 'libs/shared/data-access-user/src/core/services/110102/mercanciaasociada.service';





@Component({
  selector: 'app-registro-mercancia-comercializador',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './registro-mercancia-comercializador.component.html',
  styleUrl: './registro-mercancia-comercializador.component.scss',
})
export class RegistroMercanciaComercializadorComponent implements OnInit, OnDestroy{
  mercanciaAsociada:FormGroup;
  private destroyed$ = new Subject<void>();

  mostrarDatosMercanciaProductor: boolean = false;
  mostrarNombreIngles: boolean = false;
  mostrarClasificacionNaladi: boolean = false;
  mostrarClasificacionNaladisa93: boolean = false;
  mostrarClasificacionNaladisa96: boolean = false;
  mostrarClasificacionNaladisa02: boolean = false;
  mostrarJuegosSurtidos: boolean = false;

  constructor(private fb:FormBuilder,private service :MercanciaAsociadaService){



  this.mercanciaAsociada= this.fb.group({
      nombreComercial: [{ value: '', disabled: true }],
      nombreIngles: [{ value: '', disabled: true }],
      nombreTecnico: [{ value:'',disabled: true}],
      fraccionArancelaria: this.fb.group({
        clave: [{ value: '', disabled: true }],
        descripcion: [{ value: '', disabled: true }]
      }),
      fraccionNALADI: this.fb.group({
        clave: [{ value: '', disabled: true }],
        descripcion: [{ value: '', disabled: true }]
      }),
      fraccionNALADISA93: this.fb.group({
        clave: [{ value: '', disabled: true }],
        descripcion: [{ value: '', disabled: true }]
      }),
      fraccionNALADISA96: this.fb.group({
        clave: [{ value: '', disabled: true }],
        descripcion: [{ value: '', disabled: true }]
      }),
      fraccionNALADISA02: this.fb.group({
        clave: [{ value: '', disabled: true }],
        descripcion: [{ value: '', disabled: true }]
      }),
      descripcionJuego: [{ value: '', disabled: true},Validators.maxLength(256)],
     unidadAdministrativaRepresentacionFederal: this.fb.group({
                 clave: ['']
      })
      
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  ngOnInit(): void {
    this.recuperaValores();

}
    recuperaValores(): void {
      this.service.getMercanciaAsociada().pipe(
        takeUntil(this.destroyed$)
      ).subscribe(
        (data: any) => {
          this.mercanciaAsociada.patchValue({
            nombreComercial: data.Formdata.nombreComercial,
            nombreIngles: data.Formdata.nombreIngles,
            nombreTecnico: data.Formdata.nombreTecnico,
            fraccionArancelaria: {
              clave: data.Formdata.fraccionArancelaria.clave,
              descripcion: data.Formdata.fraccionArancelaria.descripcion
            },
            fraccionNALADI: {
              clave: data.Formdata.fraccionNALADI.clave,
              descripcion: data.Formdata.fraccionNALADI.descripcion
            },
            fraccionNALADISA93: {
              clave: data.Formdata.fraccionNALADISA93.clave,
              descripcion: data.Formdata.fraccionNALADISA93.descripcion
            },
            fraccionNALADISA96: {
              clave: data.Formdata.fraccionNALADISA96.clave,
              descripcion: data.Formdata.fraccionNALADISA96.descripcion
            },
            fraccionNALADISA02: {
              clave: data.Formdata.fraccionNALADISA02.clave,
              descripcion: data.Formdata.fraccionNALADISA02.descripcion
            },
            descripcionJuego: data.Formdata.descripcionJuego,
            unidadAdministrativaRepresentacionFederal: {
              clave: data.Formdata.unidadAdministrativaRepresentacionFederal.clave
            }
          });
          this.configurarVisibilidadCampos(data.Formvisiblity);
        }
      );
    }






private configurarVisibilidadCampos(data: any): void {
  this.mostrarDatosMercanciaProductor = data.mostrarDatosMercanciaProductor;
  this.mostrarNombreIngles = data.mostrarNombreIngles;
  this.mostrarClasificacionNaladi = data.mostrarClasificacionNaladi;
  this.mostrarClasificacionNaladisa93 = data.mostrarClasificacionNaladisa93;
  this.mostrarClasificacionNaladisa96 = data.mostrarClasificacionNaladisa96;
  this.mostrarClasificacionNaladisa02 = data.mostrarClasificacionNaladisa02;
  this.mostrarJuegosSurtidos = data.mostrarJuegosSurtidos;
}
}
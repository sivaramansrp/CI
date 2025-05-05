import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  // FormBuilder,
  // FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Solicitud120702State,
  Tramite120702Store,
} from '../../estados/tramite120702.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import {
  INFORMACION_DESCRPCION_CUPO,
  // INPUT_FECHA_FIN_CUPO,
  // INPUT_FECHA_INICIO_CUPO,
} from '../../constantes/expedicion-certificados-frontera.enum';
import { Tramite120702Query } from '../../estados/tramite120702.query';

@Component({
  selector: 'app-descripcion-cupo',
  standalone: true,
  imports: [ReactiveFormsModule, FormasDinamicasComponent, CommonModule],
  templateUrl: './descripcion-cupo.component.html',
  styleUrl: './descripcion-cupo.component.scss',
})
export class DescripcionCupoComponent implements OnInit, OnDestroy {
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  public informacionFormData = INFORMACION_DESCRPCION_CUPO;

  private destroy$ = new Subject<void>();

  public solicitudState!: Solicitud120702State;

  // public descripcionCupoForm!: FormGroup;

  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }


  constructor(
    // private fb: FormBuilder,
    private tramite120702Store: Tramite120702Store,
    private tramite120702Query: Tramite120702Query
  ) {
    //
  }

  ngOnInit(): void {
    // this.establecerDescripcionCupoFormGroup();

    this.tramite120702Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((state) => {
          this.solicitudState = state;
        })
      )
      .subscribe();
  }

  // establecerDescripcionCupoFormGroup(): void {
  //   this.descripcionCupoForm = this.fb.group({
  //     regimenAduanero: new FormControl({ value: '', disabled: true }),
  //     descripcionProducto: new FormControl({ value: '', disabled: true }),
  //     clasificacionSubProducto: new FormControl({ value: '', disabled: true }),
  //     unidadMedida: new FormControl({ value: '', disabled: true }),
  //     fechaInicioCupo: new FormControl({ value: '', disabled: true }),
  //     fechaFinCupo: new FormControl({ value: '', disabled: true }),
  //     mecanismoAsignacion: new FormControl({ value: '', disabled: true }),
  //     tratadoAcuerdo: new FormControl({ value: '', disabled: true }),
  //     fraccionesArancelarias: new FormControl({ value: '', disabled: true }),
  //     paises: new FormControl({ value: '', disabled: true }),
  //     observaciones: new FormControl({ value: '', disabled: true }),
  //     fundamento: new FormControl({ value: '', disabled: true }),
  //   });
  // }

  establecerCambioDeValor(event: { campo: string; valor: any }): void {
    if (event) {
      this.cambioEnValoresStore(event.campo, event.valor);
    }
    console.log(event.campo,event.valor)
  }

  cambioEnValoresStore(campo: string, valor: unknown): void {
      this.tramite120702Store.setDynamicFieldValue(campo,valor);
      console.log(campo,valor)
    }
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

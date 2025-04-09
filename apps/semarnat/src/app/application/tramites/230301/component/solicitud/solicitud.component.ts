import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesistimientoSolicitudService } from '../../services/desistimiento-solicitud.service';

import { Solicitud230301Store, Solicitud23030State } from '../../estados/tramites/tramites230301.store';
import { Subject, takeUntil  } from 'rxjs';


@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit {
public formDesistimiento!: FormGroup ;
private destroyNotifier$ = new Subject<void>();
constructor( private fb: FormBuilder,
  private desistimientoService: DesistimientoSolicitudService,
  private readonly desistimientoStore: Solicitud230301Store,
) {}


ngOnInit(): void {
  this.formDesistimiento = this.fb.group({
    desistimientoFolio: [{ value: '', disabled: true }, Validators.required],
    solicitudTipo: [{ value: '', disabled: true }, [Validators.required]],
    desistimientoMotivo: ['', [Validators.required]],
  })
  this.getFromdata();
  }

  getFromdata() {
    this.desistimientoService.getDesistimientoSolicitud('solictud.json')
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((data) => {
      console.log(data);
      this.formDesistimiento.patchValue({
        desistimientoFolio: data.desistimientoFolio,
        solicitudTipo: data.solicitudTipo,
        desistimientoMotivo: ''
      });
    }, (error) => {
      console.error(error);
    });
  }

  validate(): void {
    if (this.formDesistimiento.valid) {
      console.log('Formulario válido');
      console.log(this.formDesistimiento.value);
    } else {
      console.log('Formulario inválido');
      this.formDesistimiento.markAllAsTouched();
    }
  }

  onDescripcionChange(): void {
    /**  Actualizamos la descripción en el estado global */
    this.desistimientoStore.setDesistimientoMotivo(this.formDesistimiento.value || {} as Solicitud23030State)
    console.log(this.desistimientoStore.getValue());
  }

}


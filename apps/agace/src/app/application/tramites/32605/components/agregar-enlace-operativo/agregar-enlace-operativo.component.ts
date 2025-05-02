import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentanteLegal } from '../../models/solicitud.model';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-agregar-enlace-operativo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './agregar-enlace-operativo.component.html',
  styleUrl: './agregar-enlace-operativo.component.scss',
})
export class AgregarEnlaceOperativoComponent implements OnInit, OnDestroy {
  agregarEnlaceOperativoForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  solicitud32605State: Solicitud32605State = {} as Solicitud32605State;
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32605Store: Solicitud32605Store,
    public solicitud32605Query: Solicitud32605Query
  ) {}

  ngOnInit(): void {
    this.agregarEnlaceOperativoForm = this.fb.group({
      agregarEnlaceRfcTercero: [
        this.solicitud32605State.rfcTercero,
        [Validators.required],
      ],
      agregarEnlaceRfc: [
        { value: this.solicitud32605State.rfc, disabled: true },
      ],
      agregarEnlaceNombre: [
        { value: this.solicitud32605State.nombre, disabled: true },
      ],
      agregarEnlaceApellidoPaterno: [
        { value: this.solicitud32605State.apellidoPaterno, disabled: true },
      ],
      agregarEnlaceApellidoMaterno: [
        { value: this.solicitud32605State.apellidoMaterno, disabled: true },
      ],
      agregarEnlaceCiudadEstado: [
        {
          value: this.solicitud32605State.agregarEnlaceCiudadEstado,
          disabled: true,
        },
      ],
      agregarEnlaceCargo: [this.solicitud32605State.agregarEnlaceCargo],
      agregarEnlaceTelefono: [
        this.solicitud32605State.telefono,
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      agregarEnlaceCorreoElectronico: [
        this.solicitud32605State.correoElectronico,
        [Validators.required, Validators.email],
      ],
      agregarEnlaceSuplente: [this.solicitud32605State.agregarEnlaceSuplente],
    });

    this.solicitud32605Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32605State) => {
          this.solicitud32605State = respuesta;
          this.agregarEnlaceOperativoForm.patchValue({
            agregarEnlaceRfcTercero: this.solicitud32605State.rfcTercero,
            agregarEnlaceRfc: this.solicitud32605State.rfc,
            agregarEnlaceNombre: this.solicitud32605State.nombre,
            agregarEnlaceApellidoPaterno:
              this.solicitud32605State.apellidoPaterno,
            agregarEnlaceApellidoMaterno:
              this.solicitud32605State.apellidoMaterno,
            agregarEnlaceCiudadEstado:
              this.solicitud32605State.agregarEnlaceCiudadEstado,
            agregarEnlaceCargo: this.solicitud32605State.agregarEnlaceCargo,
            agregarEnlaceTelefono: this.solicitud32605State.telefono,
            agregarEnlaceCorreoElectronico:
              this.solicitud32605State.correoElectronico,
            agregarEnlaceSuplente:
              this.solicitud32605State.agregarEnlaceSuplente,
          });
        })
      )
      .subscribe();
  }

  buscarTerceroNacionalIDC(): void {
    if (this.agregarEnlaceOperativoForm.get('rfcTercero')?.value) {
      this.solicitudService
        .conseguirRepresentanteLegalDatos()
        .pipe(takeUntil(this.destroy$))
        .subscribe((respuesta: RepresentanteLegal) => {
          this.solicitud32605Store.actualizarEnlaceRfc(respuesta.rfc);
          this.solicitud32605Store.actualizarEnlaceNombre(respuesta.nombre);
          this.solicitud32605Store.actualizarEnlaceApellidoPaterno(
            respuesta.apellidoPaterno
          );
          this.solicitud32605Store.actualizarEnlaceApellidoMaterno(
            respuesta.apellidoMaterno
          );
          this.solicitud32605Store.actualizarEnlaceTelefono(respuesta.telefono);
          this.solicitud32605Store.actualizarEnlaceCorreoElectronico(
            respuesta.correoElectronico
          );
        });
    }
  }

  actualizarRfcTercero(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarRfcTercero(VALOR);
  }

  actualizarTelefono(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarTelefono(VALOR);
  }

  actualizarCorreoElectronico(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarCorreoElectronico(VALOR);
  }

  agregarEnlaceCargo(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarEnlaceCargo(VALOR);
  }

  actualizarEnlaceSuplente(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.solicitud32605Store.actualizarEnlaceSuplente(VALOR);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

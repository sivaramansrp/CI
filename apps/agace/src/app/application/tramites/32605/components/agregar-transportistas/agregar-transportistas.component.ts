import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TransportistasTable } from '../../models/solicitud.model';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-agregar-transportistas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  providers: [],
  templateUrl: './agregar-transportistas.component.html',
  styleUrl: './agregar-transportistas.component.scss',
})
export class AgregarTransportistasComponent implements OnInit, OnDestroy {
  transportistaCertificacionForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  solicitud32605State: Solicitud32605State = {} as Solicitud32605State;
  @Output() transportistasDatos = new EventEmitter<TransportistasTable>();
  constructor(
    private fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32605Store: Solicitud32605Store,
    public solicitud32605Query: Solicitud32605Query
  ) {}

  ngOnInit(): void {
    this.transportistaCertificacionForm = this.fb.group({
      transportistaRFC: [
        this.solicitud32605State.transportistaRFC,
        [Validators.required, Validators.maxLength(13)],
      ],
      transportistaRFCModifTrans: [
        {
          value: this.solicitud32605State.transportistaRFCModifTrans,
          disabled: true,
        },
        [Validators.maxLength(13)],
      ],
      transportistaRazonSocial: [
        {
          value: this.solicitud32605State.transportistaRazonSocial,
          disabled: true,
        },
        [Validators.maxLength(254)],
      ],
      transportistaDomicilio: [
        {
          value: this.solicitud32605State.transportistaDomicilio,
          disabled: true,
        },
        [Validators.maxLength(300)],
      ],
      transportistaCaat: [
        { value: this.solicitud32605State.transportistaCaat, disabled: true },
        [Validators.maxLength(254)],
      ],
      transportistaIdDomicilio: [
        this.solicitud32605State.transportistaIdDomicilio,
      ],
      transportistaIdRFC: [this.solicitud32605State.transportistaIdRFC],
      transportistaIdRazonSocial: [
        this.solicitud32605State.transportistaIdRazonSocial,
      ],
      transportistaIdCaat: [this.solicitud32605State.transportistaIdCaat],
    });

    this.solicitud32605Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32605State) => {
          this.solicitud32605State = respuesta;
          this.transportistaCertificacionForm.patchValue({
            transportistaRFC: this.solicitud32605State.transportistaIdRFC,
            transportistaRFCModifTrans:
              this.solicitud32605State.transportistaRFCModifTrans,
            transportistaRazonSocial:
              this.solicitud32605State.transportistaIdRazonSocial,
            transportistaDomicilio:
              this.solicitud32605State.transportistaDomicilio,
            transportistaCaat: this.solicitud32605State.transportistaCaat,
          });
        })
      )
      .subscribe();
  }

  actualizarTransportistaRFC(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarTransportistaRFC(VALOR);
  }

  actualizarTransportistaRFCModifTrans(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarTransportistaRFCModifTrans(VALOR);
  }

  actualizarTransportistaRazonSocial(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarTransportistaRazonSocial(VALOR);
  }

  actualizarTransportistaDomicilio(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarTransportistaDomicilio(VALOR);
  }

  actualizarTransportistaCaat(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarTransportistaCaat(VALOR);
  }

  noEsValido(id: string): boolean | undefined {
    const CONTROL = this.transportistaCertificacionForm.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  selectBuscarTransportista(): void {
    if (this.transportistaCertificacionForm.get('transportistaRFC')?.value) {
      this.conseguirTransportistasLista();
    }
  }

  conseguirTransportistasLista(): void {
    this.solicitudService
      .conseguirTransportistasLista()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: TransportistasTable[]) => {
          this.solicitud32605Store.actualizarTransportistaRazonSocial(
            respuesta[0].razonSocial
          );
          this.solicitud32605Store.actualizarTransportistaDomicilio(
            respuesta[0].domicilio
          );
          this.solicitud32605Store.actualizarTransportistaCaat(
            respuesta[0].caat
          );
        },
      });
  }

  aceptarTransportista(): void {
    const OBJETO_JSON: TransportistasTable = {
      rfc: this.transportistaCertificacionForm.get('transportistaRFCModifTrans')
        ?.value,
      razonSocial: this.transportistaCertificacionForm.get(
        'transportistaRazonSocial'
      )?.value,
      domicilio: this.transportistaCertificacionForm.get(
        'transportistaDomicilio'
      )?.value,
      caat: this.transportistaCertificacionForm.get('transportistaCaat')?.value,
    };
    this.transportistasDatos.emit(OBJETO_JSON);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

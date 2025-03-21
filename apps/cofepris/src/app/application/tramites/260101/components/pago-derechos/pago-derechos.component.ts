import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Catalogo,
  CatalogosSelect,
  InputFecha,
} from '@libs/shared/data-access-user/src';
import {
  Solicitud260101State,
  Solicitud260101Store,
} from '../../estados/tramites260101.store';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';

@Component({
  selector: 'app-pago-derechos',
  templateUrl: './pago-derechos.component.html',
  styleUrl: './pago-derechos.component.scss',
})
export class PagoDerechosComponent implements OnInit, OnDestroy {
  pagoDeDerechosForm!: FormGroup;
  bancoCatalogo: CatalogosSelect = {} as CatalogosSelect;

  fechaPago: InputFecha = {
    labelNombre: 'Fecha de pago',
    required: false,
    habilitado: true,
  };
  solicitud260101State: Solicitud260101State = {} as Solicitud260101State;
  private destroyNotifier$: Subject<void> = new Subject();
  constructor(
    public fb: FormBuilder,
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260101Store: Solicitud260101Store,
    public solicitud260101Query: Solicitud260101Query
  ) {
    //
    this.obtenerPagoDerechos();
  }

  ngOnInit() {
    this.pagoDeDerechosForm = this.fb.group({
      claveDeReferencia: [this.solicitud260101State.claveDeReferencia],
      cadenaDeDependencia: [this.solicitud260101State.cadenaDeDependencia],
      banco: [this.solicitud260101State.banco],
      liaveDePago: [this.solicitud260101State.liaveDePago],
      fechaDePago: [this.solicitud260101State.fechaDePago],
      importeDePago: [this.solicitud260101State.importeDePago],
    });

    this.solicitud260101Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((res: Solicitud260101State) => {
          this.solicitud260101State = res;
          this.pagoDeDerechosForm.patchValue({
            claveDeReferencia: this.solicitud260101State.claveDeReferencia,
            cadenaDeDependencia: this.solicitud260101State.cadenaDeDependencia,
            banco: this.solicitud260101State.banco,
            liaveDePago: this.solicitud260101State.liaveDePago,
            fechaDePago: this.solicitud260101State.fechaDePago,
            importeDePago: this.solicitud260101State.importeDePago,
          });
        })
      )
      .subscribe();
  }

  obtenerPagoDerechos() {
    this.solicitudDatosService.obtenerPagoDerechos().subscribe({
      next:((res:CatalogosSelect)=>{
        this.bancoCatalogo = res;
      })
    });
  }

  setClaveDeReferencia(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setClaveDeReferencia(VALUE);
  }

  setCadenaDeDependencia(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setCadenaDeDependencia(VALUE);
  }

  setBanco(event: Catalogo) {
    this.solicitud260101Store.setBanco(event.id);
  }

  setLiaveDePago(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setLiaveDePago(VALUE);
  }

  seleccionarFechaInicio(event: string): void {
    this.solicitud260101Store.setFechaDePago(event);
  }

  setImporteDePago(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setImporteDePago(VALUE);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}

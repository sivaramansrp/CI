import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Catalogo,
  CatalogosSelect,
  REGEX_CORREO_ELECTRONICO,
} from '@libs/shared/data-access-user/src';
import {
  Solicitud260101State,
  Solicitud260101Store,
} from '../../estados/tramites260101.store';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { DestinatarioCatalogos } from '../../models/destinatario.model';

@Component({
  selector: 'app-modificar-destinatario',
  templateUrl: './modificar-destinatario.component.html',
  styleUrl: './modificar-destinatario.component.scss',
})
export class ModificarDestinatarioComponent implements OnInit, OnDestroy {
  modificarDestinatarioForm!: FormGroup;
  tipoPersonaRadioOptions: { label: string; value: string | number }[] = [];
  tipoPublicos = 'moral';

  paisCatalogo: CatalogosSelect = {} as CatalogosSelect;
  estadoCatalogo: CatalogosSelect = {} as CatalogosSelect;
  municipioCatalogo: CatalogosSelect = {} as CatalogosSelect;
  localidadCatalogo: CatalogosSelect = {} as CatalogosSelect;
  codigoCatalogo: CatalogosSelect = {} as CatalogosSelect;
  coloniaCatalogo: CatalogosSelect = {} as CatalogosSelect;
  solicitud260101State: Solicitud260101State = {} as Solicitud260101State;
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    public fb: FormBuilder,
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260101Store: Solicitud260101Store,
    public solicitud260101Query: Solicitud260101Query
  ) {
    this.obtenerDestinatarioCatalogos();
    this.obtenerDestinatarioRadio();
  }

  ngOnInit(): void {
    this.modificarDestinatarioForm = this.fb.group({
      tipoPersona: [
        this.solicitud260101State.tipoPersona,
        [Validators.required],
      ],
      modificarRFC: [
        this.solicitud260101State.modificarRFC,
        [Validators.required],
      ],
      denominacion: [
        this.solicitud260101State.denominacion,
        [Validators.required],
      ],
      domicilioPais: [
        { value: this.solicitud260101State.domicilioPais, disabled: true },
        [Validators.required],
      ],
      domicilioEstado: [
        this.solicitud260101State.domicilioEstado,
        [Validators.required],
      ],
      domicilioMunicipio: [
        this.solicitud260101State.domicilioMunicipio,
        [Validators.required],
      ],
      domicilioLocalidad: [
        this.solicitud260101State.domicilioLocalidad,
        [Validators.required],
      ],
      domicilioCodigo: [
        this.solicitud260101State.domicilioCodigo,
        [Validators.required],
      ],
      domicilioColonia: [this.solicitud260101State.domicilioColonia],
      domiciliCalle: [
        this.solicitud260101State.domiciliCalle,
        [Validators.required],
      ],
      domiciliNumeroExterior: [
        this.solicitud260101State.domiciliNumeroExterior,
        [Validators.required],
      ],
      domiciliNumeroInterior: [
        this.solicitud260101State.domiciliNumeroInterior,
      ],
      domiciliLada: [this.solicitud260101State.domiciliLada],
      domiciliTelefono: [this.solicitud260101State.domiciliTelefono],
      domiciliCorreoElectronioco: [
        this.solicitud260101State.domiciliCorreoElectronioco,
        [Validators.pattern(REGEX_CORREO_ELECTRONICO)],
      ],
    });

    this.solicitud260101Query.seleccionarSolicitud$.pipe(
      takeUntil(this.destroyNotifier$),
      map((res: Solicitud260101State) => {
        this.solicitud260101State = res;
        this.modificarDestinatarioForm.patchValue({
          tipoPersona: this.solicitud260101State.tipoPersona,
          modificarRFC: this.solicitud260101State.modificarRFC,
          denominacion: this.solicitud260101State.denominacion,
          domicilioPais: this.solicitud260101State.domicilioPais,
          domicilioEstado: this.solicitud260101State.domicilioEstado,
          domicilioMunicipio: this.solicitud260101State.domicilioMunicipio,
          domicilioLocalidad: this.solicitud260101State.domicilioLocalidad,
          domicilioCodigo: this.solicitud260101State.domicilioCodigo,
          domicilioColonia: this.solicitud260101State.domicilioColonia,
          domiciliCalle: this.solicitud260101State.domiciliCalle,
          domiciliNumeroExterior:
            this.solicitud260101State.domiciliNumeroExterior,
          domiciliNumeroInterior:
            this.solicitud260101State.domiciliNumeroInterior,
          domiciliLada: this.solicitud260101State.domiciliLada,
          domiciliTelefono: this.solicitud260101State.domiciliTelefono,
          domiciliCorreoElectronioco:
            this.solicitud260101State.domiciliCorreoElectronioco,
        });
      })
    );
  }

  obtenerDestinatarioCatalogos() {
    this.solicitudDatosService.obtenerDestinatarioCatalogos().subscribe({
      next: (res: DestinatarioCatalogos) => {
        this.paisCatalogo = res.paisCatalogo;
        this.estadoCatalogo = res.estadoCatalogo;
        this.municipioCatalogo = res.municipioCatalogo;
        this.localidadCatalogo = res.localidadCatalogo;
        this.codigoCatalogo = res.codigoCatalogo;
        this.coloniaCatalogo = res.codigoCatalogo;
      },
    });
  }

  obtenerDestinatarioRadio() {
    this.solicitudDatosService.obtenerDestinatarioRadio().subscribe({
      next: (res: { label: string; value: string | number }[]) => {
        this.tipoPersonaRadioOptions = res;
      },
    });
  }

  setTipoPersona(event: string | number) {
    this.solicitud260101Store.setTipoPersona(event);
  }

  setModificarRFC(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setModificarRFC(VALUE);
  }

  setDenominacion(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setDenominacion(VALUE);
  }

  seleccionaPais(event: Catalogo): void {
    this.solicitud260101Store.setDomicilioPais(event.id);
  }

  seleccionaEstado(event: Catalogo): void {
    this.solicitud260101Store.setDomicilioEstado(event.id);
  }

  seleccionaMunicipio(event: Catalogo): void {
    this.solicitud260101Store.setDomicilioMunicipio(event.id);
  }

  seleccionaLocalidad(event: Catalogo): void {
    this.solicitud260101Store.setDomicilioLocalidad(event.id);
  }

  seleccionaCodigo(event: Catalogo): void {
    this.solicitud260101Store.setDomicilioCodigo(event.id);
  }

  seleccionaColonia(event: Catalogo): void {
    this.solicitud260101Store.setDomicilioColonia(event.id);
  }

  setDomiciliCalle(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setDomicilioCalle(VALUE);
  }

  setDomiciliNumeroExterior(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setDomicilioNumeroExterior(VALUE);
  }

  setDomiciliNumeroInterior(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setDomicilioNumeroInterior(VALUE);
  }

  setDomiciliLada(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setDomicilioLada(VALUE);
  }

  setDomiciliTelefono(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setDomicilioTelefono(VALUE);
  }

  setDomiciliCorreoElectronioco(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setDomicilioCorreoElectronico(VALUE);
  }

  limpiarDestinatario() {
    this.modificarDestinatarioForm.reset();
  }

  guardarDestinatario() {
    if (this.modificarDestinatarioForm.invalid) {
      return;
    }
    const JSON_OBJECT = {
      nombre: this.modificarDestinatarioForm.get('denominacion')?.value,
      rfc: this.modificarDestinatarioForm.get('modificarRFC')?.value,
      curp: '--',
      telefono: this.modificarDestinatarioForm.get('domiciliTelefono')?.value,
      correoElectronico: this.modificarDestinatarioForm.get(
        'domiciliCorreoElectronioco'
      )?.value,
      calle: this.modificarDestinatarioForm.get('domiciliCalle')?.value,
      numeroExterior: this.modificarDestinatarioForm.get(
        'domiciliNumeroExterior'
      )?.value,
      numeroInterior: this.modificarDestinatarioForm.get(
        'domiciliNumeroInterior'
      )?.value,
      pais: this.modificarDestinatarioForm.get('domicilioPais')?.value,
      colonia: this.modificarDestinatarioForm.get('domicilioColonia')?.value,
      municipio:
        this.modificarDestinatarioForm.get('domicilioMunicipio')?.value,
      localidad:
        this.modificarDestinatarioForm.get('domicilioLocalidad')?.value,
      estado: this.modificarDestinatarioForm.get('domicilioEstado')?.value,
      estado2: '--',
      codigo: this.modificarDestinatarioForm.get('domicilioCodigo')?.value,
    };
    this.solicitud260101Store.addDestinatarioDato(JSON_OBJECT);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}

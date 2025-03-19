import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnvFunction } from '@babel/core';
import {
  Catalogo,
  CatalogosSelect,
  REGEX_CORREO_ELECTRONICO,
} from '@libs/shared/data-access-user/src';
import { Solicitud260101State, Solicitud260101Store } from '../../estados/tramites260101.store';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud260101Query } from '../../estados/tramites260101.query';

@Component({
  selector: 'app-modificar-destinatario',
  templateUrl: './modificar-destinatario.component.html',
  styleUrl: './modificar-destinatario.component.scss',
})
export class ModificarDestinatarioComponent implements OnInit, OnDestroy {
  modificarDestinatarioForm!: FormGroup;
  tipoRadioOptions = [
    {
      label: 'Fisica',
      value: 'fisica',
    },
    {
      label: 'Moral',
      value: 'moral',
    },
  ];
  tipoPublicos = 'moral';

  paisCatalogo: CatalogosSelect = {
    labelNombre: 'Pais',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 1,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };
  estadoCatalogo: CatalogosSelect = {
    labelNombre: 'Estado/localidad',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 1,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };
  municipioCatalogo: CatalogosSelect = {
    labelNombre: 'Municipio/alcaldia',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 1,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };
  localidadCatalogo: CatalogosSelect = {
    labelNombre: 'Localidad',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 1,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };
  codigoCatalogo: CatalogosSelect = {
    labelNombre: 'Codigo postal o equivalente',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 1,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };
  coloniaCatalogo: CatalogosSelect = {
    labelNombre: 'Colonia',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 1,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };

  solicitud260101State: Solicitud260101State = {} as Solicitud260101State;
  private destroyNotifier$: Subject<void> = new Subject();
  constructor(
    public fb: FormBuilder,
    public solicitud260101Store: Solicitud260101Store,
    public solicitud260101Query: Solicitud260101Query
  ) {
    //
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
      map((res: Solicitud260101State)=>{
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
          domiciliNumeroExterior: this.solicitud260101State.domiciliNumeroExterior,
          domiciliNumeroInterior: this.solicitud260101State.domiciliNumeroInterior,
          domiciliLada: this.solicitud260101State.domiciliLada,
          domiciliTelefono: this.solicitud260101State.domiciliTelefono,
          domiciliCorreoElectronioco:
            this.solicitud260101State.domiciliCorreoElectronioco,
        });
      })
    )

    // this.modificarDestinatarioForm = this.fb.group({
    //   tipoPersona: [this.solicitud260101State.tipoPersona, [Validators.required]],
    //   modificarRFC: ['', [Validators.required]],
    //   denominacion: ['', [Validators.required]],
    //   domicilioPais: [{ value: 1, disabled: true }, [Validators.required]],
    //   domicilioEstado: ['', [Validators.required]],
    //   domicilioMunicipio: ['', [Validators.required]],
    //   domicilioLocalidad: ['', [Validators.required]],
    //   domicilioCodigo: ['', [Validators.required]],
    //   domicilioColonia: [''],
    //   domiciliCalle: ['', [Validators.required]],
    //   domiciliNumeroExterior: [0, [Validators.required]],
    //   domiciliNumeroInterior: [0],
    //   domiciliLada: [],
    //   domiciliTelefono: [23434],
    //   domiciliCorreoElectronioco: [
    //     '',
    //     [Validators.pattern(REGEX_CORREO_ELECTRONICO)],
    //   ],
    // });
  }

  setTipoPersona(event: string | number) {
    this.solicitud260101Store.setTipoPersona(event);
  }

  setModificarRFC(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setModificarRFC(VALUE)
  }

  setDenominacion(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setDenominacion(VALUE)
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

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}

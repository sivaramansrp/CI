import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Domicilios } from '../../models/solicitud.model';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadio } from '../../models/solicitud.model';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudCatologoSelectLista } from '../../models/solicitud.model';
import { SolicitudRadioLista } from '../../models/solicitud.model';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para manejar las instalaciones principales.
 * Se encarga de gestionar el formulario de las instalaciones principales y emitir los cambios.
 */
@Component({
  selector: 'app-instalaciones-principales',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    InputRadioComponent,
  ],
  providers: [SolicitudService],
  templateUrl: './instalaciones-principales.component.html',
  styleUrl: './instalaciones-principales.component.scss',
})
/**
 * Componente para manejar las instalaciones principales.
 * Se encarga de gestionar el formulario de las instalaciones principales y emitir los cambios.
 */
export class InstalacionesPrincipalesComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para las instalaciones principales.
   * Contiene los campos necesarios para almacenar la información de las instalaciones.
   */
  instalacionesPrincipalesForm!: FormGroup;

  /**
   * Subject para manejar el ciclo de vida del componente y evitar fugas de memoria.
   */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Opción seleccionada en los radio buttons (sino opción).
   * Esta variable contiene la respuesta de los requisitos en el formulario.
   */
  sinoOpcion: InputRadio = {} as InputRadio;

  /**
   * Catálogo de tipos de instalación.
   * Se utiliza para la selección del tipo de instalación en el formulario.
   */
  tipoDeInstalacion: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Estado de la solicitud.
   * Se utiliza para obtener y gestionar el estado actual de la solicitud en el formulario.
   */
  solicitud32605State: Solicitud32605State = {} as Solicitud32605State;

  /**
   * Emisor de eventos para emitir los datos de las instalaciones principales.
   * Se utiliza para enviar la información del formulario cuando se acepta.
   */
  @Output() instalacionesPrincipales = new EventEmitter<Domicilios>();

  /**
   * Constructor del componente.
   * Se inicializan los servicios necesarios para obtener las opciones del formulario.
   */
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32605Store: Solicitud32605Store,
    public solicitud32605Query: Solicitud32605Query
  ) {
    this.conseguirOpcionDeRadio();
    this.conseguirSolicitudCatologoSelectLista();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa el formulario con los valores actuales del estado de la solicitud.
   */
  ngOnInit(): void {
    this.instalacionesPrincipalesForm = this.fb.group({
      principales: [
        this.solicitud32605State.principales,
        [Validators.required],
      ],
      municipio: [this.solicitud32605State.municipio],
      tipoDeInstalacion: [
        this.solicitud32605State.tipoDeInstalacion,
        [Validators.required],
      ],
      entidadFederativa: [this.solicitud32605State.entidadFederativa],
      registroSESAT: [this.solicitud32605State.entidadFederativa],
      descripcion: [this.solicitud32605State.descripcion],
      codigoPostal: [this.solicitud32605State.codigoPostal],
      procesoProductivo: [
        this.solicitud32605State.procesoProductivo,
        [Validators.required],
      ],
      goceDelInmueble: [
        this.solicitud32605State.goceDelInmueble,
        [Validators.required],
      ],
      empresa: [this.solicitud32605State.empresa],
      comercioExterior: [
        this.solicitud32605State.comercioExterior,
        [Validators.required],
      ],
      mutuo: [this.solicitud32605State.mutuo, [Validators.required]],
    });

    this.solicitud32605Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32605State) => {
          this.solicitud32605State = respuesta;
          this.instalacionesPrincipalesForm.patchValue({
            principales: this.solicitud32605State.principales,
            municipio: this.solicitud32605State.municipio,
            tipoDeInstalacion: this.solicitud32605State.tipoDeInstalacion,
            entidadFederativa: this.solicitud32605State.entidadFederativa,
            registroSESAT: this.solicitud32605State.registroSESAT,
            descripcion: this.solicitud32605State.descripcion,
            codigoPostal: this.solicitud32605State.codigoPostal,
            procesoProductivo: this.solicitud32605State.procesoProductivo,
            goceDelInmueble: this.solicitud32605State.goceDelInmueble,
            empresa: this.solicitud32605State.empresa,
            comercioExterior: this.solicitud32605State.comercioExterior,
            mutuo: this.solicitud32605State.mutuo,
          });
        })
      )
      .subscribe();
  }

  /**
   * Obtiene las opciones de los requisitos a partir del servicio.
   * Se suscribe a la respuesta para asignar el valor a `sinoOpcion`.
   */
  conseguirOpcionDeRadio(): void {
    this.solicitudService
      .conseguirOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudRadioLista) => {
          this.sinoOpcion = respuesta.requisitos;
        },
      });
  }

  /**
   * Obtiene la lista de catálogos de selección para los tipos de instalación.
   * Se suscribe a la respuesta y asigna el valor a `tipoDeInstalacion`.
   */
  conseguirSolicitudCatologoSelectLista(): void {
    this.solicitudService
      .conseguirSolicitudCatologoSelectLista()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudCatologoSelectLista) => {
          this.tipoDeInstalacion = respuesta.tipoDeInstalacion;
        },
      });
  }

  /**
   * Actualiza el valor de "principales" en el estado de la solicitud.
   * Se utiliza para reflejar el cambio en el formulario.
   */
  actualizarPrincipales(valor: string | number): void {
    this.solicitud32605Store.actualizarPrincipales(valor);
  }

  /**
   * Actualiza el valor del municipio en el estado de la solicitud.
   * Se obtiene el valor del campo de entrada y se actualiza el estado.
   */
  actualizarMunicipio(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarMunicipio(VALOR);
  }

  /**
   * Actualiza el valor del tipo de instalación en el estado de la solicitud.
   * Se utiliza para reflejar el cambio en el formulario.
   */
  actualizarTipoDeInstalacion(evento: Catalogo): void {
    this.solicitud32605Store.actualizarTipoDeInstalacion(evento.id);
  }

  /**
   * Actualiza el valor de la entidad federativa en el estado de la solicitud.
   * Se obtiene el valor del campo de entrada y se actualiza el estado.
   */
  actualizarEntidadFederativa(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarEntidadFederativa(VALOR);
  }

  /**
   * Actualiza el valor del registro SESAT en el estado de la solicitud.
   * Se obtiene el valor del campo de entrada y se actualiza el estado.
   */
  actualizarRegistroSESAT(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarRegistroSESAT(VALOR);
  }

  /**
   * Actualiza el valor de la descripción en el estado de la solicitud.
   * Se obtiene el valor del campo de entrada y se actualiza el estado.
   */
  actualizarDescripcion(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarDescripcion(VALOR);
  }

  /**
   * Actualiza el valor del código postal en el estado de la solicitud.
   * Se obtiene el valor del campo de entrada y se actualiza el estado.
   */
  actualizarCodigoPostal(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarCodigoPostal(VALOR);
  }

  /**
   * Actualiza el valor del proceso productivo en el estado de la solicitud.
   * Se utiliza para reflejar el cambio en el formulario.
   */
  actualizarProcesoProductivo(valor: string | number): void {
    this.solicitud32605Store.actualizarProcesoProductivo(valor);
  }

  /**
   * Actualiza el valor del goce del inmueble en el estado de la solicitud.
   * Se utiliza para reflejar el cambio en el formulario.
   */
  actualizarGoceDelInmueble(valor: string | number): void {
    this.solicitud32605Store.actualizarGoceDelInmueble(valor);
  }

  /**
   * Actualiza el valor de la empresa en el estado de la solicitud.
   * Se utiliza para reflejar el cambio en el formulario.
   */
  actualizarEmpresa(valor: string | number): void {
    this.solicitud32605Store.actualizarEmpresa(valor);
  }

  /**
   * Actualiza el valor del comercio exterior en el estado de la solicitud.
   * Se utiliza para reflejar el cambio en el formulario.
   */
  actualizarComercioExterior(valor: string | number): void {
    this.solicitud32605Store.actualizarComercioExterior(valor);
  }

  /**
   * Actualiza el valor del mutuo en el estado de la solicitud.
   * Se utiliza para reflejar el cambio en el formulario.
   */
  actualizarMutuo(valor: string | number): void {
    this.solicitud32605Store.actualizarMutuo(valor);
  }

  /**
   * Emitir los datos de las instalaciones principales.
   * Se construye un objeto con los valores del formulario y se emite al componente padre.
   */
  aceptarInstalacionesPrincipales(): void {
    const OBJETO_JSON: Domicilios = {
      instalacionPrincipal:
        this.instalacionesPrincipalesForm.get('principales')?.value,
      tipoInstalacion:
        this.instalacionesPrincipalesForm.get('tipoDeInstalacion')?.value,
      entidadFederativa:
        this.instalacionesPrincipalesForm.get('entidadFederativa')?.value,
      municipioDelegacion:
        this.instalacionesPrincipalesForm.get('municipio')?.value,
      direccion: this.instalacionesPrincipalesForm.get('descripcion')?.value,
      codigoPostal:
        this.instalacionesPrincipalesForm.get('codigoPostal')?.value,
      registroSESAT:
        this.instalacionesPrincipalesForm.get('registroSESAT')?.value,
      procesoProductivo:
        this.instalacionesPrincipalesForm.get('procesoProductivo')?.value,
      acreditaInmueble:
        this.instalacionesPrincipalesForm.get('goceDelInmueble')?.value,
      operacionesCExt:
        this.instalacionesPrincipalesForm.get('comercioExterior')?.value,
      instalacionCtpat: '',
      instalacionPerfil: '',
      instalacionPerfilRFE: '',
      instalacionPerfilAuto: '',
      instalacionPerfilFerro: '',
      instalacionPerfilRf: '',
      instalacionPerfilMensajeria: '',
    };

    this.instalacionesPrincipales.emit(OBJETO_JSON);
  }

  /**
   * Método que se ejecuta cuando el componente se destruye.
   * Limpia el observable `destroy$` para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

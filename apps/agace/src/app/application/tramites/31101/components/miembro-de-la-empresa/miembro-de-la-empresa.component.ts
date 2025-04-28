import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosGeneralesDeLaSolicitudCatologo } from '../../models/solicitud.model';
import { DatosGeneralesDeLaSolicitudRadioLista } from '../../models/solicitud.model';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadio } from '../../models/solicitud.model';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SeccionSociosIC } from '../../models/solicitud.model';
import { Solicitud31101Query } from '../../estados/solicitud31101.query';
import { Solicitud31101State } from '../../estados/solicitud31101.store';
import { Solicitud31101Store } from '../../estados/solicitud31101.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-miembro-de-la-empresa',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
  ],
  templateUrl: './miembro-de-la-empresa.component.html',
  styleUrl: './miembro-de-la-empresa.component.scss',
})
export class MiembroDeLaEmpresaComponent implements OnInit, OnDestroy {
  @Output() eventoCerrarModal = new EventEmitter<void>();
  miembroEmpresaForm!: FormGroup;

  seleccionarObligadoTributar: number | string = 0;
  seleccionarTipoDePersona: number = 0;
  /** Subject utilizado para destruir observables y evitar fugas de memoria */
  private destroy$: Subject<void> = new Subject<void>();

  sinoOpcion: InputRadio = {} as InputRadio;

  /** Estado actual de la solicitud 31101 */
  solicitud31101State: Solicitud31101State = {} as Solicitud31101State;

  enSuCaracterDeLista: CatalogosSelect = {} as CatalogosSelect;

  nacionalidadLista: CatalogosSelect = {} as CatalogosSelect;

  tipoDePersonaLista: CatalogosSelect = {} as CatalogosSelect;

  @Output() eventoActualizarMiembro = new EventEmitter<SeccionSociosIC>();
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud31101Store: Solicitud31101Store,
    public solicitud31101Query: Solicitud31101Query
  ) {
    this.conseguirDatosGeneralesCatologo();
    this.conseguirDatosGeneralesOpcionDeRadio();
  }

  ngOnInit(): void {
    this.miembroEmpresaForm = this.fb.group({
      miembroCaracterDe: [
        { value: this.solicitud31101State.miembroCaracterDe, disabled: false },
        [Validators.required],
      ],
      miembroTributarMexico: [
        {
          value: this.solicitud31101State.miembroTributarMexico,
          disabled: false,
        },
        [Validators.required],
      ],
      miembroNacionalidad: [
        {
          value: this.solicitud31101State.miembroNacionalidad,
          disabled: false,
        },
        [Validators.required],
      ],
      miembroRfc: [
        { value: this.solicitud31101State.miembroRfc, disabled: false },
        [Validators.required],
      ],
      miembroRegistroFederal: [
        {
          value: this.solicitud31101State.miembroRegistroFederal,
          disabled: true,
        },
        [Validators.required],
      ],
      miembroNombreCompleto: [
        {
          value: this.solicitud31101State.miembroNombreCompleto,
          disabled: true,
        },
        [Validators.required],
      ],
      miembroTipoPersonaMuestra: [
        {
          value: this.solicitud31101State.miembroTipoPersonaMuestra,
          disabled: false,
        },
        [Validators.required],
      ],
      miembroNombre: [
        { value: this.solicitud31101State.miembroNombre, disabled: false },
        [Validators.required],
      ],
      miembroApellidoPaterno: [
        {
          value: this.solicitud31101State.miembroApellidoPaterno,
          disabled: false,
        },
        [Validators.required],
      ],
      miembroApellidoMaterno: [
        {
          value: this.solicitud31101State.miembroApellidoMaterno,
          disabled: false,
        },
        [Validators.required],
      ],
      miembroNombreEmpresa: [
        {
          value: this.solicitud31101State.miembroNombreEmpresa,
          disabled: false,
        },
        [Validators.required],
      ],
    });

    this.solicitud31101Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud31101State) => {
          this.solicitud31101State = respuesta;
          this.miembroEmpresaForm.patchValue({
            miembroCaracterDe: this.solicitud31101State.miembroCaracterDe,
            miembroTributarMexico:
              this.solicitud31101State.miembroTributarMexico,
            miembroNacionalidad: this.solicitud31101State.miembroNacionalidad,
            miembroRfc: this.solicitud31101State.miembroRfc,
            miembroRegistroFederal:
              this.solicitud31101State.miembroRegistroFederal,
            miembroNombreCompleto:
              this.solicitud31101State.miembroNombreCompleto,
            miembroTipoPersonaMuestra:
              this.solicitud31101State.miembroTipoPersonaMuestra,
            miembroNombre: this.solicitud31101State.miembroNombre,
            miembroApellidoPaterno:
              this.solicitud31101State.miembroApellidoPaterno,
            miembroApellidoMaterno:
              this.solicitud31101State.miembroApellidoMaterno,
            miembroNombreEmpresa: this.solicitud31101State.miembroNombreEmpresa,
          });
        })
      )
      .subscribe();
  }

  conseguirDatosGeneralesCatologo(): void {
    this.solicitudService
      .conseguirDatosGeneralesCatologo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitudCatologo) => {
          this.enSuCaracterDeLista = respuesta.enSuCaracterDe;
          this.nacionalidadLista = respuesta.nacionalidad;
          this.tipoDePersonaLista = respuesta.tipoDePersona;
        },
      });
  }

  /**
   * Obtiene los datos generales correspondientes a las opciones de tipo de radio.
   * Asigna los valores recibidos a las propiedades correspondientes del componente.
   */
  conseguirDatosGeneralesOpcionDeRadio(): void {
    this.solicitudService
      .conseguirDatosGeneralesOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitudRadioLista) => {
          this.sinoOpcion = respuesta.requisitos;
        },
      });
  }

  cerrarModal(): void {
    this.eventoCerrarModal.emit();
  }

  actualizarMiembroCaracterDe(evento: Catalogo): void {
    this.solicitud31101Store.actualizarMiembroCaracterDe(evento.id);
  }

  actualizarMiembroTributarMexico(evento: number | string): void {
    this.seleccionarObligadoTributar = evento;
    this.solicitud31101Store.actualizarMiembroTributarMexico(evento);
  }

  actualizarMiembroNacionalidad(evento: Catalogo): void {
    this.solicitud31101Store.actualizarMiembroNacionalidad(evento.id);
  }

  actualizarMiembroRFC(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarMiembroRFC(VALOR);
  }

  // actualizarMiembroRegistroFederal(evento: string): void {
  //   this.solicitud31101Store.actualizarMiembroCaracterDe(evento);
  // }

  // actualizarMiembroNombreCompleto(evento: string): void {
  //   this.solicitud31101Store.actualizarMiembroCaracterDe(evento);
  // }

  actualizarMiembroTipoPersonaMuestra(evento: Catalogo): void {
    this.solicitud31101Store.actualizarMiembroTipoPersonaMuestra(evento.id);
    this.seleccionarTipoDePersona = evento.id;
  }

  actualizarMiembroNombre(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarMiembroNombre(VALOR);
  }

  actualizarMiembroApellidoPaterno(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarMiembroApellidoPaterno(VALOR);
  }

  actualizarMiembroApellidoMaterno(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarMiembroApellidoMaterno(VALOR);
  }

  actualizarMiembroNombreEmpresa(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarMiembroNombreEmpresa(VALOR);
  }

  buscarRFCDatos(): void {
    const VALOR = this.miembroEmpresaForm.get('miembroRfc')?.value;
    if (VALOR) {
      this.solicitud31101Store.actualizarMiembroRegistroFederal(
        'MAVL621207C95'
      );
      this.solicitud31101Store.actualizarMiembroNombreCompleto(
        'EUROFOODS DE MEXICO GONZALEZ PINAL'
      );
    }
  }

  aceptarModal(): void {
    let CARACTER_DE_VALOR = '';
    let NACIONALIDAD_VALOR = '';
    let TIPO_PERSONA_VALOR = '';
    let TRIBUTAR_MEXICO_VALOR = '';

    this.enSuCaracterDeLista?.catalogos.forEach((element: Catalogo) => {
      if (
        element.id === this.miembroEmpresaForm.get('miembroCaracterDe')?.value
      ) {
        CARACTER_DE_VALOR = element.descripcion;
      }
    });

    this.nacionalidadLista.catalogos.forEach((element: Catalogo) => {
      if (
        element.id === this.miembroEmpresaForm.get('miembroNacionalidad')?.value
      ) {
        NACIONALIDAD_VALOR = element.descripcion;
      }
    });

    this.tipoDePersonaLista.catalogos.forEach((element: Catalogo) => {
      if (
        element.id ===
        this.miembroEmpresaForm.get('miembroTipoPersonaMuestra')?.value
      ) {
        TIPO_PERSONA_VALOR = element.descripcion;
      }
    });

    this.sinoOpcion.radioOptions.forEach((element: any) => {
      if (
        element.id ===
        this.miembroEmpresaForm.get('miembroTributarMexico')?.value
      ) {
        TRIBUTAR_MEXICO_VALOR = element.descripcion;
      }
    });

    const VALORES = {
      tipoPersonaMuestra: TIPO_PERSONA_VALOR,
      nombreCompleto: this.miembroEmpresaForm.get('miembroNombreCompleto')
        ?.value,
      rfc: this.miembroEmpresaForm.get('miembroRfc')?.value,
      caracterDe: CARACTER_DE_VALOR,
      nacionalidad: NACIONALIDAD_VALOR,
      paisNombre: this.miembroEmpresaForm.get('miembroNombre')?.value,
      nombreEmpresa: this.miembroEmpresaForm.get('miembroNombreEmpresa')?.value,
      tributarMexico: TRIBUTAR_MEXICO_VALOR,
      razonSocial: this.miembroEmpresaForm.get('miembroRegistroFederal')?.value,
    };
    this.eventoActualizarMiembro.emit(VALORES);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Finaliza todas las suscripciones observables usando el subject destroy$.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

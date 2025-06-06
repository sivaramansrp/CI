import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AccionistaStore, AccionistaStoreService } from '../../../estados/accionista.store';
import { CONFIGURACION_ENCABEZADO_SOCIO, CONFIGURACION_ENCABEZADO_SOCIO_EXTRANJERO } from '../../core/constantes/socio-accionista.enum';
import { Catalogo, CatalogoSelectComponent, REGEX_RFC_FISICA, REGEX_RFC_MORAL, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy } from '@angular/core';
import { Subject, catchError, map, of, takeUntil } from 'rxjs';
import { AccionistaDatosQuery } from '../../../queries/accionista.query';
import { CommonModule } from '@angular/common';
import { ConsultaSocioExtranjeroFisica } from '../../core/models/consulta-socio-extranjero.model';
import { ConsultaSocioNacional } from '../../core/models/consulta-socio-nacional.model';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../core/service/usuarios.service';
import data from '@libs/shared/theme/assets/json/login/cat-pais.json';

@Component({
  selector: 'app-registro-socio-accionista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TablaDinamicaComponent, CatalogoSelectComponent],
  templateUrl: './registro-socio-accionista.component.html',
  styleUrl: './registro-socio-accionista.component.scss',
})
export class RegistroSocioAccionistaComponent implements OnInit, OnDestroy {
  FormSocioAccionista!: FormGroup;
  tablaSeleccion = TablaSeleccion;
  catPais!: Catalogo[];
  encabezadoDeTablaAccionista = CONFIGURACION_ENCABEZADO_SOCIO;
  encabezadoDeTablaAccionistaExtranjero = CONFIGURACION_ENCABEZADO_SOCIO_EXTRANJERO;
  public listaSociosAccionistas: ConsultaSocioNacional[] = [];
  public listaSociosAccionistasExtranjeros: ConsultaSocioExtranjeroFisica[] = [];
  public socioAccionistaSeleccionado: ConsultaSocioNacional[] = [];
  public socioAccionistaExtranjerosSeleccionado: ConsultaSocioExtranjeroFisica[] = [];

  private destroyNotifier$: Subject<void> = new Subject();
  socioNacional?: ConsultaSocioNacional;
  public visualizarTabla: boolean = false;
  public accionistaInicialStore!: AccionistaStore;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService,
    private busquedaQuery: AccionistaDatosQuery,
    private accionistaStore: AccionistaStoreService
  ) {
    this.FormSocioAccionista = this.fb.group({
      tipoNacionalidad: ['si'], // Inicializado como "sí"
      personaNacional: ['fisica'], // Inicializado como "Persona Física"
      rfc: ['', [RegistroSocioAccionistaComponent.validadorRFC]],
      nombre: [''],
      apellidoPaterno: [''],
      pais: [''],
      codigoPostal: [''],
      estado: [''],
      razonSocial: ['']
    });
  }

  ngOnInit(): void {
    this.catPais = data;
    this.busquedaQuery.selectSolicitud$
      .pipe(
        map((seccionState) => {
          this.accionistaInicialStore = seccionState;
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();

    // Escucha cambios para aplicar validaciones dinámicas
    this.FormSocioAccionista.get('tipoNacionalidad')?.valueChanges.subscribe(() => {
      this.actualizarValidaciones();
    });
    this.FormSocioAccionista.get('personaNacional')?.valueChanges.subscribe(() => {
      this.actualizarValidaciones();
    });
    this.actualizarValidaciones();
    this.listaSociosAccionistas = this.accionistaInicialStore.listaAccionistasNacionales;
  }

  get tipoNacionalidad() {
    return this.FormSocioAccionista.get('tipoNacionalidad')?.value;
  }

  get personaNacional() {
    return this.FormSocioAccionista.get('personaNacional')?.value;
  }

  static validadorRFC(control: AbstractControl): ValidationErrors | null {
    const VALUE = control.value;
    if (!VALUE) {
      return null;
    }
    const ES_VALIDO = REGEX_RFC_FISICA.test(VALUE) || REGEX_RFC_MORAL.test(VALUE);
    return ES_VALIDO ? null : { rfcInvalido: true };
  }

  agregarSocioAccionista() {
    const NACIONALIDAD = this.tipoNacionalidad;
    const PERSONA = this.personaNacional;
    if (NACIONALIDAD === 'si') {
      const RFC = this.FormSocioAccionista.get('rfc')?.value;
      this.usuariosService.consultaSocioNacional(RFC)
        .pipe(
          map((data) => {
            if (data) {
              this.socioNacional = data;
              this.accionistaStore.setsocioAccionistaNacional(this.socioNacional);
              this.router.navigate(['login/consulta-socio-accionista']);
            } else {
              console.error('No se encontró un socio accionista con el RFC proporcionado.');
            }
          }),
          catchError((error) => {
            console.error('Error al consultar capturista:', error);
            return of(undefined);
          }),
          takeUntil(this.destroyNotifier$)
        )
        .subscribe();
    }
    else {
      if (PERSONA === 'fisica') {
        const NOMBRE = this.FormSocioAccionista.get('nombre')?.value;
        const APELLIDOPATERNO = this.FormSocioAccionista.get('apellidoPaterno')?.value;
        const PAIS = this.FormSocioAccionista.get('pais')?.value;
        const CODIGOPOSTAL = this.FormSocioAccionista.get('codigoPostal')?.value;
        const ESTADO = this.FormSocioAccionista.get('estado')?.value;
        this.usuariosService.consultaSocioExtranjeroFisica(NOMBRE, APELLIDOPATERNO, PAIS, CODIGOPOSTAL, ESTADO)
          .pipe(
            map((data) => {
              if (data) {
                this.router.navigate(['login/consulta-socio-accionista']);
              } else {
                console.error('No se encontró un socio nacional con el nombre proporcionado.');
              }
            }),
            catchError((error) => {
              console.error('Error al consultar socio nacional:', error);
              return of(undefined);
            }),
            takeUntil(this.destroyNotifier$)
          )
          .subscribe();
      }
      else if (PERSONA === 'moral') {
        const RAZONSOCIAL = this.FormSocioAccionista.get('razonSocial')?.value;
        const PAIS = this.FormSocioAccionista.get('pais')?.value;
        const CODIGOPOSTAL = this.FormSocioAccionista.get('codigoPostal')?.value;
        const ESTADO = this.FormSocioAccionista.get('estado')?.value;
        this.usuariosService.consultaSocioExtranjerMoral(RAZONSOCIAL, PAIS, CODIGOPOSTAL, ESTADO)
          .pipe(
            map((data) => {
              if (data) {
                this.router.navigate(['login/consulta-socio-accionista']);
              } else {
                console.error('No se encontró un socio nacional con la razón social proporcionada.');
              }
            }),
            catchError((error) => {
              console.error('Error al consultar socio nacional:', error);
              return of(undefined);
            }),
            takeUntil(this.destroyNotifier$)
          )
          .subscribe();
      }
    }

  }

  ngOnDestroy() {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  actualizarValidaciones() {
    const NACIONALIDAD = this.tipoNacionalidad;
    const PERSONA = this.personaNacional;

    const RFC = this.FormSocioAccionista.get('rfc');
    const NOMBRE = this.FormSocioAccionista.get('nombre');
    const APELLIDOPATERNO = this.FormSocioAccionista.get('apellidoPaterno');
    const PAIS = this.FormSocioAccionista.get('pais');
    const CODIGOPOSTAL = this.FormSocioAccionista.get('codigoPostal');
    const ESTADO = this.FormSocioAccionista.get('estado');
    const RAZONSOCIAL = this.FormSocioAccionista.get('razonSocial');

    RFC?.clearValidators();
    NOMBRE?.clearValidators();
    APELLIDOPATERNO?.clearValidators();
    PAIS?.clearValidators();
    CODIGOPOSTAL?.clearValidators();
    ESTADO?.clearValidators();
    RAZONSOCIAL?.clearValidators();

    if (NACIONALIDAD === 'si') {
      RFC?.setValidators([RegistroSocioAccionistaComponent.validadorRFC, Validators.required]);
    } else {
      PAIS?.setValidators([Validators.required]);
      CODIGOPOSTAL?.setValidators([Validators.required]);
      ESTADO?.setValidators([Validators.required]);

      if (PERSONA === 'fisica') {
        NOMBRE?.setValidators([Validators.required]);
        APELLIDOPATERNO?.setValidators([Validators.required]);
      } else if (PERSONA === 'moral') {
        RAZONSOCIAL?.setValidators([Validators.required]);
      }
    }

    RFC?.updateValueAndValidity();
    NOMBRE?.updateValueAndValidity();
    APELLIDOPATERNO?.updateValueAndValidity();
    PAIS?.updateValueAndValidity();
    CODIGOPOSTAL?.updateValueAndValidity();
    ESTADO?.updateValueAndValidity();
    RAZONSOCIAL?.updateValueAndValidity();
  }
  enviarFirma() {
    this.router.navigate(['login/firma-electronica']);
  }

  eliminarSeleccionados() {
    this.socioAccionistaSeleccionado.forEach((socio) => {
      const INDEX = this.listaSociosAccionistas.indexOf(socio);
      if (INDEX > -1) {
        this.listaSociosAccionistas.splice(INDEX, 1);
      }
    });
    this.listaSociosAccionistasExtranjeros.forEach((socio) => {
      const INDEX = this.listaSociosAccionistasExtranjeros.indexOf(socio);
      if (INDEX > -1) {
        this.listaSociosAccionistasExtranjeros.splice(INDEX, 1);
      }
    });
    this.socioAccionistaSeleccionado = [];
    this.socioAccionistaExtranjerosSeleccionado = [];
  }

}

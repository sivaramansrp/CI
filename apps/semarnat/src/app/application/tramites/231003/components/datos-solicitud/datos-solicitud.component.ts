import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioOpcion, SolicitudJson } from '@libs/shared/data-access-user/src/core/models/231003/solicitud.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormularioSolicitudQuery } from '../../estados/queries/dato-solicitud.query';
import { FormularioSolicitudStore } from '../../estados/tramites/dato-solicitud.store';
import { Router } from '@angular/router';
import rawData from '@libs/shared/theme/assets/json/231003/solicitud.json';
const RADIO_OPCIONES = rawData as SolicitudJson;


@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    ReactiveFormsModule, TableComponent, InputRadioComponent],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.css',
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {

  solicitudForm!: FormGroup;

  formularioEmpresaReciclaje!: FormGroup;

  formularioLugarReciclaje!: FormGroup;

  aduanas!: Catalogo[];

  radioOptions: RadioOpcion[] = RADIO_OPCIONES.radioOptions;

  private destruir$ = new Subject<void>();

  requiereEmpresaServicioReciclaje: RadioOpcion[] = RADIO_OPCIONES.requiereEmpresaServicioReciclaje;
  reciclajeEnInstalaciones: RadioOpcion[] = RADIO_OPCIONES.reciclajeEnInstalaciones

  public establecimientoHeaderData: string[] = [];

  public establecimientoBodyData: unknown = [];

  constructor(public fb: FormBuilder, private router: Router,private formularioSolicitudStore: FormularioSolicitudStore,
    private formularioSolicitudQuery: FormularioSolicitudQuery) {
    // Constructor logic if needed
  }

  // Add any methods or properties needed for the component here

  ngOnInit(): void {
    this.aduanas = RADIO_OPCIONES.Immex;
    this.establecimientoHeaderData = RADIO_OPCIONES.table[0]?.encabezadoDeTabla || [];
    this.establecimientoBodyData = RADIO_OPCIONES.table[0]?.cuerpoTabla || [];
    this.requiereEmpresaServicioReciclaje = RADIO_OPCIONES.requiereEmpresaServicioReciclaje;
    this.reciclajeEnInstalaciones = RADIO_OPCIONES.reciclajeEnInstalaciones;
    this.inicializarSolicitudForm();
    this.inicializarFormularioEmpresaReciclaje();
    this.suscribirCambioRequiereEmpresa();
    this.inicializarFormularioLugarReciclaje();
    this.suscribirCambioReciclajeInstalaciones();
    this.restaurarDatosDesdeStore();
    this.suscribirseACambiosFormulario();
  }

  isInvalid(id: string): boolean | undefined {
    const CONTROL = this.solicitudForm.get('datosdelForm')?.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  navigateToPath(): void {
    this.router.navigate(['pago/aviso-de-reciclaje/datos-residuos']);
  }

  private inicializarSolicitudForm(): void {
    this.solicitudForm = this.fb.group({
      datosdelForm: this.fb.group({
        numeroRegistroAmbiental: ['', Validators.required],
        descripcionGenerica1: ['', Validators.required],
        numeroProgramaImmex: ['', Validators.required],
      }),
    });
  }

  private inicializarFormularioEmpresaReciclaje(): void {
    this.formularioEmpresaReciclaje = this.fb.group({
      requiereEmpresa: ['Si', Validators.required], // valor por defecto: "Si"
      nombreEmpresa: ['', Validators.required],
      representanteLegal: ['', Validators.required],
      telefono: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
  }

  private suscribirCambioRequiereEmpresa(): void {
    const CAMPO_REQUIERE_EMPRESA: string = 'requiereEmpresa';
    const CAMPOS_A_CONTROLAR: string[] = [
      'nombreEmpresa',
      'representanteLegal',
      'telefono',
      'correoElectronico'
    ];

    const CONTROL_REQUIERE_EMPRESA: FormControl<string> = this.formularioEmpresaReciclaje.get(CAMPO_REQUIERE_EMPRESA) as FormControl<string>;

    CONTROL_REQUIERE_EMPRESA.valueChanges.subscribe((valor: string): void => {
      const DEBE_HABILITAR: boolean = valor === 'Si';

      CAMPOS_A_CONTROLAR.forEach((CAMPO: string): void => {
        const CONTROL_CAMPO: FormControl<string> = this.formularioEmpresaReciclaje.get(CAMPO) as FormControl<string>;
        if (CONTROL_CAMPO) {
          if (DEBE_HABILITAR) {
            CONTROL_CAMPO.enable();
          } else {
            CONTROL_CAMPO.disable();
          }
        }
      });
    });
  }

  private inicializarFormularioLugarReciclaje(): void {
    this.formularioLugarReciclaje = this.fb.group({
      reciclajeInstalaciones: ['Si', Validators.required],
      lugarReciclaje: ['', Validators.required],
      numeroAutorizacionEmpresaReciclaje: ['', Validators.required],
    });
  }

  private suscribirCambioReciclajeInstalaciones(): void {
    const CAMPO_RADIO: string = 'reciclajeInstalaciones';
    const CAMPOS_A_CONTROLAR: string[] = [
      'lugarReciclaje',
      'numeroAutorizacionEmpresaReciclaje'
    ];
  
    this.formularioLugarReciclaje.get(CAMPO_RADIO)?.valueChanges.subscribe((valor: string): void => {
      const DEBE_HABILITAR: boolean = valor === 'Si';
  
      CAMPOS_A_CONTROLAR.forEach((campo: string): void => {
        const CONTROL_CAMPO: FormControl<string> = this.formularioLugarReciclaje.get(campo) as FormControl<string>;
        if (DEBE_HABILITAR) {
          CONTROL_CAMPO.enable();
        } else {
          CONTROL_CAMPO.disable();
        }
      });
    });
  }
  
  private restaurarDatosDesdeStore(): void {
    this.formularioSolicitudQuery.solicitud$
      .pipe(takeUntil(this.destruir$))
      .subscribe((datos) => {
        this.solicitudForm.get('datosdelForm')?.patchValue(datos, { emitEvent: false });
      });

    this.formularioSolicitudQuery.empresaReciclaje$
      .pipe(takeUntil(this.destruir$))
      .subscribe((datos) => {
        this.formularioEmpresaReciclaje.patchValue(datos, { emitEvent: false });
      });

    this.formularioSolicitudQuery.lugarReciclaje$
      .pipe(takeUntil(this.destruir$))
      .subscribe((datos) => {
        this.formularioLugarReciclaje.patchValue(datos, { emitEvent: false });
      });
  }

  private suscribirseACambiosFormulario(): void {
    const SOLICITUD_CONTROLES = this.solicitudForm.get('datosdelForm') as FormGroup;
    SOLICITUD_CONTROLES.get('numeroRegistroAmbiental')?.valueChanges
      .pipe(takeUntil(this.destruir$))
      .subscribe(() => this.actualizarEstadoSolicitud());

      SOLICITUD_CONTROLES.get('descripcionGenerica1')?.valueChanges
      .pipe(takeUntil(this.destruir$))
      .subscribe(() => this.actualizarEstadoSolicitud());

      SOLICITUD_CONTROLES.get('numeroProgramaImmex')?.valueChanges
      .pipe(takeUntil(this.destruir$))
      .subscribe(() => this.actualizarEstadoSolicitud());

    this.vincularControlAStore(this.formularioEmpresaReciclaje, () =>
      this.formularioSolicitudStore.establecerEmpresaReciclaje(this.formularioEmpresaReciclaje.value)
    );

    this.vincularControlAStore(this.formularioLugarReciclaje, () =>
      this.formularioSolicitudStore.establecerLugarReciclaje(this.formularioLugarReciclaje.value)
    );
  }

  private vincularControlAStore(grupo: FormGroup, accion: () => void): void {
    Object.values(grupo.controls).forEach((control) => {
      control.valueChanges.pipe(takeUntil(this.destruir$)).subscribe(accion);
    });
  }

  private actualizarEstadoSolicitud(): void {
    const VALORES = this.solicitudForm.get('datosdelForm')?.value;
    if (VALORES) {
      this.formularioSolicitudStore.establecerSolicitud(VALORES);
    }
  }

  ngOnDestroy(): void {
    this.destruir$.next();
    this.destruir$.complete();
  }
}

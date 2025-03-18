import { CatalogoSelectComponent, CatalogosSelect, ConfiguracionColumna, SeccionLibQuery, SeccionLibState, SeccionLibStore, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MERCANCIA_SERVICIO, mercanciaInfo } from '../../constantes/acuicola.enum';
import { AcuicolaService } from '../../service/acuicola.service';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudInt } from '../../modelos/acuicola.model';
import { Subject } from 'rxjs';
import { TramiteStore } from '../../estados/tramite220703.store';
import { TramiteStoreQuery } from '../../estados/tramite220703.query';
import { delay } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
import { tap } from 'rxjs';

@Component({
  selector: 'app-datos-generales',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.scss'
})
export class DatosGeneralesComponent implements OnInit {

  datosGeneralesForm!: FormGroup;

  aduanaDeIngreso: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  }
  oficinaDeInspeccion: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };
  puntoDeInspeccion: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };
  regimenAlQueDestina: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };
  datosParaMovilizacion: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };
  puntoDeVerificacion: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };

  mercanciaTabla: ConfiguracionColumna<mercanciaInfo>[] = MERCANCIA_SERVICIO;

  immexTableDatos: mercanciaInfo[] = [];

  SolicitudState!: DatosDeLaSolicitudInt;

  private unsubscribe$ = new Subject<void>();
  private seccion!: SeccionLibState;
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly acuicolaService: AcuicolaService,
    private tramiteStoreQuery: TramiteStoreQuery, //Para la integración de Akita
    private tramiteStore: TramiteStore, //Para la integración de Akita
    private seccionQuery: SeccionLibQuery, //Para la integración de Akita
    private seccionStore: SeccionLibStore, //Para la integración de Akita
    // eslint-disable-next-line no-empty-function
  ) { }


  ngOnInit(): void {
    this.tramiteStoreQuery.selectSolicitudTramite$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.SolicitudState = seccionState.SolicitudState;
      })
    ).subscribe();

    this.iniciarFormulario();
    this.getAduanaDeIngreso();
    this.getOficinaDeInspeccion();
    this.getPuntoDeInspeccion();
    this.getRegimenAlQue();
    this.getPuntoDeVerificacion();
    this.getDatosParaMovilizacion();

    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map((seccionState: any) => {
          if (seccionState) {
            this.SolicitudState = seccionState.SolicitudState;
            this.datosGeneralesForm.patchValue(this.SolicitudState);
          }
        })
      ).subscribe();

    this.datosGeneralesForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap(() => {
          const ACTIVE_STATE = { ...this.datosGeneralesForm.value };
          this.tramiteStore.setSolicitudTramite(ACTIVE_STATE);
        })
      )
      .subscribe();

    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
  }

  iniciarFormulario(): void {
    this.datosGeneralesForm = this.fb.group({
      foliodel: [{ value: '150220020032024220100001', disabled: true }, Validators.required],
      aduanaDeIngreso: ['', Validators.required],
      oficinaDeInspeccion: ['', Validators.required],
      puntoDeInspeccion: ['', Validators.required],
      numeroDeGuia: [{ value: '', disabled: true }, Validators.required],
      regimenAlQueDestina: ['', Validators.required],
      datosParaMovilizacion: ['', Validators.required],
      puntoDeVerificacion: ['', Validators.required],
      identificacionDelTransporte: [{ value: '', disabled: true }, Validators.required],
      nombreDeLaEmpresaTransportista: [{ value: '', disabled: true }, Validators.required],
    });
  }


  getAduanaDeIngreso(): void {
    this.acuicolaService.getAduanaDeIngreso().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.aduanaDeIngreso = {
          labelNombre: 'Aduana de ingreso',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  getOficinaDeInspeccion(): void {
    this.acuicolaService.getOficinaDeInspeccion().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.oficinaDeInspeccion = {
          labelNombre: 'Oficina de inspección de Sanidad Agropecuaria',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  getPuntoDeInspeccion(): void {
    this.acuicolaService.getPuntoDeInspeccion().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.puntoDeInspeccion = {
          labelNombre: 'Punto de inspección',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  getRegimenAlQue(): void {
    this.acuicolaService.getRegimenAlQue().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.regimenAlQueDestina = {
          labelNombre: 'Regimen al que se destinara la mercancia',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  getDatosParaMovilizacion(): void {
    this.acuicolaService.getDatosParaMovilizacion().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.datosParaMovilizacion = {
          labelNombre: 'Datos para movilización nacional',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  getPuntoDeVerificacion(): void {
    this.acuicolaService.getPuntoDeVerificacion().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.puntoDeVerificacion = {
          labelNombre: 'Punto de verificación federal',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

}

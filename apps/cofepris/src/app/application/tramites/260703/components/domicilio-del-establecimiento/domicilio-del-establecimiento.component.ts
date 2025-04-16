import {
  Catalogo,
  ConfiguracionColumna,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SolicitudPermisoState,
  Tramite260703Store,
} from '../../estados/store/tramite260703.store';
import { Subject, takeUntil } from 'rxjs';
import { SCIAN_DATA } from '../../../../shared/constantes/datos-scian.enum';
import { ScianData } from '../../../../shared/models/datos-modificacion.model';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';

@Component({
  selector: 'app-domicilio-del-establecimiento',
  templateUrl: './domicilio-del-establecimiento.component.html',
  styleUrl: './domicilio-del-establecimiento.component.css',
})
export class DomicilioDelEstablecimientoComponent implements OnInit, OnDestroy {
  domicilloDelEstablecimientoForm!: FormGroup;
  solicitudPermisoState!: SolicitudPermisoState;
  configuracionTabla: ConfiguracionColumna<ScianData>[] = SCIAN_DATA;

  datos!: ScianData[];
  estado: Catalogo[] = [];
  aduana: Catalogo[] = [];
  regimen: Catalogo[] = [];

  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Cabeceras de la tabla de SCIAN.
   */
  public scianHeaderData: string[] = [];

  /**
   * Cuerpo de datos de la tabla SCIAN.
   */
  public scianBodyData: unknown = null;

  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private solicitudPermisoService: SolicitudPermisoService,
    private tramite260703Store: Tramite260703Store,
    private tramite2606703Query: Tramite260703Query
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  ngOnInit(): void {
    this.tramite2606703Query.selectSolicitudPermiso$
      .pipe(takeUntil(this.destroy$))
      .subscribe((solicitudPermisoState: SolicitudPermisoState) => {
        this.solicitudPermisoState = solicitudPermisoState;
      });

    this.obtenerScianData();
    this.initializeDomicilioDelEstablecimientoForm();
    
  }

  initializeDomicilioDelEstablecimientoForm(): void {
    this.domicilloDelEstablecimientoForm = this.formBuilder.group({
      codigoPostal: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState
          ?.codigoPostal,
        [Validators.required],
      ],
      estado: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.estado,
        [Validators.required],
      ],
      descripcionMunicipio: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState
          ?.descripcionMunicipio,
        [Validators.required],
      ],
      informacionExtra: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState
          ?.informacionExtra,
      ],
      descripcionColonia: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState
          ?.descripcionColonia,
      ],
      calle: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.calle,
        [Validators.required],
      ],
      lada: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.lada,
      ],
      telefono: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState
          ?.telefono,
        [Validators.required],
      ],
      funcionamiento: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState
          ?.funcionamiento,
      ],
      licencia: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState
          ?.licencia,
      ],
      regimen: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState
          ?.regimen,
        [Validators.required],
      ],
      aduana: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.aduana,
        [Validators.required],
      ],
    });
  }

  obtenerScianData():void{
    this.solicitudPermisoService.obtenerScianData().pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      this.datos = data;
    });
  }


  setValoresStore(campo: string): void {
    const VALOR = this.domicilloDelEstablecimientoForm.get(campo)?.value;
    this.tramite260703Store.updateDomicilioDelEstablecimientoFormStatae({
      [campo]: VALOR,
    });
  }

  estadoSeleccion(): void {
    this.estado = [];
  }

  regimeSeleccion(): void {
    this.regimen = [];
  }

  aduanaSeleccion(): void {
    this.aduana = [];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

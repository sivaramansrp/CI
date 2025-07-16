import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRadioComponent, TituloComponent } from "@libs/shared/data-access-user/src";
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CONFIGURACION_DATOS } from '../../constants/perfiles.enum';
import { SeccionDinamicaComponent } from '../../../../shared/components/seccion-dinamica/seccion-dinamica.component';
import { SeccionDinamica } from '@libs/shared/data-access-user/src/core/models/shared/seccion-dinamica.model';
import { PlaneacionComponent } from '../planeacion/planeacion.component';
import { SeguridadDeLaComponent } from '../seguridad-de-la/seguridad-de-la.component';
import { SeguridadFisicaComponent } from '../seguridad-fisica/seguridad-fisica.component';
import { ControlesDeAccesoComponent } from '../controles-de-acceso/controles-de-acceso.component';
import { SociosComercialesComponent } from '../socios-comerciales/socios-comerciales.component';
import { SeguridadDeProcesosComponent } from '../seguridad-de-procesos/seguridad-de-procesos.component';
import { GestionAduaneraComponent } from '../gestion-aduanera/gestion-aduanera.component';
import { SeguridadDelPersonalComponent } from '../seguridad-del-personal/seguridad-del-personal.component';
import { VehiculosComponent } from '../vehiculos/vehiculos.component';
import { ConcientizacionComponent } from '../concientizacion/concientizacion.component';
import { ManejoComponent } from '../manejo/manejo.component';
import { Solicitude32612DosState, Tramite32612DosStore } from '../../estados/solicitud32612Dos.store';
import { Tramite32612DosQuery } from '../../estados/solicitud32612Dos.query';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitude32612State, Tramite32612Store } from '../../estados/solicitud32612.store';
import { Tramite32612Query } from '../../estados/solicitud32612.query';

@Component({
  selector: 'app-perfiles',
  standalone: true,
  imports: [
    CommonModule, 
    TituloComponent,
    FormasDinamicasComponent,
    InputRadioComponent,
    ReactiveFormsModule,
    SeccionDinamicaComponent
  ],
  templateUrl: './perfiles.component.html',
  styleUrl: './perfiles.component.scss',
})
export class PerfilesComponent implements OnInit, OnDestroy {

  public formaPerfil!: FormGroup;
  public opcionDeBotonDeRadio = [
    {
      "label": "Si",
      "value": "Si"
    },
    {
      "label": "No",
      "value": "No"
    }
  ]

  public forma: FormGroup = new FormGroup({
    certificacionesFormGroup: new FormGroup({}),
  });
  public certificacionesDatos = CONFIGURACION_DATOS;
  public accordionSecciones: SeccionDinamica[] = [
  {
    titulo: '1. Planeación de la seguridad en la cadena de suministros.',
    componentClase: PlaneacionComponent
  },
  {
    titulo: '2. Seguridad física',
    componentClase: SeguridadFisicaComponent
  },
  {
    titulo: '3. Controles de acceso físico',
    componentClase: ControlesDeAccesoComponent
  },
  {
    titulo: '4. Socios comerciales',
    componentClase: SociosComercialesComponent
  },
  {
    titulo: '5. Seguridad de procesos',
    componentClase: SeguridadDeProcesosComponent
  },
  {
    titulo: '6. Gestión aduanera',
    componentClase: GestionAduaneraComponent
  },
  {
    titulo: '7. Seguridad de los vehículos de carga, contenedores, remolques y/ó semirremolques.',
    componentClase: VehiculosComponent
  },
  {
    titulo: '8. Seguridad del personal',
    componentClase: SeguridadDelPersonalComponent
  },
  {
    titulo: '9. Seguridad de la información y documentación',
    componentClase: SeguridadDeLaComponent
  },
  {
    titulo: '10. Capacitación en seguridad y concientización',
    componentClase: ConcientizacionComponent
  },
  {
    titulo: '11. Manejo e investigación de incidentes',
    componentClase: ManejoComponent
  }
];
  private destroyNotifier$: Subject<void> = new Subject();
  public solicitudeState!: Solicitude32612DosState;
  public solicitudeStateForm!: Solicitude32612State;


  constructor(
    private fb: FormBuilder,
    private tramite32612Store: Tramite32612DosStore,
    private tramite32612Query: Tramite32612DosQuery,
    private tramiteStore: Tramite32612Store,
    private tramiteQuery: Tramite32612Query
  ) {

  }

  ngOnInit() {
    this.tramite32612Query.selectSolicitudeDos$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudeState = seccionState;
        })
      ).subscribe();

    this.tramiteQuery.selectSolicitude$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudeStateForm = seccionState;
        })
      ).subscribe();
    this.crearPerfilForm();
  }

  get certificacionesFormGroup(): FormGroup {
    return this.forma.get('certificacionesFormGroup') as FormGroup;
  }

  private crearPerfilForm() {
    this.formaPerfil = this.fb.group({
      nombreAgenciaAduanal: [this.solicitudeState?.nombreAgenciaAduanal],
      tipoInstalacion: [this.solicitudeState?.tipoInstalacion],
      antiguedadInstalacion: [this.solicitudeState?.antiguedadInstalacion],
      actividadPreponderante: [this.solicitudeState?.actividadPreponderante],
      tiposServicios: [this.solicitudeState?.tiposServicios],
      operacionesMensualesExp: [this.solicitudeState?.operacionesMensualesExp],
      operacionesMensualesImp: [this.solicitudeState?.operacionesMensualesImp],
      numeroEmpleados: [this.solicitudeState?.numeroEmpleados],
      superficieInstalacion: [this.solicitudeState?.superficieInstalacion],
      opcion: [this.solicitudeState?.opcion],
      nombrePrograma: [this.solicitudeState?.nombrePrograma],
      numeroDeRegistro: [this.solicitudeState?.numeroDeRegistro],
      organismoCertificador: [this.solicitudeState?.organismoCertificador],
    });
  }

  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite32612DosStore): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite32612Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  public emitirCambioDeValor(event: {campo: string, valor: string}): void {
    this.tramiteStore.setDynamicFieldValue(event.campo, event.valor);
  }


  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }


}

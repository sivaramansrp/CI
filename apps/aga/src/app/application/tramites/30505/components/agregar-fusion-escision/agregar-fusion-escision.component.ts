import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { map, Subject, takeUntil } from 'rxjs';
import { SI_NO_RADIO } from '../../enums/aviso-de-modificacion.enum';
import { Solicitud30505Store, Solicitud30505State } from '../../estados/tramites30505.store';
import { Solicitud30505Query } from '../../estados/tramites30505.query';
import { TercerosRelacionadosService } from '../../services/terceros-relacionados.service';
import { FusionEscision } from '../../models/aviso-modificacion.model';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
// import { ModalGridAgregarFusionEscisionService } from './modalGridAgregarFusionEscision.service'; // Service calls are commented out as per instructions

@Component({
  selector: 'app-agregar-fusion-escision',
  templateUrl: './agregar-fusion-escision.component.html',
  styleUrls: ['./agregar-fusion-escision.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputRadioComponent]
})
export class AgregarFusionEscisionComponent implements OnDestroy, OnInit {
  fusionEscisionForm!: FormGroup;
  fusionadaOpciones = SI_NO_RADIO;
  fusionEscisionData: FusionEscision[] = [];
  public destroyNotifier$: Subject<void> = new Subject();

  public AvisoState!: Solicitud30505State;

  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    public tramiteStore: Solicitud30505Store, public tramiteQuery: Solicitud30505Query,
    private tercerosService: TercerosRelacionadosService
  ) {
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.AvisoState = seccionState;
        })
      )
      .subscribe()

    this.fusionEscisionForm = this.fb.group({
      certificacionModal: [this.AvisoState?.certificacionModal],
      rfcBusquedaModal: [this.AvisoState?.rfcBusquedaModal, Validators.required],
      razonSocialFusionante: [{ value: this.AvisoState?.razonSocialFusionante, disabled: true }, Validators.required],
      folioVucemFusionante: [{ value: this.AvisoState?.folioVucemFusionante, disabled: true }, Validators.required],
      fechaInicioVigenciaFusionante: [{ value: this.AvisoState?.fechaInicioVigenciaFusionante, disabled: true }, Validators.required],
      fechaFinVigenciaFusionante: [{ value: this.AvisoState?.fechaFinVigenciaFusionante, disabled: true }, Validators.required],

      rfcBusquedaModalSC: [this.AvisoState?.rfcBusquedaModalSC, Validators.required],
      razonSocialFusionanteSC: [this.AvisoState?.razonSocialFusionanteSC, Validators.required]
    });

  }

  mostrarCertificacion(): void {
    // This function is triggered when certificationModal radio button is clicked
    const VALOR = this.fusionEscisionForm.get('certificacionModal')?.value;
    this.tramiteStore.setAvisoDatos(VALOR, 'certificacionModal');
    if (VALOR === '1') {
      this.fusionEscisionForm.get('razonSocialFusionante')?.disable();
      this.fusionEscisionForm.get('folioVucemFusionante')?.disable();
      this.fusionEscisionForm.get('fechaInicioVigenciaFusionante')?.disable();
      this.fusionEscisionForm.get('fechaFinVigenciaFusionante')?.disable();
      this.fusionEscisionForm.get('razonSocialFusionanteSC')?.disable();
    } else if (VALOR === '0') {
      this.fusionEscisionForm.get('razonSocialFusionante')?.disable();
      this.fusionEscisionForm.get('folioVucemFusionante')?.disable();
      this.fusionEscisionForm.get('fechaInicioVigenciaFusionante')?.disable();
      this.fusionEscisionForm.get('fechaFinVigenciaFusionante')?.disable();
      this.fusionEscisionForm.get('razonSocialFusionanteSC')?.enable();
    }
  }

  cargarDatosPersonaFusionada(): void {
    const RFC = this.fusionEscisionForm.get('rfcBusquedaModal')?.value;
    if (RFC) {
      this.tercerosService.obtenerDatosPersona(RFC).pipe(
        takeUntil(this.destroyNotifier$)
      ).subscribe(
        (datos) => {
          console.log(datos, "datos");
          this.fusionEscisionForm.patchValue({
            'razonSocialFusionante': datos.razonSocial,
            'folioVucemFusionante': datos.numFolioTramite,
            'fechaInicioVigenciaFusionante': datos.fechaInicioVigencia,
            'fechaFinVigenciaFusionante': datos.fechaFinVigencia
          });
          this.tramiteStore.setAvisoDatos(datos.razonSocial, 'razonSocialFusionante');
          this.tramiteStore.setAvisoDatos(datos.numFolioTramite, 'folioVucemFusionante');
          this.tramiteStore.setAvisoDatos(datos.fechaInicioVigencia, 'fechaInicioVigenciaFusionante');
          this.tramiteStore.setAvisoDatos(datos.fechaFinVigencia, 'fechaFinVigenciaFusionante');
        });
    }
  }

  agregarFusionEscision(): void {
    const FUSION_ESCISION_VALUE = {
      certificacionModal: this.fusionEscisionForm.get('certificacionModal')?.value,
      rfcBusquedaModal: this.fusionEscisionForm.get('rfcBusquedaModal')?.value,
      razonSocialFusionante: this.fusionEscisionForm.get('razonSocialFusionante')?.value,
      folioVucemFusionante: this.fusionEscisionForm.get('folioVucemFusionante')?.value,
      fechaInicioVigenciaFusionante: this.fusionEscisionForm.get('fechaInicioVigenciaFusionante')?.value,
      fechaFinVigenciaFusionante: this.fusionEscisionForm.get('fechaFinVigenciaFusionante')?.value,
      rfcBusquedaModalSC: this.fusionEscisionForm.get('rfcBusquedaModalSC')?.value,
      razonSocialFusionanteSC: this.fusionEscisionForm.get('razonSocialFusionanteSC')?.value
    };
    console.log(FUSION_ESCISION_VALUE);
    this.fusionEscisionData.push(FUSION_ESCISION_VALUE);
    this.tramiteStore.updateFusionDatos(this.fusionEscisionData);
    this.fusionEscisionForm.reset();
    this.ubicaccion.back();
  }

  cerrarDialogoFusionEscision(): void {
    this.ubicaccion.back();
  }

  cambioRFC(): void {
    const RFC = this.fusionEscisionForm.get('rfcBusquedaModal')?.value;
    this.tramiteStore.setAvisoDatos(RFC, 'rfcBusquedaModal');
  }

  cambioRfcSC(): void {
    const VALOR = this.fusionEscisionForm.get('rfcBusquedaModalSC')?.value;
    this.tramiteStore.setAvisoDatos(VALOR, 'rfcBusquedaModalSC');
  }
  cambioRazonSocialSC(): void {
    const RAZON_SOCIAL_SC = this.fusionEscisionForm.get('razonSocialSC')?.value;
    this.tramiteStore.setAvisoDatos(RAZON_SOCIAL_SC, 'razonSocialSC');
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
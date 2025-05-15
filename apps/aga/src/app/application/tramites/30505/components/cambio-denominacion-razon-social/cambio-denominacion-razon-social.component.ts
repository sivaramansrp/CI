import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Solicitud30505Store, Solicitud30505State } from '../../estados/tramites30505.store';
import { Solicitud30505Query } from '../../estados/tramites30505.query';
import { map, Subject, takeUntil } from 'rxjs';
// import { CambioDenominacionRazonSocialService } from '../services/cambioDenominacionRazonSocial.service'; // Comentado según instrucciones

@Component({
  selector: 'app-cambio-denominacion-razon-social',
  templateUrl: './cambio-denominacion-razon-social.component.html',
  styleUrls: ['./cambio-denominacion-razon-social.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CambioDenominacionRazonSocialComponent implements OnDestroy,OnInit{
  avisoCambioRazonSocialForm!: FormGroup;
  mostrarMensaje: boolean = false;
  tblErrorRazonSocialIgual: string = '';
  tblErrorFolioAcuse: string = '';
  public destroyNotifier$: Subject<void> = new Subject();
  public AvisoState!: Solicitud30505State;

  constructor(private fb: FormBuilder, public tramiteStore: Solicitud30505Store, public tramiteQuery: Solicitud30505Query) {
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

    this.avisoCambioRazonSocialForm = this.fb.group({
      rfcVucem: [{ value: this.AvisoState?.rfcVucem, disabled: true }],
      razonSocialVucem: [{ value: this.AvisoState?.razonSocialVucem, disabled: true }],
      rfcIdc: [{ value: this.AvisoState?.rfcIdc, disabled: true }],
      razonSocialIdc: [{ value: this.AvisoState?.razonSocialIdc, disabled: true }],
      folioAcuse: [this.AvisoState?.folioAcuse, Validators.required]

    });
  }

  validarFolioAcuse() {
    const FOLIO_ACUSE = this.avisoCambioRazonSocialForm.get('folioAcuse')?.value;
    this.tramiteStore.setFolioAcuse(FOLIO_ACUSE);

  }

  ngOnDestroy(): void {
     this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
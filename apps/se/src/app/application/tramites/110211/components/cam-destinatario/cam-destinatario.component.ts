import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { camCertificadoStore, camState } from '../../estados/cam-certificado.store';
import { SeccionLibQuery, SeccionLibState, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';
import { Subject, map, takeUntil } from 'rxjs';

interface FormValues {
  [key: string]: string | number | boolean | object | undefined;
}
@Component({
  selector: 'app-cam-destinatario',
  templateUrl: './cam-destinatario.component.html',
  styleUrl: './cam-destinatario.component.css',
})
export class CamDestinatarioComponent implements OnInit, OnDestroy {
  
  exportadorForm!: FormGroup

   /** Valores actuales del formulario de destinatario. */
   formDestinatarioValues!: FormValues;

   /** Valores actuales del formulario de datos del destinatario. */
   formDatosDelDestinatarioValues!: FormValues;
 

  private destroyNotifier$: Subject<void> = new Subject();

  private exportadoState!: camState

  private seccionState!: SeccionLibState

  constructor(
    private readonly fb: FormBuilder, 
    private store: camCertificadoStore,
    private query: camCertificadoQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery
  ){
    this.query.selectFormDatosDelDestinatario$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(estado => {
        this.formDatosDelDestinatarioValues = estado;
      });

    this.query.selectFormDestinatario$
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe(estado => {
      this.formDestinatarioValues = estado;
    });

  }

  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.seccionState = seccionState;
            })
          )
          .subscribe();
        this.query.selectCam$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((state) => {
              this.exportadoState = state as camState;
            })
          )
          .subscribe();
    this.initActionFormBuild();
  }
  initActionFormBuild(): void {
    this.exportadorForm = this.fb.group({
      lugar:[this.exportadoState.lugar, Validators.required],
      exportador: [this.exportadoState.exportador,Validators.required],
      empresa: [this.exportadoState.empresa,Validators.required],
      cargo: [this.exportadoState.cargo,Validators.required],
      lada: [this.exportadoState.lada],
      telfono: [this.exportadoState.telfono,Validators.required],
      fax: [this.exportadoState.fax,Validators.required],
      correo: [this.exportadoState.correo,Validators.required]
    })

  }

  detosDelDestinatarioFunc(e: unknown): void {
    this.store.setFormDatosDelDestinatario(e as FormValues);
  }

  setFormValida(valida: boolean): void {
    this.store.setFormValida({ destinatrio: valida });
  }

  setFormValidaDestinatario(valida: boolean): void {
    this.store.setFormValida({ datosDestinatario: valida });
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof camCertificadoStore
  ): void {
    const VALOR = form.get(campo)?.value;
    console.log(VALOR);
    (this.store[metodoNombre] as (value: any) => void)(
      VALOR
    );
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}

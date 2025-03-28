import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { Catalogo, InputFecha, SeccionLibQuery, SeccionLibState, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Subject, delay, map, of, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FECHA } from '../../constantes/cam-certificado.module';
import { Mercancia } from '../../../../shared/models/modificacion.enum';
import { camCertificadoStore, camState } from '../../estados/cam-certificado.store';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';

@Component({
  selector: 'app-mercancia',
  templateUrl: './mercancia.component.html',
  styleUrl: './mercancia.component.css',
})
export class MercanciaComponent {

  mostrarAlerta: boolean = false;

  mensajeDeAlerta: string = 'La lista de mercancías mostrada solamente contiene aquellas mercancías que tienen un registro de productos vigente para el tratado/acuerdo-país/bloque y cuya fracción arancelaria no está asociada a un cupo.';

  @Output() cerrarClicado = new EventEmitter();
  @Output()tablaSeleccionEvent = new EventEmitter(); 
  @Output() guardarClicado = new EventEmitter();

  @Input() datosSeleccionados!: Mercancia;

  mercanciaForm!: FormGroup

  umc: Catalogo[] = []

  factura: Catalogo[] = []

  fechaFinalInput: InputFecha = FECHA;

  destroyNotifier$: Subject<void> = new Subject();

  private mercanciaState!: camState

  private seccionState!: SeccionLibState

  constructor(
      private readonly fb: FormBuilder, 
      private camCertificadoService : CamCertificadoService,
      private store: camCertificadoStore,
      private query: camCertificadoQuery,
      private seccionStore: SeccionLibStore,
      private seccionQuery: SeccionLibQuery
  ){
    // Constructor logic can be added here if needed
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
          this.mercanciaState = state as camState;
        })
      )
      .subscribe();
    this.umcOpcion();
    this.facturasOpcion();
    this.initActionFormBuild();
  }

  initActionFormBuild(): void {
    this.mercanciaForm = this.fb.group({
      fraccionArancelaria: [this.mercanciaState.fraccionArancelaria],
      nombreComercialMercancia: [this.mercanciaState.nombreComercialMercancia],
      nombreTecnico: [this.mercanciaState.nombreTecnico],
      nombreIngles: [this.mercanciaState.nombreIngles],
      criterioClasificacion: [this.mercanciaState.criterioClasificacion],
      cantidad: [
        this.mercanciaState.cantidad,Validators.required
      ],
      umc: [
        this.mercanciaState.umc,Validators.required
      ],
      valorMercancia: [
        this.mercanciaState.valorMercancia,Validators.required
      ],
      complementoClasificacion: [
        this.mercanciaState.complementoClasificacion,Validators.required
      ],
      numeroFactura: [
        this.mercanciaState.numeroFactura,Validators.required
      ],
      tipoFactura: [
        this.mercanciaState.tipoFactura,Validators.required
      ],

    })
  }

  cerrarModal(): void {
    this.cerrarClicado.emit();
    this.mostrarAlerta = false;
  }

  activarModal(): void {
    this.mostrarAlerta = true;
  }

  umcOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('umc.json').subscribe({
      next: (data) => {
        this.umc = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.umc = [];
      }
    }
  );
  }

  facturasOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('factura.json').subscribe({
      next: (data) => {
        this.factura = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.factura = [];
      }
    }
  );
  }

  aceptar(): void {
    // Emitir los datos del formulario al evento guardarClicado
    this.guardarClicado.emit(this.mercanciaForm.value);

    // Guardar los datos del formulario en el store
    this.store.setmercanciaTabla([this.mercanciaForm.value]);

    // Si la alerta está activa, cerrar el modal y emitir el evento de selección de tabla
    if (this.mostrarAlerta) {
      of(null).pipe(delay(100)).subscribe(() => {
        this.cerrarModal();
        this.tablaSeleccionEvent.emit(true);
      });
    }
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

}

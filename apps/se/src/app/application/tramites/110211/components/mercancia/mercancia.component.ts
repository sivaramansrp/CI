import { Catalogo, InputFecha } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, delay, of } from 'rxjs';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { FECHA } from '../../constantes/cam-certificado.module';
import { HttpErrorResponse } from '@angular/common/http';
import { Mercancia } from '../../../../shared/models/modificacion.enum';
import { camCertificadoStore } from '../../estados/cam-certificado.store';

@Component({
  selector: 'app-mercancia',
  templateUrl: './mercancia.component.html',
  styleUrl: './mercancia.component.css',
})
export class MercanciaComponent implements OnInit {

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

  constructor(
      private readonly fb: FormBuilder, 
      private camCertificadoService : CamCertificadoService,
      private store: camCertificadoStore,
  ){
    // Constructor logic can be added here if needed
  }

  ngOnInit(): void {
    this.umcOpcion();
    this.facturasOpcion();
    this.initActionFormBuild();
  }

  initActionFormBuild(): void {
    this.mercanciaForm = this.fb.group({
      fraccionArancelaria: [''],
      nombreComercialMercancia: [''],
      nombreTecnico: [''],
      nombreIngles: [''],
      criterioClasificacion: [''],
      cantidad: [
        '',Validators.required
      ],
      umc: [
        '',Validators.required
      ],
      valorMercancia: [
        '',Validators.required
      ],
      complementoClasificacion: [
        '',Validators.required
      ],
      numeroFactura: [
        '',Validators.required
      ],
      tipoFactura: [
        '',Validators.required
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

}

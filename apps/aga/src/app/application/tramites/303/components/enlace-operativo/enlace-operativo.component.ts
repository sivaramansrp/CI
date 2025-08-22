import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notificacion, NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite303Store, Tramite303StoreService } from '../../../../core/estados/tramites/tramite303.store';
import { CommonModule } from '@angular/common';
import { EnlaceOperativo } from '../../../../core/models/303/enlace-operativo.model';
import { EnlaceOperativoService } from '../../../../core/services/303/enlace-operativo.service';
import { Router } from '@angular/router';
import { Tramite303Query } from '../../../../core/queries/tramite303.query';

@Component({
  selector: 'app-enlace-operativo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificacionesComponent],
  templateUrl: './enlace-operativo.component.html',
  styleUrl: './enlace-operativo.component.scss',
})
export class EnlaceOperativoComponent implements OnInit {
  /** Formulario de enlace operativo */
  public FormEnlaceOperativo!: FormGroup;
  /** Indicador de envío del formulario */
  public formSubmitted = false;
  /** Texto de la sección */
  public nuevaNotificacion!: Notificacion;
  /** Lista de enlaces operativos */
  public listaEnlaces: EnlaceOperativo[] = [];
  /** Notificador para destruir las suscripciones y evitar fugas de memoria */
  private destroyNotifier$: Subject<void> = new Subject();
  /** Estado de la solicitud del trámite */
  private tramiteEnlace?: Tramite303Store;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicioServer: EnlaceOperativoService,
    private tramite303State: Tramite303StoreService,
    private tramite303Query: Tramite303Query,
  ) {
    this.inicializarFormulario();
  }

  ngOnInit(): void {
    this.tramite303Query.selectSolicitud$
      .pipe(
        map((seccionState) => {
          this.tramiteEnlace = seccionState;
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
  }

  private inicializarFormulario() {
    this.FormEnlaceOperativo = this.fb.group({
      rfcBusqueda: [''],
      rfc: [{ value: '', disabled: true }],
      nombre: [{ value: '', disabled: true }],
      apellidoPaterno: [{ value: '', disabled: true }],
      apellidoMaterno: [{ value: '', disabled: true }],
      ciudad: [{ value: '', disabled: true }],
      cargoPuesto: [''],
      telefono: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      correoElectronico: ['', [Validators.email]],
      suplente: [false]
    });
  }

  buscarEnlaceOperativo() {
    this.formSubmitted = true;
    if (this.FormEnlaceOperativo.get('rfcBusqueda')?.valid) {
      const RFC = this.FormEnlaceOperativo.get('rfcBusqueda')?.value;
      this.servicioServer.buscarEnlacePorRFC(RFC).subscribe({
        next: (data) => {
          if (data) {
            this.FormEnlaceOperativo.patchValue(data);
          } else {
            this.nuevaNotificacion = {
              tipoNotificacion: 'alert',
              categoria: 'warning',
              modo: 'action',
              titulo: 'Aviso',
              mensaje: 'No se encontró el enlace operativo',
              cerrar: true,
              txtBtnAceptar: 'Aceptar',
              txtBtnCancelar: '',
            };
          }
        },
        error: (error) => {
          this.nuevaNotificacion = {
            tipoNotificacion: 'alert',
            categoria: 'danger',
            modo: 'action',
            titulo: 'Error',
            mensaje: 'Error al buscar el enlace operativo',
            cerrar: true,
            txtBtnAceptar: 'Aceptar',
            txtBtnCancelar: '',
          };
        }
      });
    }
  }

  aceptaEnlace() {
    this.formSubmitted = true;
    if (this.FormEnlaceOperativo.valid) {
      const YA_EXISTE = this.listaEnlaces.some(enlace => enlace.rfc === this.FormEnlaceOperativo.get('rfc')?.value);
      if (YA_EXISTE) {
        this.nuevaNotificacion = {
          tipoNotificacion: 'alert',
          categoria: 'warning',
          modo: 'action',
          titulo: 'Aviso',
          mensaje: 'El enlace operativo ya existe',
          cerrar: true,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: '',
        };
      } else {
        if (this.listaEnlaces.length === 0) {
          this.listaEnlaces = [];
        }
        
        this.listaEnlaces.push(this.FormEnlaceOperativo.value);
        this.FormEnlaceOperativo.reset();
        this.inicializarFormulario();
        this.tramite303State.setListaEnlaces(this.listaEnlaces);
        this.router.navigate(['aga/despacho-mercancias/registro']);
      }
    } else {
      this.FormEnlaceOperativo.markAllAsTouched();
    }
  }

  

  cancelar(): void {
    this.FormEnlaceOperativo.reset();
    this.router.navigate(['aga/despacho-mercancias/registro']);
  }
}
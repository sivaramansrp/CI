import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notificacion, NotificacionesComponent, REGEX_RFC, TablaDinamicaComponent, TablaSeleccion, TituloComponent, UppercaseDirective } from '@libs/shared/data-access-user/src';
import { Subject, catchError, map, of, takeUntil } from 'rxjs';
import { Tramite303Store, Tramite303StoreService } from '../../../../core/estados/tramites/tramite303.store';
import { CommonModule } from '@angular/common';
import { ENLACE_OPERATIVO } from '../../../../core/enums/303/enlace-operativo.enum';
import { EnlaceOperativo } from '../../../../core/models/303/enlace-operativo.model';
import { NumeroTelefonicoDirective } from '@libs/shared/data-access-user/src/tramites/directives/numeroTelefonico/numero-telefonico.directive';
import { Router } from '@angular/router';
import { Tramite303Query } from '../../../../core/queries/tramite303.query';
import { Tramite303Service } from '../../../../core/services/303/tramite303.service';

@Component({
  selector: 'terceros-relacionados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UppercaseDirective, NumeroTelefonicoDirective, TituloComponent, NotificacionesComponent, TablaDinamicaComponent],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit {
  /** Formulario reactivo para el representante legal */
  representanteLegalForm!: FormGroup;
  /** Notificación a mostrar al usuario */
  public nuevaNotificacion!: Notificacion;
  /** Notificador para destruir las suscripciones y evitar fugas de memoria */
  private destroyNotifier$: Subject<void> = new Subject();
  /** Configuración de la tabla de selección */
  tablaSeleccion = TablaSeleccion;
  /** Encabezado de la tabla de enlaces operativos */
  encabezadoDeTablaEnlace = ENLACE_OPERATIVO;
  /** Lista de enlaces operativos */
  public enlacesOperativos: EnlaceOperativo[] = [];
  /** Enlaces operativos seleccionados */
  public enlacesOperativosSeleccionados: EnlaceOperativo[] = [];
  /** Estado del trámite 303 consultado */
  public tramiteConsultado?: Tramite303Store;
  constructor(
    private fb: FormBuilder,
    private servicio: Tramite303Service,
    private router: Router,
    private tramite303State: Tramite303StoreService,
    private tramite303Query: Tramite303Query,
  ) {
    this.crearRepresentanteLegalForm();
  }
  ngOnInit(): void {
    this.tramite303Query.selectSolicitud$
      .pipe(
        map((seccionState) => {
          this.tramiteConsultado = seccionState;
          this.enlacesOperativos = seccionState.listaEnlaces || [];
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
  }

  /**
     * Busca un representante legal por su RFC.
     * @returns 
     */
  buscarRepresentanteLegal(): void {
    const RFC = this.representanteLegalForm.get('rfcBusqueda')?.value?.trim();
    const RFCVALUE = RFC?.trim();

    if (!RFCVALUE) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        modo: 'action',
        titulo: 'Aviso',
        mensaje: 'Debe capturar el RFC antes de buscar.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }
    this.ejecutarBusquedaRepresentanteLegal(RFCVALUE);
  }

  /**
   * Ejecuta la búsqueda del representante legal por su RFC.
   * @param RFCVALUE RFC del representante legal a buscar.
   */
  ejecutarBusquedaRepresentanteLegal(RFCVALUE: string): void {
    this.servicio.buscarFisicaPorRFC(RFCVALUE)
      .pipe(
        map((data) => {
          if (data) {
            this.representanteLegalForm.patchValue({
              rfc: data.rfc,
              nombre: data.nombre,
              primerApellido: data.primerApellido,
              segundoApellido: data.segundoApellido,
              telefono: data.telefono,
              correo: data.correo
            });
            this.nuevaNotificacion = {
              tipoNotificacion: 'alert',
              categoria: 'success',
              modo: 'action',
              titulo: 'Éxito',
              mensaje: 'Datos guardados correctamente.',
              cerrar: true,
              txtBtnAceptar: 'Aceptar',
              txtBtnCancelar: '',
            };
          } else {
            this.nuevaNotificacion = {
              tipoNotificacion: 'alert',
              categoria: 'warning',
              modo: 'action',
              titulo: 'Aviso',
              mensaje: 'El contribuyente no fue encontrado, favor de verificar el RFC.',
              cerrar: true,
              txtBtnAceptar: 'Aceptar',
              txtBtnCancelar: '',
            };
            console.error('No se encontró un socio accionista con el RFC proporcionado.');
          }
        }),
        catchError((error) => {
          console.error('Error al consultar capturista:', error);
          return of(undefined);
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
  }

  /** Método para crear el formulario reactivo del representante legal */
  crearRepresentanteLegalForm(): void {
    this.representanteLegalForm = this.fb.group({
      rfcBusqueda: ['', [Validators.required, Validators.pattern(REGEX_RFC)]],
      rfc: ['', { disabled: true }, [Validators.required, Validators.maxLength(13), Validators.pattern(REGEX_RFC)]],
      nombre: ['', { disabled: true }, Validators.required],
      primerApellido: ['', { disabled: true }, Validators.required],
      segundoApellido: ['', { disabled: true }],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  // Método de ayuda para saber si un campo es inválido
  campoInvalido(campo: string): boolean {
    const CONTROL = this.representanteLegalForm.get(campo);
    return Boolean(CONTROL && CONTROL.invalid && (CONTROL.dirty || CONTROL.touched));
  }

  agregarEnlace(): void {
    this.router.navigate(['aga/despacho-mercancias/enlace-operativo']);
  }
}

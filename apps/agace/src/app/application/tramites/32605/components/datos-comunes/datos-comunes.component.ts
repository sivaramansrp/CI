import {
  CatalogoSelectComponent,
  Notificacion,
  NotificacionesComponent,
  Pedimento,
} from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Domicilios } from '../../models/solicitud.model';
import { InputRadio } from '../../models/solicitud.model';
import { Inventarios } from '../../models/solicitud.model';
import { NumeroDeEmpleados } from '../../models/solicitud.model';
import { SeccionSociosIC } from '../../models/solicitud.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { DOMICILIOS_CONFIGURACION_COLUMNAS } from '../../constants/solicitud.enum';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudCatologoSelectLista } from '../../models/solicitud.model';
import { SolicitudRadioLista } from '../../models/solicitud.model';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
import { INVENTARIOS_CONFIGURACION } from '../../constants/solicitud.enum';
import { NUMERO_DE_EMPLEADOS_CONFIGURACION } from '../../constants/solicitud.enum';
import { SECCION_SOCIOSIC_CONFIGURACION_COLUMNAS } from '../../constants/solicitud.enum';
import { MiembroDeLaEmpresaComponent } from '../miembro-de-la-empresa/miembro-de-la-empresa.component';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-datos-comunes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputRadioComponent,
    TituloComponent,
    TablaDinamicaComponent,
    MiembroDeLaEmpresaComponent,
    NotificacionesComponent,
  ],
  providers: [SolicitudService],
  templateUrl: './datos-comunes.component.html',
  styleUrl: './datos-comunes.component.scss',
})
export class DatosComunesComponent implements OnInit, OnDestroy {
  datosComunesForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  sinoOpcion: InputRadio = {} as InputRadio;
  sectorProductivo: CatalogosSelect = {} as CatalogosSelect;
  servicio: CatalogosSelect = {} as CatalogosSelect;
  bimestre: CatalogosSelect = {} as CatalogosSelect;
  indiqueTodos: CatalogosSelect = {} as CatalogosSelect;
  solicitud32605State: Solicitud32605State = {} as Solicitud32605State;
  numeroDeEmpleadosTabla = TablaSeleccion.CHECKBOX;
  numeroDeEmpleadosConfiguracionColumnas: ConfiguracionColumna<NumeroDeEmpleados>[] =
    NUMERO_DE_EMPLEADOS_CONFIGURACION;
  numeroDeEmpleadosLista: NumeroDeEmpleados[] = [];
  /** Configuración de columnas para domicilios */
  domiciliosConfiguracionColumnas: ConfiguracionColumna<Domicilios>[] =
    DOMICILIOS_CONFIGURACION_COLUMNAS;

  /** Datos de los domicilios */
  domiciliosDatos: Domicilios[] = [] as Domicilios[];

  inventariosConfiguracionColumnas: ConfiguracionColumna<Inventarios>[] =
    INVENTARIOS_CONFIGURACION;

  inventariosDatos: Inventarios[] = [] as Inventarios[];

  /** Configuración de columnas para la sección de socios IC */
  seccionSociosICConfiguracionColumnas: ConfiguracionColumna<SeccionSociosIC>[] =
    SECCION_SOCIOSIC_CONFIGURACION_COLUMNAS;

  /** Lista de socios IC */
  listaSeccionSociosIC: SeccionSociosIC[] = [] as SeccionSociosIC[];

  /**
   * Referencia al modal para agregar mercancías.
   */
  @ViewChild('modalAgregarMiembrosEmpresa', { static: false })
  modalElement!: ElementRef;

  /**
   * @descripcion Notificación para mostrar mensajes al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Elemento a eliminar de la tabla de pedimentos.
   */
  elementoParaEliminar!: number;
  /**
   * Array con los datos de los pedimentos.
   * Se utiliza para almacenar los pedimentos ingresados por el usuario.
   */
  pedimentos: Array<Pedimento> = [];
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32605Store: Solicitud32605Store,
    public solicitud32605Query: Solicitud32605Query
  ) {
    this.conseguirOpcionDeRadio();
    this.conseguirSolicitudCatologoSelectLista();
  }

  ngOnInit(): void {
    this.datosComunesForm = this.fb.group({});
    this.solicitud32605Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32605State) => {
          this.solicitud32605State = respuesta;
          this.datosComunesForm.patchValue({});
        })
      )
      .subscribe();
  }

  conseguirOpcionDeRadio(): void {
    this.solicitudService
      .conseguirOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudRadioLista) => {
          this.sinoOpcion = respuesta.requisitos;
        },
      });
  }

  conseguirSolicitudCatologoSelectLista(): void {
    this.solicitudService
      .conseguirSolicitudCatologoSelectLista()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudCatologoSelectLista) => {
          this.sectorProductivo = respuesta.sectorProductivo;
          this.servicio = respuesta.servicio;
          this.bimestre = respuesta.bimestre;
          this.indiqueTodos = respuesta.indiqueTodos;
        },
      });
  }

  /** Muestra el modal para agregar miembros de la empresa */
  agregarMiembrosEmpresa(valor: string): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /** Actualiza los datos de un miembro de la empresa */
  eventoActualizarMiembro(evento: SeccionSociosIC): void {
    this.listaSeccionSociosIC.push(evento);
    const PEDIMENTO = {
      patente: 0,
      pedimento: 0,
      aduana: 0,
      idTipoPedimento: 0,
      descTipoPedimento: 'Por evaluar',
      numero: '',
      comprobanteValor: '',
      pedimentoValidado: false,
    };
    this.abrirModal('Datos guardados correctamente.');
    this.pedimentos.push(PEDIMENTO);
  }

  /**
   * Elimina un elemento de la lista de pedimentos en la posición especificada.
   *
   * @param {number} i - El índice del elemento a eliminar.
   *
   * @remarks
   * Después de eliminar el elemento, se actualiza el título y mensaje del modal,
   * y se abre el modal para mostrar un aviso al usuario.
   */
  abrirModal(mensaje: string, i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: mensaje,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };

    this.elementoParaEliminar = i;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

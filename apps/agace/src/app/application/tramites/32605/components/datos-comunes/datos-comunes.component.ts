import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionAporteColumna,
  TablaConEntradaComponent,
} from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DOMICILIOS_CONFIGURACION_COLUMNAS } from '../../constants/solicitud.enum';
import { Domicilios } from '../../models/solicitud.model';
import { ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { INVENTARIOS_CONFIGURACION } from '../../constants/solicitud.enum';
import { InputRadio } from '../../models/solicitud.model';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { InstalacionesPrincipalesComponent } from '../instalaciones-principales/instalaciones-principales.component';
import { Inventarios } from '../../models/solicitud.model';
import { MiembroDeLaEmpresaComponent } from '../miembro-de-la-empresa/miembro-de-la-empresa.component';
import { Modal } from 'bootstrap';
import { NUMERO_DE_EMPLEADOS_CONFIGURACION } from '../../constants/solicitud.enum';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { NumeroDeEmpleados } from '../../models/solicitud.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Pedimento } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { SECCION_SOCIOSIC_CONFIGURACION_COLUMNAS } from '../../constants/solicitud.enum';
import { SeccionSociosIC } from '../../models/solicitud.model';
import { SeccionSubcontratadosComponent } from '../seccion-subcontratados/seccion-subcontratados.component';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudCatologoSelectLista } from '../../models/solicitud.model';
import { SolicitudRadioLista } from '../../models/solicitud.model';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

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
    SeccionSubcontratadosComponent,
    InstalacionesPrincipalesComponent,
    TablaConEntradaComponent,
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
  numeroDeEmpleadosLista: NumeroDeEmpleados[] = [] as NumeroDeEmpleados[];
  seleccionarNumeroDeEmpleadosLista: NumeroDeEmpleados[] =
    [] as NumeroDeEmpleados[];
  /** Configuración de columnas para domicilios */
  domiciliosConfiguracionColumnas: ConfiguracionColumna<Domicilios>[] =
    DOMICILIOS_CONFIGURACION_COLUMNAS;

  /** Datos de los domicilios */
  domiciliosDatos: Domicilios[] = [] as Domicilios[];

  seleccionarDomiciliosDatos: Domicilios[] = [] as Domicilios[];

  inventariosConfiguracionColumnas: ConfiguracionAporteColumna<Inventarios>[] =
    INVENTARIOS_CONFIGURACION;

  inventariosDatos: Inventarios[] = [] as Inventarios[];

  seleccionarInventarios: Inventarios[] = [] as Inventarios[];

  /** Configuración de columnas para la sección de socios IC */
  seccionSociosICConfiguracionColumnas: ConfiguracionColumna<SeccionSociosIC>[] =
    SECCION_SOCIOSIC_CONFIGURACION_COLUMNAS;

  /** Lista de socios IC */
  listaSeccionSociosIC: SeccionSociosIC[] = [] as SeccionSociosIC[];

  seleccionarListaSeccionSociosIC: SeccionSociosIC[] = [] as SeccionSociosIC[];

  /**
   * Referencia al modal para agregar mercancías.
   */
  @ViewChild('modalAgregarMiembrosEmpresa', { static: false })
  modalElement!: ElementRef;

  @ViewChild('modalSeccionSubcontratados', { static: false })
  modalSeccionSubcontratadosElement!: ElementRef;

  @ViewChild('modalInstalacionesPrincipales', { static: false })
  modalInstalacionesPrincipalesElement!: ElementRef;

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
    this.conseguirInventarios();
  }

  ngOnInit(): void {
    this.datosComunesForm = this.fb.group({
      catseleccionados: [this.solicitud32605State.catseleccionados],
      servicio: [this.solicitud32605State.servicio],
      '190': [this.solicitud32605State['190']],
      '191': [this.solicitud32605State['191']],
      '199': [this.solicitud32605State['199']],
      empleados: [this.solicitud32605State.empleados],
      bimestre: [this.solicitud32605State.bimestre],
      '2034': [this.solicitud32605State['2034']],
      '236': [this.solicitud32605State['236']],
      '237': [this.solicitud32605State['237']],
      '238': [this.solicitud32605State['238']],
      '239': [this.solicitud32605State['239']],
      '240': [this.solicitud32605State['240']],
      '243': [this.solicitud32605State['243']],
      '244': [this.solicitud32605State['244']],
      '245': [this.solicitud32605State['245']],
      indiqueTodos: [this.solicitud32605State.indiqueTodos],
      '246': [this.solicitud32605State['246']],
      file1: [this.solicitud32605State.file1],
      file2: [this.solicitud32605State.file2],
      '247': [this.solicitud32605State['247']],
      '248': [this.solicitud32605State['248']],
      identificacion: [this.solicitud32605State.identificacion],
      lugarDeRadicacion: [this.solicitud32605State.lugarDeRadicacion],
      '249': [this.solicitud32605State['249']],
      '250': [this.solicitud32605State['250']],
      '251': [this.solicitud32605State['251']],
      checkbox1: [this.solicitud32605State.checkbox1],
      checkbox2: [this.solicitud32605State.checkbox2],
      checkbox3: [this.solicitud32605State.checkbox3],
      actualmente2: [this.solicitud32605State.actualmente2],
      actualmente1: [this.solicitud32605State.actualmente1],
    });

    this.solicitud32605Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32605State) => {
          this.solicitud32605State = respuesta;
          this.datosComunesForm.patchValue({
            catseleccionados: this.solicitud32605State.catseleccionados,
            servicio: this.solicitud32605State.servicio,
            '190': this.solicitud32605State['190'],
            '191': this.solicitud32605State['191'],
            '199': this.solicitud32605State['199'],
            empleados: this.solicitud32605State.empleados,
            bimestre: this.solicitud32605State.bimestre,
            '2034': this.solicitud32605State['2034'],
            '236': this.solicitud32605State['236'],
            '237': this.solicitud32605State['237'],
            '238': this.solicitud32605State['238'],
            '239': this.solicitud32605State['239'],
            '240': this.solicitud32605State['240'],
            '243': this.solicitud32605State['243'],
            '244': this.solicitud32605State['244'],
            '245': this.solicitud32605State['245'],
            indiqueTodos: this.solicitud32605State.indiqueTodos,
            '246': this.solicitud32605State['246'],
            file1: this.solicitud32605State.file1,
            file2: this.solicitud32605State.file2,
            '247': this.solicitud32605State['247'],
            '248': this.solicitud32605State['248'],
            identificacion: this.solicitud32605State.identificacion,
            lugarDeRadicacion: this.solicitud32605State.lugarDeRadicacion,
            '249': this.solicitud32605State['249'],
            '250': this.solicitud32605State['250'],
            '251': this.solicitud32605State['251'],
            checkbox1: this.solicitud32605State.checkbox1,
            checkbox2: this.solicitud32605State.checkbox2,
            checkbox3: this.solicitud32605State.checkbox3,
            actualmente2: this.solicitud32605State.actualmente2,
            actualmente1: this.solicitud32605State.actualmente1,
          });
          this.numeroDeEmpleadosLista =
            this.solicitud32605State.numeroDeEmpleadosLista;
          this.domiciliosDatos = this.solicitud32605State.domiciliosDatos;
          this.listaSeccionSociosIC =
            this.solicitud32605State.listaSeccionSociosIC;
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

  conseguirInventarios(): void {
    this.solicitudService
      .conseguirInventarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: Inventarios[]) => {
          this.inventariosDatos = respuesta;
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

  agregarSubcontratados(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(
        this.modalSeccionSubcontratadosElement.nativeElement
      );
      MODAL_INSTANCE.show();
    }
  }

  agregarInstalacionesPrincipales(valor: string): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(
        this.modalInstalacionesPrincipalesElement.nativeElement
      );
      MODAL_INSTANCE.show();
    }
  }

  /** Actualiza los datos de un miembro de la empresa */
  eventoActualizarMiembro(evento: SeccionSociosIC): void {
    this.listaSeccionSociosIC = [...this.listaSeccionSociosIC, evento];
    this.solicitud32605Store.actualizarListaSeccionSociosIC(
      this.listaSeccionSociosIC
    );
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

  seccionSubcontratados(evento: NumeroDeEmpleados): void {
    this.numeroDeEmpleadosLista = [...this.numeroDeEmpleadosLista, evento];
    this.solicitud32605Store.actualizarNumeroDeEmpleadosLista(
      this.numeroDeEmpleadosLista
    );
  }

  instalacionesPrincipales(evento: Domicilios): void {
    this.domiciliosDatos = [...this.domiciliosDatos, evento];
    this.solicitud32605Store.actualizarDomiciliosDatos(this.domiciliosDatos);
  }

  actualizarCatseleccionados(valor: Catalogo): void {
    this.solicitud32605Store.actualizarCatseleccionados(valor.id);
  }

  actualizarServicio(valor: Catalogo): void {
    this.solicitud32605Store.actualizarServicio(valor.id);
  }

  actualizar190(valor: string | number): void {
    this.solicitud32605Store.actualizar190(valor);
  }

  actualizar191(valor: string | number): void {
    this.solicitud32605Store.actualizar191(valor);
  }

  actualizar199(valor: string | number): void {
    this.solicitud32605Store.actualizar199(valor);
  }

  actualizarEmpleados(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarEmpleados(VALOR);
  }

  actualizarBimestre(valor: Catalogo): void {
    this.solicitud32605Store.actualizarBimestre(valor.id);
  }

  actualizar2034(valor: string | number): void {
    this.solicitud32605Store.actualizar2034(valor);
  }

  actualizar236(valor: string | number): void {
    this.solicitud32605Store.actualizar236(valor);
  }

  actualizar237(valor: string | number): void {
    this.solicitud32605Store.actualizar237(valor);
  }

  // actualizar238(valor: string | number): void {
  //   this.solicitud32605Store.actualizar238(valor);
  // }

  actualizar239(valor: string | number): void {
    this.solicitud32605Store.actualizar239(valor);
  }

  actualizar240(valor: string | number): void {
    this.solicitud32605Store.actualizar240(valor);
  }

  actualizar243(valor: string | number): void {
    this.solicitud32605Store.actualizar243(valor);
  }

  actualizar244(valor: string | number): void {
    this.solicitud32605Store.actualizar244(valor);
  }

  actualizar245(valor: string | number): void {
    this.solicitud32605Store.actualizar245(valor);
  }

  actualizarIndiqueTodos(valor: Catalogo): void {
    this.solicitud32605Store.actualizarIndiqueTodos(valor.id);
  }

  actualizar246(valor: string | number): void {
    this.solicitud32605Store.actualizar246(valor);
  }

  actualizarFile1(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarFile1(VALOR);
  }

  actualizarFile2(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarFile2(VALOR);
  }

  actualizar247(valor: string | number): void {
    this.solicitud32605Store.actualizar247(valor);
  }

  actualizar248(valor: string | number): void {
    this.solicitud32605Store.actualizar248(valor);
  }

  actualizarIdentificacion(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarIdentificacion(VALOR);
  }

  actualizarLugarDeRadicacion(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarLugarDeRadicacion(VALOR);
  }

  actualizar249(valor: string | number): void {
    this.solicitud32605Store.actualizar249(valor);
  }

  actualizar250(valor: string | number): void {
    this.solicitud32605Store.actualizar250(valor);
  }

  actualizar251(valor: string | number): void {
    this.solicitud32605Store.actualizar251(valor);
  }

  actualizarCheckbox1(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).checked;
    this.solicitud32605Store.actualizarCheckbox1(VALOR);
  }

  actualizarCheckbox2(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).checked;
    this.solicitud32605Store.actualizarCheckbox2(VALOR);
  }

  actualizarCheckbox3(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).checked;
    this.solicitud32605Store.actualizarCheckbox3(VALOR);
  }

  actualizarActualmente2(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarActualmente2(VALOR);
  }

  actualizarActualmente1(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarActualmente1(VALOR);
  }

  seleccionarInventariosDatos(evento: Inventarios[]): void {
    this.seleccionarInventarios = evento;
  }

  eliminarInventariosDatos(): void {
    if (this.seleccionarInventarios.length > 0) {
      this.seleccionarInventarios.forEach((elemento) => {
        const INDICE = this.inventariosDatos.findIndex(
          (inv) => inv.nombre === elemento.nombre
        );
        if (INDICE !== -1) {
          this.inventariosDatos.splice(INDICE, 1);
        }
      });
    }
  }

  seleccionarlistaSeccionSociosIC(evento: SeccionSociosIC[]): void {
    this.seleccionarListaSeccionSociosIC = evento;
  }

  eliminarlistaSeccionSociosIC(): void {
    if (this.seleccionarListaSeccionSociosIC.length > 0) {
      this.seleccionarListaSeccionSociosIC.forEach((elemento) => {
        const INDICE = this.listaSeccionSociosIC.findIndex(
          (inv) => inv.nombre === elemento.nombre
        );
        if (INDICE !== -1) {
          this.listaSeccionSociosIC.splice(INDICE, 1);
        }
      });
    }
  }

  seleccionarDomiciliosDato(evento: Domicilios[]): void {
    this.seleccionarDomiciliosDatos = evento;
  }

  eliminarDomiciliosDatos(): void {
    if (this.seleccionarDomiciliosDatos.length > 0) {
      this.seleccionarDomiciliosDatos.forEach((elemento) => {
        const INDICE = this.domiciliosDatos.findIndex(
          (inv) => inv.tipoInstalacion === elemento.tipoInstalacion
        );
        if (INDICE !== -1) {
          this.domiciliosDatos.splice(INDICE, 1);
        }
      });
    }
  }

  seleccionarNumeroDeEmpleadosDato(evento: NumeroDeEmpleados[]): void {
    this.seleccionarNumeroDeEmpleadosLista = evento;
  }

  eliminarNumeroDeEmpleadosDato(): void {
    if (this.seleccionarNumeroDeEmpleadosLista.length > 0) {
      this.seleccionarNumeroDeEmpleadosLista.forEach((elemento) => {
        const INDICE = this.numeroDeEmpleadosLista.findIndex(
          (inv) => inv.numeroDeEmpleados === elemento.numeroDeEmpleados
        );
        if (INDICE !== -1) {
          this.numeroDeEmpleadosLista.splice(INDICE, 1);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

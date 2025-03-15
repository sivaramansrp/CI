import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';

import { AlertComponent } from '@ng-mf/data-access-user';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { ClaveModel, MercanciaModel, solicitudModel } from '../../models/permiso-maquila.models';
import { SolicitudService } from '../../services/solicitud.service';
import { DATOS_ALERT,MANIFIESTOS_ALERT } from '../../constantes/permiso-maquila.enum';
import { ClaveScianComponent } from '../clave-scian/clave-scian.component';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { FormularioOperacionComercialComponent } from '../formulario-operacion-comercial/formulario-operacion-comercial.component';
import { MercanciasTableFormComponent } from '../mercancias-tabla-form/mercancias-table-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepresentanteLegalComponent } from '../representante-legal/representante-legal.component';


@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    AlertComponent,
    ClaveScianComponent,
    FormularioOperacionComercialComponent,
    MercanciasTableFormComponent,
    RepresentanteLegalComponent

  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit {
  datosDeSolicitudForm!: FormGroup;
  DATOS_ALERT = DATOS_ALERT
  MANIFIESTOS_ALERT= MANIFIESTOS_ALERT
  solicitudData: solicitudModel[] = [];
  mercanicaData: MercanciaModel[] = [];
  mostrarFormularioScian = false;
  colapsable = true;
  mostrarFormularioMercancias = false;
  mostrarFormulario = false;


  configuracionTabla: ConfiguracionColumna<solicitudModel>[] = [
    { encabezado: 'Fecha Creación', clave: (item: solicitudModel) => item.fechaCreación, orden: 1 },
    { encabezado: 'Mercancía', clave: (item: solicitudModel) => item.mercancía, orden: 2 },
    { encabezado: 'Cantidad', clave: (item: solicitudModel) => item.cantidad, orden: 3 },
    { encabezado: 'Proveedor', clave: (item: solicitudModel) => item.proveedor, orden: 4 }
  ];

  constructor(private solicitudService: SolicitudService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.fomInitialize()
    this.solicitudService.getSolicitudes().subscribe((data) => {
      this.solicitudData = data;
    });
  }

  claveDatas: ClaveModel[] = [];
  TablaSeleccion = TablaSeleccion;

  configuracionTablas: ConfiguracionColumna<ClaveModel>[] = [
    { encabezado: 'Clave S.C.A.N.', clave: (item: ClaveModel) => item.clave, orden: 1 },
    { encabezado: 'Descripcíon del S.C.I.A.N', clave: (item: ClaveModel) => item.descripcíon, orden: 2 },
  ];

  fomInitialize() {
    this.datosDeSolicitudForm = this.fb.group({
      rfcDelResponsableSanitario: ['', [Validators.required]],
      denominacionRazonSocial: ['', [Validators.required]],
      correoElectronico: ['', [Validators.required]],
      CódigoPostal: ['', [Validators.required]],
      Estado: ['', [Validators.required]],
      Municipio: ['', [Validators.required]],
      Localidad: ['', [Validators.required]],
      Colonia: ['', [Validators.required]],
      caller: ['', [Validators.required]],
      lada: ['', [Validators.required]],
      teléfono: ['', [Validators.required]],
    });
  }

  toggleFormulario() {
    this.mostrarFormularioScian = !this.mostrarFormularioScian;
  }

  toggleScianFormulario() {
    this.mostrarFormularioScian = true
  }

  closeScianFormulario() {
    this.mostrarFormularioScian = false;
  }

  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }

  openForm() {
    this.mostrarFormularioMercancias = true;
  }

  closeForm() {
    this.mostrarFormularioMercancias = false;
  }

  mercanciasTabla: ConfiguracionColumna<MercanciaModel>[] = [
    { encabezado: 'Clasificación del producto', clave: (item: MercanciaModel) => item.clasificaciónProducto, orden: 1 },
    { encabezado: 'Especificar clasificación del producto', clave: (item: MercanciaModel) => item.especificarClasificación, orden: 2 },
    { encabezado: 'Denominación específica del producto', clave: (item: MercanciaModel) => item.denominaciónEspecífica, orden: 3 },
    { encabezado: 'Denominación distintiva', clave: (item: MercanciaModel) => item.denominaciónDistintiva, orden: 4 },
    { encabezado: 'Denominación común, nombre común o nombre científico', clave: (item: MercanciaModel) => item.denominaciónComún, orden: 5},
    { encabezado: 'Forma farmacéutica', clave: (item: MercanciaModel) => item.formaFarmacéutica, orden: 6 },
    { encabezado: 'Estado físico', clave: (item: MercanciaModel) => item.estadoFsico, orden: 7 }
];

}

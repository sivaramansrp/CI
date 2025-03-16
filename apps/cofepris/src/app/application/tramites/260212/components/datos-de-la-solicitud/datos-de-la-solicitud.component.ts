import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';

import { AlertComponent } from '@ng-mf/data-access-user';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { ClaveModel, MercanciaModel, solicitudModel } from '../../models/permiso-maquila.models';
import { SolicitudService } from '../../services/solicitud.service';
import { DATOS_ALERT,MANIFIESTOS_ALERT } from '../../constantes/permiso-maquila.enum';
import { ClaveScianComponent } from '../clave-scian/clave-scian.component';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { FormularioOperacionComercialComponent } from '../formulario-operacion-comercial/formulario-operacion-comercial.component';
import { MercanciasTableFormComponent } from '../mercancias-tabla-form/mercancias-table-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RepresentanteLegalComponent } from '../representante-legal/representante-legal.component';


@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    TablaDinamicaComponent,
    AlertComponent,
    ClaveScianComponent,
    FormularioOperacionComercialComponent,
    MercanciasTableFormComponent,
    RepresentanteLegalComponent,
    CatalogoSelectComponent

  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit {
  datosEstablecimientoForm!: FormGroup;

  DATOS_ALERT = DATOS_ALERT
  MANIFIESTOS_ALERT= MANIFIESTOS_ALERT

  solicitudData: solicitudModel[] = [];
  mercanicaData: MercanciaModel[] = [];

  plegable = true;
  mostrarFormularioScian = false;
 
  mostrarFormularioMercancias = false;
  mostrarFormulario = false;

  estado: Catalogo[]=[]

  claveDatas: ClaveModel[] = [];
  TablaSeleccion = TablaSeleccion;
  configuracionTablaSolicitud: ConfiguracionColumna<solicitudModel>[] = [
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

    this.solicitudService.getclave().subscribe((data) => {
      this.estado = data;
    })
  }

  configuracionTablaScian: ConfiguracionColumna<ClaveModel>[] = [
    { encabezado: 'Clave S.C.A.N.', clave: (item: ClaveModel) => item.clave, orden: 1 },
    { encabezado: 'Descripcíon del S.C.I.A.N', clave: (item: ClaveModel) => item.descripcíon, orden: 2 },
  ];

  fomInitialize() {
    this.datosEstablecimientoForm = this.fb.group({
      rfcDelResponsableSanitario: [''],
      denominacionRazonSocial: ['', [Validators.required]],
      correoElectronico: ['', [Validators.required,Validators.maxLength(30),Validators.email]],
      codigoPostal: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      caller: ['', [Validators.required]],
      lada: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
  }

  mostrarPlegable() {
    this.plegable = !this.plegable;
  }

  toggleScianFormulario() {
    this.mostrarFormularioScian = true
  }

  // toggleFormulario() {
  //   this.mostrarFormularioScian = !this.mostrarFormularioScian;
  // }

  cerrarScianFormulario() {
    this.mostrarFormularioScian = false;
  }



  openMercanciasForm() {
    this.mostrarFormularioMercancias = true;
  }

  closeMercanciasForm() {
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

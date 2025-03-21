import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Catalogo,
  CatalogosSelect,
  ConfiguracionColumna,
  InputFecha,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import {
  Solicitud260101State,
  Solicitud260101Store,
} from '../../estados/tramites260101.store';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { ClavesDeLotes } from '../../models/claves-de-lotes.model';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import {
  CrossList,
  MercanciaCatalogos,
  MercanciaCrossList,
} from '../../models/mercancia.model';

@Component({
  selector: 'app-modificar-mercancias',
  templateUrl: './modificar-mercancias.component.html',
  styleUrl: './modificar-mercancias.component.scss',
})
export class ModificarMercanciasComponent implements OnInit, OnDestroy {
  productosCatalogo: CatalogosSelect = {} as CatalogosSelect;
  especificarCatalogo: CatalogosSelect = {} as CatalogosSelect;
  tipoProductoCatalogo: CatalogosSelect = {} as CatalogosSelect;
  umcCatalogo: CatalogosSelect = {} as CatalogosSelect;

  paisOrigenColapsable = false;
  paisOrigenCrossList: CrossList = {} as CrossList;

  paisProcedencisColapsable = false;
  paisProcedencisCrossList: CrossList = {} as CrossList;

  usoEspecificoColapsable = false;
  usoEspecificoCrossList: CrossList = {} as CrossList;

  fechaFabricacionDatos: InputFecha = {
    labelNombre: 'Fecha de fabricación',
    required: false,
    habilitado: true,
  };

  fechaCaducidad: InputFecha = {
    labelNombre: 'Fecha de Caducidad',
    required: false,
    habilitado: true,
  };
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;
  configuracionTabla: ConfiguracionColumna<any>[] = [
    {
      encabezado: 'Clave de los lotes ',
      clave: (item: any) => item.lotes,
      orden: 1,
    },
    {
      encabezado: 'Fecha de fabricación',
      clave: (item: any) => item.fabricacion,
      orden: 2,
    },
    {
      encabezado: 'Fecha de caducidad',
      clave: (item: any) => item.caducidad,
      orden: 3,
    },
  ];

  tipos: ClavesDeLotes[] = [];
  selectedClavesDeLotes: ClavesDeLotes[] = [];

  datosMercanciaForm!: FormGroup;
  solicitud260101State: Solicitud260101State = {} as Solicitud260101State;
  private destroyNotifier$: Subject<void> = new Subject();
  constructor(
    public fb: FormBuilder,
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260101Store: Solicitud260101Store,
    public solicitud260101Query: Solicitud260101Query
  ) {
    this.obtenerClavesDeLotesListo();
    this.obtenerMercanciaCatalogos();
    this.obtenerCrosslisto();
  }

  ngOnInit() {
    this.datosMercanciaForm = this.fb.group({
      clasificaionProductos: [
        this.solicitud260101State.clasificaionProductos,
        [Validators.required],
      ],
      especificarProducto: [
        this.solicitud260101State.especificarProducto,
        [Validators.required],
      ],
      nombreProductoEspecifico: [
        this.solicitud260101State.nombreProductoEspecifico,
        [Validators.required],
      ],
      marca: [this.solicitud260101State.marca, [Validators.required]],
      tipoProducto: [
        this.solicitud260101State.tipoProducto,
        [Validators.required],
      ],
      fraccionArancelaria: [
        this.solicitud260101State.fraccionArancelaria,
        [Validators.required],
      ],
      descripcionFraccionArancelaria: [
        {
          value: this.solicitud260101State.descripcionFraccionArancelaria,
          disabled: true,
        },
        [Validators.required],
      ],
      cantidadUMT: [
        this.solicitud260101State.cantidadUMT,
        [Validators.required],
      ],
      umt: [
        {
          value: this.solicitud260101State.umt,
          disabled: true,
        },
        [Validators.required],
      ],
      cantidadUMC: [
        this.solicitud260101State.cantidadUMC,
        [Validators.required],
      ],
      umc: [this.solicitud260101State.umc, [Validators.required]],
      claveDeLosLotes: [
        this.solicitud260101State.claveDeLosLotes,
        [Validators.required],
      ],
      fechaFabricacion: [
        this.solicitud260101State.fechaFabricacion,
        [Validators.required],
      ],
      fechaCaducidad: [
        this.solicitud260101State.fechaCaducidad,
        [Validators.required],
      ],
    });

    this.solicitud260101Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((res: Solicitud260101State) => {
          this.solicitud260101State = res;
          this.datosMercanciaForm.patchValue({
            clasificaionProductos:
              this.solicitud260101State.clasificaionProductos,
            especificarProducto: this.solicitud260101State.especificarProducto,
            nombreProductoEspecifico:
              this.solicitud260101State.nombreProductoEspecifico,
            marca: this.solicitud260101State.marca,
            tipoProducto: this.solicitud260101State.tipoProducto,
            fraccionArancelaria: this.solicitud260101State.fraccionArancelaria,
            descripcionFraccionArancelaria:
              this.solicitud260101State.descripcionFraccionArancelaria,
            cantidadUMT: this.solicitud260101State.cantidadUMT,
            umt: this.solicitud260101State.umt,
            cantidadUMC: this.solicitud260101State.cantidadUMC,
            umc: this.solicitud260101State.umc,
            claveDeLosLotes: this.solicitud260101State.claveDeLosLotes,
            fechaFabricacion: this.solicitud260101State.fechaFabricacion,
            fechaCaducidad: this.solicitud260101State.fechaCaducidad,
          });
          this.tipos = this.solicitud260101State.clavesDeLotes;
        })
      )
      .subscribe();
  }

  obtenerClavesDeLotesListo() {
    this.solicitudDatosService.obtenerClavesDeLotesListo().subscribe({
      next: (res: ClavesDeLotes[]) => {
        this.tipos = res;
        this.solicitud260101Store.setClavesDeLotes(res);
      },
    });
  }

  obtenerCrosslisto() {
    this.solicitudDatosService.obtenerCrosslisto().subscribe({
      next: (res: MercanciaCrossList) => {
        console.log(res)
        this.paisOrigenCrossList = res.paisOrigenCrossList;
        this.paisProcedencisCrossList = res.paisProcedencisCrossList;
        this.usoEspecificoCrossList = res.usoEspecificoCrossList;
      },
    });
  }

  obtenerMercanciaCatalogos() {
    this.solicitudDatosService.obtenerMercanciaCatalogos().subscribe({
      next: (res: MercanciaCatalogos) => {
        this.productosCatalogo = res.productosCatalogo;
        this.especificarCatalogo = res.especificarCatalogo;
        this.tipoProductoCatalogo = res.tipoProductoCatalogo;
        this.umcCatalogo = res.umcCatalogo;
      },
    });
  }

  paisOrigen_colapsable() {
    this.paisOrigenColapsable = !this.paisOrigenColapsable;
  }

  paisProcedencis_colapsable() {
    this.paisProcedencisColapsable = !this.paisProcedencisColapsable;
  }

  usoEspecifico_colapsable() {
    this.usoEspecificoColapsable = !this.usoEspecificoColapsable;
  }

  seleccionaProductos(event: Catalogo): void {
    this.solicitud260101Store.setCadenaDeDependencia(event.descripcion);
  }

  seleccionaEspecificar(event: Catalogo): void {
    this.solicitud260101Store.setEspecificarProducto(event.id);
  }

  seleccionaTipoProducto(event: Catalogo): void {
    this.solicitud260101Store.setTipoProducto(event.id);
  }

  seleccionarFechaFabricacion(event: string): void {
    this.solicitud260101Store.setFechaFabricacion(event);
  }

  seleccionarFechaCaducidad(event: string): void {
    this.solicitud260101Store.setFechaCaducidad(event);
  }

  setNombreProductoEspecifico(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setNombreProductoEspecifico(VALUE);
  }

  setMarca(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setMarca(VALUE);
  }

  setFraccionArancelaria(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setFraccionArancelaria(VALUE);
  }

  setCantidadUMT(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setCantidadUMT(VALUE);
  }

  setCantidadUMC(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setCantidadUMC(VALUE);
  }

  setUMC(event: Catalogo): void {
    this.solicitud260101Store.setUmc(event.id);
  }

  setClaveDeDeLosLotes(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setClaveDeLosLotes(VALUE);
  }

  agregarMercanias() {
    const JSON_OBJECT = {
      clasificaionProductos: this.datosMercanciaForm.get(
        'clasificaionProductos'
      )?.value,
      especificarProducto: this.datosMercanciaForm.get('especificarProducto')
        ?.value,
      nombreProductoEspecifico: this.datosMercanciaForm.get(
        'nombreProductoEspecifico'
      )?.value,
      marca: this.datosMercanciaForm.get('marca')?.value,
      tipoProducto: this.datosMercanciaForm.get('tipoProducto')?.value,
      fraccionArancelaria: this.datosMercanciaForm.get('fraccionArancelaria')
        ?.value,
      descripcionFraccionArancelaria: this.datosMercanciaForm.get(
        'descripcionFraccionArancelaria'
      )?.value,
      cantidadUMT: this.datosMercanciaForm.get('cantidadUMT')?.value,
      umt: this.datosMercanciaForm.get('umt')?.value,
      cantidadUMC: this.datosMercanciaForm.get('cantidadUMC')?.value,
      umc: this.datosMercanciaForm.get('umc')?.value,
      paisDeOrigen: 'paisDeOrigen',
      paisDeProcedencia: 'paisDeProcedencia',
      usoEspecifico: 'usoEspecifico',
    };

    this.solicitud260101Store.addMercanciasDatos(JSON_OBJECT);
  }

  agregarClavesDeLotes() {
    const JSON_OBJECT = {
      lotes: this.datosMercanciaForm.get('claveDeLosLotes')?.value,
      fabricacion: this.datosMercanciaForm.get('fechaFabricacion')?.value,
      caducidad: this.datosMercanciaForm.get('fechaCaducidad')?.value,
    };

    const isEmpty = Object.values(JSON_OBJECT).some(
      (value) => value === null || value === undefined || value === ''
    );

    if (!isEmpty) {
      this.solicitud260101Store.addClaveDeLote(JSON_OBJECT);
    }
  }

  getListaClavesDeLotes(event: ClavesDeLotes[]) {
    this.selectedClavesDeLotes = event;
  }

  modificarClavesDeLotes() {
    if (this.selectedClavesDeLotes.length > 0) {
      this.datosMercanciaForm.patchValue({
        claveDeLosLotes: this.selectedClavesDeLotes[0].lotes,
        fechaFabricacion: this.selectedClavesDeLotes[0].fabricacion,
        fechaCaducidad: this.selectedClavesDeLotes[0].caducidad,
      });
    }
  }

  eliminarClavesDeLotes() {
    if (this.selectedClavesDeLotes.length > 0) {
      this.solicitud260101Store.removeClaveDeLote(
        this.selectedClavesDeLotes[0]
      );
    }
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}

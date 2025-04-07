import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRadioComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component';
import {
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  ConfiguracionColumna,
  InputFecha,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { map, Observable, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { ConsultaService } from '../../service/consulta.service';
import { TablaDinamicaComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import {
  ColumnasTabla,
  CrossList,
  FECHAFINAL,
  FECHAINICIAL,
  ListaClave,
  Mercancia,
} from '../../models/consulta.model';
import { Tramite260704Store } from '../../estados/Tramite260704.store';
import { CrosslistComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { InputFechaComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { AVISO_PRIVACIDAD } from '../../constantes/consulta.enum';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    InputRadioComponent,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    CrosslistComponent,
    InputFechaComponent,
    
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.css',
})
export class DatosDeLaSolicitudComponent implements OnInit {
  valorSeleccionado: string = '';
  hercelosSeleccionados!: string;
  datosDelEstablecimientoForm!: FormGroup;
  domicilloDelEstablecimientoForm!: FormGroup;
  scianForm!: FormGroup;
  habilitarEstado: boolean = true;
  @ViewChild('modalAlerta') modalElement!: ElementRef;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public destroyNotifier$: Subject<void> = new Subject();
  TablaSeleccion = TablaSeleccion;
  claveScian!: Catalogo[];
  public certificadoDisponsiblesTablaDatos: ColumnasTabla[] = [];
  public mercanciasConfiguracionTabla: Mercancia[] = [];
  public listaClaveTabla: ListaClave[] = [];
  selectedMercanciasDatos: Mercancia[] = [];
  paisOrigen = false;
  paisProcedencisColapsable = false;
  usoEspecifico = false;
  paisOrigenCrossList: CrossList = {} as CrossList;
  paisProcedencisCrossList: CrossList = {} as CrossList;
  usoEspecificoCrossList: CrossList = {} as CrossList;
  fechaInicialInput: InputFecha = FECHAINICIAL;
  fechaFinalInput: InputFecha = FECHAFINAL;
  AVISO_PRIVACIDAD = AVISO_PRIVACIDAD;
  descripcionScian!: Catalogo[];

  radioOpcions = [
    { label: 'Prórroga', value: 'prorroga' },
    { label: 'Modificación', value: 'modificacion' },
    { label: 'Modificación y prórroga', value: 'modificacionYProrroga' },
  ];

  hacerlosRadioOptions = [
    { label: 'No', value: 'no' },
    { label: 'Sí', value: 'si' },
  ];
  public estadoCatalogo: CatalogosSelect = {
    labelNombre: 'Estado',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };
  public claveCatalogo: CatalogosSelect = {
    labelNombre: 'Estado',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };
  public headers: ConfiguracionColumna<ColumnasTabla>[] = [
    {
      encabezado: 'Clave S.C.I.A.N.',
      clave: (ele: ColumnasTabla) => ele.claveScian,
      orden: 1,
    },
    {
      encabezado: 'Descripción del S.C.I.A.N.',
      clave: (ele: ColumnasTabla) => ele.descripcionScian,
      orden: 2,
    },
  ];
  public mercanciasDatos: ConfiguracionColumna<Mercancia>[] = [
    {
      encabezado: 'Clasificación del producto',
      clave: (item: Mercancia) => item.clasificaionProductos,
      orden: 1,
    },
    {
      encabezado: 'Especificar Clasificación del producto',
      clave: (item: Mercancia) => item.especificarProducto,
      orden: 2,
    },
    {
      encabezado: 'Denominación específico del producto',
      clave: (item: Mercancia) => item.nombreProductoEspecifico,
      orden: 3,
    },
    {
      encabezado: 'Marca',
      clave: (item: Mercancia) => item.marca,
      orden: 4,
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (item: Mercancia) => item.fraccionArancelaria,
      orden: 5,
    },
    {
      encabezado: 'Descripción de la fracción arancelaria',
      clave: (item: Mercancia) => item.descripcionFraccionArancelaria,
      orden: 6,
    },
    {
      encabezado: 'Unidad de medida de comercialización (UMC)',
      clave: (item: Mercancia) => item.umc,
      orden: 7,
    },
    {
      encabezado: 'Cantidad UMC',
      clave: (item: Mercancia) => item.cantidadUMC,
      orden: 8,
    },
    {
      encabezado: 'Unidad de medida de tarifa (UMT)',
      clave: (item: Mercancia) => item.umt,
      orden: 9,
    },
    {
      encabezado: 'Cantidad UMT',
      clave: (item: Mercancia) => item.cantidadUMT,
      orden: 10,
    },
    {
      encabezado: 'País de origen',
      clave: (item: Mercancia) => item.paisDeOrigen,
      orden: 11,
    },
    {
      encabezado: 'País de procedencia',
      clave: (item: Mercancia) => item.paisDeProcedencia,
      orden: 12,
    },
    {
      encabezado: 'Tipo de producto',
      clave: (item: Mercancia) => item.tipoProducto,
      orden: 13,
    },
    {
      encabezado: 'Uso específico',
      clave: (item: Mercancia) => item.usoEspecifico,
      orden: 14,
    },
  ];

  public listaClave: ConfiguracionColumna<ListaClave>[] = [
    {
      encabezado: 'Clave de los lotes',
      clave: (ele: ListaClave) => ele.claveDeLosLotes,
      orden: 1,
    },
    {
      encabezado: 'Fecha de fabricación',
      clave: (ele: ListaClave) => ele.fechaDeFabricacion,
      orden: 2,
    },
    {
      encabezado: 'Fecha de caducidad',
      clave: (ele: ListaClave) => ele.fechaDeCaducidad,
      orden: 3,
    },
  ];
  constructor(
    private consulta: ConsultaService,
    public store: Tramite260704Store
  ) {  }

  ngOnInit(): void {
    this.getScianTabla();
    this.obtenerDatosEstado();
    this.getMercanciasTabla();
    this.obtenerDatosClave();
  }
  public getScianTabla(): void {
    this.consulta
      .getScianTabla()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        console.log('data', data);
        this.certificadoDisponsiblesTablaDatos = data;
      });
  }
  public getMercanciasTabla(): void {
    this.consulta
      .getMercanciasTabla()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        console.log('data', data);
        this.mercanciasConfiguracionTabla = data;
      });
  }

  public getListaClaveTabla(): void {
    this.consulta
      .getListaClaveTabla()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        console.log('data', data);
        this.listaClaveTabla = data;
      });
  }
  aceptar(): void {
    this.datosDelEstablecimientoForm.enable();
    // Habilitar todos los campos en el formulario Domicilio del Establecimiento
    this.domicilloDelEstablecimientoForm.enable();
    this.habilitarEstado = false;
  }

  limpiarDatosSCIAN(): void {
    // Implementar la lógica para limpiar datos SCIAN.
  }

  agregarDatosSCIAN(): void {
    // Implementar la lógica para agregar datos SCIAN.
  }
  onRadioChange(event: Event): void {
    const target = event.target as HTMLInputElement; // Cast the event target to HTMLInputElement
    this.valorSeleccionado = target.value; // Extract the selected value
  }

  // Method to check if fields should be disabled
  areFieldsDisabled(): boolean {
    
    if(this.radioOpcions[1].label == 'Modificación'){
      return false;

    } else {
      return true;

    }
    // if(this.valorSeleccionado){}

    
    // return this.valorSeleccionado !== 'modificacion'; // Enable fields only if "modificacion" is selected
  }
  claveScianSeleccion(): void {
    const CLAVE_SCIAN = this.scianForm.get('cveSCIAN')?.value;
    this.consulta.getDescripcionScian()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (result) => {
          const SCIAN_DESCRIPCION = result.data[0].descripcion;
          this.scianForm.get('cveSCIANDescripcion')?.setValue(SCIAN_DESCRIPCION);
          this.store.setDescripcionScian(SCIAN_DESCRIPCION);
        }
      })
    this.store.setClaveScian(CLAVE_SCIAN);
  }
  seleccionarEstablecimiento(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  obtenerDatosEstado(): void {
    this.consulta
      .obtenerDatosEstado()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.estadoCatalogo.catalogos = resp as Catalogo[];
      });
  }
  obtenerDatosClave(): void {
    this.consulta
      .obtenerDatosClave()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.claveCatalogo.catalogos = resp as Catalogo[];
      });
  }

  agregarMercanciaGrid(): void {
     if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
 
  abrirDialogoAgregarDatosSCIAN(): void {
    // Implementar la lógica para abrir dialogo agregar datos SCIAN.
  }
  setAvisoDeFuncionamiento(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.store.setAvisoDeFuncionamiento(VALOR);
  }
  setLicenciaSanitaria(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.store.setLicenciaSanitaria(VALOR);
  }
  getMercanciasDatos(evento: Mercancia[]): void {
    this.selectedMercanciasDatos = evento;
  }
  paisOrigenColapsable(): void {
    this.paisOrigen = !this.paisOrigen;
  }

  paisProcedencis_colapsable(): void {
    this.paisProcedencisColapsable = !this.paisProcedencisColapsable;
  }
  setClaveDeDeLosLotes(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.store.setClaveDeLosLotes(VALOR);
  }

  usoEspecificoColapsable(): void {
    this.usoEspecifico = !this.usoEspecifico;
  }

  agregarMercanias(): void {
    const OBJETO_JSON = {
      // clasificaionProductos: this.datosMercanciaForm.get('clasificaionProductos')?.value,
      // especificarProducto: this.datosMercanciaForm.get('especificarProducto')
      //   ?.value,
      // nombreProductoEspecifico: this.datosMercanciaForm.get(
      //   'nombreProductoEspecifico'
      // )?.value,
      // marca: this.datosMercanciaForm.get('marca')?.value,
      // tipoProducto: this.datosMercanciaForm.get('tipoProducto')?.value,
      // fraccionArancelaria: this.datosMercanciaForm.get('fraccionArancelaria')
      //   ?.value,
      // descripcionFraccionArancelaria: this.datosMercanciaForm.get(
      //   'descripcionFraccionArancelaria'
      // )?.value,
      // cantidadUMT: this.datosMercanciaForm.get('cantidadUMT')?.value,
      // umt: this.datosMercanciaForm.get('umt')?.value,
      // cantidadUMC: this.datosMercanciaForm.get('cantidadUMC')?.value,
      // umc: this.datosMercanciaForm.get('umc')?.value,
      // paisDeOrigen: 'paisDeOrigen',
      // paisDeProcedencia: 'paisDeProcedencia',
      // usoEspecifico: 'usoEspecifico',
    };

    // this.store.addMercanciasDatos(OBJETO_JSON);
  }
}

import { AnexoDosEncabezado, AnexoUnoEncabezado, ProveedorClienteTabla } from '../../models/nuevo-programa-industrial.model';
import {
  Catalogo,
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnChanges,Output} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { PROVEEDOR_CLIENTE_TABLA_CONFIG } from '../../constantes/anexo-dos-y-tres.enum';

@Component({
  selector: 'app-proveedor-cliente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './proveedor-cliente.component.html',
  styleUrl: './proveedor-cliente.component.scss',
})
export class ProveedorClienteComponent implements OnChanges{
  @Input() public fraccionTablaDatos!: AnexoUnoEncabezado | AnexoDosEncabezado;
  @Output() public datosActualizadosProveedorCliente = new EventEmitter<ProveedorClienteTabla[]>();
  public formularioProveedorCliente!: FormGroup;

  

  public paisDestinoCatalog: Catalogo[] = [
    {
      id: 1,
      descripcion: 'Mexico',
    },
    {
      id: 2,
      descripcion: 'USA',
    },
  ];

  public proveedorClienteTablsDatos: ProveedorClienteTabla[] = [];

  public proveedorClienteListaSeleccionada: ProveedorClienteTabla[] = [];

  tablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  public readonly PROVEEDOR_CLIENTE_TABLA_CONFIG =
    PROVEEDOR_CLIENTE_TABLA_CONFIG;

  constructor(private fb: FormBuilder,
    private ubicaccion:Location
  ) {
    this.inicializarFormularioProveedorCliente();
  }

  ngOnChanges(): void {
    if(this.fraccionTablaDatos){
      this.formularioProveedorCliente.patchValue({
        descripcionComercial: this.fraccionTablaDatos.encabezadoDescripcionComercial,
      });
    }
  }

     //in NgOnInit using store value of isfromImport or export set fraccionTablaDatos
    //accordingly

  cambioPaisDestino(event: Catalogo): void {
    this.formularioProveedorCliente.patchValue({
      paisDestino: event.id,
    });
  }

  inicializarFormularioProveedorCliente(): void {
    this.formularioProveedorCliente = this.fb.group({
      descripcionComercial: ['Test Complementar', Validators.required],
      paisDestino: [0, Validators.required],
      rfc: ['', Validators.required],
      razonSocialCliente: ['', Validators.required],
    });
    this.formularioProveedorCliente.get('descripcionComercial')?.disable();
  }

  limpar(): void {
    this.formularioProveedorCliente.setValue({
      descripcionComercial: '',
      paisDestino: {id:-1,descripcion:''},
      rfc: '',
      razonSocialCliente: '',
    })
  }

  proveedorClienteSeleccinados(lista: ProveedorClienteTabla[]): void {
    this.proveedorClienteListaSeleccionada = lista;
  }

  aggregar(): void {
    const PROVEEDOR_CLIENTE: ProveedorClienteTabla = {
      fraccion: 2,
      paisDestino: this.obtenerValorPaisDeDestino(
        this.formularioProveedorCliente.get('paisDestino')?.value
      ),
      rfcClinte: this.formularioProveedorCliente.get('rfc')?.value,
      razonSocial:
        this.formularioProveedorCliente.get('razonSocialCliente')?.value,
    };
    this.proveedorClienteTablsDatos.push(PROVEEDOR_CLIENTE);
  }

  obtenerValorPaisDeDestino(id: number): string {
    const PAIS = this.paisDestinoCatalog.find((ele) => ele.id === parseInt(id.toString(),10));
    return PAIS ? PAIS.descripcion : '';
  }

  obtenerValorPaisDeDestinoId(valor:string): number {
    const PAIS = this.paisDestinoCatalog.find((ele) => ele.descripcion === valor);
    return PAIS? PAIS.id : 0;
  }

  elimiar(): void {
    if (this.proveedorClienteListaSeleccionada.length > 0) {
      this.proveedorClienteTablsDatos = this.proveedorClienteTablsDatos.filter(
        (ele) => !this.proveedorClienteListaSeleccionada.includes(ele)
      );
    }
  }
  eidtar(): void {
    if (this.proveedorClienteListaSeleccionada.length > 0) {
      this.formularioProveedorCliente.patchValue({
        paisDestino: this.obtenerValorPaisDeDestinoId(this.proveedorClienteListaSeleccionada[0].paisDestino),
        rfc: this.proveedorClienteListaSeleccionada[0].rfcClinte,
        razonSocialCliente: this.proveedorClienteListaSeleccionada[0].razonSocial,
      });
    }
  }

  regrssarAnnexoI():void{
    this.ubicaccion.back();
    this.datosActualizadosProveedorCliente.emit(this.proveedorClienteTablsDatos);
  }

}

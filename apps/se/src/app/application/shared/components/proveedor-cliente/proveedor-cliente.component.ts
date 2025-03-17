import { ActivatedRoute, Router } from '@angular/router';
import { AnexoUnoEncabezado, ProveedorClienteTabla } from '../../models/se-shared.model';
import {
  Catalogo,
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PROVEEDOR_CLIENTE_TABLA_CONFIG } from '../../enum/anexo-dos-y-tres.enum';

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
export class ProveedorClienteComponent{
  @Input() public fraccionTablaDatos!: AnexoUnoEncabezado;
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

  constructor(private fb: FormBuilder,private router:Router,private activatedRoute: ActivatedRoute) {
    this.inicializarFormularioProveedorCliente();
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
      descripcionComercial: ['', Validators.required, { disabled: true }],
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
    this.datosActualizadosProveedorCliente .emit(this.proveedorClienteTablsDatos);
      this.router.navigate(['../action'], { relativeTo: this.activatedRoute });
  }

}

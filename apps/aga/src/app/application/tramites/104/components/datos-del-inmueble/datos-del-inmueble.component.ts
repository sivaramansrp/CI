import { CatalogoSelectComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MENSAJEDEALERTA } from '@libs/shared/data-access-user/src/core/enums/104/104.enum';
import { TableData } from '@libs/shared/data-access-user/src/core/models/104/model-104';
import destinatarioTableData from '@libs/shared/theme/assets/json/104/table-104.json'
import dropDown from '@libs/shared/theme/assets/json/104/selector-104.json'

@Component({
  selector: 'app-datos-del-inmueble',
  standalone: true,
  imports: [CommonModule, TituloComponent,
    TableComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule],
  templateUrl: './datos-del-inmueble.component.html',
  styleUrl: './datos-del-inmueble.component.css',
})
export class DatosDelInmuebleComponent implements OnInit {

  @Output() cerrarClicado = new EventEmitter();

  fomentoExportacionForm!: FormGroup;

  formularioDireccion!: FormGroup;

  mostrarAlerta: boolean = false;

  mensajeDeAlerta = '';

  public establecimientoHeaderData: string[] = [];

  public establecimientoBodyData: unknown = [];

  destinatarioTableData: TableData = { encabezadoDeTabla: [], cuerpoTabla: [] };

  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.inicializarFormularioTratados();
    this.inicializarFormulario();
    this.destinatarioTableData.encabezadoDeTabla = destinatarioTableData?.encabezadoDeTabla;
    this.destinatarioTableData.cuerpoTabla = destinatarioTableData?.cuerpoTabla;
    this.getEstableCimiento();
    this.fomentoExportacionForm.get('tipoPrograma')?.valueChanges.subscribe(value => {
      if (value === '1') {
        this.mostrarAlerta = true;
        this.mensajeDeAlerta = MENSAJEDEALERTA.ADJUNTAR;
      }
    });
  }



  inicializarFormularioTratados(): void {
    this.fomentoExportacionForm = this.fb.group({
      tipoPrograma: ['', Validators.required],
      folioAutorizacion: ['', Validators.required],
    });
  }

  configuracionesDropdown = [
    { catalogos: dropDown.tipoPrograma },
    { catalogos: dropDown.folioAutorizacion },
  ];


  private getEstableCimiento(): void {
    this.establecimientoHeaderData = this.destinatarioTableData?.encabezadoDeTabla;
    this.establecimientoBodyData = this.destinatarioTableData?.cuerpoTabla;
  }

  cerrarModal(): void {
    this.cerrarClicado.emit();
    this.mostrarAlerta = false;
  }

  private inicializarFormulario(): void {
    this.formularioDireccion = this.fb.group({
      calle: ['', Validators.required],
      numeroExterior: ['', [Validators.required, Validators.pattern('^[0-9a-zA-Z]+$')]],
      numeroInterior: ['', Validators.pattern('^[0-9a-zA-Z]*$')], // No es obligatorio
      pais: ['', Validators.required],
      entidadFederativa: ['', Validators.required],
      municipioDelegacion: ['', Validators.required],
      colonia: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    });
  }
}

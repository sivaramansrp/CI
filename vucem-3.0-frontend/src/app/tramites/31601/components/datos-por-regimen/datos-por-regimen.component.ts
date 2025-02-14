import { Component, OnInit } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import regimenTable from '../../../../../assets/json/31601/datos-por-regimen.json'
import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-datos-por-regimen',
  templateUrl: './datos-por-regimen.component.html',
  styleUrl: './datos-por-regimen.component.scss',
  standalone: true,
  imports: [TituloComponent,
            CatalogoSelectComponent,
            CommonModule,
            ReactiveFormsModule,
            TableComponent],
})
export class DatosPorRegimenComponent implements OnInit {

  public bimestreCatalog!: Catalogo[];
  public regimenForm!: FormGroup;
  public getRegimenTableData = regimenTable;
  public regimenTableBodyData: unknown = [];
  public regimenTableHeaderData: string[] = [];



  constructor(private fb: FormBuilder,
              private validacionesService: ValidacionesFormularioService) 
  {
    this.crearRegimenForm();
  }

  ngOnInit() {
    this.establecervalorcontrolformulario();
    this.regimenTabData();
  }

  /**
   * Metodo para saber si el campo del formulario es valido.
   * @param field El nombre del campo del formulario que se va a validar.
   * @returns {boolean | null} : Regresa un booleano si el campo es valido o no o puede regresar null si no se ha tocado el campo.
   */
    isValid(field: string): boolean | null {
      return this.validacionesService.isValid(this.regimenForm, field);
    }

  public crearRegimenForm() {
    this.regimenForm = this.fb.group({
      importaciones: [''],
      infraestructura: [''],
      ultimosMeses: [''],
      operacionesmeses: [''],
      valor: [''],
      transferencias: [''],
      transferenciasVir: [''],
      retornos: [''],
      retornosSe: [''],
      constancias: [''],
      constanciasDe: [''],
      total: [''],
      totals: [''],
      empleadosPropios: [''],
      numeroEmpleados: [''],
      bimestre: [''],
      proveedorCumplimiento: [''],
      declaracionISR: [''],
      cancelacion: [''],
      cumplimientoReglas: [''],
      recintoFiscalizado: [''],
      recintoEstrategico: [''],
      cumplimientoLineamientos: ['']

    });
  }

  public establecervalorcontrolformulario() {
    this.regimenForm.get('importaciones')?.setValue('Yes');
    this.regimenForm.get('infraestructura')?.setValue('Yes');
    this.regimenForm.get('ultimosMeses')?.setValue('Yes');
    this.regimenForm.get('operacionesmeses')?.setValue('Yes');
    this.regimenForm.get('empleadosPropios')?.setValue('Yes');
    this.regimenForm.get('numeroEmpleados')?.setValue('Yes');
    this.regimenForm.get('proveedorCumplimiento')?.setValue('Yes');
    this.regimenForm.get('declaracionISR')?.setValue('Yes');
    this.regimenForm.get('cancelacion')?.setValue('Yes');
    this.regimenForm.get('cumplimientoReglas')?.setValue('Yes');
    this.regimenForm.get('recintoFiscalizado')?.setValue('Yes');
    this.regimenForm.get('recintoEstrategico')?.setValue('Yes');
    this.regimenForm.get('cumplimientoLineamientos')?.setValue('Yes');
  }

  public regimenTabData() {
    this.regimenTableHeaderData = this.getRegimenTableData.tableHeader;
    this.regimenTableBodyData = this.getRegimenTableData.tableBody;
  }

  public tipoSolicitudSeleccion() {
    
  }

}

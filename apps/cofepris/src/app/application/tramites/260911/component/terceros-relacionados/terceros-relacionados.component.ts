import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { TEXTOS } from 'libs/shared/data-access-user/src/tramites/constantes/octava-temporal.enum';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
import { CapturarColumns } from '../../models/fabricante-datos.model';
import { ConfiguracionColumna, SeccionLibQuery, SeccionLibState, SeccionLibStore, TablaSeleccion } from '@ng-mf/data-access-user';
import { FabricanteService } from '../../services/fabricante/fabricante.service';
import { Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, AlertComponent, TablaDinamicaComponent, TableComponent],
  providers: [FabricanteService],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit {
  tercerosRelacionadosForm!: FormGroup;
  TEXTOS = TEXTOS;
  facturas: CapturarColumns[] = [];
  TablaSeleccion = TablaSeleccion;
  constructor(private fb: FormBuilder, private fabricanteService :FabricanteService ) {}

  ngOnInit(): void {
   this.obtenerFabricanteTableIData();
  }
datosTabla!: CapturarColumns[];
private destroyed$ = new Subject<void>();

obtenerFabricanteTableIData(): void {
  this.fabricanteService.obtenerInformaciónDeTablaDeFabricantes().pipe(
    takeUntil(this.destroyed$)
  ).subscribe(
    (data:CapturarColumns[]) => {
      this.datosTabla = data;
      console.log("datosTable",this.datosTabla);
    }
  );
}


  tableColumns: ConfiguracionColumna<CapturarColumns>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (fila) => fila.Nombre_denominación_o_razón_social,
      orden: 1
    },
    {
      encabezado: 'R.F.C.',
      clave: (fila) => fila.r_f_c,
      orden: 2,
    },
    {
      encabezado: 'CURP',
      clave: (fila) => fila.curp,
      orden: 3,
    },
    {
      encabezado: 'Teléfono',
      clave: (fila) => fila.teléfono,
      orden: 4,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (fila) => fila.correo_electrónico,
      orden: 5,
    },
    {
      encabezado: 'Calle',
      clave: (fila) => fila.calle,
      orden: 6,
    },
  ];
}

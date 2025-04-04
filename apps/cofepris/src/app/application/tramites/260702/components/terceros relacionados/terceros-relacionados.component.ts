/* eslint-disable sort-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { TEXTOS } from '../../constants/constantes';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { Destinatario } from '../../models/destinatario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Catalogo, CatalogosSelect } from '@ng-mf/data-access-user'; // Adjusted the path to the correct location
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';


@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule,TercerosRelacionadosComponent,AlertComponent,TituloComponent,TablaDinamicaComponent,ReactiveFormsModule,CatalogoSelectComponent],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.css',
})
export class TercerosrelacionadosComponent implements OnInit,OnDestroy {
   TEXTOS = TEXTOS;
   destinatarioForm!: FormGroup;
     private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
   
     destinatarioSeleccionTabla = TablaSeleccion.CHECKBOX;
      selectedDestinatario: Destinatario[] = [];
      esFormularioVisible = true;

      constructor(private fb: FormBuilder,private registrarsolicitudmcp: RegistrarSolicitudMcpService ) {
        
      }
       public paisData: CatalogosSelect = {
          labelNombre: 'Pais',
          required: true,
          primerOpcion: 'Selecciona un medio de transporte',
          catalogos: [],
        };
        tableData: Destinatario[] = [];
   selectedRows: Set<number> = new Set();

   destinatarioConfiguracionTabla: ConfiguracionColumna<Destinatario>[] = [
       {
         encabezado: 'Nombre/denominación o razón social',
         clave: (fila) => fila.agregarDestinatario.nombre,
         orden: 1,
       },
       {
         encabezado: 'R.F.C.',
         clave:  (fila) => fila.agregarDestinatario.rfc,
         orden: 2,
       },
       {
         encabezado: 'CURP',
         clave:  (fila) => fila.agregarDestinatario.curp,
         orden: 3,
       },
       {
         encabezado: 'Teléfono',
         clave:  (fila) => fila.agregarDestinatario.telefono,
         orden: 4,
       },
       {
         encabezado: 'Correo electrónico',
         clave:  (fila) => fila.agregarDestinatario.correoElectronico,
         orden: 5,
       },
       {
         encabezado: 'Calle',
         clave:  (fila) => fila.agregarDestinatario.calle,
         orden: 6,
       },
       {
         encabezado: 'Número exterior',
         clave:  (fila) => fila.agregarDestinatario.numeroExterior,
         orden: 7,
       },
       {
         encabezado: 'Número interior',
         clave:  (fila) => fila.agregarDestinatario.numeroInterior,
         orden: 8,
       },
       {
         encabezado: 'País',
         clave:  (fila) => fila.agregarDestinatario.pais,
         orden: 9,
       },
       {
         encabezado: 'Colonia',
         clave:  (fila) => fila.agregarDestinatario.colonia,
         orden: 10,
       },
       {
         encabezado: 'Municipio o alcaldía',
         clave:  (fila) => fila.agregarDestinatario.municipio,
         orden: 11,
       },
       {
         encabezado: 'Localidad',
         clave:  (fila) => fila.agregarDestinatario.localidad,
         orden: 12,
       },
       {
         encabezado: 'Estado',
         clave:  (fila) => fila.agregarDestinatario.estado,
         orden: 13,
       },
       {
         encabezado: 'Estado',
         clave:  (fila) => fila.agregarDestinatario.estado2,
         orden: 14,
       },
       {
         encabezado: 'Código postal',
         clave:  (fila) => fila.agregarDestinatario.codigo,
         orden: 15,
       },
     ];
      ngOnInit(): void {
      this.crearFormTransporte();
      this.getPaisData();
    }
     crearFormTransporte(): void {
      this.destinatarioForm = this.fb.group({
        agregarDestinatario: this.fb.group({
          nombre: ['', Validators.required],
          rfc: [''],
          curp: [''],
          telefono: [''],
          correoElectronico: [''],
          calle: [''],
          numeroExterior: [''],
          numeroInterior: [''],
          pais: [''],
          colonia: [''],
          municipio: [''],
          localidad: [''],
          estado: [''],
          estado2: [''],
          codigo: [''],
          domicilio: [''],
          lada: [''],
          primerApellido: [''],
          segundoApellido: [''],
          denominacion: ['']
        })
      });
    }

   

    getPaisData(){
      this.registrarsolicitudmcp.getPaisData()
           .pipe(takeUntil(this.destroyed$))
           .subscribe((data: Catalogo[]) => {
             this.paisData.catalogos = data as Catalogo[];
           });
    }

     get selectedTipoPersona() {
      return this.agregarDestinatario.get('tipoPersona')?.value;
    }
    get agregarDestinatario(): FormGroup {
      return this.destinatarioForm.get('agregarDestinatario') as FormGroup;
    }
  
    onGuardar() {
      console.log("hi sravani")
      this.esFormularioVisible = false;
      const formData = { ...this.destinatarioForm.value };
      console.log(formData);
      formData.agregarDestinatario.pais = this.paisData.catalogos.find(
        (item: Catalogo) => String(item.id) === String(formData.agregarDestinatario.pais),
      )?.descripcion;
  
      console.log('Form Data:', formData); // Log the form data before adding to tableData
      console.log('Form Data Before Push:', JSON.stringify(formData, null, 2)); // Log the form data before adding to tableData
      this.tableData.push(formData);
      console.log('Table Data After Push:', JSON.stringify(this.tableData, null, 2)); // Log the table data after adding the form data
      console.log('Table Data:', this.tableData); // Log the table data after adding the form data
      console.log('Table Data Structure:', JSON.stringify(this.tableData, null, 2)); // Log the full structure of tableData
  }
  
    
    onSelectedRowsChange(event: Event): void {
      const selectedRows = (event as CustomEvent).detail as Destinatario[]; // Extract Destinatario[] from the event
      this.selectedRows = new Set(selectedRows.map((row) => row.id)); // Update selected rows
      this.esFormularioVisible = false;
    }
  

    ngOnDestroy(): void {
      this.destroyed$.next(true);
      this.destroyed$.complete();
    }
   
  
}

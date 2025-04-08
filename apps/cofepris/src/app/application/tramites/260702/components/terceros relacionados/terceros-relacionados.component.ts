/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable sort-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { TEXTOS } from '../../constants/constantes.enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { Destinatario } from '../../models/destinatario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Catalogo, CatalogosSelect } from '@ng-mf/data-access-user'; // Adjusted the path to the correct location
import { ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { Solicitud260702Query } from '../../estados/tramites260702.query';
import { Solicitud260702State, Solicitud260702Store } from '../../estados/tramites260702.store';


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
     selectedRows: Set<number> = new Set();
     selectedRow: any = null;
     agregarDestinatarioState!: Solicitud260702State;
     destinatarioSeleccionTabla = TablaSeleccion.CHECKBOX;
      selectedDestinatario: Destinatario[] = [];
      esFormularioVisible = false;

      constructor(private fb: FormBuilder,
        private registrarsolicitudmcp: RegistrarSolicitudMcpService,
        private solicitud260702Store: Solicitud260702Store,
        private solicitud260702Query: Solicitud260702Query) 
         {
        this.crearFormTransporte();
      }
       public paisData: CatalogosSelect = {
          labelNombre: 'Pais',
          required: true,
          primerOpcion: 'Selecciona un medio de transporte',
          catalogos: [],
        };
        tableData: Destinatario[] = [];
  //  selectedRows: Set<number> = new Set();

   destinatarioConfiguracionTabla: ConfiguracionColumna<Destinatario>[] = [
       {
         encabezado: 'Nombre/denominación o razón social',
         clave: (fila) => fila?.nombre || 'N/A', // Access `nombre` directly
         orden: 1,
       },
       {
         encabezado: 'R.F.C.',
         clave:  (fila) => fila?.rfc || '---', // Access `rfc` directly
         orden: 2,
       },
       {
         encabezado: 'CURP',
         clave:  (fila) => fila?.curp || '---', // Access `curp` directly
         orden: 3,
       },
       {
         encabezado: 'Teléfono',
         clave:  (fila) => fila?.telefono || 'N/A', // Access `telefono` directly
         orden: 4,
       },
       {
         encabezado: 'Correo electrónico',
         clave:  (fila) => fila?.correoElectronico || 'N/A', // Access `correoElectronico` directly
         orden: 5,
       },
       {
         encabezado: 'Calle',
         clave:  (fila) => fila?.calle || 'N/A', // Access `calle` directly
         orden: 6,
       },
       {
         encabezado: 'Número exterior',
         clave:  (fila) => fila?.numeroExterior || 'N/A', // Access `numeroExterior` directly
         orden: 7,
       },
       {
         encabezado: 'Número interior',
         clave:  (fila) => fila?.numeroInterior || 'N/A', // Access `numeroInterior` directly
         orden: 8,
       },
       {
         encabezado: 'País',
         clave:  (fila) => fila?.pais || 'N/A', // Access `pais` directly
         orden: 9,
       },
       {
         encabezado: 'Colonia',
         clave:  (fila) => fila?.colonia || '---', // Access `colonia` directly
         orden: 10,
       },
       {
         encabezado: 'Municipio o alcaldía',
         clave:  (fila) => fila?.municipio || '---', // Access `municipio` directly
         orden: 11,
       },
       {
         encabezado: 'Localidad',
         clave:  (fila) => fila?.localidad || '---', // Access `localidad` directly
         orden: 12,
       },
       {
         encabezado: 'Estado',
         clave:  (fila) => fila?.estado || '---', // Access `estado` directly
         orden: 13,
       },
       {
         encabezado: 'Estado',
         clave:  (fila) => fila?.estado2 || '---', // Access `estado2` directly
         orden: 14,
       },
       {
         encabezado: 'Código postal',
         clave:  (fila) => fila?.codigopostal || 'N/A', // Access `codigo` directly
         orden: 15,
       },
     ];
     crearFormTransporte():void {
      this.destinatarioForm = this.fb.group({
        agregarDestinatario: this.fb.group({
          tipoPersona: [this.agregarDestinatarioState?.tipoPersona, Validators.required]
        }),
        datosPersonales: this.fb.group({
          nombre: [this.agregarDestinatarioState?.nombre, Validators.required],
          primerApellido: [this.agregarDestinatarioState?.primerApellido, Validators.required],
          segundoApellido: [this.agregarDestinatarioState?.segundoApellido, Validators.required],
          denominacion: [this.agregarDestinatarioState?.denominacion, Validators.required],
          pais: [this.agregarDestinatarioState?.pais, Validators.required],
          domicilio: [this.agregarDestinatarioState?.domicilio, Validators.required],
          estado:[this.agregarDestinatarioState?.estado, Validators.required],
          codigopostal:[this.agregarDestinatarioState?.codigopostal, Validators.required],
          calle:[this.agregarDestinatarioState?.calle, Validators.required],
          numeroExterior:[this.agregarDestinatarioState?.numeroExterior, Validators.required],
          numeroInterior:[this.agregarDestinatarioState?.numeroInterior, Validators.required],
          lada: [this.agregarDestinatarioState?.lada],
          telefono: [this.agregarDestinatarioState?.telefono],
          correoElectronico: [this.agregarDestinatarioState?.correoElectronico]
        })
      });
    }

    ngOnInit(): void {
      this.solicitud260702Query.selectSolicitud$
            .pipe(
              takeUntil(this.destroyed$),
              map((seccionState: any) => {
                this.agregarDestinatarioState = seccionState;
              })
            )
            .subscribe();
      
      this.crearFormTransporte();
      this.getPaisData();
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
      const formData = this.destinatarioForm.value;
      console.log('Form Data:', formData);

      if (formData.agregarDestinatario) {
        const destinatario = {
          ...formData.agregarDestinatario,
          ...formData.datosPersonales,// Merge nested objects into a flat structure
          pais: this.getPaisName(formData.datosPersonales.pais) // Map the `pais` id to its description

        };

        console.log('Mapped Destinatario:', destinatario);

        // Push the mapped data to the table
        this.tableData.push(destinatario);
      } else {
        console.error('agregarDestinatario is undefined in formData:', formData);
      }

      console.log('Table Data:', JSON.stringify(this.tableData, null, 2)); // Log the table data
      this.destinatarioForm.reset();
      
    }
    private getPaisName(paisId: string): string {
      const pais = this.paisData.catalogos.find((catalogo) => catalogo.id === Number(paisId));
      return pais ? pais.descripcion : 'N/A'; // Return the description or 'N/A' if not found
    }
    onSelectedRowsChange(selectedRows: Destinatario[]): void {
      this.selectedRows = new Set(selectedRows.map((row) => row.id)); // Update selected rows
      this.esFormularioVisible = false;
    }
    eliminarMercancias(): void {
      if (this.selectedRows.size > 0) {
        // Filter out the rows that are not selected
        this.tableData = this.tableData.filter((row) => !this.selectedRows.has(row.id));
        // Clear the selected rows after deletion
        this.selectedRows.clear();
        console.log('Selected rows removed. Updated table data:', this.tableData);
      } else {
        console.warn('No rows selected for deletion.');
      }
    }
  
   openModificarMercancias(): void {
  if (this.selectedRows.size === 1) {
    // Get the selected row ID
    const selectedId = Array.from(this.selectedRows)[0];

    // Find the corresponding row data in tableData
    const selectedRowData = this.tableData.find((row) => row.id === selectedId);

    if (selectedRowData) {
      // Populate the form with the selected row's data
      this.destinatarioForm.patchValue({
        agregarDestinatario: {
          tipoPersona: selectedRowData.tipoPersona,
        },
        datosPersonales: {
          nombre: selectedRowData.nombre,
          primerApellido: selectedRowData.primerApellido,
          segundoApellido: selectedRowData.segundoApellido,
          denominacion: selectedRowData.denominacion,
          pais: selectedRowData.pais,
          domicilio: selectedRowData.domicilio,
          estado: selectedRowData.estado,
          codigopostal: selectedRowData.codigopostal,
          calle: selectedRowData.calle,
          numeroExterior: selectedRowData.numeroExterior,
          numeroInterior: selectedRowData.numeroInterior,
          lada: selectedRowData.lada,
          telefono: selectedRowData.telefono,
          correoElectronico: selectedRowData.correoElectronico,
        },
      });

      // Show the form for modification
      this.esFormularioVisible = true;
    } else {
      console.error('Selected row data not found.');
    }
  } else {
    console.warn('Please select exactly one row to modify.');
  }
}
agregarMercancias(): void {
  this.esFormularioVisible = true; // Show the form
  this.destinatarioForm.reset(); // Reset the form for new data
}
cancelarFormulario(): void {
  this.esFormularioVisible = false; // Hide the form
}
onConfirmarEliminacion(): void {
  this.eliminarMercancias(); // Perform deletion logic

  // Get the modal element
  const modalElement = document.getElementById('datoseliminadosModal');

  // Check if the modal element exists
  if (modalElement) {
    const datosEliminadosModal = new Modal(modalElement);
    datosEliminadosModal.show();
  } else {
    console.error('Modal element with ID "datoseliminadosModal" not found.');
  }
}
limpiarFormulario(){
  this.destinatarioForm.reset();
}



setValoresStore(
  form: FormGroup,
  campo: string,
  metodoNombre: keyof Solicitud260702Store
): void {
  const VALOR = form.get(campo)?.value;
  (this.solicitud260702Store[metodoNombre] as (value: any) => void)(VALOR);
}


    ngOnDestroy(): void {
      this.destroyed$.next(true);
      this.destroyed$.complete();
    }
   
  
}

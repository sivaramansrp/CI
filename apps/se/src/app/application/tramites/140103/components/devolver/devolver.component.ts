import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { Facturas } from 'libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { Facturase } from 'libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import facturasdata from 'libs/shared/theme/assets/json/140103/fracturastable.json'
import { Solicitud140103State, Tramite140103Store } from '../../../../estados/tramites/tramite140103.store';
import { map, Subject, takeUntil } from 'rxjs';
import { Tramite140103Query } from '../../../../estados/queries/tramite140103.query';
/**
 * Componente para gestionar el proceso de devolución de facturas.
 * Este componente utiliza un formulario reactivo para capturar y mostrar información relacionada con
 * la devolución de facturas, incluyendo datos como el folio, la cantidad y el saldo disponible.
 *
 * @component
 * @example
 * <app-devolver></app-devolver>
 * 
 * @imports
 * - `TituloComponent`: Componente que muestra un título.
 * - `TablaDinamicaComponent`: Componente que gestiona la visualización de datos en una tabla dinámica.
 * - `FormsModule`: Módulo necesario para trabajar con formularios basados en plantillas.
 * - `ReactiveFormsModule`: Módulo necesario para trabajar con formularios reactivos en Angular.
 */
interface Factura {
  numeroDeFactura: string;
  importeInicial: string;
  saldoaDevolver?: string; // This field is optional since it's missing in some cases (like `facturase`)
}

@Component({
  selector: 'app-devolver',
  standalone: true,
  imports: [
    TituloComponent,
    TablaDinamicaComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './devolver.component.html',
  styleUrls: ['./devolver.component.scss']
})
export class DevolverComponent implements OnInit, OnDestroy {

  /**
   * Lista de facturas cargadas desde un archivo JSON, que contiene información relevante
   * sobre las facturas y su estado de devolución.
   */
  facturas: Facturas[] = facturasdata.facturas;

  /**
   * Lista de facturas adicionales que se utilizan en el proceso de cancelación.
   */
  facturase: Facturase[] = facturasdata.facturase;
  
  /**
   * Configuración de las columnas para mostrar las facturas en una tabla dinámica.
   * Contiene los encabezados y las claves para acceder a los datos de las facturas.
   */
  facturasDatas: ConfiguracionColumna<Factura>[] = [
    { encabezado: 'Numero de Factura', clave: (item: Factura) => item.numeroDeFactura, orden: 1 },
    { encabezado: 'Importe Inicial', clave: (item: Factura) => item.importeInicial, orden: 2 },
    { encabezado: 'Saldo a Devolver', clave: (item: Factura) => item.saldoaDevolver, orden: 3 }
  ];

  /**
   * Configuración de las columnas para mostrar las facturas principales en una tabla.
   * Esta configuración contiene solo los datos relevantes para mostrar en la tabla.
   */
  facturasData: ConfiguracionColumna<Factura>[] = [
    { encabezado: 'Numero de Factura', clave: (item: Factura) => item.numeroDeFactura, orden: 1 },
    { encabezado: 'Importe Inicial', clave: (item: Factura) => item.importeInicial, orden: 2 }
  ];

  /**
   * Enum que gestiona las opciones de selección de la tabla.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Formulario reactivo que captura los datos necesarios para realizar la devolución de facturas.
   * Contiene un grupo de controles para el folio, disponible, cantidad, total y cuadrados.
   */
  DevolverForm!: FormGroup;
    public solicitudState!: Solicitud140103State;
    private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente. Inicializa el formulario reactivo utilizando el FormBuilder.
   * 
   * @param fb - FormBuilder utilizado para crear y gestionar el formulario reactivo.
   */
  constructor(private fb: FormBuilder,
      private tramite140103Store: Tramite140103Store,
      private tramite140103Query: Tramite140103Query
    ) { }

    ngOnInit(): void {
      this.inicializarFormulario();
      
      // Load your catalog data here if necessary (e.g., from an API or JSON file)
    }
  /**
   * Método que se ejecuta al inicializar el componente. Este método crea el formulario reactivo
   * y configura los controles necesarios con las validaciones requeridas.
   */
  inicializarFormulario(): void {
     this.tramite140103Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState as Solicitud140103State;
          })
        )
        .subscribe((data) => {
        });
    // Inicializa el formulario con los controles necesarios y las validaciones
    this.DevolverForm = this.fb.group({     
        folio: [''],
        disponible: [''],
        cantidad: [this.solicitudState.cantidad, Validators.required], // Campo obligatorio para la cantidad a devolver
        total: [''],
        cuadrados: [''],
     
    });

    // Llama al método para actualizar el campo 'monto' con los valores predeterminados
    this.updateformfied();
  }
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite140103Store): void {
    const valor = form.get(campo)?.value;
    (this.tramite140103Store[metodoNombre] as (value: any) => void)(valor);
  }
  /**
   * Método que actualiza los valores del formulario con datos predeterminados.
   * También deshabilita los campos para que los usuarios no puedan modificarlos.
   */
  updateformfied(): void {
    this.DevolverForm.get('folio')?.setValue('4MX216520');
    this.DevolverForm.get('disponible')?.setValue('12');
    this.DevolverForm.get('total')?.setValue('12');
    this.DevolverForm.get('cuadrados')?.setValue('133');

    // Deshabilita los campos para que no se puedan editar
    this.DevolverForm.get('folio')?.disable();
    this.DevolverForm.get('disponible')?.disable();
    this.DevolverForm.get('total')?.disable();
    this.DevolverForm.get('cuadrados')?.disable();
  }
  
 


  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}

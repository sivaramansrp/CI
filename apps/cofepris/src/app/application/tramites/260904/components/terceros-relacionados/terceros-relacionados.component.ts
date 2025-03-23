import { AlertComponent, ConfiguracionColumna, TablaSeleccion } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TablaDinamicaComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { CapturarColumns } from '../../modelos/fabricante-datos.model';
import { CommonModule } from '@angular/common';
import { DestinatarioCapturarColumns } from '../../modelos/destinatario-datos.model';
import { TEXTOS } from '@libs/shared/data-access-user/src/tramites/constantes/octava-temporal.enum';
import { TercerosRelacionadosService } from '../../services/terceros-relacionados/terceros-relacionados.service';


/**
 * @component
 * @name TercerosRelacionadosComponent
 * @description Este componente gestiona y muestra datos relacionados con "terceros relacionados",
 * incluyendo fabricantes y destinatarios. Utiliza tablas dinámicas para renderizar los datos.
 * 
 * @selector app-terceros-relacionados
 * @standalone true
 * @templateUrl ./terceros-relacionados.component.html
 * @styleUrl ./terceros-relacionados.component.scss
 * @providers [TercerosRelacionadosService]
 * @imports [CommonModule, TituloComponent, ReactiveFormsModule, AlertComponent, TablaDinamicaComponent, TableComponent]
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, AlertComponent, TablaDinamicaComponent, TableComponent],
  providers: [TercerosRelacionadosService],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} tercerosRelacionadosForm - Grupo de formulario reactivo para gestionar los controles del formulario.
   */
  tercerosRelacionadosForm!: FormGroup;

  /**
   * @property {typeof TEXTOS} TEXTOS - Contiene constantes de texto utilizadas en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * @property {typeof TablaSeleccion} TablaSeleccion - Configuración para la selección de tablas.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * @property {CapturarColumns[]} fabricantedatosTabla - Almacena los datos de la tabla de fabricantes.
   */
  fabricantedatosTabla!: CapturarColumns[];

  /**
   * @property {DestinatarioCapturarColumns[]} destinatarioDatosTabla - Almacena los datos de la tabla de destinatarios.
   */
  destinatarioDatosTabla!: DestinatarioCapturarColumns[];

  /**
   * @property {Subject<void>} destroyed$ - Se utiliza para gestionar el ciclo de vida de las suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * @constructor
   * @param {FormBuilder} fb - FormBuilder para crear formularios reactivos.
   * @param {TercerosRelacionadosService} fabricanteService - Servicio para obtener datos relacionados con "terceros relacionados".
   */
  constructor(private fb: FormBuilder, private fabricanteService: TercerosRelacionadosService) {
    //
  }

  /**
   * @method ngOnInit
   * @description Hook del ciclo de vida que inicializa el componente. Obtiene datos para las tablas de fabricantes y destinatarios.
   */
  ngOnInit(): void {
    this.obtenerFabricanteTableIData();
    this.obtenerDestinatarioTableIData();
  }

  /**
   * @method obtenerFabricanteTableIData
   * @description Obtiene datos para la tabla de fabricantes desde el servicio.
   */
  obtenerFabricanteTableIData(): void {
    this.fabricanteService.obtenerInformaciónDeTablaDeFabricantes().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data: CapturarColumns[]) => {
        this.fabricantedatosTabla = data;
      }
    );
  }

  /**
   * @method obtenerDestinatarioTableIData
   * @description Obtiene datos para la tabla de destinatarios desde el servicio.
   */
  obtenerDestinatarioTableIData(): void {
    this.fabricanteService.obtenerInformaciónDeTablaDeDestinatraios().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data: DestinatarioCapturarColumns[]) => {
        this.destinatarioDatosTabla = data;
      }
    );
  }

  /**
   * @property {ConfiguracionColumna<CapturarColumns>[]} fabricanteTableColumns - Configuración para las columnas de la tabla de fabricantes.
   */
  fabricanteTableColumns: ConfiguracionColumna<CapturarColumns>[] = [
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
    {
      encabezado: 'Número exterior',
      clave: (fila) => fila.número_exterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (fila) => fila.número_interior,
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (fila) => fila.País,
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (fila) => fila.Colonia,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (fila) => fila.Municipio_o_alcaldía,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (fila) => fila.Localidad,
      orden: 12,
    },
    {
      encabezado: 'Entidad federativa',
      clave: (fila) => fila.Entidad_federativa,
      orden: 13,
    },
    {
      encabezado: 'Estado/localidad',
      clave: (fila) => fila.Estado_localidad,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (fila) => fila.Código_postal,
      orden: 15,
    },
    {
      encabezado: 'Colonia o equivalente',
      clave: (fila) => fila.Colonia_o_equivalente,
      orden: 16,
    },
  ];

  /**
   * @property {ConfiguracionColumna<DestinatarioCapturarColumns>[]} destinatarioTableColumns - Configuración para las columnas de la tabla de destinatarios.
   */
  destinatarioTableColumns: ConfiguracionColumna<DestinatarioCapturarColumns>[] = [
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
    {
      encabezado: 'Número exterior',
      clave: (fila) => fila.número_exterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (fila) => fila.número_interior,
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (fila) => fila.País,
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (fila) => fila.Colonia,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (fila) => fila.Municipio_o_alcaldía,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (fila) => fila.Localidad,
      orden: 12,
    },
    {
      encabezado: 'Entidad federativa',
      clave: (fila) => fila.Entidad_federativa,
      orden: 13,
    },
    {
      encabezado: 'Estado/localidad',
      clave: (fila) => fila.Estado_localidad,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (fila) => fila.Código_postal,
      orden: 15,
    },
    {
      encabezado: 'Colonia o equivalente',
      clave: (fila) => fila.Colonia_o_equivalente,
      orden: 16,
    },
  ];

  /**
   * @method ngOnDestroy
   * @description Hook del ciclo de vida que limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
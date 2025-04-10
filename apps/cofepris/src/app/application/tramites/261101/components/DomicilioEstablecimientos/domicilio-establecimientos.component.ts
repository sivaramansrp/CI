import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DatosProcedureQuery } from '../../estados/datos-solicitude.query';
import { DatosProcedureStore } from '../../estados/datos-solicitude.store';
import { DatosSolicitudService } from '../../../261101/services/dato-solicitude.service'
import { Domicilio } from '../../modelos/domicilio-establecimientos.model';


import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src'
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-domicilio-establecimientos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TablaDinamicaComponent],
  templateUrl: './domicilio-establecimientos.component.html',
  styleUrl: './domicilio-establecimientos.component.css',
})
export class DomicilioEstablecimientosComponent implements OnInit {
  /**
 * Formulario reactivo para datos preoperativos.
 */
  domicilioEstablecimiento!: FormGroup;
  /**
* Formulario reactivo para datos preoperativos.
*/
  AvisodeFuncionamiento!: FormGroup;
  /** Enum para el tipo de selección de tabla */
  public TablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /** Array para almacenar la respuesta de permisos cancelar */
  Domicilios: Domicilio[] = [];

  /** Subject para notificar la destrucción del componente */
  private destroy$ = new Subject<void>();
  /** Configuración para las columnas de la tabla */
  configuracionTabla: ConfiguracionColumna<Domicilio>[] = [
    { encabezado: 'Clave S.C.I.A.Ν.', clave: (item: Domicilio) => item.id, orden: 1 },
    { encabezado: 'Descripcion del S.C.I.A.N. ', clave: (item: Domicilio) => item.Descripcion, orden: 2 },

  ];



  /**
   * Constructor para SolicitanteComponent.
   * 
   * @param fb - Una instancia de FormBuilder utilizada para crear y gestionar formularios.
   */
  constructor(private fb: FormBuilder,
    private DatosSolicitudService: DatosSolicitudService,
    private store: DatosProcedureStore,
    private query: DatosProcedureQuery,) {
    this.establecerdomicilioEstablecimiento();
  }

  /**
   * Gancho de ciclo de vida que se llama después de que se inicializan las propiedades enlazadas a datos de una directiva.
   * Inicializa el componente configurando los valores del formulario.
   * 
   */
  ngOnInit(): void {
    this.domicilioEstablecimientos();
    this.establecerValoresDeFormulario();
    this.AvisodeFuncionamientomiento();
    this.query.selectProrroga$?.pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log('data', data);
        this.domicilioEstablecimiento?.patchValue({
          codigo: data.prorrogaData.Codigo,
          estado: data.prorrogaData.Estado,
          municipio: data.prorrogaData.Municipio,
          localidad: data.prorrogaData.Localidad,
          colonia: data.prorrogaData.Colonia,
          calle: data.prorrogaData.Calle,
          Correo: data.prorrogaData.Correo,
          sanitario: data.prorrogaData.Sanitario,
          lada: data.prorrogaData.Lada,
          telefono: data.prorrogaData.Telefono
        });
        this.AvisodeFuncionamiento?.patchValue({
          codfuncionamientoigo: data.prorrogaData.Funcionamiento,
          licencia:data.prorrogaData.Licencia,
        })
      });

  }

  /**
   * Cargar datos de domicilioEstablecimiento
   */
  domicilioEstablecimientos(): void {
    this.DatosSolicitudService.getDomicilioData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.Domicilios = response;
      });
  }
  /**
 * Inicializa el domicilioEstablecimiento con un conjunto de controles de formulario.
 * Cada control se inicializa con un valor de cadena vacío y está deshabilitado.
 * Los controles del formulario incluyen:
 */
  public establecerdomicilioEstablecimiento(): void {
    this.domicilioEstablecimiento = this.fb.group({
      codigo: [{ value: '', disabled: false }],
      estado: [{ value: '', disabled: false }],
      municipio: [{ value: '', disabled: false }],
      localidad: [{ value: '', disabled: false }],
      colonia: [{ value: '', disabled: false }],
      calle: [{ value: '', disabled: false }],
      Correo: [{ value: '', disabled: false }],
      sanitario: [{ value: '', disabled: false }],
      lada: [{ value: '', disabled: false }],
      telefono: [{ value: '', disabled: false }]
    });
  }
  public AvisodeFuncionamientomiento(): void {
    this.AvisodeFuncionamiento = this.fb.group({
      funcionamiento: [{ value: '', disabled: false }],
      licencia: [{ value: '', disabled: false }],
      Regimen: [{ value: '', disabled: false }],
    });
  }

  /**
   * Establece valores predeterminados para los campos del formulario en el domicilioEstablecimiento.
   * 
   * Este metodo asigna valores predefinidos a los siguientes controles del formulario:
   * - 'rfc': Establece el valor a 'AALM87326'.
   * - 'denominacion': Establece el valor a 'SVHGSA ASCV 332'.
   * - 'actividadEconomica': Establece el valor a 'SIMa gsys'.
   * - 'correoElectronico': Establece el valor a 'SV US'.
   * 
   * @returns {void}
   */
  public establecerValoresDeFormulario(): void {
    this.domicilioEstablecimiento.get('Codigo')?.setValue('');
    this.domicilioEstablecimiento.get('codigoPostal')?.setValue('');
    this.domicilioEstablecimiento.get('estado')?.setValue('');
    this.domicilioEstablecimiento.get('Municipio')?.setValue('');
    this.domicilioEstablecimiento.get('localidad')?.setValue('');
    this.domicilioEstablecimiento.get('colonia')?.setValue('');
    this.domicilioEstablecimiento.get('calle')?.setValue('');
    this.domicilioEstablecimiento.get('numeroExterior')?.setValue('')
  }

  /**
 * Establecer valores en DatosProcedureStore
   */
  setValoresStore(data: string): void {
    if (data === 'estado') {
      this.store.setEstado(this.domicilioEstablecimiento.get('estado')?.value);
    } else if (data === 'codigo') {
      this.store.setCodigo(this.domicilioEstablecimiento.get('codigo')?.value);
    } else if (data ==='Municipio') {
      this.store.setCodigo(this.domicilioEstablecimiento.get('municipio')?.value);
    } else if (data === 'localidad') {
      this.store.setLocalidad(this.domicilioEstablecimiento.get('localidad')?.value);
    } else if (data === 'colonia') {
      this.store.setColonia(this.domicilioEstablecimiento.get('colonia')?.value);
    } else if (data === 'calle') {
      this.store.setCalle(this.domicilioEstablecimiento.get('calle')?.value);
    } else if (data === 'Correo') {
      this.store.setCorreo(this.domicilioEstablecimiento.get('Correo')?.value);
    } else if (data === 'sanitario') {
      this.store.setSanitario(this.domicilioEstablecimiento.get('sanitario')?.value);
    } else if (data === 'lada') {
      this.store.setLada(this.domicilioEstablecimiento.get('lada')?.value);
    } else if (data === 'telefono') {
      this.store.setTelefono(this.domicilioEstablecimiento.get('telefono')?.value);
    } 
    else if (data === 'funcionamiento') {
      this.store.setFuncionamiento(this.AvisodeFuncionamiento.get('funcionamiento')?.value);
    } else if (data === 'licencia') {
      this.store.setLicencia(this.AvisodeFuncionamiento.get('licencia')?.value);
    }
  }
  /**
 * Establecer valores en DatosProcedureStore
   */
  // setValoresStores(): void {
  //   this.store.setJustificacion(this.preOperativeForm.get('Justificacion')?.value);
  // }
}


import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';

import { DatosSolicitudService } from '../../../261101/services/dato-solicitude.service'
import { Domicilio } from '../../modelos/domicilio-establecimientos.model';

import { FormBuilder } from '@angular/forms';
// import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Mercancias } from '../../modelos/mercancias.model';
// import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src'
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-mercancias',
  standalone: true,
  imports: [CommonModule,TablaDinamicaComponent,CatalogoSelectComponent],
  templateUrl: './mercancias.component.html',
  styleUrl: './mercancias.component.css',
})
export class MercanciasComponent implements OnInit {
  /**
 * Formulario reactivo para datos preoperativos.
 */
  domicilioEstablecimiento!: FormGroup;
    /**
 * Formulario reactivo para datos preoperativos.
 */
    Aduana!: FormGroup;
  /** Enum para el tipo de selección de tabla */
  public TablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

    /** Array para almacenar la respuesta de permisos cancelar */
    Mercanciasdata: Mercancias[] = [];

    /** Subject para notificar la destrucción del componente */
    private destroy$ = new Subject<void>();

  /** Configuración para las columnas de la tabla */
  configuracionTabla: ConfiguracionColumna<Mercancias>[] = [
    { encabezado: 'Clasificación del producto ', clave: (item: Mercancias) => item.clasificacionDelProducto, orden: 1 },
    { encabezado: 'Especificar clasificación del product  ', clave: (item: Mercancias) => item.especificarClasificacionDelProduct, orden: 2 },
    { encabezado: 'Denominación ', clave: (item: Mercancias) => item.denominacion, orden: 3 },
    { encabezado: 'Denominación distintiva  ', clave: (item: Mercancias) => item.denominacionDistintiva, orden: 4 },
    { encabezado: 'Número CAS  ', clave: (item: Mercancias) => item.numeroCAS, orden: 5 },
    { encabezado: 'Fracción arancelaria', clave: (item: Mercancias) => item.fraccionArancelaria, orden: 6 },
    { encabezado: 'Descripción de I fracción ', clave: (item: Mercancias) => item.descripcionDeFraccion, orden: 7 },
  ];


/**
 * Constructor para SolicitanteComponent.
 * 
 * @param fb - Una instancia de FormBuilder utilizada para crear y gestionar formularios.
 */
constructor(private fb: FormBuilder,private DatosSolicitudService:DatosSolicitudService) {
  this.Aduana = this.fb.group({
    Aduana: [{ value: '', disabled: false }],
  });
}

/**
 * Gancho de ciclo de vida que se llama después de que se inicializan las propiedades enlazadas a datos de una directiva.
 * Inicializa el componente configurando los valores del formulario.
 * 
 */
ngOnInit(): void {
  this.mercanciasData();
}

  /**
   * Cargar datos de domicilioEstablecimiento
   */
  mercanciasData(): void {
    this.DatosSolicitudService.getMercanciasData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.Mercanciasdata = response;
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
}


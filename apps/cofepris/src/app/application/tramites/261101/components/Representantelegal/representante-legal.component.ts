import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { Domicilio } from '../../modelos/domicilio-establecimientos.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.css',
})
export class RepresentanteLegalComponent implements OnInit {
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
    { encabezado: 'Clave S.C.I.A.Ν.' , clave: (item:Domicilio) => item.id, orden: 1 },
    { encabezado: 'Descripcion del S.C.I.A.N. ', clave: (item: Domicilio) => item.Descripcion, orden: 2 },

  ];



/**
 * Constructor para SolicitanteComponent.
 * 
 * @param fb - Una instancia de FormBuilder utilizada para crear y gestionar formularios.
 */
constructor(private fb: FormBuilder) {
  this.establecerdomicilioEstablecimiento();
}

/**
 * Gancho de ciclo de vida que se llama después de que se inicializan las propiedades enlazadas a datos de una directiva.
 * Inicializa el componente configurando los valores del formulario.
 * 
 */
ngOnInit(): void {
  this.establecerValoresDeFormulario();

}

  /**
 * Inicializa el domicilioEstablecimiento con un conjunto de controles de formulario.
 * Cada control se inicializa con un valor de cadena vacío y está deshabilitado.
 * Los controles del formulario incluyen:
 */
  public establecerdomicilioEstablecimiento(): void {
    this.domicilioEstablecimiento = this.fb.group({
      RFC:[{ value: '', disabled: false }],
      Buscar : [{ value: '', disabled: false }],
      Nombre: [{ value: '', disabled: false }],
      ApellidoPaterno: [{ value: '', disabled: false }],
      Apellido: [{ value: '', disabled: false }], 
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
}
}



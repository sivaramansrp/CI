import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnContinuarComponent, TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { PermisosCancelarService } from '../../service/permisos-cancelar.service';
import { Subject, takeUntil } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Tramite140112Store } from '../../estados/tramite-140112.store';
import { Tramite140112Query } from '../../estados/tramite-140112.query';
import { PermisosCancelarData } from '@libs/shared/data-access-user/src/core/models/140112/permisos-cancelar.model';

@Component({
  selector: 'app-permisos-cancelar',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, FormsModule, BtnContinuarComponent, BrowserModule, ReactiveFormsModule],
  providers: [PermisosCancelarService],
  templateUrl: './permisos-cancelar.component.html',
  styleUrl: './permisos-cancelar.component.scss',
})
export class PermisosCancelarComponent implements OnInit, OnDestroy {
  /** Enum para el tipo de selección de tabla */
  public TablaSeleccion: TablaSeleccion = TablaSeleccion?.CHECKBOX;

  /** Configuración para las columnas de la tabla */
  configuracionTabla: ConfiguracionColumna<any>[] = [
    { encabezado: '', clave: (item: any) => item.Id, orden: 1 },
    { encabezado: 'Folio trámite ', clave: (item: any) => item.FolioTtrámite, orden: 2 },
    { encabezado: 'Tipo solicitud ', clave: (item: any) => item.TipoSolicitud, orden: 3 },
    { encabezado: 'Régimen ', clave: (item: any) => item.Régimen, orden: 4 },
    { encabezado: 'Clasificación régimen ', clave: (item: any) => item.ClasificaciónRégimen, orden: 5 },
    { encabezado: 'Condición de la mercancía', clave: (item: any) => item.CondiciónDeLaMercancía, orden: 6 },
    { encabezado: 'Fracción arancelaria ', clave: (item: any) => item.FracciónArancelaria, orden: 7 },
  ];

  /** Array para almacenar la respuesta de permisos cancelar */
  permisosCancelar: PermisosCancelarData[] = [];

  /** Subject para notificar la destrucción del componente */
  private destroy$ = new Subject<void>();

  /** Texto del manifiesto de veracidad */
  public manifestoDeVeracidad = "De conformidad con el artículo 57, fracción 11, y 58 de la ley Federal de Procedimiento Administrativo* Manifiesto decir verdad";

 /** Cuadro de texto para motivo desistimiento */
public motivoDesistimientotextBox = '';

/** Variable para almacenar las filas seleccionadas */
public obtenerFilasSeleccionadas: any[] = [];

/** Texto de confirmación de veracidad */
public confirmarVeracidad = ''; 

/** Booleano para verificar si la casilla está marcada */
public estmarcado = false;
  /** Grupo de formulario para motivo desistimiento */
  solicitud: FormGroup = this.fb.group({
    descripcionClobGenerica1: ['', [Validators.required]],
    declaracionBoolean:['',Validators.required]
  });

  /**
   * Constructor para inyectar dependencias
   * @param PermisosCancelarService Servicio para manejar operaciones de permisos cancelar
   * @param store Almacén para gestionar el estado del trámite
   * @param query Consulta para seleccionar el estado del trámite
   * @param fb FormBuilder para crear grupos de formularios
   */
  constructor(
    private PermisosCancelarService: PermisosCancelarService,
    private store: Tramite140112Store,
    private query: Tramite140112Query,
    private fb: FormBuilder,
  ) {}

  /**
   * Gancho de ciclo de vida OnInit
   */
  ngOnInit() {
    this.query.selectDesistimiento$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {      
      this.solicitud.patchValue({
        descripcionClobGenerica1: data
      });
    });
    this.PermisosCancelarService.getPermisosCancelar().subscribe((res)=>{
      console.log('res',res);
      
    })
    this.loadPermisoCancelar();
  }

  /**
   * Cargar datos de permisos cancelar
   */
  loadPermisoCancelar(): void {
    
    this.PermisosCancelarService.getPermisosCancelar()
      .pipe(takeUntil(this.destroy$)) 
      .subscribe(response => {
    console.log('hello');   
        this.permisosCancelar = response;   
      });
  }

  
  /**
   * Manejar datos de filas seleccionadas
   * @param data Datos de filas seleccionadas
   */
  handleListaDeFilaSeleccionada(data: any) {
    this.obtenerFilasSeleccionadas = data;
  }

  /**
   * Seleccionar o deseleccionar todas las filas
   * @param event Objeto de evento
   */
  seleccionarDeseleccionarTodos(event: any): void {
    this.estmarcado = event.target.checked;
    if (this.estmarcado) {
      this.confirmarVeracidad = "De conformidad con el artículo 57, fracción 11, y 58 de la ley Federal de Procedimiento Administrativo* Manifiesto decir verdad";
      this.solicitud.patchValue({
        declaracionBoolean: this.confirmarVeracidad
      });
    } else {
      this.solicitud.patchValue({
        declaracionBoolean: null
      });
      this.confirmarVeracidad = '';
    }
  }

  /**
   * Gancho de ciclo de vida OnDestroy
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Establecer valores en Tramite140112Store
   */
  setValoresStore(): void {
    this.store.setDesistimiento(this.solicitud.get('descripcionClobGenerica1')?.value);
  }

  /**
   * Validar campo del formulario
   * @param field Nombre del campo
   * @returns Booleano que indica si el campo es válido
   */
  isValid(field: string) {
    return this.PermisosCancelarService.isValid(this.solicitud, field);
  }
}
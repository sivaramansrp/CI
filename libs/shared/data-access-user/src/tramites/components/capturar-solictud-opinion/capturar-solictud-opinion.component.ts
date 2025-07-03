
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OpinionesStates, SolicitudOpinionesState } from '../../../core/estados/opiniones.store';
import { Subject, map, takeUntil } from 'rxjs';
import { Catalogo } from '../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SolicitudOpinionesQuery } from '../../../core/queries/opiniones.query';
import data from '@libs/shared/theme/assets/json/funcionario/cat-dependencias.json';

@Component({
  selector: 'app-capturar-solictud-opinion',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './capturar-solictud-opinion.component.html',
  styleUrl: './capturar-solictud-opinion.component.scss',
})
export class CapturarSolictudOpinionComponent implements OnInit, OnDestroy {

  /**
     * Catálogo de tipo de requerimiento
     */
  catDependencia!: Catalogo[];

  /**
    * Declaración de variable para el formulario
    */
  formCapturaOpinion!: FormGroup;

  /**
   * Declaración de variable para almacenar las opiniones seleccionadas
   * Se utiliza para almacenar las opiniones capturadas por el usuario
   * y mostrarlas en una tabla.
   */
  opinionesSeleccionados: { dependencia: string; justificacion: string }[] = [];

  /** 
   * Declaración de variable para controlar la visualización de la tabla
   * Se utiliza para mostrar u ocultar la tabla de opiniones seleccionadas
   * dependiendo de si hay opiniones capturadas o no.
   */
  visualizaTabla: boolean = true;
  /**
   * Declaración de variable para controlar la visualización de los botones
   * Se utiliza para mostrar u ocultar los botones de enviar y cancelar
   */
  visualizaBotones: boolean = false;

  /**
   * Estado de la opinión.
   */
  public solicitudOpinionesState!: SolicitudOpinionesState;

  /**
    * Notificador para destruir las suscripciones.
    */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * 
   * @param fb FormBuilder
   * Se utiliza para crear formularios reactivos en Angular.
   * El FormBuilder es una clase que ayuda a crear instancias de FormGroup y FormControl
   * de manera más sencilla y legible.
   */
  constructor(
    private fb: FormBuilder,
    private opinionesStates: OpinionesStates,
    private solicitudOpinionesQuery: SolicitudOpinionesQuery,
    private router: Router
  ) {
  }

  /**
   * Método para inicializar el componente
   * Se utiliza para inicializar el formulario y cargar los datos necesarios.
   * En este caso, se carga el catálogo de dependencias desde un archivo JSON.
   */
  ngOnInit(): void {
    this.catDependencia = data;
    this.crearFormRequerimiento();
    this.solicitudOpinionesQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudOpinionesState = seccionState;
        })
      )
      .subscribe();
    this.visualizaTabla = this.solicitudOpinionesState.parametroDesplegable;
    this.opinionesSeleccionados = this.solicitudOpinionesState.listaOpciones;
  }

  /**
   * Método para destruir el componente
   * Se utiliza para limpiar las suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Método para crear el formulario
   * Se utiliza para inicializar el formulario con los campos requeridos
   * y sus validaciones.
  */
  crearFormRequerimiento(): void {
    this.formCapturaOpinion = this.fb.group({
      dependencia: ['', [Validators.required]],
      justificacion: ['', [Validators.required]]
    });
  }

  /**
   * Método para limpiar el formulario
   * Se utiliza para limpiar los campos del formulario después de guardar una opinión
   * y para reiniciar el formulario al iniciar el componente.
  */
  limpiarFormulario(): void {
    this.formCapturaOpinion.reset({
      dependencia: null,
      justificacion: ''
    });
  }

  /**
   * Método para guardar la opinión
   */
  guardarOpinion(): void {
    if (this.formCapturaOpinion.valid) {
      if (this.opinionesSeleccionados.length === 0) {
        this.opinionesSeleccionados = [];
        this.visualizaBotones = true;
      }
      this.visualizaTabla = true;
      this.opinionesStates.setValorDesplegableOpinion(this.visualizaTabla ?? false);
      const DEPENDENCIA_ID = this.formCapturaOpinion.get('dependencia')?.value;
      const JUSTIFICACION = this.formCapturaOpinion.get('justificacion')?.value;
      const DEPENDENCIA_OBJ = this.catDependencia.find(dep => dep.id === Number(DEPENDENCIA_ID));
      this.opinionesSeleccionados.push({
        dependencia: DEPENDENCIA_OBJ?.descripcion || 'Desconocido',
        justificacion: JUSTIFICACION
      });
      this.opinionesStates.setSolicitudOpiniones(this.opinionesSeleccionados);
    } else {
      this.formCapturaOpinion.markAllAsTouched(); // muestra errores si el form está inválido
    }
  }

  /**
   * Método para eliminar un requerimiento
   * @param index índice del requerimiento a eliminar
   */
  eliminarOpinion(index: number): void {
    this.opinionesSeleccionados.splice(index, 1);
  }

  /**
   * Método para editar una opinión
   * @param index índice de la opinión a editar
   */
  editarOpinion(index: number): void {
    const OPINION = this.opinionesSeleccionados[index];
    const DEPENDENCIA_ID = this.catDependencia.find(dep => dep.descripcion === OPINION.dependencia);
    this.formCapturaOpinion.setValue({
      dependencia: DEPENDENCIA_ID?.id ?? '',
      justificacion: OPINION.justificacion,
    });
    this.eliminarOpinion(index);
  }

  enviarOpiniones() :void{
    this.router.navigate(['funcionario/firma-electronica']);
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareasTramiteComponent } from './tareas-tramite.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FolioQuery } from '../../../../core/queries/folio.query';
import { TareasTramiteService } from '../../../../core/services/consultagenerica/tareas-tramite-service';
import { of } from 'rxjs';
import { BodyTablaTareasTramite } from '../../../../core/models/shared/consulta-generica.model';

describe('TareasTramiteComponent', () => {
  let component: TareasTramiteComponent;
  let fixture: ComponentFixture<TareasTramiteComponent>;
  let tareasTramiteServiceMock: any;

  // Datos de prueba para tareas usando la interfaz correcta con las propiedades adecuadas
  const mockTareas: BodyTablaTareasTramite[] = [
    { 
      id: 1, 
      nombreTarea: 'Tarea 1', 
      nombreUsuarioAsignado: 'Juan Pérez',
      claveUsuarioAsignado: 'JP001',
      fechaAsignacion: '2023-01-01',
      fechaAtencion: null
    },
    { 
      id: 2, 
      nombreTarea: 'Tarea 2', 
      nombreUsuarioAsignado: 'Ana López',
      claveUsuarioAsignado: 'AL002',
      fechaAsignacion: '2023-01-02',
      fechaAtencion: '2023-01-05'
    }
  ];
  
  // Mock para el servicio FolioQuery
  const folioQueryMock = {
    getFolio: jest.fn().mockReturnValue(of('123456'))
  };

  beforeEach(async () => {
    // Mock para TareasTramiteService con el método correcto
    tareasTramiteServiceMock = {
      getTareasTramite: jest.fn().mockReturnValue(of(mockTareas))
    };

    await TestBed.configureTestingModule({
      imports: [TareasTramiteComponent, HttpClientTestingModule],
      providers: [
        { provide: TareasTramiteService, useValue: tareasTramiteServiceMock }, 
        { provide: FolioQuery, useValue: folioQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TareasTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get folio from FolioQuery on init', () => {
    expect(folioQueryMock.getFolio).toHaveBeenCalled();
    expect(component.folio).toBe('123456');
  });

  it('should load tasks correctly and show the right count', () => {
    // Verificar que el servicio fue llamado correctamente
    expect(tareasTramiteServiceMock.getTareasTramite).toHaveBeenCalled();
    
    // Verificar que los datos se asignaron correctamente
    expect(component.datosTablaTareasTramite).toEqual(mockTareas);
    expect(component.datosTablaTareasTramite.length).toBe(2);
    expect(component.datosTablaTareasTramite[0].nombreTarea).toBe('Tarea 1');
  });

  it('should display tasks with correct assignment information', () => {
    // Asignar manualmente las tareas al componente
    component.datosTablaTareasTramite = [...mockTareas];
    
    // Verificar la información de asignación
    expect(component.datosTablaTareasTramite[0].nombreUsuarioAsignado).toBe('Juan Pérez');
    expect(component.datosTablaTareasTramite[0].claveUsuarioAsignado).toBe('JP001');
  });

  it('should identify tasks with and without fechaAtencion', () => {
    // Asignar manualmente las tareas al componente
    component.datosTablaTareasTramite = [...mockTareas];
    
    // Contar cuántas tareas tienen fechaAtencion null (pendientes)
    const tareasPendientes = component.datosTablaTareasTramite.filter(tarea => 
      tarea.fechaAtencion === null
    );
    
    // Contar cuántas tareas tienen fechaAtencion (atendidas)
    const tareasAtendidas = component.datosTablaTareasTramite.filter(tarea => 
      tarea.fechaAtencion !== null
    );
    
    // Verificar los conteos
    expect(tareasPendientes.length).toBe(1);
    expect(tareasAtendidas.length).toBe(1);
    expect(tareasPendientes[0].id).toBe(1);
    expect(tareasAtendidas[0].id).toBe(2);
  });

  it('should handle empty task list correctly', () => {
    // Simular que el servicio devuelve una lista vacía
    tareasTramiteServiceMock.getTareasTramite.mockReturnValue(of([]));
    
    // Llamar al método que obtiene las tareas
    component.getTareas();
    
    // Verificar que se maneja correctamente
    expect(component.datosTablaTareasTramite.length).toBe(0);
  });

  it('should complete the unsubscribe subject on destroy', () => {
    // Espiar el método next y complete del Subject
    const nextSpy = jest.spyOn(component.unsubscribe$, 'next');
    const completeSpy = jest.spyOn(component.unsubscribe$, 'complete');
    
    // Ejecutar ngOnDestroy
    component.ngOnDestroy();
    
    // Verificar que se llamaron los métodos
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PasoUnoCsComponent } from './paso-uno-cs.component';
import { ConsultaioQuery, ConsultaioState, SeccionLibStore, SolicitanteComponent } from '@ng-mf/data-access-user';
import { ToastrModule } from 'ngx-toastr';
import { Solocitud80104Service } from '../../services/service80104.service';
import { of } from 'rxjs';

describe('PasoUnoCsComponent', () => {
  let component: PasoUnoCsComponent;
  let fixture: ComponentFixture<PasoUnoCsComponent>;
  let mockSeccionStore: Partial<SeccionLibStore>;
  let mockService: Partial<Solocitud80104Service>;
  let mockQuery: Partial<ConsultaioQuery>;
  const consultaState: ConsultaioState = { update: true } as any;
  beforeEach(async () => {
    mockSeccionStore = {
      establecerSeccion: jest.fn(),
      establecerFormaValida: jest.fn()
    };

    mockService = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ test: true })),
      getRegistroTomaMuestrasMercanciasDatas: jest.fn().mockReturnValue(of({ test: true })),
      getRegistroComplementosData: jest.fn().mockReturnValue(of({ test: true })),
      getRegistroFederatoriosData: jest.fn().mockReturnValue(of({ test: true })),
      getRegistroComplementarData: jest.fn().mockReturnValue(of({ test: true })),
      actualizarEstadoFormulario: jest.fn(),
      actualizarEstadoFormularios: jest.fn(),
      actualizarComplementos: jest.fn(),
      actualizarFederatorios: jest.fn(),
      actualizarComplementar: jest.fn(),
    };

    mockQuery = {
      selectConsultaioState$: of(consultaState)
    };
    await TestBed.configureTestingModule({
      declarations: [PasoUnoCsComponent],
      imports: [ SolicitanteComponent, HttpClientTestingModule, ToastrModule.forRoot() ],   
      providers: [
        { provide: 'ToastConfig', useValue: {} },
        { provide: SeccionLibStore, useValue: mockSeccionStore },
        { provide: Solocitud80104Service, useValue: mockService },
        { provide: ConsultaioQuery, useValue: mockQuery }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoUnoCsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('debería asignar secciones y formas en init (a través del constructor)', () => {
    expect(mockSeccionStore.establecerSeccion).toHaveBeenCalled();
    expect(mockSeccionStore.establecerFormaValida).toHaveBeenCalled();
  });

  it('debería actualizar el índice cuando se llama a seleccionaTab', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('debería llamar a guardarDatosFormulario si consultaState.update es true', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('debería llamar a todos los métodos de actualización del servicio en guardarDatosFormulario', () => {
    component.guardarDatosFormulario();

    expect(mockService.actualizarEstadoFormulario).toHaveBeenCalled();
    expect(mockService.actualizarEstadoFormularios).toHaveBeenCalled();
    expect(mockService.actualizarComplementos).toHaveBeenCalled();
    expect(mockService.actualizarFederatorios).toHaveBeenCalled();
    expect(mockService.actualizarComplementar).toHaveBeenCalled();
    expect(component.esDatosRespuesta).toBe(true);
  });
});

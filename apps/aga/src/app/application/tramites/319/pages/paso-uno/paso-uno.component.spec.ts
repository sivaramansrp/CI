import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { of, Subject } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OperacionService } from '../../services/operacion.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperacionesDeComercioExterioComponent } from '../../components/operaciones-de-comercio-exterior/operaciones-de-comercio-exterior.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  let mockOperacionService: any;
  let mockConsultaQuery: any;
  let consultaState$: Subject<any>;

  beforeEach(async () => {
    consultaState$ = new Subject();

    mockOperacionService = {
      getRegistroTomaMuestrasMercanciasData: jest.fn(),
      actualizarEstadoFormulario: jest.fn()
    };

    mockConsultaQuery = {
      selectConsultaioState$: consultaState$.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        PasoUnoComponent,
        SolicitanteComponent,
        OperacionesDeComercioExterioComponent
      ],
      providers: [
        { provide: OperacionService, useValue: mockOperacionService },
        { provide: ConsultaioQuery, useValue: mockConsultaQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to consultaQuery state and call guardarDatosFormulario if update=true', () => {
    const fakeData = { datos: { x: 1 }, operacion: 'crear' };

    mockOperacionService.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(fakeData));
    mockOperacionService.actualizarEstadoFormulario.mockImplementation(() => {});

    // Trigger ngOnInit logic
    fixture.detectChanges();

    // Emit a state with update true
    consultaState$.next({ update: true });

    expect(component.consultaState.update).toBe(false);
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should set esDatosRespuesta to true if consultaState.update is false', () => {
    fixture.detectChanges(); // triggers ngOnInit
    consultaState$.next({ update: false });

    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should not call actualizarEstadoFormulario if getRegistroTomaMuestrasMercanciasData returns null', () => {
    mockOperacionService.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
    component.guardarDatosFormulario();
    expect(mockOperacionService.actualizarEstadoFormulario).not.toHaveBeenCalled();
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should cleanup destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'complete');
    const nextSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'next');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});

/* eslint-disable @nx/enforce-module-boundaries */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
// eslint-disable-next-line sort-imports
import { AsignacionData } from 'libs/shared/data-access-user/src/core/models/120404/entidadmodel';



import { SolicitantetabComponent } from './solicitantetab.component';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { SolicitanteasigncionserviceService } from '@libs/shared/data-access-user/src/core/services/120404/solicitanteAsigncionservice.service';

// eslint-disable-next-line @nx/enforce-module-boundaries


describe('SolicitantetabComponent', () => {
  let component: SolicitantetabComponent;
  let fixture: ComponentFixture<SolicitantetabComponent>;
  let service: jest.Mocked<SolicitanteasigncionserviceService>;

  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const serviceSpy = {
      getAsignacionSolicitante: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [SolicitantetabComponent, ReactiveFormsModule],
      providers: [
        { provide: SolicitanteasigncionserviceService, useValue: serviceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitantetabComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SolicitanteasigncionserviceService) as jest.Mocked<SolicitanteasigncionserviceService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(component.formasignacion).toBeDefined();
    expect(component.formasignacion.get('especie')).toBeDefined();
  });

  it('should call loadAsignacionData on init', () => {
    jest.spyOn(component, 'loadAsignacionData');
    component.ngOnInit();
    expect(component.loadAsignacionData).toHaveBeenCalled();
  });

  it('should load asignacion data', () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const mockData: AsignacionData = {
      especie: 'Test Especie',
      funcionZootecnica: 'Test Funcion',
      autorizado: 'Test Autorizado',
      expendido: 'Test Expendido',
      disponible: 'Test Disponible',
      ampliar: 'Test Ampliar'
    };
    (service.getSolicitante as jest.Mock).mockReturnValue(of(mockData));

    component.loadAsignacionData();
    expect(service.getSolicitante()).toHaveBeenCalled();
    expect(component.formasignacion.value).toEqual({
      especie: 'Test Especie',
      funcionZootecnica: 'Test Funcion',
      authorizado: 'Test Authorizado',
      Expendido: 'Test Expendido',
      disponible: 'Test Disponible',
      ampliar: 'Test Ampliar'
    });
  });

  it('should submit the form if valid', () => {
    jest.spyOn(console, 'log');
    component.ngOnInit();
    component.formasignacion.get('especie')?.setValue('Test Especie');
    component.formasignacion.get('funcionZootecnica')?.setValue('Test Funcion');
    component.formasignacion.get('authorizado')?.setValue('Test Authorizado');
    component.formasignacion.get('Expendido')?.setValue('Test Expendido');
    component.formasignacion.get('disponible')?.setValue('Test Disponible');
    component.formasignacion.get('ampliar')?.setValue('Test Ampliar');

    component.enviarFormulario();
    expect(console.log).toHaveBeenCalledWith('Formulario de asignación enviado:', component.formasignacion.value);
  });

  it('should not submit the form if invalid', () => {
    jest.spyOn(console, 'log');
    component.ngOnInit();

    component.enviarFormulario();
    expect(console.log).toHaveBeenCalledWith('Formulario no válido');
  });

  it('should clean up on destroy', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(component as any, 'destroyed$', 'get').mockReturnValue({
      next: jest.fn(),
      complete: jest.fn()
    });

    component.ngOnDestroy();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((component as any).destroyed$.next).toHaveBeenCalled();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((component as any).destroyed$.complete).toHaveBeenCalled();
  });
});
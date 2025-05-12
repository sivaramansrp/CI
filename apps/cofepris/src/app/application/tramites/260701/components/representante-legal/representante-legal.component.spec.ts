import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentanteLegalComponent } from './representante-legal.component';
import { Solicitud260701State, Tramite260701Store } from '../../estados/tramites/tramite260701.store';
import { Tramite260701Query } from '../../estados/queries/tramite260701.query';
import { of } from 'rxjs';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let tramite260701StoreMock: Partial<Tramite260701Store>;
  let tramite260701QueryMock: Partial<Tramite260701Query>;

  beforeEach(async () => {
    tramite260701StoreMock = {
      setNombre: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMaterno: jest.fn(),
    };

    tramite260701QueryMock = {
      selectSolicitud$: of({
        rfc: 'RFC123456',
        nombre: 'John',
        apellidoPaterno: 'Doe',
        apellidoMaterno: 'Smith',
      } as Solicitud260701State),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RepresentanteLegalComponent],
      providers: [
        { provide: Tramite260701Store, useValue: tramite260701StoreMock },
        { provide: Tramite260701Query, useValue: tramite260701QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with values from the query', () => {
    expect(component.representante.value).toEqual({
      rfc: 'RFC123456',
      nombre: 'John',
      apellidoPaterno: 'Doe',
      apellidoMaterno: 'Smith',
    });
  });

  it('should call setValoresStore when obtenerValor is invoked', () => {
    jest.spyOn(component, 'setValoresStore');
    component.representante.get('rfc')?.setValue('RFC123456');
    component.obtenerValor();

    expect(component.setValoresStore).toHaveBeenCalledWith(
      component.representante,
      'nombre',
      'setNombre'
    );
    expect(component.setValoresStore).toHaveBeenCalledWith(
      component.representante,
      'apellidoPaterno',
      'setApellidoPaterno'
    );
    expect(component.setValoresStore).toHaveBeenCalledWith(
      component.representante,
      'apellidoMaterno',
      'setApellidoMaterno'
    );
  });

  it('should disable form fields after calling obtenerValor', () => {
    component.representante.get('rfc')?.setValue('RFC123456');
    component.obtenerValor();

    expect(component.representante.get('nombre')?.disabled).toBe(true);
    expect(component.representante.get('apellidoPaterno')?.disabled).toBe(true);
    expect(component.representante.get('apellidoMaterno')?.disabled).toBe(true);
  });

  it('should call store methods with correct values in setValoresStore', () => {
    const form = component.representante;
    form.get('nombre')?.setValue('John');
    component.setValoresStore(form, 'nombre', 'setNombre');

    expect(tramite260701StoreMock.setNombre).toHaveBeenCalledWith('John');
  });

  it('should complete destroyNotifier$ on component destruction', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });
});

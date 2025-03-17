// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { DatosDelLas140201Component } from './datos-del-las-140201.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { Observable, of } from 'rxjs';
// import { Cancelaciones140201Service } from '../../services/cancelaciones-140201.service';
// import { Cancelaciones140201Store } from '../../estados/cancelaciones.store';
// import { Cancelaciones140201Query } from '../../estados/cancelaciones.query';
// import { TituloComponent } from '@libs/shared/data-access-user/src';
// import { NotifDomicileComponent } from '../NotifDomicile/NotifDomicile.component';

// describe('DatosDelLas140201Component', () => {
//   let component: DatosDelLas140201Component;
//   let fixture: ComponentFixture<DatosDelLas140201Component>;
//   let mockService: Partial<Cancelaciones140201Service>;
//   let mockStore: Partial<Cancelaciones140201Store>;
//   let mockQuery: Partial<Cancelaciones140201Query>;

//   beforeEach(async () => {
//     mockService = {
//       getInfo: jest.fn().mockReturnValue(of({
//         apellidoMaterno: 'Rodríguez'
//       }))
//     };

//     mockStore = {
//       setNombre: jest.fn(),
//       setApellidoPaterno: jest.fn(),
//       setCorreoElectronico: jest.fn()
//     };

//     mockQuery = {
//       nombre$: of(null),
//       apellidoPaterno$: of(null),
//       correoElectronico$: of(null)
//     };

//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule,DatosDelLas140201Component, TituloComponent, NotifDomicileComponent],
//       declarations: [],
//       providers: [
//         { provide: Cancelaciones140201Service, useValue: mockService },
//         { provide: Cancelaciones140201Store, useValue: mockStore },
//         { provide: Cancelaciones140201Query, useValue: mockQuery }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(DatosDelLas140201Component);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize the form with correct controls', () => {
//     expect(component.authNotifPersonsForm.contains('nombre')).toBeTruthy();
//     expect(component.authNotifPersonsForm.contains('apellidoPaterno')).toBeTruthy();
//     expect(component.authNotifPersonsForm.contains('apellidoMaterno')).toBeTruthy();
//     expect(component.authNotifPersonsForm.contains('correoElectronico')).toBeTruthy();
//   });

//   it('should initialize form values from query observables', () => {
//     expect(component.authNotifPersonsForm.get('nombre')?.value).toBe('Carlos');
//     expect(component.authNotifPersonsForm.get('apellidoPaterno')?.value).toBe('Gómez');
//     expect(component.authNotifPersonsForm.get('correoElectronico')?.value).toBe('carlos@example.com');
//   });

//   it('should call loadInfo and update form values', () => {
//     component.loadInfo();
//     expect(mockService.getInfo).toHaveBeenCalled();
//     expect(component.authNotifPersonsForm.get('apellidoMaterno')?.value).toBe('Rodríguez');
//   });

//   it('should update store when updateNombre is called', () => {
//     component.authNotifPersonsForm.get('nombre')?.setValue('Carlos');
//     component.updateNombre();
//     expect(mockStore.setNombre).toHaveBeenCalledWith('Carlos');
//   });

//   it('should update store when updateApellidoPaterno is called', () => {
//     component.authNotifPersonsForm.get('apellidoPaterno')?.setValue('Gómez');
//     component.updateApellidoPaterno();
//     expect(mockStore.setApellidoPaterno).toHaveBeenCalledWith('Gómez');
//   });

//   it('should update store when updateCorreoElectronico is called', () => {
//     component.authNotifPersonsForm.get('correoElectronico')?.setValue('carlos@example.com');
//     component.updateCorreoElectronico();
//     expect(mockStore.setCorreoElectronico).toHaveBeenCalledWith('carlos@example.com');
//   });

//   it('should unsubscribe from observables on destroy', () => {
//     const spy = jest.spyOn(component['nombre$'], 'subscribe');
//     component.ngOnDestroy();
//     expect(spy).toHaveBeenCalled();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelLas140201Component } from './datos-del-las-140201.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Cancelaciones140201Service } from '../../services/cancelaciones-140201.service';
import { Cancelaciones140201Store } from '../../estados/cancelaciones.store';
import { Cancelaciones140201Query } from '../../estados/cancelaciones.query';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { NotifDomicileComponent } from '../NotifDomicile/NotifDomicile.component';

describe('DatosDelLas140201Component', () => {
  let component: DatosDelLas140201Component;
  let fixture: ComponentFixture<DatosDelLas140201Component>;
  let mockService: Partial<Cancelaciones140201Service>;
  let mockStore: Partial<Cancelaciones140201Store>;
  let mockQuery: Partial<Cancelaciones140201Query>;

  beforeEach(async () => {
    mockService = {
      getInfo: jest.fn().mockReturnValue(of({ apellidoMaterno: 'Rodríguez' }))
    };

    mockStore = {
      setNombre: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setCorreoElectronico: jest.fn()
    };

    mockQuery = {
      nombre$: of('Carlos' as any),
      apellidoPaterno$: of('Gómez' as any),
      correoElectronico$: of('carlos@example.com' as any)
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosDelLas140201Component, TituloComponent, NotifDomicileComponent],
      declarations: [],
      providers: [
        { provide: Cancelaciones140201Service, useValue: mockService },
        { provide: Cancelaciones140201Store, useValue: mockStore },
        { provide: Cancelaciones140201Query, useValue: mockQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelLas140201Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct controls', () => {
    expect(component.authNotifPersonsForm.contains('nombre')).toBeTruthy();
    expect(component.authNotifPersonsForm.contains('apellidoPaterno')).toBeTruthy();
    expect(component.authNotifPersonsForm.contains('apellidoMaterno')).toBeTruthy();
    expect(component.authNotifPersonsForm.contains('correoElectronico')).toBeTruthy();
  });

  it('should initialize form values from query observables', () => {
    expect(component.authNotifPersonsForm.get('nombre')?.value).toBe('Carlos');
    expect(component.authNotifPersonsForm.get('apellidoPaterno')?.value).toBe('Gómez');
    expect(component.authNotifPersonsForm.get('correoElectronico')?.value).toBe('carlos@example.com');
  });

  it('should call loadInfo and update form values', () => {
    component.loadInfo();
    expect(mockService.getInfo).toHaveBeenCalled();
    expect(component.authNotifPersonsForm.get('apellidoMaterno')?.value).toBe('Rodríguez');
  });

  it('should update store when updateNombre is called', () => {
    component.authNotifPersonsForm.get('nombre')?.setValue('Carlos');
    component.updateNombre();
    expect(mockStore.setNombre).toHaveBeenCalledWith('Carlos');
  });

  it('should update store when updateApellidoPaterno is called', () => {
    component.authNotifPersonsForm.get('apellidoPaterno')?.setValue('Gómez');
    component.updateApellidoPaterno();
    expect(mockStore.setApellidoPaterno).toHaveBeenCalledWith('Gómez');
  });

  it('should update store when updateCorreoElectronico is called', () => {
    component.authNotifPersonsForm.get('correoElectronico')?.setValue('carlos@example.com');
    component.updateCorreoElectronico();
    expect(mockStore.setCorreoElectronico).toHaveBeenCalledWith('carlos@example.com');
  });

  it('should call updateState on ngOnInit', () => {
    const updateStateSpy = jest.spyOn(component, 'updateState');
    component.ngOnInit();
    expect(updateStateSpy).toHaveBeenCalled();
  });

  it('should call loadInfo on ngOnInit', () => {
    const loadInfoSpy = jest.spyOn(component, 'loadInfo');
    component.ngOnInit();
    expect(loadInfoSpy).toHaveBeenCalled();
  });

  it('should update form controls in updateState', () => {
    component.updateState();
    expect(component.authNotifPersonsForm.get('nombre')?.value).toBe('Carlos');
    expect(component.authNotifPersonsForm.get('apellidoPaterno')?.value).toBe('Gómez');
    expect(component.authNotifPersonsForm.get('correoElectronico')?.value).toBe('carlos@example.com');
  });

  it('should unsubscribe from observables on destroy', () => {
    const spy = jest.spyOn(component['destroy$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should complete the destroy$ subject on destroy', () => {
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
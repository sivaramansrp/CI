import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirmarSolicitudComponent } from './firmar-solicitud.component';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FirmarSolicitudComponent', () => {
  let component: FirmarSolicitudComponent;
  let fixture: ComponentFixture<FirmarSolicitudComponent>;
  let routerMock: any;

  beforeEach(async () => {
    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [FirmarSolicitudComponent],
      providers: [
        { provide: Router, useValue: routerMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FirmarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe navegar a acuse cuando obtieneFirma es llamado con un string no vacío', () => {
    component.obtieneFirma('firma123');
    expect(routerMock.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('no debe navegar cuando obtieneFirma es llamado con un string vacío', () => {
    component.obtieneFirma('');
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});


jest.mock('libs/shared/theme/assets/json/110210/datos-del-certificado.json', () => ({
  default: {
    cveRegistroProductor: 'MOCK123',
    fichaExpedicion: 'EXP456',
    fechaVecimiento: '2025-12-31',
    tratadoAcuerdoClave: 'TAC789',
    paisBloqueClave: 'PB012',
  },
}));

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelCertificadoComponent } from './datos-del-certificado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Tramite110210Query } from '../../estados/queries/tramite110210.query';
import { Tramite110210Store } from '../../estados/store/tramite110210.store';
import { of } from 'rxjs';

const mockStore = {
  setCveRegistroProductor: jest.fn(),
  setFichaExpedicion: jest.fn(),
  setFechaVecimiento: jest.fn(),
  setTratadoAcuerdoClave: jest.fn(),
  setPaisBloqueClave: jest.fn(),
};

const mockQuery = {
  selectTramite110210$: of({
    cveRegistroProductor: 'STORED_CRP',
    fichaExpedicion: 'STORED_FE',
    fechaVecimiento: 'STORED_FV',
    tratadoAcuerdoClave: 'STORED_TAC',
    paisBloqueClave: 'STORED_PB',
  })
};

describe('DatosDelCertificadoComponent', () => {
  let component: DatosDelCertificadoComponent;
  let fixture: ComponentFixture<DatosDelCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosDelCertificadoComponent],
      declarations: [],
      providers: [
        { provide: Tramite110210Store, useValue: mockStore },
        { provide: Tramite110210Query, useValue: mockQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct controls', () => {
    expect(component.solicitudForm.contains('cveRegistroProductor')).toBe(true);
    expect(component.solicitudForm.contains('fichaExpedicion')).toBe(true);
    expect(component.solicitudForm.contains('fechaVecimiento')).toBe(true);
    expect(component.solicitudForm.contains('tratadoAcuerdoClave')).toBe(true);
    expect(component.solicitudForm.contains('paisBloqueClave')).toBe(true);
  });

it('should patch values from store then overwrite with mockData', () => {
  expect(component.solicitudForm.get('cveRegistroProductor')?.value).toBe('MOCK123');
  expect(component.solicitudForm.get('fichaExpedicion')?.value).toBe('EXP456');
  expect(component.solicitudForm.get('fechaVecimiento')?.value).toBe('2025-12-31');
  expect(component.solicitudForm.get('tratadoAcuerdoClave')?.value).toBe('TAC789');
  expect(component.solicitudForm.get('paisBloqueClave')?.value).toBe('PB012');
});


  it('should set form values from mockData', () => {
    component.setFormValues();
    expect(component.solicitudForm.get('cveRegistroProductor')?.value).toBe('MOCK123');
    expect(component.solicitudForm.get('fichaExpedicion')?.value).toBe('EXP456');
    expect(component.solicitudForm.get('fechaVecimiento')?.value).toBe('2025-12-31');
    expect(component.solicitudForm.get('tratadoAcuerdoClave')?.value).toBe('TAC789');
    expect(component.solicitudForm.get('paisBloqueClave')?.value).toBe('PB012');
  });

  it('should update store with form values', () => {
    component.setFormValues();
    component['updateStore']();

    expect(mockStore.setCveRegistroProductor).toHaveBeenCalledWith('MOCK123');
    expect(mockStore.setFichaExpedicion).toHaveBeenCalledWith('EXP456');
    expect(mockStore.setFechaVecimiento).toHaveBeenCalledWith('2025-12-31');
    expect(mockStore.setTratadoAcuerdoClave).toHaveBeenCalledWith('TAC789');
    expect(mockStore.setPaisBloqueClave).toHaveBeenCalledWith('PB012');
  });
});
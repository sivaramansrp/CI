import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaisProcendenciaComponent } from './pais-procendencia.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Catalogo } from '../../../../core/models/shared/catalogos.model';

import { Solicitud130102State, Tramite130102Store } from '../../../../estados/tramites/tramite130102.store';
import { Tramite130102Query } from '../../../../estados/queries/tramite130102.query';

import { Subject, map, takeUntil } from 'rxjs';

describe('PaisProcendenciaComponent', () => {
  let component: PaisProcendenciaComponent;
  let fixture: ComponentFixture<PaisProcendenciaComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const mockPaisProc: Catalogo[] = [
    { id: 1, descripcion: 'México' },
    { id: 2, descripcion: 'España' },
    { id: 3, descripcion: 'Argentina' }
  ];
  

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(of(mockPaisProc));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule,PaisProcendenciaComponent],
      declarations: [],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisProcendenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.paisForm).toBeDefined();
    expect(component.paisForm.get('bloque')?.value).toBe('');
    expect(component.paisForm.get('descripcionJustificacion')?.value).toBe('');
    expect(component.paisForm.get('observaciones')?.value).toBe('');
  });

  it('should fetch country list on init', () => {
    component.fetchPaisProc();
    expect(httpClientSpy.get).toHaveBeenCalledWith('/assets/json/130102/pais-procenia.json');
    expect(component.paisProc).toEqual(mockPaisProc);
  });

  it('should add selected dates correctly', () => {
    component.fechasDatos = ['2024-01-01', '2024-02-01'];
    component.fecha.setValue(['0']);
    component.agregar('');
    expect(component.fechasSeleccionadas).toContain('2024-01-01');
    expect(component.fechasDatos.length).toBe(1);
  });

  it('should add all selected dates when type is "t"', () => {
    component.selectRangoDias = ['2024-03-01', '2024-04-01'];
    component.agregar('t');
    expect(component.fechasSeleccionadas).toEqual(['2024-03-01', '2024-04-01']);
    expect(component.fechasDatos.length).toBe(0);
  });

  it('should remove selected dates correctly', () => {
    component.fechasSeleccionadas = ['2024-01-01', '2024-02-01'];
    component.fechaSeleccionada.setValue(['0']);
    component.quitar('');
    expect(component.fechasDatos).toContain('2024-01-01');
    expect(component.fechasSeleccionadas.length).toBe(1);
  });

  it('should remove all selected dates when type is "t"', () => {
    component.fechasSeleccionadas = ['2024-03-01', '2024-04-01'];
    component.quitar('t');
    expect(component.fechasDatos).toEqual(['2024-03-01', '2024-04-01']);
    expect(component.fechasSeleccionadas.length).toBe(0);
  });
});

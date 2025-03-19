/* eslint-disable dot-notation */
import { CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { RepresentacionFederalComponent } from './representacion-federal.component';
import { RepresentacionfederalService } from '@ng-mf/data-access-user';

describe('RepresentacionFederalComponent', () => {
  let component: RepresentacionFederalComponent;
  let fixture: ComponentFixture<RepresentacionFederalComponent>;
  let service: RepresentacionfederalService;

  beforeEach(async () => {
    const SERVICE_MOCK = {
      getEntidadFederativa: jasmine.createSpy('getEntidadFederativa').and.returnValue(of([
        { id: '1', nombre: 'Entidad 1' },
        { id: '2', nombre: 'Entidad 2' }
      ])),
      getRepresentacionfederal: jasmine.createSpy('getRepresentacionfederal').and.returnValue(of([
        { id: '1', nombre: 'Representacion 1' },
        { id: '2', nombre: 'Representacion 2' }
      ]))
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RepresentacionFederalComponent,CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
      providers: [
        { provide: RepresentacionfederalService, useValue: SERVICE_MOCK }
      ]
    }).compileComponents();

    service = TestBed.inject(RepresentacionfederalService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentacionFederalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.formularioRepresentacionFederalForm).toBeDefined();
    expect(component.formularioRepresentacionFederalForm.get('solicitudEntidadFederativaEntidadClave')?.value).toBe('');
    expect(component.formularioRepresentacionFederalForm.get('unidadAdministrativaClave')?.value).toBe('');
  });

  it('should fetch and set entidades de frontera on init', () => {
    component.ngOnInit();
    expect(service.getEntidadFederativa).toHaveBeenCalled();
    expect(component.entidadesFrontera.length).toBe(2);
  });

  it('should fetch and set representacion federal options when entidad federativa changes', () => {
    component.onEntidadFederativaChange({ id: '1' });
    expect(service.getRepresentacionfederal).toHaveBeenCalledWith('1');
    expect(component.representacionFederalOptions.length).toBe(2);
  });

  it('should clear representacion federal options when entidad federativa is -1', () => {
    component.onEntidadFederativaChange('-1');
    expect(component.representacionFederalOptions.length).toBe(0);
  });

  it('should complete destroyed$ subject on destroy', () => {
    spyOn(component['destroyed$'], 'next');
    spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(component['destroyed$'].next).toHaveBeenCalled();
    expect(component['destroyed$'].complete).toHaveBeenCalled();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SociedadesTablaComponent } from './sociedades-tabla.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EsquemaDeCertificacionService } from '../../services/esquema-de-certificacion.service';
import { Tramite32612Store } from '../../estados/solicitud32612.store';
import { Tramite32612Query } from '../../estados/solicitud32612.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

describe('SociedadesTablaComponent', () => {
  let component: SociedadesTablaComponent;
  let fixture: ComponentFixture<SociedadesTablaComponent>;
  let esquemaDeCertificacionSvc: any;
  let tramite32612Store: any;
  let tramite32612Query: any;
  let consultaioQuery: any;
  let modalService: any;

  beforeEach(async () => {
    esquemaDeCertificacionSvc = jasmine.createSpyObj('EsquemaDeCertificacionService', [
      'getSociedadesTablaDatos',
      'getDatosDeLasInstalaciones'
    ]);
    tramite32612Store = jasmine.createSpyObj('Tramite32612Store', ['setDynamicFieldValue']);
    tramite32612Query = jasmine.createSpyObj('Tramite32612Query', ['selectSolicitude$']);
    consultaioQuery = jasmine.createSpyObj('ConsultaioQuery', ['selectConsultaioState$']);
    (consultaioQuery.selectConsultaioState$ as jasmine.Spy).and.returnValue(of({ readonly: false }));
    modalService = jasmine.createSpyObj('BsModalService', ['show']);

    await TestBed.configureTestingModule({
      imports: [SociedadesTablaComponent],
      providers: [
        { provide: EsquemaDeCertificacionService, useValue: esquemaDeCertificacionSvc },
        { provide: Tramite32612Store, useValue: tramite32612Store },
        { provide: Tramite32612Query, useValue: tramite32612Query },
        { provide: ConsultaioQuery, useValue: consultaioQuery },
        { provide: BsModalService, useValue: modalService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SociedadesTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSociedadesTabla and set sociedadesDatos', () => {
    const mockSociedades = [{ id: 1, nombre: 'Sociedad 1' }];
    esquemaDeCertificacionSvc.getSociedadesTablaDatos.and.returnValue(of(mockSociedades));
    component.getSociedadesTabla();
    expect(component.sociedadesDatos).toEqual(mockSociedades);
  });

  it('should call getDatosDeLasInstalacionesDatos and set instalacionesDatos', () => {
    const mockInstalaciones = [{ id: 1, nombre: 'Instalacion 1' }];
    esquemaDeCertificacionSvc.getDatosDeLasInstalaciones.and.returnValue(of(mockInstalaciones));
    component.getDatosDeLasInstalacionesDatos();
    expect(component.instalacionesDatos).toEqual(mockInstalaciones);
  });

  it('should open modal when abrirModal is called', () => {
    const template = {} as TemplateRef<void>;
    modalService.show.and.returnValue({} as BsModalRef);
    component.abrirModal(template);
    expect(modalService.show).toHaveBeenCalledWith(template, { class: 'modal-lg' });
    expect(component.modalRef).toBeDefined();
  });

  it('should emit value change', () => {
    const event = { campo: 'testCampo', valor: 'testValor' };
    component.emitirCambioDeValor(event);
    expect(tramite32612Store.setDynamicFieldValue).toHaveBeenCalledWith('testCampo', 'testValor');
  });

  it('should clean up on destroy', () => {
    const spy = spyOn((component as any).destroyNotifier$, 'next');
    const spyComplete = spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('should return agregarSociedadesFormGroup', () => {
    expect(component.agregarSociedadesFormGroup).toBeInstanceOf(FormGroup);
  });

  it('should return agregarFormGroup', () => {
    expect(component.agregarFormGroup).toBeInstanceOf(FormGroup);
  });

  it('should return indiqueSiDatos', () => {
    expect(component.indiqueSiDatos).toBeInstanceOf(FormGroup);
  });

  it('should return modificarFormGroup', () => {
    expect(component.modificarFormGroup).toBeInstanceOf(FormGroup);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { DatosDelDestinatarioComponent } from './datos-del-destinatario.component';
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';
import { Tramite110209Store } from '../../estados/stores/tramite110209.store';
import { of, Subject } from 'rxjs';

describe('DatosDelDestinatarioComponent', () => {
  let component: DatosDelDestinatarioComponent;
  let fixture: ComponentFixture<DatosDelDestinatarioComponent>;
  let tramite110209Query: Tramite110209Query;
  let tramite110209Store: Tramite110209Store;

  beforeEach(async () => {
    const tramite110209QueryMock = {
      selectTramite110102$: of({
        nombre: 'John',
        primerApellido: 'Doe',
        segundoApellido: 'Smith',
        numeroDeRegistroFiscal: '123456789',
        razonSocial: 'Empresa S.A.'
      })
    };

    const tramite110209StoreMock = {
      setNombre: jest.fn(),
      setPrimerApellido: jest.fn(),
      setSegundoApellido: jest.fn(),
      setNumeroDeRegistroFiscal: jest.fn(),
      setRazonSocial: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule,DatosDelDestinatarioComponent, ReactiveFormsModule, TituloComponent],
      providers: [
        { provide: Tramite110209Query, useValue: tramite110209QueryMock },
        { provide: Tramite110209Store, useValue: tramite110209StoreMock }
      ]
    }).compileComponents();

    tramite110209Query = TestBed.inject(Tramite110209Query);
    tramite110209Store = TestBed.inject(Tramite110209Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDelDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.detosDelDestinatarioForm).toBeDefined();
    expect(component.detosDelDestinatarioForm.get('nombre')?.value).toBe('');
    expect(component.detosDelDestinatarioForm.get('primerApellido')?.value).toBe('');
    expect(component.detosDelDestinatarioForm.get('segundoApellido')?.value).toBe('');
    expect(component.detosDelDestinatarioForm.get('numeroDeRegistroFiscal')?.value).toBe('');
    expect(component.detosDelDestinatarioForm.get('razonSocial')?.value).toBe('');
  });

  it('should fetch and set form values from store on init', () => {
    component.ngOnInit();
    expect(component.detosDelDestinatarioForm.get('nombre')?.value).toBe('John');
    expect(component.detosDelDestinatarioForm.get('primerApellido')?.value).toBe('Doe');
    expect(component.detosDelDestinatarioForm.get('segundoApellido')?.value).toBe('Smith');
    expect(component.detosDelDestinatarioForm.get('numeroDeRegistroFiscal')?.value).toBe('123456789');
    expect(component.detosDelDestinatarioForm.get('razonSocial')?.value).toBe('Empresa S.A.');
  });

  it('should set values in store when setValoresStore is called', () => {
    component.setValoresStore(component.detosDelDestinatarioForm, 'nombre', 'setNombre');
    expect(tramite110209Store.setNombre).toHaveBeenCalledWith('');

    component.detosDelDestinatarioForm.get('nombre')?.setValue('John');
    component.setValoresStore(component.detosDelDestinatarioForm, 'nombre', 'setNombre');
    expect(tramite110209Store.setNombre).toHaveBeenCalledWith('John');
  });

  it('should complete destroyed$ subject on destroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
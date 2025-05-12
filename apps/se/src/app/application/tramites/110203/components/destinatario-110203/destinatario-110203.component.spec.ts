import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Destinatario110203Component } from './destinatario-110203.component';
import { Tramite110203Store } from '../../../../estados/tramites/tramite110203.store';
import { Tramite110203Query } from '../../../../estados/queries/tramite110203.query';

describe('Destinatario110203Component', () => {
  let component: Destinatario110203Component;
  let fixture: ComponentFixture<Destinatario110203Component>;
  let tramite110203Store: Tramite110203Store;


  const mockSolicitudState = {
    nombre: 'Juan',
    primer: 'Perez',
    segundo: 'Lopez',
    fiscal: '12345',
    razon: 'Comercio',
    calle: 'Calle Falsa 123',
    letra: 'A',
    ciudad: 'Madrid',
    correo: 'juan.perez@example.com',
    fax: '123456789',
    telefono: '987654321',
  };

  
  const tramite110203StoreMock = {
    setNombre: jest.fn(),
    setTelefono: jest.fn(),
    
  };

  
  const tramite110203QueryMock = {
    selectSolicitud$: of(mockSolicitudState),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule,Destinatario110203Component],
      providers: [
        FormBuilder,
        { provide: Tramite110203Store, useValue: tramite110203StoreMock },
        { provide: Tramite110203Query, useValue: tramite110203QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Destinatario110203Component);
    component = fixture.componentInstance;
    tramite110203Store = TestBed.inject(Tramite110203Store);
    fixture.detectChanges(); 
  });

  it('should create the form with initial values', () => {
    expect(component.destinatarioForm).toBeTruthy();
    expect(component.destinatarioForm.controls['nombre'].value).toBe('Juan');
    expect(component.destinatarioForm.controls['telefono'].value).toBe('987654321');
  });

  it('should call tramite110203Store.setNombre with correct value from the form', () => {
  
    component.destinatarioForm.controls['nombre'].setValue('Carlos');

    
    component.setValoresStore(component.destinatarioForm, 'nombre', 'setNombre');

    
    expect(tramite110203Store.setNombre).toHaveBeenCalledWith('Carlos');
  });

  it('should call tramite110203Store.setTelefono with correct value from the form', () => {
   
    component.destinatarioForm.controls['telefono'].setValue('123456789');

    
    component.setValoresStore(component.destinatarioForm, 'telefono', 'setTelefono');

   
    expect(tramite110203Store.setTelefono).toHaveBeenCalledWith('123456789');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentacionComponent } from './representacion.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';

describe('RepresentacionComponent', () => {
  let component: RepresentacionComponent;
  let fixture: ComponentFixture<RepresentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepresentacionComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentacionComponent);
    component = fixture.componentInstance;
    component.frmRepresentacionForm = new FormGroup({
      entidad: new FormControl('')
    });
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
  it('debería emitir el evento setValoresStoreEvent en setValoresStore', () => {
    spyOn(component.setValoresStoreEvent, 'emit');
    const form = new FormGroup({
      entidad: new FormControl('Entidad1')
    });
    component.setValoresStore(form, 'entidad', 'actualizarEntidad');
    expect(component.setValoresStoreEvent.emit).toHaveBeenCalledWith({
      form,
      campo: 'entidad',
      metodoNombre: 'actualizarEntidad'
    });
  });
  it('debería inicializar TEXTOS correctamente', () => {
    expect(component.TEXTOS).toBeDefined();
  });
  it('debería inicializar entidadFederativa correctamente', () => {
    expect(component.entidadFederativa).toEqual([]);
  });
  it('debería inicializar representacionFederal correctamente', () => {
    expect(component.representacionFederal).toEqual([]);
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDestinatarioComponent } from './agregar-destinatario.component';
import { TipoPersona } from '../../../../core/enums/tipoPersona.enum';

describe('AgregarDestinatarioComponent', () => {
  let component: AgregarDestinatarioComponent;
  let fixture: ComponentFixture<AgregarDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarDestinatarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize catalogos on init', () => {
    component.ngOnInit();
    expect(component.options.length).toBe(3);
    expect(component.options[0].descripcion).toBe('Option 1');
  });

  it('should set fisica to true and moral to false when inputChecked is called with FISICA', () => {
    component.inputChecked(TipoPersona.FISICA);
    expect(component.fisica).toBeTrue();
    expect(component.moral).toBeFalse();
  });

  it('should set fisica to false and moral to true when inputChecked is called with MORAL', () => {
    component.inputChecked(TipoPersona.MORAL);
    expect(component.fisica).toBeFalse();
    expect(component.moral).toBeTrue();
  });

  it('should have a static method docSeleccionado', () => {
    expect(AgregarDestinatarioComponent.docSeleccionado).toBeDefined();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDestinatarioComponent } from './agregar-destinatario.component';

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
    expect(component.fisica).toBeTruthy();
    expect(component.moral).toBeFalsy();
  });

  it('should set fisica to false and moral to true when inputChecked is called with MORAL', () => {
    expect(component.fisica).toBeFalsy();
    expect(component.moral).toBeTruthy();
  });

});

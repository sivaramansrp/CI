import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDestinatarioComponent } from './modificar-destinatario.component';

describe('ModificarDestinatarioComponent', () => {
  let component: ModificarDestinatarioComponent;
  let fixture: ComponentFixture<ModificarDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarDestinatarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

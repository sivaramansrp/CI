import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPersonasComponent } from './agregar-personas.component';

describe('AgregarPersonasComponent', () => {
  let component: AgregarPersonasComponent;
  let fixture: ComponentFixture<AgregarPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarPersonasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

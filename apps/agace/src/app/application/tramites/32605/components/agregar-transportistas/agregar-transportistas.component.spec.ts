import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTransportistasComponent } from './agregar-transportistas.component';

describe('AgregarTransportistasComponent', () => {
  let component: AgregarTransportistasComponent;
  let fixture: ComponentFixture<AgregarTransportistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarTransportistasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarTransportistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

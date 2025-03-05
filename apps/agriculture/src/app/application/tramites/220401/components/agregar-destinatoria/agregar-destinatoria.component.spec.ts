import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDestinatoriaComponent } from './agregar-destinatoria.component';

describe('AgregarDestinatoriaComponent', () => {
  let component: AgregarDestinatoriaComponent;
  let fixture: ComponentFixture<AgregarDestinatoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarDestinatoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarDestinatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

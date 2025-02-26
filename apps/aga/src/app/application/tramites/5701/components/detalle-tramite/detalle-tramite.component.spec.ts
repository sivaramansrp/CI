import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTramiteComponent } from './detalle-tramite.component';

describe('DetalleTramiteComponent', () => {
  let component: DetalleTramiteComponent;
  let fixture: ComponentFixture<DetalleTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleTramiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

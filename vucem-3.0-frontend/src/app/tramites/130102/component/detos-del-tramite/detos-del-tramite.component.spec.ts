import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetosDelTramiteComponent } from './detos-del-tramite.component';

describe('DetosDelTramiteComponent', () => {
  let component: DetosDelTramiteComponent;
  let fixture: ComponentFixture<DetosDelTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetosDelTramiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetosDelTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

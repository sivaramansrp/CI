import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosComunesComponent } from './datos-comunes.component';

describe('DatosComunesComponent', () => {
  let component: DatosComunesComponent;
  let fixture: ComponentFixture<DatosComunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComunesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosComunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

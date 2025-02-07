import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDeLaComponent } from './datos-de-la.component';

describe('DatosDeLaComponent', () => {
  let component: DatosDeLaComponent;
  let fixture: ComponentFixture<DatosDeLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosDeLaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosDeLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

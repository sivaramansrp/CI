import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetosDelLaComponent } from './detos-del-la.component';

describe('DetosDelLaComponent', () => {
  let component: DetosDelLaComponent;
  let fixture: ComponentFixture<DetosDelLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetosDelLaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetosDelLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

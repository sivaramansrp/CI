import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAvisoComponent } from './manual-aviso.component';

describe('ManualAvisoComponent', () => {
  let component: ManualAvisoComponent;
  let fixture: ComponentFixture<ManualAvisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManualAvisoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManualAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

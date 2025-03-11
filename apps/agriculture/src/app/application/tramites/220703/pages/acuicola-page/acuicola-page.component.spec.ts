import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcuicolaPageComponent } from './acuicola-page.component';

describe('AcuicolaPageComponent', () => {
  let component: AcuicolaPageComponent;
  let fixture: ComponentFixture<AcuicolaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcuicolaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcuicolaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

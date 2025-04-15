import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SustanciasQuimicasComponent } from './sustancias-quimicas.component';

describe('SustanciasQuimicasComponent', () => {
  let component: SustanciasQuimicasComponent;
  let fixture: ComponentFixture<SustanciasQuimicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SustanciasQuimicasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SustanciasQuimicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

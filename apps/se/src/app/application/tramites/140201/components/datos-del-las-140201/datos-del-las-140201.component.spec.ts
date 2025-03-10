import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelLas140201Component } from './datos-del-las-140201.component';

describe('DatosDelLas140201Component', () => {
  let component: DatosDelLas140201Component;
  let fixture: ComponentFixture<DatosDelLas140201Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelLas140201Component],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelLas140201Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

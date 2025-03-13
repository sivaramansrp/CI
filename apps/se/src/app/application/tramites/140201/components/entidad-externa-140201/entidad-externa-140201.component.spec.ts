import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntidadExterna140201Component } from './entidad-externa-140201.component';

describe('EntidadExterna140201Component', () => {
  let component: EntidadExterna140201Component;
  let fixture: ComponentFixture<EntidadExterna140201Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntidadExterna140201Component],
    }).compileComponents();

    fixture = TestBed.createComponent(EntidadExterna140201Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

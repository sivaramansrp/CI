import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcesoCompletoComponent } from './proceso-completo.component';

describe('ProcesoCompletoComponent', () => {
  let component: ProcesoCompletoComponent;
  let fixture: ComponentFixture<ProcesoCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoCompletoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcesoCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

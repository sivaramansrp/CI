import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcesoProductivoComponent } from './proceso-productivo.component';

describe('ProcesoProductivoComponent', () => {
  let component: ProcesoProductivoComponent;
  let fixture: ComponentFixture<ProcesoProductivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoProductivoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcesoProductivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

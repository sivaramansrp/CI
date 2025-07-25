import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisoPorFusionComponent } from './aviso-por-fusion.component';

describe('AvisoPorFusionComponent', () => {
  let component: AvisoPorFusionComponent;
  let fixture: ComponentFixture<AvisoPorFusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisoPorFusionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoPorFusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

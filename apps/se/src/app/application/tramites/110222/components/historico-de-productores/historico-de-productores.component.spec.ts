import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricoDeProductoresComponent } from './historico-de-productores.component';

describe('HistoricoDeProductoresComponent', () => {
  let component: HistoricoDeProductoresComponent;
  let fixture: ComponentFixture<HistoricoDeProductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoDeProductoresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricoDeProductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

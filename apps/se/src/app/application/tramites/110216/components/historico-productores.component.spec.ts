import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricoRoductoresComponent } from './historico-productores.component';

describe('HistoricoRoductoresComponent', () => {
  let component: HistoricoRoductoresComponent;
  let fixture: ComponentFixture<HistoricoRoductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoRoductoresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricoRoductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

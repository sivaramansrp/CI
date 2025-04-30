import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcluirRelacionComponent } from './concluir-relacion.component';

describe('ConcluirRelacionComponent', () => {
  let component: ConcluirRelacionComponent;
  let fixture: ComponentFixture<ConcluirRelacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcluirRelacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConcluirRelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

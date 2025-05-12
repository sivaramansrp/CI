import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiamanteBrutoComponent } from './diamante-bruto.component';

describe('DiamanteBrutoComponent', () => {
  let component: DiamanteBrutoComponent;
  let fixture: ComponentFixture<DiamanteBrutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiamanteBrutoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiamanteBrutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

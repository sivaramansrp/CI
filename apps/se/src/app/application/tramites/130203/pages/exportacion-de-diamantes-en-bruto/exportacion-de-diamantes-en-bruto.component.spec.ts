import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportacionDeDiamantesEnBrutoComponent } from './exportacion-de-diamantes-en-bruto.component';

describe('ExportacionDeDiamantesEnBrutoComponent', () => {
  let component: ExportacionDeDiamantesEnBrutoComponent;
  let fixture: ComponentFixture<ExportacionDeDiamantesEnBrutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportacionDeDiamantesEnBrutoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportacionDeDiamantesEnBrutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

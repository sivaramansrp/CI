import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportacionMineralesDeHierroComponent } from './exportacion-minerales-de-hierro.component';

describe('ExportacionMineralesDeHierroComponent', () => {
  let component: ExportacionMineralesDeHierroComponent;
  let fixture: ComponentFixture<ExportacionMineralesDeHierroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportacionMineralesDeHierroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportacionMineralesDeHierroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

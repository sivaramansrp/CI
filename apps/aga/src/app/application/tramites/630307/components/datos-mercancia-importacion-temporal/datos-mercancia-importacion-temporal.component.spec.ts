import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosMercanciaImportacionTemporalComponent } from './datos-mercancia-importacion-temporal.component';

describe('DatosMercanciaImportacionTemporalComponent', () => {
  let component: DatosMercanciaImportacionTemporalComponent;
  let fixture: ComponentFixture<DatosMercanciaImportacionTemporalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosMercanciaImportacionTemporalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      DatosMercanciaImportacionTemporalComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

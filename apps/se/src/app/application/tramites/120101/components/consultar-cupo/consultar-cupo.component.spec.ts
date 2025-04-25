import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarCupoComponent } from './consultar-cupo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConsultarCupoComponent', () => {
  let component: ConsultarCupoComponent;
  let fixture: ComponentFixture<ConsultarCupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarCupoComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarCupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should complete destroy$ on destroy', () => {
    const completeSpy = jest.spyOn(component.destroy$, 'complete');
    const nextSpy = jest.spyOn(component.destroy$, 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});

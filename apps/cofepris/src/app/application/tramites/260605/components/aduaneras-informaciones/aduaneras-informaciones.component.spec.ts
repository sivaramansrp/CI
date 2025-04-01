import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AduanerasInformacionesComponent } from './aduaneras-informaciones.component';
import { ModificatNoticeService } from '../../services/modificat-notice.service';
import { of } from 'rxjs';

describe('AduanerasInformacionesComponent', () => {
  let component: AduanerasInformacionesComponent;
  let fixture: ComponentFixture<AduanerasInformacionesComponent>;
  let modificatNoticeServiceMock: jest.Mocked<ModificatNoticeService>;

  beforeEach(async () => {
    modificatNoticeServiceMock = {
      obteneraduanasDisponiblesdatos: jest.fn().mockReturnValue(of([{ id: 1, name: 'Aduana 1' }, { id: 2, name: 'Aduana 2' }])),
    } as unknown as jest.Mocked<ModificatNoticeService>;

    await TestBed.configureTestingModule({
      imports: [
        AduanerasInformacionesComponent, // Import the standalone component
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        { provide: ModificatNoticeService, useValue: modificatNoticeServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AduanerasInformacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería obtener las aduanas disponibles desde el servicio', () => {
    component.obteneraduanasDisponiblesdatos();
    expect(modificatNoticeServiceMock.obteneraduanasDisponiblesdatos).toHaveBeenCalled();
    expect(component.aduanasDisponibles).toEqual([{ id: 1, name: 'Aduana 1' }, { id: 2, name: 'Aduana 2' }]);
  });
});

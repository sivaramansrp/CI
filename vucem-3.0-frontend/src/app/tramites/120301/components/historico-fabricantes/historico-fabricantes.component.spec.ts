import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HistoricoFabricantesComponent } from './historico-fabricantes.component';
import { HistoricoFabricantesService } from '../../../../core/services/120301/historico-fabricantes/historico-fabricantes.service';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';

describe('HistoricoFabricantesComponent', () => {
  let component: HistoricoFabricantesComponent;
  let fixture: ComponentFixture<HistoricoFabricantesComponent>;
  let historicoFabricantesService: HistoricoFabricantesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        TableComponent,
        TituloComponent,
        InputRadioComponent
      ],
      declarations: [HistoricoFabricantesComponent],
      providers: [HistoricoFabricantesService]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricoFabricantesComponent);
    component = fixture.componentInstance;
    historicoFabricantesService = TestBed.inject(HistoricoFabricantesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on init', () => {
    const mockData = {
      fabricantesNacionales: [
        { tbodyData: ['LAURA CONTRERAS', 'AEVL621207B95', 'SAN GABRIEL 144 DURANGO', 'laura2992@hotmail.com', '044-6182999535'] }
      ],
      fabricantesDatos: [
        { tbodyData: ['LUIS AMBROSIO MARTINEZ VALENZUELA', 'MAVL621207C95', 'SAN GABRIEL 144 DURANGO', 'arual2992@hotmail.com', '044-6182999535'] }
      ]
    };
    spyOn(historicoFabricantesService, 'getDatos').and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.fabricantesNacionales).toEqual(mockData.fabricantesNacionales);
    expect(component.fabricantesDatos).toEqual(mockData.fabricantesDatos);
  });

  it('should handle error while fetching data', () => {
    spyOn(historicoFabricantesService, 'getDatos').and.returnValue(of({}));

    component.ngOnInit();

    expect(component.fabricantesNacionales).toEqual([]);
    expect(component.fabricantesDatos).toEqual([]);
  });
});

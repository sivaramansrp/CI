import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricoFabricantesComponent } from './historico-fabricantes.component';
import { HistoricoFabricantesService } from '../../services/historico-fabricantes/historico-fabricantes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InputRadioComponent } from 'libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

import { of } from 'rxjs';

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
  });

  it('should handle error while fetching data', () => {
    spyOn(historicoFabricantesService, 'getDatos').and.returnValue(of({}));

    component.ngOnInit();

    expect(component.fabricantesNacionales).toEqual([]);
  });
});
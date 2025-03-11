import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConstanciaDelRegistroComponent } from './constancia-del-registro.component';
import { ConstanciaDelRegistroService } from '../../services/constancia-del-registro/constancia-del-registro.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { of } from 'rxjs';

describe('ConstanciaDelRegistroComponent', () => {
  let component: ConstanciaDelRegistroComponent;
  let fixture: ComponentFixture<ConstanciaDelRegistroComponent>;
  let constanciaDelRegistroService: ConstanciaDelRegistroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        TableComponent,
        TituloComponent
      ],
      declarations: [ConstanciaDelRegistroComponent],
      providers: [ConstanciaDelRegistroService]
    }).compileComponents();

    fixture = TestBed.createComponent(ConstanciaDelRegistroComponent);
    component = fixture.componentInstance;
    constanciaDelRegistroService = TestBed.inject(ConstanciaDelRegistroService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on init', () => {
    const mockData = {
      federal: [
        { tbodyData: ['Prueba107112024', 'RAZON SOCIAL CONSIGNATARIO CONSIGNATARIO', 'CALLE', 'SAN GABRIEL 144 DURANGO', 'SAN GABRIEL', '2024-11-07 00:00:00.0'] },
        { tbodyData: ['3434324', 'FACTURA', 'CALLE', 'SAN GABRIEL 144 DURANGO', 'SAN GABRIEL', '2024-11-07 00:00:00.0'] }
      ]
    };
    spyOn(constanciaDelRegistroService, 'getFederal').and.returnValue(of(mockData));

    component.ngOnInit();
  });
});

import { TestBed } from '@angular/core/testing';
import { modificarTerrestreService } from './modificacar-terrestre.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('modificarTerrestreService', () => {
	let service: modificarTerrestreService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [modificarTerrestreService]
		});
		service = TestBed.inject(modificarTerrestreService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

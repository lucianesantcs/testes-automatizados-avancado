import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { PhotoBoardService } from "./photo-board.service";

const mockedData = {
  api: 'http://localhost:3000/photos', // deve ser a mesma chamada da api verdadeira
  data: [
    {
      id: 1,
      description: 'example 1',
      src: ''
    },
    {
      id: 2,
      description: 'example 2',
      src: ''
    }
  ]
}

describe(PhotoBoardService.name, () => {
  let service: PhotoBoardService;
  let httpController: HttpTestingController; // controlador de http

  beforeEach(async () => {
      await TestBed.configureTestingModule({
          imports: [HttpClientTestingModule], // sobrescreve o HttpClientModule do angular
          providers: [PhotoBoardService]
      }).compileComponents;

      service = TestBed.inject(PhotoBoardService);
      httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // verifica se tem alguma requisição feita que não tenha uma resposta, 
    // caso não tenha match no expectOne
    httpController.verify();
  });

  it(`${PhotoBoardService.prototype.getPhotos.name} 
    should return photos with description in uppercase`, done => {
    service.getPhotos().subscribe(photos => {
      expect(photos[0].description).toBe('EXAMPLE 1');
      expect(photos[1].description).toBe('EXAMPLE 2');
      done();
    });
    httpController.expectOne(mockedData.api).flush(mockedData.data);
  });
})
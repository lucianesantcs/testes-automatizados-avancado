import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { PhotoBoardService } from "src/app/shared/components/photo-board/services/photo-board.service";
import { buildPhotoList } from "src/app/shared/components/photo-board/test/build-photo-list";
import { PhotoListComponent } from "./photo-list.component";
import { PhotoListModule } from "./photo-list.module";

describe(PhotoListComponent.name, () => {
  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;
  let service: PhotoBoardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoListModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PhotoBoardService); // importa o serviço contanto que esteja 
    // disponivel como provider do teste module ou como provider de algum module importado
  });

  it("Should create component", () => {
    expect(component).toBeTruthy();
  });

  // testes do DOM
  it("Should display board when data arrives", () => {
    const photos = buildPhotoList();
    spyOn(service, 'getPhotos').and.returnValue(of(photos));

    // detectChanges deve ser chamado depois do spy (modificar o serviço), 
    // se chamar primeiro o ngOnInit é disparado sem a modificação do serviço
    fixture.detectChanges(); 

    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');

    expect(board).withContext('Should display board').not.toBeNull(); // se tiver dado, o elemento existe
    expect(loader).withContext('Should not display loader').toBeNull(); // se tiver dado, o loader não deve ser mostrado
  });

  it("Should display loader while waiting for data", () => {
    const photos = buildPhotoList();
    spyOn(service, 'getPhotos').and.returnValue(null); // força a inexistência de dados
    fixture.detectChanges();

    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');

    expect(board).withContext('Should not display board').toBeNull(); // se não tiver dado, board não deve ser exibido
    expect(loader).withContext('Should display loader').not.toBeNull(); // se não tiver dado, o loader deve ser mostrado
  });
});

import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { Photo } from "src/app/shared/components/photo-board/interfaces/photo";
import { PhotoBoardMockService } from "src/app/shared/components/photo-board/services/photo-board-mock.service";
import { PhotoBoardService } from "src/app/shared/components/photo-board/services/photo-board.service";
import { buildPhotoList } from "src/app/shared/components/photo-board/test/build-photo-list";
import { PhotoListComponent } from "./photo-list.component";
import { PhotoListModule } from "./photo-list.module";

describe(PhotoListComponent.name + ' alternative - Mock Provider', () => {
  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoListModule, HttpClientModule],
      providers: [
        {
          provide: PhotoBoardService, // quando for injetado, não irá usar o método original
          // e sim o método do getPhotos do useValue
          useClass: PhotoBoardMockService // importa o serviço de mock
          // useValue: {
          //   getPhotos(): Observable<Photo[]> { // se passa pelo objeto buildPhotoList
          //     return of(buildPhotoList());
          //   }
          // }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
  });

  it("Should display board when data arrives", () => {
    fixture.detectChanges(); 

    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');

    expect(board).withContext('Should display board').not.toBeNull(); // se tiver dado, o elemento existe
    expect(loader).withContext('Should not display loader').toBeNull(); // se tiver dado, o loader não deve ser mostrado
  });
});

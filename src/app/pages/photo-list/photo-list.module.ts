import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoBoardModule } from 'src/app/shared/components/photo-board/photo-board.module';
import { PhotoListComponent } from './photo-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [PhotoListComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PhotoBoardModule
  ],
  exports: [PhotoListComponent]
})
export class PhotoListModule { }

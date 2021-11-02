import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-photo-frame',
    templateUrl: 'photo-frame.component.html',
    styleUrls: ['photo-frame.component.scss']
})

export class PhotoFrameComponent implements OnInit, OnDestroy {
    @Input() public description = '';
    @Input() public src = '';
    @Input() public likes = 0;
    @Output() public liked = new EventEmitter<void>();
    private debounceSubject = new Subject<void>();
    private unsubscribe = new Subject<void>();

    constructor() { }

    public like(): void {
        this.debounceSubject.next();
    }

    ngOnDestroy(): void {
        this.unsubscribe?.next();
        this.unsubscribe?.complete();
    }

    ngOnInit() {
        this.debounceSubject
        .asObservable()
        .pipe(debounceTime(500))
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(() => this.liked.emit());
    }
}

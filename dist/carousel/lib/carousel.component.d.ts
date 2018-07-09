import { ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
export declare class CarouselComponent implements OnInit {
    private elRef;
    private renderer;
    avatarSelected: EventEmitter<string>;
    start: {
        t: any;
        x: any;
        y: any;
    };
    end: {
        x: any;
        y: any;
    };
    tracking: boolean;
    thresholdTime: number;
    thresholdDistance: number;
    constructor(elRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    gestureStart(o: any, e: any): void;
    gestureMove(o: any, e: any): void;
    gestureEnd(o: any, e: any): void;
    moveToSelected(element: any): void;
}

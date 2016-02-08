///<reference path="..\..\..\lib\typings\tsd.d.ts"/>

interface IPixiAnimation {
    Update(elapsedMs: number): void;
    IsCompleted: boolean;
    OnCompleted: () => void;
}

class PixiAnimationBase {
    Entity: PIXI.DisplayObject;
    IsCompleted: boolean;
    protected durationRemains: number;
    OnCompleted: () => void;

    constructor(entity: PIXI.DisplayObject, durationInMs: number, onCompleted: () => void) {
        if (entity == null) {
            throw 'Entity is null';
        }
        this.Entity = entity;
        this.OnCompleted = onCompleted;
        this.durationRemains = durationInMs;
        this.IsCompleted = false;
    }
}

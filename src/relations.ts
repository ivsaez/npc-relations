import { Familiar, RelationMetrics } from ".";

export enum RelationKind{
    Neutral,
    Friend,
    Enemy,
    Lover,
    ExLover,
    Sexy,
    UnSexy,
    Marriaged,
    UnMarriaged,
    Platonic,
    ExPlatonic,
    FuckFriend,
    UnFuckEnemy,
    Best,
    Worst,
    Frienzoned,
    HatefullSexy
}

const PonderateGoodLimit = 55;
const PonderateBadLimit = 45;
const PositiveLimit = 60;
const NegativeLimit = 40;

export class Relation{
    private _metrics: RelationMetrics;
    private _purity: RelationMetrics;
    private _familiar: Familiar;

    constructor(
        friendship: number, 
        love: number, 
        sex: number,
        familiarity: Familiar = Familiar.None,
        purity: boolean = false){
        this._metrics = new RelationMetrics(friendship, love, sex);
        this._familiar = familiarity;
        if(purity) this._purity = new RelationMetrics(friendship, love, sex);
    }

    get metrics(){
        return this._metrics;
    }

    get familiarity(){
        return this._familiar;
    }

    ponderatedValue(): number{
        return (this.metrics.friendship + this.metrics.love + this.metrics.sex) / 3;
    }

    isPonderatedGood(): boolean{
        return this.ponderatedValue() > PonderateGoodLimit;
    }

    isPonderatedBad(): boolean{
        return this.ponderatedValue() < PonderateBadLimit;
    }

    isPonderatedNeutral(): boolean{
        let ponderation = this.ponderatedValue();
        return ponderation >= PonderateBadLimit && ponderation <= PonderateGoodLimit;
    }

    isFamiliar(): boolean{
        return this._familiar !== Familiar.None;
    }

    isFriend(): boolean{
        return this._metrics.friendship > PositiveLimit;
    }

    isLover(): boolean{
        return this._metrics.love > PositiveLimit;
    }

    isSexy(): boolean{
        return this._metrics.sex > PositiveLimit;
    }

    isEnemy(): boolean{
        return this._metrics.friendship < NegativeLimit;
    }

    isExlover(): boolean{
        return this._metrics.love < NegativeLimit;
    }

    isAntisexy(): boolean{
        return this._metrics.sex < NegativeLimit;
    }

    normalize(){
        if(!this.isPure()) return;

        if (this._metrics.friendship > this._purity.friendship) this._metrics.increaseFriendship();
        else this._metrics.decreaseFriendship();

        if (this._metrics.love > this._purity.love) this._metrics.increaseLove();
        else this._metrics.decreaseLove();

        if (this._metrics.sex > this._purity.sex) this._metrics.increaseSex();
        else this._metrics.decreaseSex();
    }

    copy(): Relation{
        return new Relation(
            this._metrics.friendship,
            this._metrics.love,
            this._metrics.sex,
            this._familiar,
            this.isPure()
        );
    }

    private isPure(): boolean{
        return this._purity !== undefined;
    }
}

export class RelationFactory{
    static get(kind: RelationKind, familiar: Familiar = Familiar.None, purity: boolean = false){
        let friendship: number = 50;
        let love: number = 50;
        let sex: number = 50;

        switch(kind){
            case RelationKind.Friend:
                friendship = 90;
                break;
                
            case RelationKind.Enemy:
                friendship = 10;
                break;
                
            case RelationKind.Lover:
                love = 90;
                break;
                
            case RelationKind.ExLover:
                love = 10;
                break;
                
            case RelationKind.Sexy:
                sex = 90;
                break;
                
            case RelationKind.UnSexy:
                sex = 10;
                break;
                
            case RelationKind.Marriaged:
                friendship = 90;
                love = 90;
                break;
                
            case RelationKind.UnMarriaged:
                friendship = 10;
                love = 10;
                break;
            case RelationKind.Platonic:
                love = 90;
                sex = 90;
                break;
                
            case RelationKind.ExPlatonic:
                love = 10;
                sex = 10;
                break;
                
            case RelationKind.FuckFriend:
                friendship = 90;
                sex = 90;
                break;
                
            case RelationKind.UnFuckEnemy:
                friendship = 10;
                sex = 10;
                break;
                
            case RelationKind.Best:
                friendship = 90;
                love = 90;
                sex = 90;
                break;
                
            case RelationKind.Worst:
                friendship = 10;
                love = 10;
                sex = 10;
                break;
                
            case RelationKind.Frienzoned:
                friendship = 90;
                sex = 10;
                break;
                
            case RelationKind.HatefullSexy:
                friendship = 10;
                sex = 90;
                break;
                
            case RelationKind.Neutral:
                break;
        }

        return new Relation(friendship, love, sex, familiar, purity);
    }
}
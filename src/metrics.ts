import LimitedInt from "limited-int";

const MetricsMax = 100;
const MetricsMin = 0;

export class RelationMetrics{
    private _friendship: LimitedInt;
    private _love: LimitedInt;
    private _sex: LimitedInt;

    constructor(friendship: number = 0, love: number = 0, sex:number = 0){
        this._friendship = new LimitedInt(friendship, MetricsMax, MetricsMin);
        this._love = new LimitedInt(love, MetricsMax, MetricsMin);
        this._sex = new LimitedInt(sex, MetricsMax, MetricsMin);
    }

    get friendship(){
        return this._friendship.value;
    }

    get love(){
        return this._love.value;
    }

    get sex(){
        return this._sex.value;
    }

    set friendship(value){
        this._friendship.value = value;
    }

    set love(value){
        this._love.value = value;
    }

    set sex(value){
        this._sex.value = value;
    }

    increaseFriendship(value: number = 1): void{
        this._friendship.increase(value);
    }

    increaseLove(value: number = 1): void{
        this._love.increase(value);
    }

    increaseSex(value: number = 1): void{
        this._sex.increase(value);
    }

    increaseFriendshipPercentage(percentage: number): void{
        this._friendship.increasePercentage(percentage);
    }

    increaseLovePercentage(percentage: number): void{
        this._love.increasePercentage(percentage);
    }

    increaseSexPercentage(percentage: number): void{
        this._sex.increasePercentage(percentage);
    }

    decreaseFriendship(value: number = 1): void{
        this._friendship.decrease(value);
    }

    decreaseLove(value: number = 1): void{
        this._love.decrease(value);
    }

    decreaseSex(value: number = 1): void{
        this._sex.decrease(value);
    }

    decreaseFriendshipPercentage(percentage: number): void{
        this._friendship.decreasePercentage(percentage);
    }

    decreaseLovePercentage(percentage: number): void{
        this._love.decreasePercentage(percentage);
    }

    decreaseSexPercentage(percentage: number): void{
        this._sex.decreasePercentage(percentage);
    }

    copy(): RelationMetrics{
        return new RelationMetrics(this.friendship, this.love, this.sex);
    }

    private calculatePercentage(value: number, percentage: number): number{
        return (value * percentage) / 100;
    }
}
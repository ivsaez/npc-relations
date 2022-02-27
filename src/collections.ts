import { Relation, RelationFactory, RelationKind } from ".";

export class RelationSet{
    private _relations: Map<string, Relation>;

    constructor(){
        this._relations = new Map<string, Relation>();
    }

    add(npcName: string, relation:Relation): void{
        this._relations.set(npcName, relation);
    }

    append(npcName: string, relation:Relation): RelationSet{
        this._relations.set(npcName, relation);
        return this;
    }

    get knowns(): Set<string>{
        return new Set<string>(this._relations.keys());
    }

    knows(npcName: string): boolean{
        return this._relations.has(npcName);
    }

    get(npcName: string): Relation{
        if (this._relations.has(npcName)) return this._relations.get(npcName);

        var newRelation = RelationFactory.get(RelationKind.Neutral);
        this._relations.set(npcName, newRelation);
        return newRelation;
    }

    normalizeAll(): void{
        this._relations.forEach(relation => relation.normalize());
    }

    copy(): RelationSet{
        let copy = new RelationSet();
        for(let key of this._relations.keys()){
            copy.add(key, this._relations.get(key));
        }
        return copy;
    }
}
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

    knowns(): Set<string>{
        return new Set<string>(Object.keys(this._relations));
    }

    knows(npcName: string){
        return this._relations.has(npcName);
    }

    get(npcName: string){
        if (this._relations.has(npcName)) return this._relations[npcName];

        var newRelation = RelationFactory.get(RelationKind.Neutral);
        this._relations.set(npcName, newRelation);
        return newRelation;
    }

    normalizeAll(): void{
        this._relations.forEach(relation => relation.normalize());
    }

    copy(): RelationSet{
        let copy = new RelationSet();
        Object.keys(this._relations).forEach(name => copy.add(name, this._relations[name]));
        return copy;
    }
}
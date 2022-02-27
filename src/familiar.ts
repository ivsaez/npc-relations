export enum Familiar{
    None,
    Parent,
    BrotherOrSister,
    SonOrDaughter,
    Grandparent,
    UncleOrAunt,
    NephewOrNiece,
    Grandchild,
    Cousin
}

export class FamiliarDomain{
    static opposite(familiar: Familiar): Familiar{
        switch (familiar)
        {
            case Familiar.Grandparent:
                return Familiar.Grandchild;

            case Familiar.BrotherOrSister:
                return Familiar.BrotherOrSister;

            case Familiar.SonOrDaughter:
                return Familiar.Parent;

            case Familiar.NephewOrNiece:
                return Familiar.Grandparent;

            case Familiar.Parent:
                return Familiar.SonOrDaughter;

            case Familiar.Cousin:
                return Familiar.Cousin;

            case Familiar.NephewOrNiece:
                return Familiar.UncleOrAunt;

            case Familiar.UncleOrAunt:
                return Familiar.NephewOrNiece;

            default:
                return Familiar.None;
        }
    }
}
import { Familiar, FamiliarDomain } from "..";

describe("Familiar domain should", () => {
  it("get right opposites", () => {
    expect(FamiliarDomain.opposite(Familiar.None)).toBe(Familiar.None);
    expect(FamiliarDomain.opposite(Familiar.BrotherOrSister)).toBe(Familiar.BrotherOrSister);
    expect(FamiliarDomain.opposite(Familiar.Cousin)).toBe(Familiar.Cousin);
    expect(FamiliarDomain.opposite(Familiar.Grandchild)).toBe(Familiar.Grandparent);
    expect(FamiliarDomain.opposite(Familiar.Grandparent)).toBe(Familiar.Grandchild);
    expect(FamiliarDomain.opposite(Familiar.NephewOrNiece)).toBe(Familiar.UncleOrAunt);
    expect(FamiliarDomain.opposite(Familiar.UncleOrAunt)).toBe(Familiar.NephewOrNiece);
    expect(FamiliarDomain.opposite(Familiar.Parent)).toBe(Familiar.SonOrDaughter);
    expect(FamiliarDomain.opposite(Familiar.SonOrDaughter)).toBe(Familiar.Parent);
  });
});

import { Familiar, Relation, RelationSet } from "..";

describe("Relation set should", () => {
  it("return plain relation if no relation exists", () => {
    let set = new RelationSet();

    expect(set.knows("non existing npc")).toBe(false);

    let relation = set.get("non existing npc");

    expect(relation.ponderatedValue).toBe(50);
  });

  it("return an existing relation", () => {
    let set = new RelationSet();
    set.add("npc", new Relation(20, 30, 40));

    expect(set.knows("npc")).toBe(true);

    let relation = set.get("npc");

    expect(relation.metrics.friendship).toBe(20);
    expect(relation.metrics.love).toBe(30);
    expect(relation.metrics.sex).toBe(40);
  });

  it("return all known npcs", () => {
    let set = new RelationSet();
    set.add("npc1", new Relation(20, 30, 40));
    set.add("npc2", new Relation(20, 30, 40));
    
    expect(set.knows("npc1")).toBe(true);
    expect(set.knows("npc2")).toBe(true);

    let knownNPCs = set.knowns;

    expect(knownNPCs.size).toBe(2);
    expect(knownNPCs.has("npc1")).toBe(true);
    expect(knownNPCs.has("npc2")).toBe(true);
  });

  it("normalize all relations", () => {
    let set = new RelationSet();
    set.add("npc1", new Relation(20, 20, 20, Familiar.None, true));
    set.add("npc2", new Relation(40, 40, 40, Familiar.None, true));
    
    let relation1 = set.get("npc1");
    let relation2 = set.get("npc2");

    relation1.metrics.increaseFriendship(10);
    relation1.metrics.increaseLove(10);
    relation1.metrics.increaseSex(10);
    relation2.metrics.increaseFriendship(10);
    relation2.metrics.increaseLove(10);
    relation2.metrics.increaseSex(10);

    set.normalizeAll();

    expect(relation1.metrics.friendship).toBe(29);
    expect(relation1.metrics.love).toBe(29);
    expect(relation1.metrics.sex).toBe(29);
    expect(relation2.metrics.friendship).toBe(49);
    expect(relation2.metrics.love).toBe(49);
    expect(relation2.metrics.sex).toBe(49);
  });

  it("return a copy", () => {
    let set = new RelationSet();
    set.add("npc1", new Relation(20, 20, 20));
    set.add("npc2", new Relation(40, 40, 40));
    
    let copy = set.copy();

    let relation1 = copy.get("npc1");
    let relation2 = copy.get("npc2");

    expect(relation1.metrics.friendship).toBe(20);
    expect(relation1.metrics.love).toBe(20);
    expect(relation1.metrics.sex).toBe(20);
    expect(relation2.metrics.friendship).toBe(40);
    expect(relation2.metrics.love).toBe(40);
    expect(relation2.metrics.sex).toBe(40);
  });
});

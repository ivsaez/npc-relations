import { Relation, RelationKind, RelationFactory, Familiar } from "..";

describe("Relation should", () => {
  it("create a simple relation", () => {
    let relation = new Relation(10, 20, 30, Familiar.Parent);

    expect(relation.metrics.friendship).toBe(10);
    expect(relation.metrics.love).toBe(20);
    expect(relation.metrics.sex).toBe(30);
    expect(relation.familiarity).toBe(Familiar.Parent);
  });

  it("have ponderated values", () => {
    let relation = new Relation(50, 50, 50);
    expect(relation.ponderatedValue).toBe(50);
    expect(relation.isPonderatedNeutral).toBe(true);
    expect(relation.isPonderatedGood).toBe(false);
    expect(relation.isPonderatedBad).toBe(false);

    relation = new Relation(70, 70, 70);
    expect(relation.ponderatedValue).toBe(70);
    expect(relation.isPonderatedNeutral).toBe(false);
    expect(relation.isPonderatedGood).toBe(true);
    expect(relation.isPonderatedBad).toBe(false);

    relation = new Relation(10, 10, 10);
    expect(relation.ponderatedValue).toBe(10);
    expect(relation.isPonderatedNeutral).toBe(false);
    expect(relation.isPonderatedGood).toBe(false);
    expect(relation.isPonderatedBad).toBe(true);
  });

  it("not normalize if it is not pure", () => {
    let relation = new Relation(50, 50, 50);

    relation.metrics.increaseFriendship(10);
    relation.metrics.increaseLove(10);
    relation.metrics.increaseSex(10);

    relation.normalize();

    expect(relation.metrics.friendship).toBe(60);
    expect(relation.metrics.love).toBe(60);
    expect(relation.metrics.sex).toBe(60);
  });

  it("normalize if it has purity", () => {
    let relation = new Relation(50, 50, 50, Familiar.None, true);

    relation.metrics.increaseFriendship(10);
    relation.metrics.increaseLove(10);
    relation.metrics.increaseSex(10);

    relation.normalize();

    expect(relation.metrics.friendship).toBe(59);
    expect(relation.metrics.love).toBe(59);
    expect(relation.metrics.sex).toBe(59);
  });

  it("indicate relation status", () => {
    let relation = new Relation(90, 90, 90);
    expect(relation.isFriend).toBe(true);
    expect(relation.isLover).toBe(true);
    expect(relation.isSexy).toBe(true);
    expect(relation.isEnemy).toBe(false);
    expect(relation.isExlover).toBe(false);
    expect(relation.isAntisexy).toBe(false);

    relation = new Relation(10, 10, 10);
    expect(relation.isFriend).toBe(false);
    expect(relation.isLover).toBe(false);
    expect(relation.isSexy).toBe(false);
    expect(relation.isEnemy).toBe(true);
    expect(relation.isExlover).toBe(true);
    expect(relation.isAntisexy).toBe(true);
  });

  it("create a relation using the factory", () => {
    let relation = RelationFactory.get(RelationKind.Frienzoned, Familiar.Cousin);
    expect(relation.isFriend).toBe(true);
    expect(relation.isLover).toBe(false);
    expect(relation.isSexy).toBe(false);
    expect(relation.isEnemy).toBe(false);
    expect(relation.isExlover).toBe(false);
    expect(relation.isAntisexy).toBe(true);
    expect(relation.familiarity).toBe(Familiar.Cousin);
  });

  it("copy a relation", () => {
    let relation = new Relation(10, 20, 30, Familiar.Parent);
    let copy = relation.copy();

    expect(copy.metrics.friendship).toBe(10);
    expect(copy.metrics.love).toBe(20);
    expect(copy.metrics.sex).toBe(30);
    expect(copy.familiarity).toBe(Familiar.Parent);
  });
});

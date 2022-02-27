import { RelationMetrics } from "..";

describe("Metrics should", () => {
  it("create right metrics", () => {
    let metrics = new RelationMetrics(10, 20, 30);
    
    expect(metrics.friendship).toBe(10);
    expect(metrics.love).toBe(20);
    expect(metrics.sex).toBe(30);
  });

  it("set metrics", () => {
    let metrics = new RelationMetrics(10, 20, 30);
    metrics.friendship = 50;
    metrics.love = 50;
    metrics.sex = 50;

    expect(metrics.friendship).toBe(50);
    expect(metrics.love).toBe(50);
    expect(metrics.sex).toBe(50);
  });

  it("increase values", () => {
    let metrics = new RelationMetrics(10, 20, 30);
    metrics.increaseFriendship(10);
    metrics.increaseLove(10);
    metrics.increaseSex(10);

    expect(metrics.friendship).toBe(20);
    expect(metrics.love).toBe(30);
    expect(metrics.sex).toBe(40);
  });

  it("decrease values", () => {
    let metrics = new RelationMetrics(10, 20, 30);
    metrics.decreaseFriendship(10);
    metrics.decreaseLove(10);
    metrics.decreaseSex(10);

    expect(metrics.friendship).toBe(0);
    expect(metrics.love).toBe(10);
    expect(metrics.sex).toBe(20);
  });

  it("increase percentage values", () => {
    let metrics = new RelationMetrics(50, 50, 50);
    metrics.increaseFriendshipPercentage(10);
    metrics.increaseLovePercentage(10);
    metrics.increaseSexPercentage(10);

    expect(metrics.friendship).toBe(55);
    expect(metrics.love).toBe(55);
    expect(metrics.sex).toBe(55);
  });

  it("decrease percentage values", () => {
    let metrics = new RelationMetrics(50, 50, 50);
    metrics.decreaseFriendshipPercentage(10);
    metrics.decreaseLovePercentage(10);
    metrics.decreaseSexPercentage(10);

    expect(metrics.friendship).toBe(45);
    expect(metrics.love).toBe(45);
    expect(metrics.sex).toBe(45);
  });
});

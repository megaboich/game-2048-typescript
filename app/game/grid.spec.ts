import { Direction } from "./enums";
import { Grid } from "./grid";
import { Tile } from "./models";
import { compareTiles } from "./testing/compare-helper";

describe("Grid state", () => {
  it("Empty grid serializaion", () => {
    const g = new Grid(2);
    expect(g.serialize()).toBe("0,0|0,0");
  });

  it("Filled grid serializaion", () => {
    const g = new Grid(2);
    g.insertTile(0, 0, 1);
    g.insertTile(0, 1, 2);
    g.insertTile(1, 0, 3);
    g.insertTile(1, 1, 4);
    expect(g.serialize()).toBe("1,2|3,4");
  });

  it("Grid deserializaion", () => {
    const g = Grid.deserialize("1,2,3|4,5,6|7,8,9");
    expect(g.serialize()).toBe("1,2,3|4,5,6|7,8,9");
  });
});

describe("Grid insert tests", () => {
  it("Grid creation", () => {
    const g = new Grid(4);
    expect(g.size).toBe(4);
  });

  it("Grid after creation all is available", () => {
    const g = new Grid(3);
    const availableCells = g.availableCells();
    expect(availableCells.length).toBe(9);
  });

  it("Grid available cells", () => {
    const g = new Grid(2);
    g.insertTile(0, 0, 2);
    expect(g.availableCells().length).toBe(3);
    g.insertTile(0, 1, 2);
    expect(g.availableCells().length).toBe(2);
    g.insertTile(1, 0, 2);
    expect(g.availableCells().length).toBe(1);
    g.insertTile(1, 1, 2);
    expect(g.availableCells().length).toBe(0);
  });

  it("Grid insert wrong dimension", () => {
    const g = new Grid(3);
    expect(() => {
      g.insertTile(-1, 0, 2);
    }).toThrow();

    expect(() => {
      g.insertTile(1, -1, 2);
    }).toThrow();

    expect(() => {
      g.insertTile(3, 1, 2);
    }).toThrow();

    expect(() => {
      g.insertTile(1, 3, 2);
    }).toThrow();
  });

  it("Grid insert occupied", () => {
    const g = new Grid(3);
    g.insertTile(0, 0, 2);

    expect(() => {
      g.insertTile(0, 0, 2);
    }).toThrow();
  });
});

describe("Grid get data by direction", () => {
  it("Left", () => {
    const g = Grid.deserialize("1,2|3,4");
    const rowData = g.getRowDataByDirection(Direction.Left);

    const _1 = new Tile(0, 0, 1);
    const _2 = new Tile(0, 1, 2);
    const _3 = new Tile(1, 0, 3);
    const _4 = new Tile(1, 1, 4);

    compareTiles(rowData[0], [_1, _2]);
    compareTiles(rowData[1], [_3, _4]);
  });

  it("Right", () => {
    const g = Grid.deserialize("1,2|3,4");
    const rowData = g.getRowDataByDirection(Direction.Right);

    const _1 = new Tile(0, 0, 1);
    const _2 = new Tile(0, 1, 2);
    const _3 = new Tile(1, 0, 3);
    const _4 = new Tile(1, 1, 4);

    compareTiles(rowData[0], [_2, _1]);
    compareTiles(rowData[1], [_4, _3]);
  });

  it("Up", () => {
    const g = Grid.deserialize("1,2|3,4");
    const rowData = g.getRowDataByDirection(Direction.Up);

    const _1 = new Tile(0, 0, 1);
    const _2 = new Tile(0, 1, 2);
    const _3 = new Tile(1, 0, 3);
    const _4 = new Tile(1, 1, 4);

    compareTiles(rowData[0], [_1, _3]);
    compareTiles(rowData[1], [_2, _4]);
  });

  it("Down", () => {
    const g = Grid.deserialize("1,2|3,4");
    const rowData = g.getRowDataByDirection(Direction.Down);

    const _1 = new Tile(0, 0, 1);
    const _2 = new Tile(0, 1, 2);
    const _3 = new Tile(1, 0, 3);
    const _4 = new Tile(1, 1, 4);

    compareTiles(rowData[0], [_3, _1]);
    compareTiles(rowData[1], [_4, _2]);
  });
});

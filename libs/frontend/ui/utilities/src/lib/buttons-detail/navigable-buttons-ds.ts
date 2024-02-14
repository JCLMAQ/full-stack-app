// import Collection from 'wakanda-client/dist/presentation/collection';
// import { throwToolbarMixedModesError } from '@angular/material/toolbar';

export class NavigableDS {
  index: number = 0;
  hasNext: boolean = false;
  hasPrevious: boolean = false;

  constructor(
    private collection: any,
    initialIndex: number = 0,
  ) {
    this.index = initialIndex;
    this.refresh();
  }

  current() : any{
    const { _pageSize: pSize, entities } = this.collection;
    return entities[this.index % pSize];
  }

  async next(): Promise<any> {
    const { _pageSize: pSize } = this.collection;
    const index = this.index + 1;
    if (!this.isInCurrentPage(index)) {
      await this.collection.fetch({
        start: pSize * Math.floor(index / pSize),
      });
    }

    const { entities } = this.collection;
    this.index = index;
    this.refresh();
    return entities[index % pSize];
  }

  async previous(): Promise<any> {
    const { _pageSize: pSize } = this.collection;
    const index = this.index - 1;
    if (!this.isInCurrentPage(index)) {
      await this.collection.fetch({
        start: pSize * Math.floor(index / pSize),
      });
    }

    const { entities } = this.collection;
    this.index = index;
    this.refresh();
    return entities[index % pSize];
  }

  async last(): Promise<any> {
    const { _count: count, _pageSize: pSize } = this.collection;
    const index = count - 1;

    if (!this.isInCurrentPage(index)) {
      await this.collection.fetch({
        start: pSize * Math.floor(count / pSize),
      });
    }

    const { entities } = this.collection;
    this.index = count - 1;
    this.refresh();
    return entities[entities.length - 1];
  }

  async first(): Promise<any> {
    const index = 0;

    if (!this.isInCurrentPage(index)) {
      await this.collection.fetch({
        start: 0,
      });
    }

    const { entities } = this.collection;
    this.index = 0;
    this.refresh();
    return entities[0];
  }

  private isInCurrentPage(index) {
    const { _first: first, _pageSize: pSize } = this.collection;
    return index >= first && index < first + pSize;
  }

  refresh() {
    this.hasPrevious = this.index > 0;
    this.hasNext = this.index < this.collection._count - 1;
  }
}

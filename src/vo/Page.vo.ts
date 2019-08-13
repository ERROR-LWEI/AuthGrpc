export interface PageInterface {
    page: number;
    pageSize: number;
    count: number;
    setCount: (count: number) => any; 
    setPage: (page: number) => any;
    setPageSize: (pageSize: number) => any;
}

export class Page implements PageInterface {

    page: number;
    pageSize: number;
    count: number;

    setCount(count: number): Page {
        this.count = count;
        return this;
    }

    setPage(page: number): Page {
        this.page = page;
        return this;
    }

    setPageSize(pageSize: number): Page {
        this.pageSize = pageSize;
        return this;
    }
}
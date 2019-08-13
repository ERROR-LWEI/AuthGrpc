import { Page, PageInterface } from './Page.vo';

export interface ListInterface<T, P> {
    list: T[];
    page: P;
    setList: (list: T[]) => any;
    setPage: (page: P) => any;
} 

export class List<T, P> implements ListInterface<T, P> {
    list: T[];
    page: P;
    setList(list: T[]): List<T,P> {
        this.list = list;
        return this;
    };

    setPage(page: P): List<T,P> {
        this.page = page;
        return this
    }
}
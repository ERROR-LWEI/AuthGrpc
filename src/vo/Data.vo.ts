export interface DataInterface<T> {
    data: T;
    setData: (data: T) => any; 
}

export class Data<T> implements DataInterface<T> {
    data: T;

    setData(data: T): Data<T> {
        this.data = data;
        return this;
    }
}
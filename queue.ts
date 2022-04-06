export class Queue{
    _store: [number,number,number][] = [];
    push(val: [number,number,number]) {
      this._store.push(val);
    }
    pop():[number,number,number] {
      return this._store.shift()!;
    }
    isEmpty():boolean
    {
        if(this._store.length==0)return true
        else return false
    }
}
   
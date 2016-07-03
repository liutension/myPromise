/**
 * Created by tensionliu on 2016/7/1.
 */
function Promise(){
    if(!this instanceof (Promise)) return new Promise();

    this.status = 'pending';
    this._resolver = null;
    this._rejected = null;
    this.value = null;
    this.reason = null;
    this._next = null;
}

Promise.prototype.then = function(resolver,rejected){
    var next = this._next || (this._next = new Promise());
    if(this.status === 'pending'){
        this._resolver = resolver;
        this._rejected = rejected;
    }

    return next;
}

Promise.prototype.resolve = function(value){
    if(this.status !== 'pending'){
        return
    }
    this.status = 'resolver';
    this.value = value;
    var next = this._next;
    var resolver = this._resolver;
    if(!resolver)
        return
    result = resolver(this.value);
    if(next && next._resolver){
        if(result instanceof Promise){
            var status = result.status;
            if('pending' === status) return result.then(next.resolve.bind(next), next.reject);
            if('resolved' === status) return next.resolve(result.value);
            //if('rejected' === status) return next.reject(result.reason);
        }else{
            next.resolve(result)
        }
    }
}

Promise.prototype.reject = function(reason){
    if(this.status !== 'pending'){
        return
    }
    this.status = 'rejected';
    this.reason = reason;
    var rejected = this._rejected;
    rejected(this.reason);
}

module.exports = Promise
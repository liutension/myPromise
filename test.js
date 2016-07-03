/**
 * Created by tensionliu on 2016/7/1.
 */
var Promise = require('./myPromise.js');

function pia(who){
    var promise = new Promise();
    setTimeout(function(){
        if(!who){
            return promise.reject('who you are?');
        }
        promise.resolve(who);
    },10000);
    return promise;
};

function nextPia(who){
    return function(v){
        var promise = new Promise();
        setTimeout(function(){
            if(!who){
                return promise.reject('who you are?');
            }
            console.log(v + ' pia~完,'+ who + ' pia~~');
            promise.resolve(who);
        },1000);
        return promise
    }
};

var success = function(value){
    console.log(value +' pia~完,睡觉了');
    return value
};

var error = function(error){
    console.log('error.............');
    console.log(error);
};

var piapia = pia("刘瑾");
//piapia.then(success,error);
//piapia.then(success).then(success).then(success);
piapia.then(nextPia('阿标')).then(nextPia('浪神')).then(nextPia('煊哥')).then(success);

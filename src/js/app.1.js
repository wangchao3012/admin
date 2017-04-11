// (function (global, factory) {
//     typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
//         typeof define === 'function' && define.amd ? define(factory) :
//             (global.App = factory());
// }(this, (function () {
//     'use strict';
//     function aaa(params) {

//     }
//     return App;
// })));


// export default {
//     aaa: function () {

//     }
// }

var app = {
    version: '1.5.0',
    post: function () {
        console.log('post');

    }
}
window.app = app
export default app
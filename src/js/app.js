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



var app = (function (document, undefined) {
    var $ = function () { };
    $.version = '1.5.0';
    $.welcomeVer = '1.5.0';
    $.serialNumber = '6.6.19 9:38';
    $.appType = 1; //1-开发；2-测试；3-生产  
    $.debug = true;
    $.upFile = '_doc/update/tm.wgt';
    $.appFile = '_doc/update/tm.apk';
    $.webHost = 'http://m.chorse-sports.com/';
    $.log = function (arg) {
        $.debug && console.log(arg);
    };
    $.defaultToken = 'zmgjapp';
    $.isStatusbarOffset = !1;
    $.getUrl = function (method) {
        return {
            1: '127.0.0.1:3000',
            2: '2',
            3: ''
        }[1];
    };
    $.method = {
        user_login: 'api/user/login',
        user_register: 'api/user/login/regist',
        user_UpdateUserBase: 'api/user/UpdateUserBase',
    };
    $.reg = {
        password: /^(\w){6,18}$/,
    };

    /**
     * 兼容 AMD 模块
     **/
    if (typeof define === 'function' && define.amd) {
        define('app', [], function () {
            return $;
        });
    }
    return $;
})(document);

(function ($, jq) {
    $.post = function (method, data, successCallback, errorCallBack, ) {

        var url = $.getUrl(method)
        console.log('post11', method, url);
        jq.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (reslut) {
                console.log('reslut', reslut);
                successCallback(reslut)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var self = this;
                // jq.ajax(self)

                let d = {
                    list: []
                }
                for (var i = 0; i < 30; i++) {
                    d.list.push({ name: 'name' + i, title: 'title' + i })

                }

                successCallback(d)
            }
        });
    }
})(app, jQuery)

window.app = app;
export default app;
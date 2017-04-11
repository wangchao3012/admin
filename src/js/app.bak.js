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
    $.appType = 3; //1-开发；2-测试；3-生产  
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
        if ($.appType == 1) {
            //			 开发环境
            return 'http://192.168.1.113:31724/' + method;
            //			return 'http://192.168.1.202:8100/' + method;
            //			return 'http://api1.chorse-sports.com/' + method;

        } else if ($.appType == 2) {
            //测试环境

            return 'http://testapi.chorse-sports.com/' + method;
        } else if ($.appType == 3) {
            //正式环境
            return 'http://api.chorse-sports.com/' + method;
        }
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
	 * 获取url参数值
	 * @param {String} name 需要获取的参数 key 
	 */
    $.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };
    $.createNonceStr = function () {
        return Math.random().toString(36).substr(2, 15);
    };
    $.createTimestamp = function () {
        return parseInt(new Date().getTime() / 1000) + '';
    };
    $.getSN = function () {
        return $.Cache.get($.Cache.key.sn.toKeyName(), function () {

            return Math.random().toString(36).substr(2, 10);
        })
    };
	/**
	 * 检查用户是否登录，未登录，跳转至登录页；
	 * 					 已登录，执行回调函数
	 * @param {Function} callBack 已登录回调的函数
	 */
    $.checkLogin = function (callBack) {
        if (!$.User.getToken() || $.User.getToken() == $.defaultToken) {
            $.Cache.sset($.Cache.key.returnurl.toKeyName(), location.href);
            var refOpenId = $.getQueryString('refOpenId')
            refOpenId && $.Cache.set($.Cache.key.referrer.toKeyName(), refOpenId);
            history.replaceState(null, "", '../login/login.html');
            location.reload();
            //			location.href = '/page/login/login.html';
        } else {
            callBack();
        }
    };
    $.zeros = function (num, length) {
        var s = '000000000000' + num;
        return s.substr(s.length - length);
    };
	/**
	 * 判断当前运行环境
	 */
    $.os = function () {
        var ua = navigator.userAgent.toLowerCase(),
            app = navigator.appVersion;
        return {
            weixin: ua.match(/MicroMessenger/i) == "micromessenger", //是否为微信
            mobile: !!ua.match(/AppleWebKit.*Mobile.*/), //|| !!ua.match(/AppleWebKit/), //是否为移动终端
        }
    }();
    $.toUtf8 = function (str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    };
    $.getTime = function (s) {
        s = parseInt(s);
        var m = 0;
        var h = 0;
        var d = 0;
        if (s > 60) {
            m = parseInt(s / 60);
            s = parseInt(s % 60);
            if (m > 60) {
                h = parseInt(m / 60);
                m = parseInt(m % 60);
                if (h > 24) {
                    d = parseInt(h / 24);
                    h = parseInt(h % 24);
                }
            }
        }
        var time = s;
        if (m > 0) {
            time = m + ':' + time;
        }
        if (h > 0) {
            time = h + ':' + time;
        }
        if (d > 0) {
            time = d + '天' + time;
        }
        return time;
    };
	/**
	 * 检测客户端是否安装app
	 * @param {Object} id
	 */
    $.isInstalled = function (id) {
        if (id === 'qihoo' && mui.os.plus) {
            return true;
        }
        if (mui.os.android) {
            var main = plus.android.runtimeMainActivity();
            var packageManager = main.getPackageManager();
            var PackageManager = plus.android.importClass(packageManager)
            var packageName = {
                "qq": "com.tencent.mobileqq",
                "weixin": "com.tencent.mm",
                "sinaweibo": "com.sina.weibo"
            }
            try {
                return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
            } catch (e) { }
        } else {
            switch (id) {
                case "qq":
                    var TencentOAuth = plus.ios.import("TencentOAuth");
                    return TencentOAuth.iphoneQQInstalled();
                case "weixin":
                    var WXApi = plus.ios.import("WXApi");
                    return WXApi.isWXAppInstalled()
                case "sinaweibo":
                    var SinaAPI = plus.ios.import("WeiboSDK");
                    return SinaAPI.isWeiboAppInstalled()
                default:
                    break;
            }
        }
    }
    //   $.post = function () {
    //     console.log('post');

    // }
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

(function ($) {
    $.post = function (method) {
        console.log('post',method);

    }
})(app)
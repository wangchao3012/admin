
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
    $.defaultToken = 'E07657CD6002B363';
    $.isStatusbarOffset = !1;
    $.getUrl = function (method) {
        return {
            1: 'http://127.0.0.1:3000/',
            2: '2',
            3: ''
        }[1];
    };
    $.method = {
        user_login: 'user.login',
        user_register: 'user.register',
        user_list: 'user.list',
        role_list: 'role.list',
        menu_list: 'menu.list',
    };
    $.reg = {
        password: /^(\w){6,18}$/,
    };
    $.getSN = function () {
        return $.Cache.get($.Cache.key.sn.toKeyName(), function () {

            return Math.random().toString(36).substr(2, 10);
        })
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
var md5 = require('md5');
(function ($, jq) {
    $.post = function (method, data, successCallback, errorCallBack, ) {
        // debugger
        var url = $.getUrl();
        data = $.sign(method, data);
        console.log('post_data', data);
        jq.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (res) {
                console.log('res', res);
                (res.sc == 0 && successCallback(res.d)) || (res.sc == -1 && (console.log(res.msg), !!errorCallBack && errorCallBack())) ||
                    (res.sc == -2 && $.User.getToken() != "" && ($.Cache.del($.Cache.key.token.toKeyName()), console.log('登录失败')
                    )) || (res.sc < -3 && console.log('服务器繁忙，请稍后重试'));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('error', textStatus);
                // var self = this;
                // jq.ajax(self)

                // let d = {
                //     list: []
                // }
                // for (var i = 0; i < 30; i++) {
                //     d.list.push({ name: 'name' + i, title: 'title' + i })

                // }

                // successCallback(d)
            }
        });
    }
    $.sign = function (m, data) {
        var token = $.User.getToken();
        var cr = {};
        cr.sn = $.getSN();

        cr.oid = $.User.getOpenId();
        if (token == '') {
            token = $.defaultToken;
            $.User.setToken(token);
        }
        cr.m = m;
        cr.d = JSON.stringify(data);
        // cr.ts = new Date().getTime();  
        // cr.at = 's';
        // 排序key
        var keyArr = [];
        for (var item in cr) {
            if (item != "sign") {
                keyArr.push(item);
            }
        }
        keyArr.sort();
        // 生成加密
        var content = token;
        for (var i = 0; i < keyArr.length; i++) {
            var key = keyArr[i];
            var value = cr[key];
            value != undefined && value != null && value !== '' && (content += key + value)
        }
        console.log('content', content)
        cr.si = md5(content);
        return cr;
    };
})(app, jQuery);
/**
 * 缓存管理
 * @param {Object} $ app类
 * @param {Object} win
 */
(function ($, win) {
    // debugger
    win.iDB = win.indexedDB || win.mozIndexedDB || win.webkitIndexedDB || win.msIndexedDB;
    win.IDBTransaction = win.IDBTransaction || win.webkitIDBTransaction || win.msIDBTransaction;
    win.IDBKeyRange = win.IDBKeyRange || win.webkitIDBKeyRange || win.msIDBKeyRange;
    $.Cache = {
        keyTime: 'keyTime',
        key: {
            user: 'user',
            sn: 'sn',
            token: 'token',
            userId: 'userId',
            openId: 'openId'
        },
        //初始化缓存
        init: function () {
            $.Cache.del($.Cache.key.caskNewsId.toKeyName());
        },
        /**
         * 获取缓存中的数据
         * @param {String} k
         * @param {Function} fun 当缓存中无此key对应缓存值时，获取此值的函数
         * @param {Number} t 有效秒数
         */
        get: function (k, fun, t) {
            var v;
            //超时删除缓存中存在的原有值 
            var t1 = localStorage.getItem($.Cache.keyTime.toKeyName(k));
            t1 = t1 == null ? 0 : parseInt(t1);
            var time = new Date().getTime();
            //缓存值过期处理
            if (t1 != 0 && t1 < time) {
                localStorage.removeItem(k);
            }
            if (t != undefined) {
                localStorage.setItem($.Cache.keyTime.toKeyName(k), time + t * 1000);
            }
            v = localStorage.getItem(k);
            if (v == null) {
                if (fun != undefined) {
                    v = fun();
                    localStorage.setItem(k, v);
                }
            }
            return v;
        },
        getInt: function (k, fun, t) {
            var v = $.Cache.get(k, fun, t);
            return v == null ? 0 : parseInt(v);
        },
        set: function (k, v, t) {
            localStorage.setItem(k, v);
            if (t != undefined) {
                var time = new Date().getTime();
                localStorage.setItem($.Cache.keyTime.toKeyName(k), time + t * 1000);
            }
        },

        setObject: function (k, v, t) {
            localStorage.setItem(k, JSON.stringify(v));
            if (t != undefined) {
                var time = new Date().getTime();
                localStorage.setItem($.Cache.keyTime.toKeyName(k), time + t * 1000);
            }
        },
        getFloat: function (k, fun, t) {
            var v = $.Cache.get(k, fun, t);
            return v == null ? 0 : parseFloat(v);
        },
        getBoolean: function (k, fun, t) {
            var v = $.Cache.get(k, fun, t);
            return v == 'true' ? true : false;
        },
        getObject: function (k, fun, t) {
            var v = $.Cache.get(k, fun, t);
            return v == null ? null : JSON.parse(v);
        },
        getArray: function (k, fun, t) {
            var v = $.Cache.get(k, fun, t);
            return v == null ? [] : JSON.parse(v);
        },
        getString: function (k, fun, t) {
            var v = $.Cache.get(k, fun, t);
            return v == null ? '' : v.toString();
        },
        del: function (k) {
            localStorage.removeItem(k);
            localStorage.removeItem($.Cache.keyTime.toKeyName(k));
        },
        iHasKey: function (k) {
            k = $.Cache.keyTime.toKeyName(k);
            return localStorage.hasOwnProperty(k);
        },
        sset: function (k, v) {
            sessionStorage.setItem(k, v);
        },
        sget: function (k) {
            return sessionStorage.getItem(k);
        },
        sgetInt: function (k) {
            var v = $.Cache.sget(k);
            return isNaN(v) ? 0 : parseInt(v);
        },
        ssetObject: function (k, v) {
            sessionStorage.setItem(k, JSON.stringify(v))
        },
        sgetObject: function (k) {
            var v = $.Cache.sget(k);
            return v == null ? null : JSON.parse(v);
        },
        //indexeddb 存储

        version: 1, // important: only use whole numbers!

        objectStoreName: 'db',

        instance: {},

        upgrade: function (e) {

            var
                _db = e.target.result,
                names = _db.objectStoreNames,
                name = $.Cache.objectStoreName;

            if (!names.contains(name)) {

                _db.createObjectStore(
                    name, {
                        keyPath: 'key',
                        autoIncrement: true
                    });
            }
        },

        errorHandler: function (error) {
            //			window.alert('error: ' + error.target.code);

        },

        open: function (callback) {

            var request = win.iDB.open(
                $.Cache.objectStoreName, $.Cache.version);

            request.onerror = $.Cache.errorHandler;

            request.onupgradeneeded = $.Cache.upgrade;

            request.onsuccess = function (e) {

                $.Cache.instance = request.result;

                $.Cache.instance.onerror =
                    $.Cache.errorHandler;

                callback();
            };
        },

        getObjectStore: function (mode) {

            var txn, store;

            mode = mode || 'readonly';

            txn = $.Cache.instance.transaction(
                [$.Cache.objectStoreName], mode);

            store = txn.objectStore(
                $.Cache.objectStoreName);

            return store;
        },

        /**
         * 设置缓存
         * @param {String} key 键
         * @param {Object} data 值
         * @param {Number} t    有效期 秒
         * @param {Function} callback 成功后回调函数
         */
        iset: function (k, v, t, callback) {
            t = t || 864000; //默认有效期为10天

            var time = new Date().getTime();
            k = $.Cache.keyTime.toKeyName(k);
            $.Cache.set(k, time + t * 1000);

            try {
                $.Cache.open(function () {
                    var store, request,
                        mode = 'readwrite',
                        obj = {
                            key: k,
                            val: v,
                        }
                    store = $.Cache.getObjectStore(mode),
                        request = k ?
                            store.put(obj) :
                            store.add(obj);
                    request.onsuccess = callback;
                });
            } catch (e) {

            }

        },
        iget: function (k, callback) {
            k = $.Cache.keyTime.toKeyName(k);
            try {
                if (mui.os.plus) {

                    callback(plus.storage.getItem(k));
                } else {
                    $.Cache.open(function () {
                        var mode = 'readwrite',
                            store = $.Cache.getObjectStore(mode);
                        var request = store.get(k);
                        request.onsuccess = function (e) {
                            //							var result = e.target.result && new Date().getTime() > e.target.result.useTime ? null : e.target.result;
                            //							result && $.Cache.iset(result.key, result.val, result.useT);
                            callback(result ? result.val : null);
                        };
                    });
                }
            } catch (e) {
                callback(null);
            }

        },
        igetObject: function (k, callback) {
            k = $.Cache.keyTime.toKeyName(k);
            try {
                if (mui.os.plus) {
                    var v = plus.storage.getItem(k);
                    callback(v && JSON.parse(v));
                } else {
                    $.Cache.open(function () {
                        var mode = 'readwrite',
                            store = $.Cache.getObjectStore(mode);
                        var request = store.get(k);
                        request.onsuccess = function (e) {
                            //							result && $.Cache.iset(result.key, result.val, result.useT);
                            callback(e.target.result ? e.target.result.val : null);
                        };
                    });
                }
            } catch (e) {
                callback(null);
            }

        },
        igetAll: function (callback) {

            $.Cache.open(function () {

                var
                    store = $.Cache.getObjectStore(),
                    cursor = store.openCursor(),
                    data = [];

                cursor.onsuccess = function (e) {

                    var result = e.target.result;

                    if (result &&
                        result !== null) {

                        data.push(result.value);
                        result.continue();

                    } else {

                        callback(data);
                    }
                };

            });
        },
        idelete: function (k, callback) {
            $.Cache.open(function () {
                var
                    mode = 'readwrite',
                    store, request;

                store = $.Cache.getObjectStore(mode);

                request = store.delete(k);

                request.onsuccess = callback;
            });
        },

        ideleteAll: function (callback) {
            var ks = [];
            for (var i = 0; i >= 0; i++) {
                var k = localStorage.key(i);
                if (k) {
                    if (k.indexOf($.Cache.keyTime.toKeyName()) == 0) {
                        ks.push(k)
                    }
                } else {
                    i = -2;
                }
            }
            for (var i = 0; i < ks.length; i++) {
                var k = ks[i];
                $.Cache.del(k);
            }
            $.Cache.open(function () {

                var mode, store, request;

                mode = 'readwrite';
                store = $.Cache.getObjectStore(mode);
                request = store.clear();

                !!callback && (request.onsuccess = callback);
            });


        },
        /**
         * 清除过期的缓存
         */
        iclearExpired: function () {
            var ks = [];
            for (var i = 0; i >= 0; i++) {
                var k = localStorage.key(i);
                if (k) {
                    if (k.indexOf($.Cache.keyTime.toKeyName()) == 0) {
                        ks.push(k)
                    }
                } else {
                    i = -2;
                }
            }
            for (var i = 0; i < ks.length; i++) {
                var k = ks[i];
                var t1 = $.Cache.getInt(k);
                var time = new Date().getTime();
                //缓存值过期处理
                if (t1 != 0 && t1 < time) {
                    $.Cache.del(k);
                    $.Cache.idelete(k)
                }

            }

        },

    };
    /**
     * 登录用户类，所有需要用到的用户信息都从此类获取
     */
    $.User = {

        name: '',
        userName: '',
        oId: '',
        token: '',
        head: '',
        email: '',
        menu: [],
        auth: [],

        set: function (u) {
            $.User.setToken(u.token);
            $.User.setOpenId(u.oId);

            $.Cache.setObject($.Cache.key.user.toKeyName(), u);
        },
        get: function () {
            var u = $.Cache.getObject($.Cache.key.user.toKeyName());
            return u || $.User;
        },
        setToken: function (token) {
            $.Cache.set($.Cache.key.token.toKeyName(), token);
        },
        getToken: function () {
            return $.Cache.getString($.Cache.key.token.toKeyName());
        },

        setOpenId: function (v) {
            $.Cache.set($.Cache.key.openId.toKeyName(), v);
        },
        getOpenId: function () {
            return $.Cache.getString($.Cache.key.openId.toKeyName())
        },
        clear: function () {
            $.Cache.del($.Cache.key.token.toKeyName());
            $.Cache.del($.Cache.key.userId.toKeyName());
            $.Cache.del($.Cache.key.user.toKeyName());
        }

    };
})(app, window);


/**
 * 扩展方法
 * @param {Object} undefined
 */
(function (undefined) {
    if (String.prototype.toKeyName === undefined) { // fix for iOS 3.2
		/**
		 * 拼接缓存key名称
		 */
        String.prototype.toKeyName = function () {
            var s = this + '_';
            for (var i = 0; i < arguments.length; i++) {
                s += arguments[i] + '_';
            }
            return s;
        };
        // 对Date的扩展，将 Date 转化为指定格式的String 
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
        // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
        // 例子： 
        // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
        // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
        String.prototype.Format = function (fmt) { //author: meizz 

            var d = new Date(this);
            var o = {
                "M+": d.getMonth() + 1, //月份 
                "d+": d.getDate(), //日 
                "h+": d.getHours(), //小时 
                "m+": d.getMinutes(), //分 
                "s+": d.getSeconds(), //秒 
                "q+": Math.floor((d.getMonth() + 3) / 3), //季度 
                "S": d.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt.replace('T', ' ').replace('+08:00', ''); //.replace(/-/g, "/");
        }
        Date.prototype.Format = function (fmt) { //author: meizz 

            var d = this;
            var o = {
                "M+": d.getMonth() + 1, //月份 
                "d+": d.getDate(), //日 
                "h+": d.getHours(), //小时 
                "m+": d.getMinutes(), //分 
                "s+": d.getSeconds(), //秒 
                "q+": Math.floor((d.getMonth() + 3) / 3), //季度 
                "S": d.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt.replace('T', ' ').replace('+08:00', '').replace(/-/g, "/");
        }
    }
    Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
        obj['__proto__'] = proto;
        return obj;
    };
})();
window.app = app;
export default app;
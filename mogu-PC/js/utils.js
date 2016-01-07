/*
 * utils(v1.0): Which contains the common method of operating DOM
 * by Team on 2015/11/17
 */
(function () {
    var _utils = {
        /*listToArray:将一个类数组转换为一个数组,兼容所有浏览器.
         *   likeAry:[object]我们需要将一个数组的类。
         * @return
         *   [array]数组转换完成
         * by Team in 2015/11/04*/
        listToArray: function listToArray(likeAry) {
            var ary = [];
            try {
                ary = Array.prototype.slice.call(likeAry, 0);
            } catch (e) {
                for (var i = 0; i < likeAry.length; i++) {
                    ary[ary.length] = likeAry[i];
                }
            }
            return ary;
        },
        /*toJSON:把一个字符串转换为JSON格式的对象
         * by Team in 2015/11/04*/
        toJSON: function toJSON(str) {
            return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
        }
    };

    /*
     * 1、获取相关DOM元素的方法
     */

    /*getElementsByClass：通过样式类名获取我们的元素，解决了getElementsByClassName，在IE6~8下不兼容的问题
     *   strClass:我们需要将一个数组的类。
     *   context：指定上下文
     * @return
     *   获取的元素集合
     * by Team in 2015/11/17*/
    _utils.getElementsByClass = function getElementsByClass(strClass, context) {
        //this->_utils
        context = context || document;//判断是否有传入context，如果没有传入，使用document
        // 判断当前浏览器是否兼容我们的getElementsByClassName这个方法，兼容的话，我们直接使用这个方法即可，在执行上下文context下获取
        if ("getElementsByClassName" in document) {
            return this.listToArray(context.getElementsByClassName(strClass));
        }
        //在不兼容这个方法的情况下，我们自己来编写代码处理兼容
        var strAry = strClass.replace(/(^\s+)|(\s$)/g, "").split(/\s+/);//首先replace去除字符串首尾空格；split去除字符串中间空格
        var ary = [];
        var tagList = context.getElementsByTagName("*");
        for (var i = 0; i < tagList.length; i++) {
            var curTag = tagList[i];
            curTag.flag = true;
            for (var k = 0; k < strAry.length; k++) {
                var reg = new RegExp("(^| +)" + strAry[k] + "( +|$)");
                if (!reg.test(curTag.className)) {
                    curTag.flag = false;
                    break;
                }
            }
            curTag.flag ? ary[ary.length] = curTag : null;
        }
        return ary;
    };


    /*children：获取当前元素下的所有元素子节点，如果告诉我子节点标签名，那么则获取当前元素下指定子节点
     *   curEle：当前元素
     *   tagName：指定元素子节点
     * by Team in 2015/11/17*/
    _utils.children = function children(curEle, tagName) {
        var nodeList = curEle.childNodes, ary = [];
        for (var i = 0; i < nodeList.length; i++) {
            var curNode = nodeList[i];
            if (curNode.nodeType === 1) {
                if (typeof tagName === "string") {
                    var curNodeLow = curNode.nodeName.toLowerCase();
                    var tagNameLow = tagName.toLowerCase();
                    if (curNodeLow === tagNameLow) {
                        ary[ary.length] = curNode;
                    }
                    continue;
                }
                ary[ary.length] = curNode;
            }
        }
        return ary;
    };


    /*prev：获取当前元素的上一个哥哥元素节点
     *   curEle：当前元素
     * by Team in 2015/11/17*/
    _utils.prev = function prev(curEle) {
        if ("previousElementSibling" in curEle) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    };


    /*prevAll：获取当前元素的所有哥哥元素节点
     *   curEle：当前元素
     * by Team in 2015/11/17*/
    _utils.prevAll = function prevAll(curEle) {
        var pre = this.prev(curEle), ary = [];
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    };

    /*getIndex：获取当前元素索引
     *   curEle：当前元素
     * by Team in 2015/11/17*/
    _utils.getIndex = function getIndex(curEle) {
        return this.prevAll(curEle).length;
    };

    /*next：获取当前元素的下一个弟弟元素节点
     *   curEle：当前元素
     * by Team in 2015/11/17*/
    _utils.next = function next(curEle) {
        if ("nextElementSibling" in curEle) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    };

    /*nextAll：获取当前元素的所有弟弟元素节点
     *   curEle：当前元素
     * by Team in 2015/11/17*/
    _utils.nextAll = function nextAll(curEle) {
        var nex = this.next(curEle), ary = [];
        while (nex) {
            ary[ary.length] = nex;
            nex = this.next(nex);
        }
        return ary;
    };

    /*sibling：获取当前元素的相邻元素节点
     *   curEle：当前元素
     * by Team in 2015/11/17*/
    _utils.sibling = function sibling(curEle) {
        var pre = this.prev(curEle), nex = this.next(curEle), ary = [];
        pre ? ary[ary.length] = pre : null;
        nex ? ary[ary.length] = nex : null;
        return ary;
    };

    /*siblings：获取当前元素的所有的兄弟元素节点
     *   curEle：当前元素
     * by Team in 2015/11/17*/
    _utils.siblings = function siblings(curEle) {
        var preA = this.prevAll(curEle), nexA = this.nextAll(curEle);
        return preA.concat(nexA);
    };

    /*first：获取当前元素的第一个元素子节点（可以指定具体的标签名）
     *   curEle：当前元素
     *   tagName：指定的元素标签名
     * by Team in 2015/11/17*/
    _utils.first = function first(curEle, tagName) {
        return this.children(curEle, tagName)[0];
    };

    /*last：获取当前元素的最后一个元素子节点（可以指定具体的标签名）
     *   curEle：当前元素
     *   tagName：指定的元素标签名
     * by Team in 2015/11/17*/
    _utils.last = function last(curEle, tagName) {
        var child = this.children(curEle, tagName);
        return child[child.length - 1];
    };


    /*
     * 2、获取相关DOM元素的样式
     */

    /*css:获取或者设置当前元素的样式（第三个value不传值就是获取，传值就是设置）
     * @parameter
     *   curEle:[object] 当前要操作的那个元素
     *   attr:[string] 当前要获取的样式属性名
     *   value:样式参数值
     * by team on 2015/11/17*/
    _utils.css = function css(curEle, attr, value) {
        //获取样式
        var reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?(px|pt|em|rem)$/;
        if (typeof value === "undefined") {
            var val = "getComputedStyle" in window ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
            return reg.test(val) ? parseFloat(val) : val;
        }
        //设置样式
        reg = /^(width|height|top|left|right|bottom|((margin|padding)(Left|Top|Right|Bottom)?))$/;
        if (attr === "opacity") {
            if (value >= 0 && value <= 1) {
                curEle["style"]["opacity"] = value;
                curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            }
        } else if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
        } else if (reg.test(attr)) {
            curEle["style"][attr] = isNaN(value) ? value : value + "px";
        } else {
            curEle["style"][attr] = value;
        }
    };

    /*setGroupCss：批量给当前元素设置样式
     * @parameter
     *   curEle:[object] 当前要操作的那个元素
     *   options:
     * by team on 2015/11/17*/
    _utils.setGroupCss = function setGroupCss(curEle, options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this.css(curEle, key, options[key]);
            }
        }
    };

    /*offset:获取页面中任何一个元素距离body的偏移量(上偏移和左偏移),不管它的父级参照物是谁,都获取的是距离body的
     * @parameter
     *   curEle：当前要操作的那个元素
     * @return
     *   元素距离body的上偏移和左偏移
     * by team on 2015/11/11*/
    _utils.offset = function offset(curEle) {
        var p = curEle.offsetParent, l = curEle.offsetLeft, t = curEle.offsetTop;
        while (p) {
            if (navigator.userAgent.indexOf("MSIE 8.0") < 0) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {top: t, left: l};
    };

    /*
     * win:获取或者设置所有和浏览器有关的盒子模型信息（value没传表示获取）
     * */
    _utils.win = function (attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    };

    /*
     * hasClass：检测当前元素是否包含这个样式类名
     * */
    _utils.hasClass = function hasClass(curEle, strClass) {
        var reg = new RegExp("(^| +)" + strClass + "( +|$)");
        return reg.test(curEle.className);
    };

    /*
     * addClass：给当前元素增加样式类名
     * */
    _utils.addClass = function addClass(curEle, strClass) {
        if (!this.hasClass(curEle, strClass)) {
            curEle.className += " " + strClass;
        }
    };

    /*
     * removeClass:删除当前元素的样式类名
     * */
    _utils.removeClass = function removeClass(curEle, strClass) {
        var reg = new RegExp("(^| +)" + strClass + "( +|$)", "g");
        if (this.hasClass(curEle, strClass)) {
            curEle.className = curEle.className.replace(reg, " ");
        }
    };

    /*
     * tollageClass:判断之前是否存在这个样式类名，如果有就是删除这个样式类名，没有的话就是增加这个样式类名
     * */
    _utils.tollageClass = function tollageClass(curEle, strClass) {
        this.hasClass(curEle, strClass) ? this.removeClass(curEle, strClass) : this.addClass(curEle, strClass);
    };


    /*
     *3、关于DOM的增、删、改
     * */

    /*
     * attr:设置或者获取当前元素的属性值(如果value没传，就是获取，传了就是设置)
     * */
    _utils.attr = function attr(curEle, attr, value) {
        if (typeof value === "undefined") {
            return attr === "class" ? curEle.className : curEle.getAttribute(attr);
        }
        attr === "class" ? curEle.className = value : curEle.setAttribute(attr, value);
    };

    /*
     * html:设置或者获取非表单元素内容(如果value没传，就是获取，传了就是设置)
     * */
    _utils.html = function html(curEle, value) {
        if (typeof value === "undefined") {
            return curEle.innerHTML;
        }
        curEle.innerHTML = value;
    };

    /*
     * val:设置或者获取表单元素内容(如果value没传，就是获取，传了就是设置)
     * */
    _utils.val = function val(curEle, value) {
        if (typeof value === "undefined") {
            return curEle.value;
        }
        curEle.value = value;
    };

    /*
     *prepend:向容器的开头增加新的内容，和我们的appendChild相反
     * */
    _utils.prepend = function prepend(container, newEle) {
        var fir = this.first(container);
        fir ? container.insertBefore(newEle, fir) : container.appendChild(newEle);
    };

    /*
     * insertAfter:把当前新元素添加到老元素的后面，和我们的insertBefore相反
     * */
    _utils.insertAfter = function insertAfter(oldEle, newEle) {
        var nex = this.next(oldEle), par = oldEle.parentNode;
        nex ? par.insertBefore(newEle, nex) : par.appendChild(newEle);
    };

    /*
     * extend:作为一个合格的类库，我们需要给别人提供扩展我们内置方法的接口，而我们一般都通过编写一个叫做extend的方法实现
     * */
    _utils.extend = function extend(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
    };

    //把私有变量_utils赋值给全局变量utils
    window.utils = _utils;
})();


/*
 * utils.isNum(val):检测数据类型
 * */
~function (utils) {
    var numObj = {
        isNum: "Number",
        isStr: "String",
        isBoo: "Boolean",
        isNul: "Null",
        isUnd: "Undefined",
        isObj: "Object",
        isAry: "Array",
        isFun: "Function",
        isReg: "RegExp",
        isDate: "Date"
    }, isType = function () {
        var outerArg = arguments[0];
        return function () {
            var innerArg = arguments[0], reg = new RegExp("^\\[object " + outerArg + "\\]$", "i");
            return reg.test(Object.prototype.toString.call(innerArg));
        }
    };
    for (var key in numObj) {
        if (numObj.hasOwnProperty(key)) {
            utils[key] = isType(numObj[key]);
        }
    }
}(utils);


/*
 * 内置类原型的扩展方法
 * */
~function () {
    var aryPro = Array.prototype, strPro = String.prototype, regPro = RegExp.prototype;

    /*
     * unique：数组去重
     * */
    aryPro.unique = function unique() {
        var obj = {};
        for (var i = 0; i < this.length; i++) {
            var cur = this[i];
            obj[cur] == cur ? (this[i] = this[this.length - 1], this.length -= 1, i--) : obj[cur] = cur;
        }
        obj = null;
        return this;
    };

    /*
     * myForEach：解决foreach兼容性问题
     * */
    aryPro.myForEach = function myForEach(callBack, context) {
        context = context ||window;
        if(typeof callBack!=="function") return;
        if ("forEach" in Array.prototype) {//判断是否兼容forEach，兼容的话直接使用内置的
            this.forEach(callBack, context);
            return;
        }
        for (var i = 0; i < this.length; i++) {//不兼容的话我们自己for循环进行处理
            //每一次循环都执行传递进来的回调函数callBack，并且让里面的this变为context，而且还要给这个函数传递三个参数值：当前项，当前项的索引，原始数组
            callBack.call(context, this[i], i, this);
        }
    };

    /*
     * myMap：解决map兼容性问题
     * */
    aryPro.myMap = function myMap(callBack, context) {
        if (Array.prototype.map) {
            return this.map(callBack, context);
        }
        for (var i = 0; i < this.length; i++) {
            this[i] = callBack.call(context, this[i], i, this);
        }
        return this;
    };

    /*
     * myTrim：去除字符串里的首尾空格
     * */
    strPro.myTrim = function myTrim() {
        return this.replace(/(^\s+|\s+$)/g, "");
    };

    /*
     * mySub：截取字符串，这个方法区分中英文
     * */
    strPro.mySub = function mySub() {
        var len = arguments[0] || 10, isD = arguments[1] || false, str = "", n = 0;
        for (var i = 0; i < this.length; i++) {
            var s = this.charAt(i);
            /[\u4e00-\u9fa5]/.test(s) ? n += 2 : n++;
            if (n > len) {
                isD ? str += "..." : void 0;
                break;
            }
            str += s;
        }
        return str;
    };

    /*
     * myFormatTime：格式化时间
     * */
    strPro.myFormatTime = function myFormatTime() {
        var reg = /^(\d{4})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:\s+)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})$/g, ary = [];
        this.replace(reg, function () {
            ary = ([].slice.call(arguments)).slice(1, 7);
        });
        var format = arguments[0] || "{0}年{1}月{2}日 {3}:{4}:{5}";
        return format.replace(/{(\d+)}/g, function () {
            var val = ary[arguments[1]];
            return val.length === 1 ? "0" + val : val;
        });
    };

    /*
     * queryURLParameter：获取url地址栏当中的参数
     * */
    strPro.queryURLParameter = function queryURLParameter() {
        var reg = /([^?&=]+)=([^?&=]+)/g, obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    };

    /*
     * myExecAll：一次性捕获正则中的所有需要捕获的内容
     * */
    regPro.myExecAll = function myExecAll(str) {
        var reg = !this.global ? eval(this.toString() + "g") : this;
        var ary = [], res = reg.exec(str);
        while (res) {
            ary[ary.length] = res[0];
            res = reg.exec(str);
        }
        return ary.length === 0 ? null : ary;
    };
}();
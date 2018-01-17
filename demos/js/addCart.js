/**
 * 指定元素飞入目标简单动画
 * @param {jQueryObj} opt.begin 动画指定元素
 * @param {jQueryObj} opt.end 动画目标位置元素
 * @param {jQueryObj} opt.area 动画运动参照平面
 * @param {callback} opt.callback 动画结束回调
 */

var addCart = function(opt) {
    return (function() {
        var parabola = function(opt) {
            this.init(opt);
        };
        parabola.prototype = {
            init: function(opt) {
                var flyO = this.calculatedValue(opt),
                    flyDom = this.creatHtml(flyO.site, flyO.plane, flyO.callback),
                    flyRule = this.creatRule(flyO.site, flyO.coord);

                document.getElementsByTagName('head')[0].appendChild(flyRule);
                flyO.area.append(flyDom);
            },
            creatRule: function(site, coord) {
                console.log(coord)
                var cssAnimation = document.createElement('style');
                cssAnimation.type = "text/css";
                var rules = "\
                        .parabola-box {\
                            position: absolute;\
                            z-index: 12;\
                            -webkit-animation: parabola-animation 0.4s ease-in;\
                            animation: parabola-animation 0.4s ease-in;\
                        }\
                        .parabola-box.top {\
                            -webkit-animation-timing-function: ease-out;\
                            animation-timing-function: ease-out;\
                        }\
                        @-webkit-keyframes parabola-animation{\
                            0%{\
                                left:" + site.left + "px;\
                                top:" + site.top + "px;\
                                -webkit-transform: scale(1);\
                                        transform: scale(1);\
                            }\
                            10%{\
                                left:" + site.left + "px;\
                                top:" + (site.top+coord.os) + "px;\
                                -webkit-transform: scale(0.9);\
                                        transform: scale(0.9);\
                            }\
                            100%{\
                                left:" + coord.x + "px;\
                                top:" + coord.y + "px;\
                                -webkit-transform: scale(1);\
                                        transform: scale(1);\
                            }\
                        }\
                        @keyframes parabola-animation{\
                            0%{\
                                left:" + site.left + "px;\
                                top:" + site.top + "px;\
                                -webkit-transform: scale(1);\
                                        transform: scale(1);\
                            }\
                            10%{\
                                left:" + site.left + "px;\
                                top:" + (site.top+coord.os) + "px;\
                                -webkit-transform: scale(0.9);\
                                        transform: scale(0.9);\
                            }\
                            100%{\
                                left:" + coord.x + "px;\
                                top:" + coord.y + "px;\
                                -webkit-transform: scale(1);\
                                        transform: scale(1);\
                            }\
                        }\
                    ";
                cssAnimation.innerHTML = rules;
                return cssAnimation;
            },
            creatHtml: function(site, plane, callback) {
                var parentBox = plane.clone().addClass('parabola-box');
                parentBox.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    var _pfly = $(this);
                    if (_pfly.length) _pfly.remove();
                    callback();
                });
                parentBox.css({"left": site.left+"px", "top": site.top +"px", "margin": 0});
                if (site.cubic) {
                    parentBox.addClass('top');
                }
                return parentBox;
            },
            calculatedValue: function(opt) {
                var fly = {
                        begin: '',
                        end: '',
                        area: '',
                        callback: function() {
                            console.log('动画完成');
                        }
                    },
                    vData = {
                        site: {
                            left: 0,
                            top: 0,
                            cubic: false
                        },
                        plane: '',
                        area: '',
                        coord: {
                            x: 0,
                            y: 0,
                            os: 0
                        },
                        callback: function() {}
                    },
                    _this = this;
                if (typeof opt == 'object') {
                    fly = $.extend(true, fly, opt);
                    vData.plane = fly.begin;
                    vData.area = fly.area;
                }

                //如果没有这两个元素中的其中一个则终止
                if (!fly.begin.length || !fly.end.length) return vData;
                /**
                 * beginCrood 获取开始元素的位置
                 * endCrood   获取结束元素的位置
                 */
                var beginCrood = fly.begin[0].getBoundingClientRect(),
                    endCrood = fly.end[0].getBoundingClientRect(),
                    areaCrood = fly.area[0].getBoundingClientRect();
                vData.site.left = beginCrood.left - areaCrood.left;
                vData.site.top = beginCrood.top - areaCrood.top;
                vData.coord.x = endCrood.left - areaCrood.left;
                vData.coord.y = endCrood.top - areaCrood.top;
                vData.coord.os = -20;
                vData.callback = fly.callback;
                if (beginCrood.top > endCrood.top) vData.site.cubic = true;
                return vData;
            }
        }
        return new parabola(opt);
    })();
};
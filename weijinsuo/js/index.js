$(function () {
    /*动态响应式轮播图*/
    banner();
    /*初始化页签*/
    initTab();
    /*初始化工具提示*/
    $('[data-toggle="tooltip"]').tooltip();
});
var banner = function () {
    /*a.按需加载图片 移动端小图 PC大图*/
    /*b.前端动态渲染轮播图*/

    /*1.获取数据 模拟数据 模拟json数据  （ajax）*/
    /*2.渲染页面*/
    /*2.1 判断当前设备   根据屏幕的宽 不超过768px  (width)*/
    /*2.2 根据当前设备和数据生成HTML结构代码 (动态创建元素，拼接字符串，模版引擎)*/
    /*2.3 HTML结构代码设置在页面内 (html)*/
    /*3. 测试 开发者 (resize)*/
    /*4. 移动端手势切换 (touch)*/
    var getData = function (callback) {
        /*数据缓存*/
        if (window.data) {
            callback && callback(window.data);
            return false;
        }
        $.ajax({
            type: 'get',
            url: 'js/data.json',
            data: {},
            dataType: 'json',
            success: function (data) {
                window.data = data;
                callback && callback(window.data);
            }
        });
    };
    /*获取数据页面渲染*/
    var render = function () {
        getData(function (data) {
            /*1 移动端  0 非移动端*/
            var isMobile = $(window).width() < 768 ? 1 : 0;
            /*使用模板渲染*/
            /*1. 准备模板*/
            /*2. 使用模板函数返回html结构*/
            var pointHtml = template('point', {list: data});
            var imageHtml = template('image', {list: data, isM: isMobile});
            /*3.渲染*/
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);
        });
    };
    render();
    /*在页面尺寸发生重新渲染*/
    $(window).on('resize', function () {
        render();
    });
    /*手势切换*/
    var isMove = false;
    var startX = 0;
    var distanceX = 0;
    /*jquery的事件对象包含了原生事件对象 originalEvent */
    $('.wjs_banner').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend', function (e) {
        /*判断手势*/
        if (isMove && Math.abs(distanceX) > 50) {
            /*左滑手势*/
            if(distanceX < 0){
                /*下一张*/
                $('.carousel').carousel('next');
            }
            /*右滑手势*/
            else{
                /*上一张*/
                $('.carousel').carousel('prev');
            }
        }
        isMove = false;
        startX = 0;
        distanceX = 0;
    })
};
var initTab = function () {
    /*1.所有页签在一行显示*/
    /*1.1 需要一个容器足够长*/
    /*1.2 拿到所有的子容器的宽度的和给父容器*/
    /*2.区域滚动效果*/
    /*2.1 自己实现 touch相关 */
    /*2.2 使用iScroll*/
    var $navTabs = $('.nav-tabs-parent .nav-tabs');
    var $lis = $navTabs.find('li');
    var widthSum = 0;
    // jquery元素集一个方法  只能jquery对象调用
    $lis.each(function (index,item) {
        widthSum += $(this).outerWidth(true);
        /*
        * width() 内容的宽度
        * innerWidth() 内容+内边距
        * outerWidth() 内容+内边距+边框
        * outerWidth(true) 内容+内边距+边框+外边距
        * */
    });
    console.log(widthSum);
    $navTabs.width(widthSum);
    // $.each 工具函数  可以变量  jquery元素集  对象  数组
    /*$.each($lis,function (index,item) {
    });*/
    /*初始化区域滚动*/
    /*初始化的dom对象*/
    /*配置参数对象*/
    new IScroll($('.nav-tabs-parent')[0],{
        scrollX:true,
        scrollY:false
    });
}
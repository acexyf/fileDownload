!(function() {

    var opt = {
        title: q("tcsharetext"),
        desc: q("tcDesc"),
        link: q("tcshareurl"),
        imgUrl: q("tcshareimg")
    };

    var apiList = [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
    ];
    $.ajax({
        url: '//www.ly.com/huochepiao/resource/WXJsApi/GetWXApiConfig',
        type: 'get',
        dataType: 'jsonp',
        data: {
            url: location.href
        },
        success: function(data) {
            wx.config({
                debug: false,
                appId: data.Data.AppId,
                timestamp: data.Data.TimeStamp,
                nonceStr: data.Data.NonceStr,
                signature: data.Data.Signature,
                jsApiList: apiList
            });
        }
    });

    function hideMenu() {
        var list = [
            "menuItem:share:qq",
            "menuItem:share:weiboApp",
            "menuItem:favorite", //收藏
            "menuItem:share:facebook",
            "menuItem:share:QZone",
            "menuItem:openWithQQBrowser",
            "menuItem:openWithSafari"
        ];

        wx.hideMenuItems({
            menuList: list
        });
    }

    function wxShare(option, type) {
        //朋友圈标题改为默认的描述
        var opt2 = {};
        for (var o in opt) opt2[o] = opt[o];
        if (!type) {
            opt2.title = opt2.desc;
            opt2.channel = "Timeline";
        }
        wx.ready(function() {
            wx.onMenuShareAppMessage(opt); //朋友
            wx.onMenuShareTimeline(opt2); //朋友圈
            // wx.onMenuShareQQ(opt); //QQ
            // wx.onMenuShareQZone(opt); //QQ空间
            hideMenu();
        });
    }

    function q(select) {
        select = document.getElementsByName(select)[0];
        return select ? select.value : "";
    }

    wxShare();
    window.wxShare = wxShare;
})();
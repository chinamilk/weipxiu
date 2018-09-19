$( function() {
    //网站预加载运动开始
    if ( $( document ).width() >= 1200 ) {
        if ( window.location.href == "https://www.weipxiu.com" || window.location.href == "https://www.weipxiu.com/" ) {
            //首页公告开始
            setInterval( function() {
                $( ".notice" ).show();
                $( ".notice ul" ).stop( true, true ).animate( {
                    "top": "-20px"
                }, function() {
                    var node = $( ".notice ul li:eq(0)" ).remove();
                    $( ".notice ul" ).append( node );
                    $( ".notice ul" ).css( "top", "0" );
                } );
            }, 5000 );
            
            //给首页增加默认高亮
            $(".nav ul.music-nav li:eq(0)").addClass("action");

            //去掉首页列表第一篇文章，避免同今日焦点栏目顶替文章重合
		    $(".continar-left > .text:nth-of-type(3)").remove();
            
            //视频播放start
            var delSetInterval = null; //定时器
            var ISvideo = false; //当前是否全屏
            var myPlayer = videojs( 'my-video' );
            var howMuchIsDownloaded = 0; //初始化缓冲百分比
            var eleFull = document.querySelector( "#my-video" ); //视频对象

            //全屏方法
            ( function() {
                var runPrefixMethod = function( element, method ) {
                    var usablePrefixMethod;
                    [ "webkit", "moz", "ms", "o", "" ].forEach( function( prefix ) {
                        if ( usablePrefixMethod ) return;
                        if ( prefix === "" ) {
                            // 无前缀，方法首字母小写
                            method = method.slice( 0, 1 ).toLowerCase() + method.slice( 1 );

                        }
                        var typePrefixMethod = typeof element[ prefix + method ];
                        if ( typePrefixMethod + "" !== "undefined" ) {
                            if ( typePrefixMethod === "function" ) {
                                usablePrefixMethod = element[ prefix + method ]();
                            } else {
                                usablePrefixMethod = element[ prefix + method ];
                            }
                        }
                    } );
                    return usablePrefixMethod;
                };
                if ( typeof window.screenX === "number" ) {
                    eleFull.addEventListener( "dblclick", function() {
                        if ( runPrefixMethod( document, "FullScreen" ) || runPrefixMethod( document, "IsFullScreen" ) ) {
                            runPrefixMethod( document, "CancelFullScreen" );
                            this.title = this.title.replace( "退出", "" );
                        } else if ( runPrefixMethod( this, "RequestFullScreen" ) ) {
                            this.title = this.title.replace( "点击", "点击退出" );
                        }
                    } );
                } else {
                    alert( "爷，现在是年轻人的时代，您就暂且休息去吧~~" );
                }
            } )();

            //初始化加载需要先缓冲到15%+才会播放，避免高清视频卡顿
            /*delSetInterval = setInterval( function() {
                howMuchIsDownloaded = myPlayer.bufferedPercent() //返回当前百分比缓冲0-1
                //console.log(howMuchIsDownloaded*100 + '%')
                if ( howMuchIsDownloaded > 0.15 ) {
                    clearInterval( delSetInterval )
                    myPlayer.play();
                }
            }, 1500 )*/

            //当视频播放完成后，重新加载渲染，随时准备第二次重播
            myPlayer.on( "ended", function() {
                //alert("视频已播放完成");
                myPlayer.play();
                setTimeout( function() {
                    myPlayer.pause();
                }, 2000 );
            } );
            //视频播放end				

            // 桌面提醒功能
            var set_desktop = function() {
                if ( window.Notification ) {
                    // var button = document.getElementById('button'), text = document.getElementById('text');

                    var popNotice = function() {
                        if ( Notification.permission == "granted" ) {
                            var notification = new Notification( "官方提示：", {
                                body: '欢迎点击加入"WEB前端薪资吐槽群"互相学习、交流！',
                                icon: 'https://www.weipxiu.com/wp-content/themes/boke/images/tishi.jpg'
                            } )

                            notification.onclick = function() {
                                window.open( "https://jq.qq.com/?_wv=1027&k=4BemYKg" )
                                notification.close();
                            }
                        }
                    }

                    var desktop = function() {
                        if ( Notification.permission == "granted" ) {
                            popNotice();
                        } else if ( Notification.permission != "denied" ) {
                            Notification.requestPermission( function( permission ) {
                                popNotice();
                            } )
                        }
                    }
                    desktop();
                } // else {
                //     alert('浏览器不支持Notification');    
                // }
            }
            set_desktop();
            setTimeout( function() {
                set_desktop();
            }, 20000 );
            // 桌面提醒功能

            // setTimeout(function(){
            // 	var swiper = new Swiper('.swiper-container', {
            // 	    pagination: '.swiper-pagination',//是否出现小圆点
            // 	    nextButton: '.swiper-button-next',//上一张
            // 	    prevButton: '.swiper-button-prev',//下一张
            // 	    slidesPerView: 1,//每一屏幕排几张图片
            // 	    effect: 'slide',//轮播方式，左右切换
            // 	    paginationClickable: true,//小圆点是否可点击
            // 	    spaceBetween: 0,//图片间距
            // 	    autoplay: 4500,//自动轮播时间
            // 	    speed:350,//切换一张所需要的时间
            // 	    keyboardControl : true,//键盘左右按钮切换
            // 	    mousewheelControl : false,//鼠标滚轮切换
            // 	    autoplayDisableOnInteraction : false,//表示用户操作swiper之后，是否禁止autoplay。默认为 true：停止。false是播放
            // 	    loop: true//循环
            // 	});
            // },3000);

            // console.log---start
            if ( window.console && window.console.log ) {
                setTimeout( function() {
                    console.log( "\n %c 唯品秀个人博客 %c  © Jun Li  https://weipxiu.com \n",
                        "color:#FFFFFB;background:#1abc9c;padding:5px 0;border-radius:.5rem 0 0 .5rem;",
                        "color:#FFFFFB;background:#080808;padding:5px 0;border-radius:0 .5rem .5rem 0;"
                    );
                }, 1500 );
            }
            // console.log---end

            // 首页弹窗开始
            setTimeout( function() {
                var oBox = document.getElementById( "curriculum" );
                var oUl = oBox.getElementsByTagName( "ul" )[ 0 ];
                var oContact = oBox.getElementsByClassName( "contact" )[ 0 ];
                var oClos = oBox.getElementsByClassName( "close" )[ 0 ];
                var aLi = oUl.children;
                var oBack = oContact.getElementsByTagName( "a" )[ 0 ];
                oBox.style.opacity = 1;
                oBox.addEventListener( "transitionEnd", end, false );
                oBox.addEventListener( "webkitTransitionEnd", end, false );
                //oUl.style.transition=".5s 600ms linear";
                function end() {
                    this.removeEventListener( "transitionEnd", end, false );
                    this.removeEventListener( "webkitTransitionEnd", end, false );
                    oUl.style.top = 0;
                    oBox.style.height = "230px";
                    oBox.style.top = "0px";
                    for ( var i = 0; i < aLi.length; i++ ) {
                        aLi[ i ].style.transition = "0.5s " + ( 300 + i * 200 ) + "ms";
                        aLi[ i ].style.opacity = 1;
                        aLi[ i ].style.transform = "rotateX(0deg)";
                        aLi[ i ].style.WebkitTransform = "rotateX(0deg)";
                        aLi[ i ].off = true;
                        aLi[ i ].index = i;
                        aLi[ i ].onmouseover = over;
                        aLi[ i ].onmouseout = function() {
                            if ( this.off ) {
                                this.style.transform = "rotateY(0deg)";
                                this.style.WebkitTransform = "rotateY(0deg)";
                            }
                        };
                        aLi[ i ].onclick = fnClick;
                    }
                }

                function over( ev ) {
                    if ( this.off ) {
                        var iX = ev.clientX - getLeft( this );
                        this.style.transition = "0.5s";
                        if ( iX > this.offsetWidth / 2 ) {
                            this.style.transform = "rotateY(30deg)";
                            this.style.WebkitTransform = "rotateY(30deg)";
                        } else {
                            this.style.transform = "rotateY(-30deg)";
                            this.style.WebkitTransform = "rotateY(-30deg)";
                        }
                    }
                }

                function getLeft( obj ) {
                    var iLeft = 0;
                    while ( obj ) {
                        iLeft += obj.offsetLeft;
                        obj = obj.offsetParent;
                    }
                    return iLeft
                }

                function fnClick( ev ) {
                    var iX = ev.clientX - getLeft( this );
                    var iDeg = iX > this.offsetWidth / 2 ? -180 : 180;
                    var iMax = 0;
                    var iNow = 0;
                    oContact.style.display = "block";
                    for ( var i = 0; i < aLi.length; i++ ) {
                        if ( iMax < Math.abs( i - this.index ) ) {
                            iMax = Math.abs( i - this.index );
                            iNow = i;
                        }
                        aLi[ i ].off = false;
                        aLi[ i ].style.transition = "0.5s " + Math.abs( i - this.index ) * 100 + "ms cubic-bezier(0.115, -0.195, 0.255, -0.280)";
                        aLi[ i ].style.transform = "rotateY(" + iDeg + "deg)";
                        aLi[ i ].style.WebkitTransform = "rotateY(" + iDeg + "deg)";
                        aLi[ i ].style.opacity = 0.1;
                    }
                    aLi[ iNow ].addEventListener( "transitionEnd", end, false );
                    aLi[ iNow ].addEventListener( "webkitTransitionEnd", end, false );

                    function end() {
                        this.removeEventListener( "transitionEnd", end, false );
                        this.removeEventListener( "webkitTransitionEnd", end, false );
                        oContact.style.opacity = 1;
                    }
                }
                oBack.onclick = function() {
                    oContact.style.opacity = 0;
                    oContact.addEventListener( "transitionEnd", end, false );
                    oContact.addEventListener( "webkitTransitionEnd", end, false );

                    function end() {
                        this.removeEventListener( "transitionEnd", end, false );
                        this.removeEventListener( "webkitTransitionEnd", end, false );
                        for ( var i = 0; i < aLi.length; i++ ) {
                            aLi[ i ].off = true;
                            aLi[ i ].style.transition = "0.5s " + ( aLi.length - i - 1 ) * 100 + "ms";
                            aLi[ i ].style.transform = "rotateY(0deg)";
                            aLi[ i ].style.WebkitTransform = "rotateY(0deg)";
                            aLi[ i ].style.opacity = 1;
                        }
                    }
                };

                function Clos() {
                    oBox.style.transition = ".8s height,0.4s opacity .2s";
                    oBox.style.height = "40px";
                    oBox.style.opacity = 0;
                    setTimeout( function() {
                        $( "#curriculum" ).remove();
                    }, 1000 )
                };
                oClos.onclick = function() {
                    Clos();
                }
                setTimeout( function() {
                    Clos()
                }, 8000 );
                document.onkeydown = function( e ) {
                    if ( !e ) e = window.event;
                    if ( ( e.keyCode || e.which ) == 13 ) {
                        Clos();
                    };
                }
            }, 3000 );
            // 首页弹窗结束

            $( "#hide" ).show();
            $( "html" ).css( {
                "overflow-y": "visible",
                "height": "auto",
                "width": "auto"
            } );
            $( "body" ).css( {
                "overflow-x": "hidden",
                "height": "auto",
                "width": "auto"
            } );
            $( ".buffer" ).fadeOut();
            $( ".buffer .bar" ).hide();

            //首页头部导航动画加载
            $( ".header.Top" ).css( "WebkitAnimation-duration", ".7s" );
            $( ".header.Top" ).css( "MsAnimation-duration", ".7s" );
            $( ".header.Top" ).css( "animation -duration", ".7s" );

            //开场背景音乐
            //$("#music").get(0).play();
            setTimeout( function() {
                $( "#vedio" ).animate( {
                    "bottom": "0"
                }, 1000 );
                $( ".hide" ).animate( {
                    "bottom": "193px"
                }, 1000 );
            }, 3500 );
        } else {
            $( ".continar" ).css( "margin-top", "128px" );
            $( ".c-860,.index-box,.hide" ).remove(); //去掉轮播、视频、邮件订阅
            $( "#hide" ).show();
            $( "html" ).css( {
                "overflow-y": "visible",
                "height": "auto",
                "width": "auto"
            } );
            $( "body" ).css( {
                "overflow-x": "hidden",
                "height": "auto",
                "width": "auto"
            } );
            $( ".buffer" ).fadeOut();
        }
    }else {
	//排除PC端执行下列代码
	//swiper核心三要素：依赖swiper.js、swiper.css，外面父亲盒子高度
	var swiper1 = new Swiper( '.swiper-container1', {
		pagination: '.swiper-pagination', //是否出现小圆点
		//nextButton: '.swiper-button-next',//上一张
		//prevButton: '.swiper-button-prev',//下一张
		slidesPerView: 1, //每一屏幕排几张图片
		effect: 'slide', //轮播方式，左右切换
		paginationClickable: true, //小圆点是否可点击
		spaceBetween: 0, //图片间距
		autoplay: 4500, //自动轮播时间
		speed: 500, //切换一张所需要的时间
		keyboardControl: true, //键盘左右按钮切换
		mousewheelControl: false, //鼠标滚轮切换
		autoplayDisableOnInteraction: false, //表示用户操作swiper之后，是否禁止autoplay。默认为 true：停止。false是播放
		loop: true //循环
	} );
    //navigator.vibrate([1000, 500, 1000]);
    //手机震动功能，里面是数组-震动时间，第二个为间隔时间
}
//网站预加载运动结束
} )
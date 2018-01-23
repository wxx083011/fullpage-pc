
//	<!-- 头部的js
//	 1.获取li标签和up标签，给第一个便签一上来就把小房子变亮
//	  2.获取小三角的标签，小三角一开始就中间位置到home的地方，移动到第一个li = li的left + li宽度的一半-三角的宽度的一半
//	  3.给liNodes添加单击事件，一上来就把所有的up的宽度变成0，防止其他误操作，此时获得的下标要再次复制给li的index
//	  4.讲小三角的移动写成函数。每个部分都单独写成函数
//	  内容的js
//	 1.首先把这个内容区的盒子的大小固定，里面的整个ul慢慢的向上移动
//	  盒子内容区 =  窗口的高度(documentElement.clientHeight)-头部便宜的高度(offsetHeight)
//	 每个li的内容区 = 窗口的高度(documentElement.clientHeight)-头部便宜的高度(offsetHeight)
//	 设置样式css：大框content和ul都是width百分百，content是overflaw，让整个ul飘起来，便于后面的top移动
//	 在里面设置div小内容区的宽高，让宽高垂直水平居中
//	 在js中：在move函数中写，点击。当点击li时。整个ul的top=随着点击li的-下标*一个li的高度，就正好界面
//	 一一的对应
//	 注意：整个架构差不多完成时注意缩放的时候是否会有变化，根据放大缩小来重绘，有用视窗计算的都应该重绘一下
//	 重绘小三角的位置，li移动的位置，整个content容器的位置
//	 第三屏：
//	 首先在html中写架构，一层一层的写，
//	 遮罩：是和原先大小一样的的框，初始透明度是0，rgba(25,25,25,.8),后面慢慢过渡到遮罩是1，也就是原来的0.8
//	 遮罩的框是    box-sizing:border-box，所以可视窗吧不影响之前的大小从里面扣，里面的图标是个雪碧图，到点击的时候
//	 就慢慢过渡移动到下一张图片
//	 机器人主要是动画和时间里面有那些因素和定义关键帧
//	 第四屏：
//	 css主要是两张图片的设置，在一个item中包一个div一个放pic，一个放ul。ul在后面js生成
//	 在js中，先定义一个函数，循环ul。在定义一个函数来循环生成li和img，然后放进ul中
//	 在ul中自定义变量，将后面的图片的src给ul，
//	 在生成函数中，循环一个，在循环中生成li后，ul的图片给每个li。让li的每个值都为1/4，img然后通过left和top来移动位置
//	 结合for的i来编写程序，
//	 移入移出：在移入移出的时候添加照片变化，在里面获得的ul下的li的所有图片，每个图片移动的位置不一样来变换
//	 注意实时同步好css样式
//	 第二屏：
//	 css，只要是右边的12宫格，大的包含框，加上每个的宽高里加上图片，文字图片再div中是第二个，第二个会把第一个覆盖，也就是在运行中
//	 是在最上面
//	 在文字：文字中是box-style是border，文字居中选中，然后整个面都转180°，然后background-visible透明
//	 在后面图片加上图片
//	 旋转：是一起旋转，绕着y旋转，文字面由透明旋转过来，碰到图片面图片面也旋转就感觉都在旋转了
//	 第一屏：
//	 获得home2的所有的li，先循环，进来的时候，
//	 就获得得当前的位置index,先把所有的的classname 全部设置为空，每次点的时候，就设置成active
//	 判断现在的是左边还是右边，(var一个上一次的oldindex   每一次点完，都把这一次的this.index给oldindex，
//	 左边(this.index<old)就是按上一部左边
//	 	{点左边  左边显示，右边隐藏
//	 	当前的index 加上类名：左边显示
//	 	当前的oldindex 加上类名：右边显示
//	 	}
//	(this.index>old)就是按下一步 点右边)
//	{点右边  右边显示 左边隐藏
//	当前的index 加上类名：右边显示
//	当前的oldindex 加上类名：左边显示
//	}
//	自动轮播{
//		var 全局变量放当前的auto的下标位置变量，这个autoli1  li2都可以用
//		定时器{
//		定时器进来都要习惯加上清除定时器
//		每次进来都auto++，判断auto是否超过了li的长度超过了置为0
//		
//		把当前的所有li2的classname都置为空，
//		再把当前的高亮给当前的li
//		再把右边出现给li1的auto
//		吧左边隐藏给li1的oldindex
//		每次完成都吧下标auto给old，实时更新
//		}
//	}
//
//	-->

		window.onload = function(){
			var liNodes = document.querySelectorAll("#head .headMain .nav li");
			var upNodes = document.querySelectorAll("#head .headMain .nav li .up");
			var arrow = document.querySelector('#head .headMain .arrow ')
			var firstUp = upNodes[0];
			var content = document.querySelector('#content');
			var cLiNodes = document.querySelectorAll('#content .list>li');
			var head = document.querySelector("#head");
			var cList = document.querySelector("#content .list");
			
			/*3d轮播*/
			var home1Lis=document.querySelectorAll("#content .list .home .home1 > li");
			var home2Lis=document.querySelectorAll("#content .list .home .home2 > li");
			var home = document.querySelector("#content .list .home");
			
			var aboutUL = document.querySelectorAll("#content .list .about .item ul");
			
			var team3 = document.querySelector("#content .list .team .team3")
			var teamLis = document.querySelectorAll("#content .list .team .team3 > ul > li");
			
		
			var now = 0;//用于实时更新now
			var timer =0;
			
			var oldIndex =0;
			var autoIndex =0;
			var timer3d = 0;
			var preIndex =0;
			/*窗口重绘要触发的事件，关于视窗大小的都应该重绘*/
			window.onresize = function(){
				/*整个content的部分都会因为窗口边大变小而变化*/
				contentBind();
				/*白色小尖尖会因为视窗变化而改变*/
				arrow.style.left = liNodes[now].getBoundingClientRect().left+ liNodes[now].offsetWidth/2 - arrow.offsetWidth/2+"px";
				/*全部li的top移动也根据视口重创来更新*/
				cList.style.top = -now *(document.documentElement.clientHeight - head.offsetHeight) +"px";
				
				
			}
			
			
			
			/*音频start*/
			var music = document.querySelector("#head .music");
			var audio = music.querySelector("audio");
			
			
			
			music.onclick=function(){
				if(audio.paused){
					audio.play();
					this.style.background = "url(img/musicon.gif) no-repeat";
				}else{
					audio.pause();
					this.style.background = "url(img/musicoff.gif) no-repeat";
				}
			}
			/*音频end*/
			
			
			//出场动画
			var animationAttr = [
			/*第一屏出场动画 start*/
		    {
		    	inAn:function(){
		    		var home1 = document.querySelector("#content .list .home .home1 ");
			        var home2 = document.querySelector ("#content .list .home .home2 ");
			        
			        home1.style.opacity=1;
			        home2.style.opacity=1;
			        
			        home1.style.transform='translateY(0px)'
			        home2.style.transform='translateY(0px)'
		    	},
		    	
		    	outAn:function(){
		    		var home1 = document.querySelector("#content .list .home .home1 ");
			        var home2 = document.querySelector ("#content .list .home .home2 ");
			        
			        home1.style.opacity = 0;
			        home2.style.opacity = 0;
			        
			        home1.style.transform='translateY(-200px)'
			        home2.style.transform='translateY(200px)'
		    	}
		    },
			/*第二屏出场动画 start*/
		    {
					inAn:function(){
						var  plane1   = document.querySelector("#content .list .course .plane1");
						var  plane2   = document.querySelector("#content .list .course .plane2");
						var  plane3   = document.querySelector("#content .list .course .plane3");
						
						plane1.style.transform="translate(0px,0px)";
						plane2.style.transform="translate(0px,0px)";
						plane3.style.transform="translate(0px,0px)";
					},
					outAn:function(){
						var  plane1   = document.querySelector("#content .list .course .plane1");
						var  plane2   = document.querySelector("#content .list .course .plane2");
						var  plane3   = document.querySelector("#content .list .course .plane3");
						
						plane1.style.transform="translate(-200px,-200px)";
						plane2.style.transform="translate(-200px,200px)";
						plane3.style.transform="translate(200px,-200px)";
					}
				},
		    /*第三屏*/
		   {
					inAn:function(){
						var  pencel1   = document.querySelector("#content .works  .pencel1");
						var  pencel2   = document.querySelector("#content .works  .pencel2");
						var  pencel3   = document.querySelector("#content .works  .pencel3");
						
						pencel1.style.transform="translateY(0px)";
						pencel2.style.transform="translateY(0px)";
						pencel3.style.transform="translateY(0px)";
					},
					outAn:function(){
						var  pencel1   = document.querySelector("#content .works  .pencel1");
						var  pencel2   = document.querySelector("#content .works  .pencel2");
						var  pencel3   = document.querySelector("#content .works  .pencel3");
						
						pencel1.style.transform="translateY(-200px)";
						pencel2.style.transform="translateY(200px)";
						pencel3.style.transform="translateY(200px)";
					}
				},
				/*第四屏*/
				{
					inAn:function(){
						var  about3Img1   = document.querySelector("#content .list .about .about3 > .item:nth-child(1)");
						var  about3Img2   = document.querySelector("#content .list .about .about3 > .item:nth-child(2)");
						
						about3Img1.style.transform="rotate(0deg)";
						about3Img2.style.transform="rotate(0deg)";
					},
					outAn:function(){
						var  about3Img1   = document.querySelector("#content .list .about .about3 > .item:nth-child(1)");
						var  about3Img2   = document.querySelector("#content .list .about .about3 > .item:nth-child(2)");
						
						about3Img1.style.transform="rotate(45deg)";
						about3Img2.style.transform="rotate(-45deg)";
					}
				},
				/*第五屏*/
				{
					inAn:function(){
						var  team1   = document.querySelector("#content .list .team .team1");
						var  team2   = document.querySelector("#content .list .team .team2");
						
						team1.style.transform="translateX(0px)";
						team2.style.transform="translateX(0px)";
					},
					outAn:function(){
						var  team1   = document.querySelector("#content .list .team .team1");
						var  team2   = document.querySelector("#content .list .team .team2");
						
						team1.style.transform="translateX(-200px)";
						team2.style.transform="translateX(200px)";
					}
				}
			]
			//出厂动画结束
			
			/*动画调用*/
			for(var i = 0;i<animationAttr.length;i++){
				animationAttr[i]['outAn']();
			}

			setTimeout(function(){
			animationAttr[0]['inAn']();
				
			},1000)
			
			
			//canvas动画
			canvasAn();
			function canvasAn(){
				
				var oc =null;
				var timer1=0;
				var timer2=0;
				
				team3.onmouseleave=function(){
					for(var i=0;i<teamLis.length;i++){
						teamLis[i].style.opacity=1;
					}
					
					removeCanvas();
				}
				
				for(var i=0;i<teamLis.length;i++){
					teamLis[i].onmouseenter=function(){
						for(var i=0;i<teamLis.length;i++){
							teamLis[i].style.opacity=.5;
						}
						this.style.opacity=1;
						//在team3底下添加一个canvas元素
						addCanvas();
						oc.style.position ="absolute";
						oc.style.left = this.offsetLeft+"px";
						oc.style.top = 0+"px";
//						oc.style.background = "pink";
					}
				}
				
				function removeCanvas(){
					
					clearInterval(timer1);
					clearInterval(timer2);
					oc.remove();//不仅要移除，也要把画布清除
					oc =null;
				}
				
				function addCanvas(){
					/*先判断画布中是否有画布，没有进入*/
					if(!oc){
						/*创建一个画布，宽高获取，讲画布放进去之后，就运行气泡函数*/
						oc = document.createElement("canvas");
						oc.width = teamLis[0].offsetWidth;
						oc.height=338;
						team3.appendChild(oc);
						QiPao();
					}
				}
				
				function QiPao(){
					if(oc.getContext){
						var ctx = oc.getContext("2d");
						
						//存放圆的所有信息
						var  arr=[];
						
						//实现动画
					timer1=	setInterval(function(){
							console.log(arr)
							ctx.clearRect(0,0,oc.width,oc.height);
							
							//平滑的修改
							for(var i=0;i<arr.length;i++){
								arr[i].deg+=5;
								arr[i].x =arr[i].startX + (Math.sin(arr[i].deg*Math.PI/180))*arr[i].num;
								arr[i].y = arr[i].startY - 0.5*(arr[i].deg*Math.PI/180)*arr[i].num*1.5;
								if(arr[i].y<50){
									arr.splice(i,1);
								}
							}
							
							
							for(var i=0;i<arr.length;i++){
								ctx.fillStyle="rgba("+arr[i].red+","+arr[i].green+","+arr[i].blue+","+arr[i].a+")";
								ctx.beginPath();
								ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI);
								ctx.fill();
							}
						},1000/60)
						
						
						//维护数据
						timer2=	setInterval(function(){
							var r = Math.round(Math.random()*6+2);
							var x = Math.round(Math.random()*oc.width);
							var y = oc.height - r-2;
							
							var red = Math.round(Math.random()*255);
							var green = Math.round(Math.random()*255);
							var blue = Math.round(Math.random()*255);
							var a = 1;
							
							var startX = x;
							var startY = y;
							var deg = 0;
							var num = Math.round(Math.random()*30)+30;
						
							arr.push({
								x:x,
								y:y,
								r:r,
								red:red,
								green:green,
								blue:blue,
								a:a,
								startX:startX,
								startY:startY,
								deg:deg,
								num:num
							})
						
						},50);
					}
				}
			}
			/*第五屏   end*/
			
			
			
			
			/*第一屏 轮播 start*/
			home3D();
            function home3D(){
            	
         	   for (var i = 0;i<home2Lis.length;i++) {
         		home2Lis[i].index = i;
         		
         		/*添加小圆点的单击事件*/
         		home2Lis[i].onclick = function(){
         			for (var i=0;i<home2Lis.length;i++) {
         				home2Lis[i].className = '';
         			}	
         			this.className = 'active';
         			
         		     /*判断现在点击是向左还是向右*/
         		     if(this.index<oldIndex){
							//点左边  左边显示（leftShow）  右边隐藏（rightHide）
							home1Lis[this.index].className="leftShow";
							home1Lis[oldIndex].className="rightHide";
						}else if(this.index>oldIndex){
							//点右边 右边显示（rightShow）  左边隐藏（leftHide）
							home1Lis[this.index].className="rightShow";
							home1Lis[oldIndex].className="leftHide";
						}
         			/*判断现在点击是向左还是向右*/
         			
         			oldIndex  = this.index;
         		}//小圆点的点击事件
         		
         	}//整体循环home2lis
         	
         	
         	
         	move();
				function move(){
						clearInterval(timer3d);
						/*设置定时器来开启轮播图*/
					    timer3d = setInterval(function(){
							autoIndex++;//每次进来都自动加价，起始是从0开始
							
							if(autoIndex == home2Lis.length){//判断当前的是否有超过长度
								autoIndex=0;
							}
							/*轮播的时候也同步下标，先把所有的都清除，然后给当前的下标加上高亮*/
							for(var i=0;i<home2Lis.length;i++){
									home2Lis[i].className="";
								}
							
//							给当前的自动移动的下标加上高亮和左边出来,右边的class
							home2Lis[autoIndex].className="active";
							home1Lis[autoIndex].className="rightShow";
							home1Lis[oldIndex].className="leftHide";
							
							oldIndex = autoIndex;//每次完了之后都
						},2000)
				}
				
				/*当用户移入的时候就停止轮播图*/
				home.onmouseenter = function(){
					clearInterval(timer3d);
				}
//				home.onmouseleave = function(){
//					move();
//				}
         }//function 3d
			
		
			/*第一屏 轮播 end*/
			
			
			
			
			
			/*第四屏幕 照片爆炸*/
			picBoom();
			function picBoom(){
				for(var i = 0;i<aboutUL.length;i++){
					change(aboutUL[i])
					
				}
				
				function change(ul){
					
					var src = ul.dataset.src;
					var w = ul.offsetWidth/2;
					var h = ul.offsetHeight/2;
					
					
					for (var i = 0;i<4;i++) {
					var liNode = document.createElement('li');
					var imgNode = document.createElement('img');
					
					
					liNode.style.width = w+'px'
					liNode.style.height = h+'px'
					imgNode.src = src;
					
					
					/*左上角:left :0  top:0
					右上角:left:-w  top:0
					左下角:left:0  top:-h
					右下角:left:-w  top:-h*/
					
					/*根据上面的规律和for中的i相结合来移动图片*/
					imgNode.style.left = -(i%2)*w + 'px';
					imgNode.style.top = -Math.floor((i/2))*h +'px'
					
					liNode.appendChild(imgNode);
					ul.appendChild(liNode);
					}
					
					/**/
					var aboutImgs= ul.querySelectorAll("img");
					ul.onmouseenter=function(){
						//	left:0  top:h
						//	left:-2w  top:0
						//	left:w  top:-h
						//	left:-w  top:-2h
						aboutImgs[0].style.top=h+"px";
						aboutImgs[1].style.left=-2*w+"px";
						aboutImgs[2].style.left= w+"px";
						aboutImgs[3].style.top= -2*h+"px";
						
					}
					ul.onmouseleave=function(){
						aboutImgs[0].style.top=0+"px";
						aboutImgs[1].style.left=-w+"px";
						aboutImgs[2].style.left= 0+"px";
						aboutImgs[3].style.top= -h+"px";
						
					}
					/**/
					
				}
				
				
			}
		/*第四屏 照片切换*/
			
			
			/*滚轮逻辑start*/
			if(content.addEventListener){
				content.addEventListener("DOMMouseScroll",function(ev){
					clearTimeout(timer);//防止滚多多的走多多下，只有停止 
					/*加延时器，当滚动的时候，200ms再出发，在你再滚动进来的时候就停止看上一个延时器
					 */
					timer=setTimeout(function(){
						fn(ev);
					},200)
				});
			}
			content.onmousewheel=function(ev){
					clearTimeout(timer);
					timer=setTimeout(function(){
							fn(ev);
						},200)
			};
			
			function fn(ev){
				ev = ev||event;
				var flag ="";
				if(ev.detail){
					flag = ev.detail>0?"down":"up";
				}else if(ev.wheelDelta){
					flag = ev.wheelDelta<0?"down":"up";
				}
				preIndex = now;
				/*在第一屏幕的时候就不要动画了*/
				if((now==0&&flag=='up')||(now==cLiNodes.length-1&&flag=='down')){
					return;
				}
				
				
				switch (flag){
					case "up":
					//判断是否可以按，然后移动
						if(now>0){
							now--;
						}
						move(now);
						break;
					case "down":
						if(now<cLiNodes.length-1){
							now++;
						}
						move(now);
						break;
				}
			}
			/*滚轮逻辑end*/
			
			
		     /*内容区的设置*/
			contentBind();
			function contentBind(){
				//让content = 整个界面的高-头部界面的高
				content.style.height = document.documentElement.clientHeight - head.offsetHeight +"px";
				//让每个li的高 = 整个界面的高-头部的高
				for(var i=0;i<cLiNodes.length;i++){
					cLiNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight +"px";
				}
			}
			/*内容区设置完毕*/
			
			
			/*头部去设置*/
			headBind();
			function headBind(){ 
			//让白色小三角一上来就移动到第一个li = li的left + li宽度的一半-三角的宽度的一半
			arrow.style.left = liNodes[0].getBoundingClientRect().left+liNodes[0].offsetWidth/2-arrow.offsetWidth/2+'px'
			//一上来home就闪一下
			firstUp.style.width = "100%"
			for(var i = 0;i<liNodes.length;i++){
				/*便于后面用上index*/
				liNodes[i].index = i;
				liNodes[i].onclick = function(){
				preIndex=now//在赋值之前把它给后面的变量，作为下一个的先前的标志
				move(this.index);
				/*当li点击的时候告诉我现在的now在哪里，全局变量*/
				now = this.index;
			 }
			}
			}
			/*头部区设置完毕*/
			
			move(now);
			/*小三角移动时要要进行的动作*/
			function move(index){
				for(var i=0;i<upNodes.length;i++){
					upNodes[i].style.width="";
				}
				upNodes[index].style.width="100%";
				arrow.style.left = liNodes[index].getBoundingClientRect().left+ liNodes[index].offsetWidth/2 - arrow.offsetWidth/2+"px";
				//当点击li时，整个top都随着下边*高度，来移动，在top给个过渡
				cList.style.top = -index *(document.documentElement.clientHeight - head.offsetHeight) +"px";
				
			  /*出入场逻辑*/
			 if(animationAttr[index]&&animationAttr[index]['inAn']){
			 animationAttr[index]['inAn']();
			}
			
			if(animationAttr[preIndex]&&animationAttr[index]['outAn']){
			 animationAttr[preIndex]['outAn']();
			}
		
		}
	}
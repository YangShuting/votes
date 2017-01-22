console.log('loading js file successfully!');
/********************************Module*****************************/

var beautyInfo = {
		currentBeauty: null,
	  beauty: [
						  {
						  	name: '新垣结衣',
						  	age: '29',
						  	icon: 'img/GakkiIcon.jpg',
						  	pic: 'img/Gakki.jpg',
						  	country: 'Japan',
						  	hometown: '冲绳',
						  	job: 'actress singer',
						  	voteCounts: 0,
                description: '代表作：《legal hight》《龙樱》《父女七日变》等'
						  },
						  {
						  	name: '长泽雅美',
						  	age: '29',
						  	icon: 'img/majiangIcon.jpg',
						  	pic: 'img/majiang.jpg',
						  	country: 'Japan',
						  	hometown: '东京',
						  	job: 'actress',
						  	voteCounts: 0,
                description: '代表作：《结婚大作战》等'
						  }
	 ]
}



/********************************Octopus*****************************/

var octopus = {
    init: function(){
    	beautyInfo.currentBeauty = beautyInfo.beauty[0];
    	beautyView.init();
    	beautyDetailsView.init();
    },
    
    getBeauty: function(){
    	return beautyInfo.beauty;
    },

    getCurrentBeauty: function(){
    	return beautyInfo.currentBeauty;
    },
    
    setCurrentBeauty: function(beauty){
    	beautyInfo.currentBeauty = beauty;
    },

    increaseVotes: function(){
    	beautyInfo.currentBeauty.voteCounts++;
    	beautyDetailsView.render();
    }

}
/********************************compatibility*************************/
var compatibility = {
    isIE : function(version, comparison) {
            var cc      = 'IE',
                b       = document.createElement('B'),
                docElem = document.documentElement,
                isIE;
                
            if(version){
              cc += ' ' + version;
              if(comparison){ cc = comparison + ' ' + cc; }
            }
            
            b.innerHTML = '<!--[if '+ cc +']><b id="iecctest"></b><![endif]-->';
            docElem.appendChild(b);
            isIE = !!document.getElementById('iecctest');
            docElem.removeChild(b);
            return isIE;
    }
    //is it IE? isIE(); 
    //is it IE6? isIE(6);
    //is it less than or equal to IE 6? isIE(7,'lte');
}

 //Format strings
String.prototype.format  = function(args){ 
                         if( arguments.length > 0 ){ 
                             var result=this; 
                             if(arguments.length==i&&typeof(args)=="object"){ 
                                for(var key in args){ 
                                var reg=new RegExp("({"+key+"})","g"); 
                                result=result.replace(reg, args[key]); 
                                } 
                             } 
                             else{ 
                                for(var i=0;i<arguments.length;i++){ 
                                  if(arguments[i]==undefined){ 
                                    return ""; 
                                  } 
                                  else{ 
                                     var reg=new RegExp ("({["+i+"]})","g"); 
                                     result = result.replace(reg, arguments[i]); 
                                  } 
                                } 
                             } 
                            return result; 
                         } 
                         else{ 
                            return this; 
                         } 
}

/********************************Build DOM*****************************/
var beautyView = {
	  init: function(){
        this.beautyListElem = document.getElementById('beautyNameLists');
        this.render();  
	  },
    
    createImg : function(){
              return  '<div class="member-image">' +
              '<img src="{0}" alt="{1}" title="{2}">' + 
              '</div>';
    },

    createInfo: function(){
              return '<div class="member-info">' + 
              '<h3>{0}</h3>' + 
              '<h5>{1}</h5>' +
              '<p class="description">{2}</p>' + 
              '<div class="social-touch">' + 
              '<a class="fb-touch" href="#"></a>' + 
              '<a class="tweet-touch" href="#"></a>' + 
              '<a class="linkedin-touch" href="#"></a></div></div>';
    },

	  render: function(){
	  	    var beauty,
	  	        i,
              eachBeauty,
              eachBeautyElem,
              imgWrapperElem,
              infoDetailWrapperElem;

          this.beautyListElem.innerHTML = '';
          beauty = octopus.getBeauty();
          for(i = 0; i < beauty.length; i++){
        	  eachBeauty = beauty[i];
            eachBeautyElem = document.createElement('li');
            eachBeautyElem.className = 'eachBeauty';
            infoWrapperElem = document.createElement('div');
            infoWrapperElem.className = 'single-member effect-3 card-box';
            imgWrapperElem = beautyView.createImg().format(eachBeauty.icon, eachBeauty.name, eachBeauty.name);
            infoDetailWrapperElem = beautyView.createInfo().format(eachBeauty.name, eachBeauty.job, eachBeauty.description);
            infoWrapperElem.insertAdjacentHTML( 'beforeend', imgWrapperElem );
            infoWrapperElem.insertAdjacentHTML( 'beforeend', infoDetailWrapperElem );
            eachBeautyElem.appendChild(infoWrapperElem);

            eachBeautyElem.addEventListener('mouseover', (function(each){
              return function(){
                octopus.setCurrentBeauty(each);
                beautyDetailsView.render();
              }
            })(eachBeauty));

            this.beautyListElem.appendChild(eachBeautyElem);
          }
	  }
}

var beautyDetailsView = {
		init: function(){

         this.beauty = octopus.getCurrentBeauty();
         this.beautyNameElem = document.getElementById('beautyName');
         this.voteCountsElem = document.getElementById('voteCounts');
         this.imgElem = document.getElementById('beauty-img');

         this.imgElem.addEventListener('click', function(){
             octopus.increaseVotes();
         });

         this.render();
		},

		render: function(){
				   var beauty = octopus.getCurrentBeauty();
	         this.beautyNameElem.textContent = beauty.name;
	         this.voteCountsElem.textContent = beauty.voteCounts;
	         this.imgElem.src = beauty.pic;
		}
}

octopus.init();
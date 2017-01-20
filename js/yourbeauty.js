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
						  	voteCounts: 0
						  },
						  {
						  	name: '长泽雅美',
						  	age: '29',
						  	icon: 'img/majiangIcon.jpg',
						  	pic: 'img/majiang.jpg',
						  	country: 'Japan',
						  	hometown: '东京',
						  	job: 'actress',
						  	voteCounts: 0
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

var beautyView = {
	  init: function(){
        this.beautyListElem = document.getElementById('beautyNameLists');
        this.render();  
	  },

	  render: function(){
	  	    var beauty,
	  	        i,
              eachBeauty,
              eachBeautyElem;

          this.beautyListElem.innerHTML = '';
          beauty = octopus.getBeauty();

          for(i = 0; i< beauty.length; i++){
          	  eachBeautyElem = document.createElement('li');
              eachBeauty = beauty[i];
              eachBeautyElem.textContent = eachBeauty.name;
              eachBeautyElem.addEventListener('click', (function(each){
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
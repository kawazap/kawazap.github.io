$(function(){
  
  $('.popup_open').on('click',function(event){
    event.preventDefault(); 
    
    $('body').append('<div class="popup_bg"></div>');
    $('.popup_bg').fadeIn(); 
     
      var popup = '#' + $(this).attr('data-target'),
		      $popupBox = $('.popup_box'),

          $popupGroup = $(popup).parents('.popup_content'), 
          $popups = $popupGroup.children('.popup_box'),          

          popupCount = $popups.length,
          currentIndex = $(popup).index(),          

		      popupClose =`
		 		<div class="popup_close">
		 			<span></span>
		 			<span></span>
		 		</div>`,

		      popupNav =`
		 		<div class="popup_nav">
		 			<a href="" class="prev"><img src="http://web-parts-box.com/sample/popup-01/images/arrow_white02.png" alt="next"></a>
		 			<a href="" class="next"><img src="http://web-parts-box.com/sample/popup-01/images/arrow_white.png" alt="prev"></a>
		 		</div>`;
         

      $(popup).show();

		  $popupBox.append(popupClose);
		  $popupBox.append(popupNav);

      setNav();  

      function setNav (){
          $nav = $popups.find('.popup_nav'),
          $navPrev = $nav.find('.prev'),
          $navNext = $nav.find('.next');

        if(currentIndex === 0){        
          $navPrev.addClass('disabled');
        } else {
          $navPrev.removeClass('disabled');
        }
  
        if(currentIndex === popupCount-1){
          $navNext.addClass('disabled');
        } else {
          $navNext.removeClass('disabled');
        }
      }

          
 
      $('.popup_bg, .popup_close').off().click(function(){
        $popupBox.fadeOut();
        
         $('.popup_bg,.popup_close,.popup_nav').fadeOut(function(){
             $('.popup_bg,.popup_close,.popup_nav').remove();
         });
    });

    //next,prev
    $('.popup_nav').on('click','a', function(event){
      event.preventDefault();   

      $(this).parents('.popup_box').fadeOut();

      function goToPopup (index){ 

        $popups.eq(index).fadeIn(); 

        currentIndex = index; 
        updateNav();
      }

      function updateNav(){
        
        if(currentIndex === 0){
          $navPrev.addClass('disabled');
        } else {
          $navPrev.removeClass('disabled');
        }

        if(currentIndex === popupCount - 1){
          $navNext.addClass('disabled');
        } else {
          $navNext.removeClass('disabled');
        }
      }

      if($(this).hasClass('prev')){
        goToPopup(currentIndex - 1);
      } else {
        goToPopup(currentIndex + 1);
      }
    });	
  });
});
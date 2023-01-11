(function () {



$(document).ready(function () {


jQuery('body').on('DOMNodeInserted', '#launcher', function(e) {
  console.log(e.target);
  jQuery("#launcher").css("bottom","40px");
});



jQuery(".bouton-assurance-left").on('click', function() {
	url = jQuery(this).find('a').attr('href');
	window.open(url, '_blank');
});




//Boutons page Ambassadeurs/Réparateurs

$('[data-tab-toggler]').on('click', function(evt) {
	
	elm = $(evt.target).closest('[data-tab-toggler]');
	targetTab = elm.attr('data-tab-toggler');



	if(!$('[data-tab-toggler='+targetTab+']').hasClass('is-active')) {

	     if (targetTab == 'tab-ambassadeur-1') {
		       $('.nq-c-StoresHow-arrow').removeClass('is-right2');
			$('.nq-c-StoresHow-arrow').removeClass('is-right');
	     }

            if (targetTab == 'tab-ambassadeur-2') {
		if ($('.nq-c-StoresHow-arrow').hasClass('is-right2')) {
			$('.nq-c-StoresHow-arrow').removeClass('is-right2');
		}
		$('.nq-c-StoresHow-arrow').toggleClass('is-right');
	     }

            if (targetTab == 'tab-ambassadeur-3') {
		if ($('.nq-c-StoresHow-arrow').hasClass('is-right')) {
			$('.nq-c-StoresHow-arrow').removeClass('is-right');
		}
		$('.nq-c-StoresHow-arrow').toggleClass('is-right2');
	     }


	     if (targetTab == 'tab-reparateur-1') {
		       $('.nq-c-StoresHow-arrow').removeClass('is-right2');
			$('.nq-c-StoresHow-arrow').removeClass('is-right');
	     }

            if (targetTab == 'tab-reparateur-2') {
		if ($('.nq-c-StoresHow-arrow').hasClass('is-right2')) {
			$('.nq-c-StoresHow-arrow').removeClass('is-right2');
		}
		$('.nq-c-StoresHow-arrow').toggleClass('is-right');
	     }

            if (targetTab == 'tab-reparateur-3') {
		if ($('.nq-c-StoresHow-arrow').hasClass('is-right')) {
			$('.nq-c-StoresHow-arrow').removeClass('is-right');
		}
		$('.nq-c-StoresHow-arrow').toggleClass('is-right2');
	     }


        }


        $('[data-tab-toggler]').not('[data-tab-toggler='+targetTab+']').removeClass('is-active');

        $('[data-tab-name]').not('[data-tab-target='+targetTab+']').removeClass('is-active');

        $('[data-tab-toggler='+targetTab+']').addClass('is-active');

        $('[data-tab-name='+targetTab+']').addClass('is-active');

	


});



//Hide bloc on scroll top

    	 var menu = jQuery('.nq-c-Header');
        pos = menu.offset();
	 largeur = jQuery(document).width();


	if (largeur < 768) {

		//Crisp block
		//setTimeout(function(){ 
			//jQuery('.crisp-client a.cc-1oun').attr('style', 'bottom: 60px !important;right:5px !important');
			//jQuery("iframe#launcher").css("bottom": "40px", "right": "-10px");
			//console.log('rez crisp');
		//}, 4000);

		//visuel Tdf
        	jQuery(window).scroll(function(){

		if(jQuery(this).scrollTop() < pos.top+menu.height() && jQuery("body").attr('id') != 'cart' && jQuery("body").attr('id') != 'checkout'){
		  jQuery('.nq-c-Header-mobile__bottom').fadeOut('fast', function(){});
		}

		if(jQuery(this).scrollTop() > pos.top+menu.height() && jQuery("body").attr('id') != 'cart' && jQuery("body").attr('id') != 'checkout'){
		
		  jQuery('.nq-c-Header-mobile__bottom').fadeIn('fast', function(){});
		}
        	});
	}


	if (largeur > 1023) {
		hauteur = (largeur * 0.476)+80;
		jQuery(".section-1 .container-section").css('height',hauteur+'px');

	}

	if (largeur < 769) {
		hauteur = (largeur * 1.65);
		jQuery(".section-1 .container-section").css('height',hauteur+'px');

	}

	

	jQuery(window).on('resize', function(){
	    var win = jQuery(this); //this = window
	    if (win.width() >= 1024) {
		hauteur = (win.width() * 0.476)+80;
		jQuery(".section-1 .container-section").css('height',hauteur+'px');
	    }
	    if (win.width() < 769) {
		hauteur = (win.width() * 1.65);
		jQuery(".section-1 .container-section").css('height',hauteur+'px');
	    }
	});


/* Dyn menu le concept */
if ($("body").hasClass("cms-id-6") || $("body").hasClass("cms-id-7")) {

	$(".side_nav-label a").click(function(e) {
	    e.preventDefault();
	    var aid = $(this).attr("href");
	    $('html,body').animate({scrollTop: $(aid).offset().top + 10},'slow');
	});

}

/*
//Info top Covid19
var largeur = $(window).width();

if (largeur < 500) {
jQuery(".info-head").detach().prependTo('.nq-c-Header');
}


jQuery('.head-plus').on('click', function(){
	jQuery(".info-head" ).toggleClass( "open" );
	if (jQuery(".info-head" ).hasClass("open")) {
		jQuery(".nq-c-Header").css({position: "initial"});
	} else {
		jQuery(".nq-c-Header").css({position: "fixed"});
	}
});
jQuery('.head-moins').on('click', function(){
	jQuery(".info-head" ).toggleClass( "open" );
	if (jQuery(".info-head" ).hasClass("open")) {
		jQuery(".nq-c-Header").css({position: "initial"});
	} else {
		jQuery(".nq-c-Header").css({position: "fixed"});
	}
});
*/






//Cache option Garde Boue pour premier chargement page

		jQuery("label[for='15_76']").hide();
		jQuery("label[for='65_104']").hide();


			check = $(".big-boutons input:checked");
			
			if (check.hasClass('bleu')) {

				jQuery("label[for='15_76']").parent().parent().hide();
				jQuery("label[for='65_105']").parent().parent().hide();
		
			} else if (check.hasClass('noir')) {
				jQuery("label[for='15_76']").parent().parent().hide();
				jQuery("label[for='65_105']").parent().parent().hide();
			} else if (check.hasClass('blanc')) {
				jQuery("label[for='65_105']").parent().parent().show();
				jQuery("label[for='15_76']").parent().parent().hide();
			} else {

			}

			if ($("#group_2 input").length > 1) {
				$(".owl-stage .active .item").addClass('owl-lazy');
				$(".owl-stage .active .item img").css('opacity','0.2');
			}

    jQuery(document).ajaxComplete(function() {

	$('.input-color:not(:checked)').each(function(e) {

		jQuery(this).on('click', function(){
	
			check = $(".big-boutons input:checked");
			//alert(check);
			if (check.hasClass('bleu')) {
				jQuery("label[for='15_76']").parent().parent().hide();
				jQuery("label[for='65_105']").parent().parent().hide();		
			}
			
			if (check.hasClass('noir')) {
				jQuery("label[for='15_76']").parent().parent().hide();
				jQuery("label[for='65_105']").parent().parent().hide();		
			}
			
			if (check.hasClass('blanc')) {
				jQuery("label[for='15_76']").parent().parent().hide();
				jQuery("label[for='65_105']").parent().parent().show();
			}


			if ($("#group_2 input").length > 1) {
				$(".owl-stage .active .item").addClass('owl-lazy');
				$(".owl-stage .active .item img").css('opacity','0.2');
			}
   		});
	});

		//Options cachées garde boue selon choix

    jQuery("label[for='group_3_20']").click(function () {
		jQuery("label[for='15_76']").hide();
		jQuery("label[for='65_104']").show();
		jQuery("label[for='15_75']").hide();
		jQuery("label[for='65_105']").hide();	
    });

    jQuery("label[for='group_3_19']").click(function () {
		jQuery("label[for='15_76']").hide();
		jQuery("label[for='65_104']").hide();
		jQuery("label[for='15_75']").hide();
		jQuery("label[for='65_105']").show();	
    });

   });



	//CF product-variant-bikes pour apres jquery loaded (cause 1.7)
	/*
	$('.input-color:not(:checked)').each(function(e) {

		jQuery(this).on('click', function(){
	
			check = $(".big-boutons input:checked");

			if (check.hasClass('bleu')) {
				jQuery("label[for='15']").parent().hide();		
			} else {
				jQuery("label[for='15']").parent().show();
			}

			if ($("#group_2 input").length > 1) {
				$(".owl-stage .active .item").addClass('owl-lazy');
				$(".owl-stage .active .item img").css('opacity','0.2');
			}
   		});
	});
	*/



        $('.open-popin').on('click', function(e){

            e.preventDefault();

            var target = $(this).data('target');



            $('#'+target).show();

        });





        $('.popin-overlay .close').on('click', function(e){

            e.preventDefault();

            $('.popin-overlay').hide();

        });







        $(".tabs li").on("click", function () {

            $id = $(this).attr("data-id");

            $parent = $(this).parent().next(".content-tabs");

            $parent.find(".content").hide();

            $("#" + $id).show();

            $(this).parent().find("li").removeClass("active");

            $(this).addClass("active")

        });



    });





})(jQuery);






import Inputmask from 'inputmask';
// import { sendForm } from "../plugins/form";

(function() {
    let $blocks = $('.popup');


    $blocks.each((i,e)=> {
        let block = $(e);
        // let zoom = block.attr('data-zoom') || true;
        let dataset = block.data();
    
        switch (block.attr("data-type")) {

            case "youtube":
                block.magnificPopup({
                    type: 'iframe',
                    fixedBgPos: true,
                    removalDelay: 500,
                    overflowY: 'auto',
                    closeBtnInside: true,
                    preloader: false,
                    midClick: true,
                    mainClass: 'mfp-with-zoom',
                    iframe: {
                        markup: '<div class="mfp-iframe-scaler">'+
                                    '<div class="mfp-close"></div>'+
                                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                                '</div>',
                    },
                    patterns: {
                        youtube: {
                          index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
                    
                          id: 'v=',
                    
                          src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
                        },
                    },
                    srcAction: 'iframe_src'
                }); 
            break;
    
            default:
            block.magnificPopup({
                type: 'inline',
                removalDelay: 500,
                mainClass: 'mfp-with-zoom',
                midClick: true
            }); 
            break;
        }
    });
    
    
})();

///**
// * Created by Thedward on 21/02/2016.
// */
//$(window).bind('orientationchange resize', function(event){
//    if (event.orientation) {
//        if (event.orientation == 'landscape') {
//            if (window.rotation == 90) {
//                alert("Rota");
//                rotate(this, -90);
//            } else {
//                alert("ed");
//                rotate(this, 90);
//            }
//        }
//    }
//});
//
//function rotate(el, degs) {
//    iedegs = degs/90;
//    if (iedegs < 0) iedegs += 4;
//    transform = 'rotate('+degs+'deg)';
//    iefilter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+iedegs+')';
//    styles = {
//        transform: transform,
//        '-webkit-transform': transform,
//        '-moz-transform': transform,
//        '-o-transform': transform,
//        filter: iefilter,
//        '-ms-filter': iefilter
//    };
//    $(el).css(styles);
//}
(function (window, $) {

    $(function() {


        $('.ripple').on('click', function (event) {
            event.preventDefault();

            var $div = $('<div/>'),
                btnOffset = $(this).offset(),
                xPos = event.pageX - btnOffset.left,
                yPos = event.pageY - btnOffset.top;



            $div.addClass('ripple-effect');
            var $ripple = $(".ripple-effect");

            $ripple.css("height", $(this).height());
            $ripple.css("width", $(this).height());
            $div
                .css({
                    top: yPos - ($ripple.height()/2),
                    left: xPos - ($ripple.width()/2),
                    background: $(this).data("ripple-color")
                })
                .appendTo($(this));

            window.setTimeout(function(){
                $div.remove();
            }, 2000);
        });

    });

})(window, jQuery);
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
var d = document.querySelectorAll('div > div');

Array.prototype.forEach.call(d, function(el){

  el.addEventListener('click', function(e){

    // Abort if during animation
    if(el.classList.contains('animate-on-transforms')) return;

    // Remove eventual ghost block
    var ghost = document.querySelector('.ghost');
    if(ghost) {
      el.parentNode.removeChild(ghost);
    }

    // Get the first position.
    var first = el.getBoundingClientRect();
    var firstOpacity = window.getComputedStyle(el, null).opacity;

    // Now set the element to the last position.
    el.classList.toggle('cover');

    // Read again. This forces a sync layout, so be careful.
    var last = el.getBoundingClientRect();

    // You can do this for other computed styles as well, if needed.
    // Just be sure to stick to compositor-only props like transform
    // and opacity where possible.
    var invertX = first.left - last.left;
    var invertY = first.top - last.top;

    var scaleX = first.width/last.width;
    var scaleY = first.height/last.height;


    // Invert.
    el.style.transform = el.style.webkitTransform = 'translate3d(' + invertX + 'px,' + invertY + 'px, 0px) scale('+scaleX+', '+scaleY+')';
    el.style.opacity = firstOpacity;

    // Wait for the next frame so we know all the style changes have taken hold.
    requestAnimationFrame(function() {

      // Create ghost if div goes big
			if(el.classList.contains('cover')) {
        var ghost = document.createElement('div');
        ghost.className = "ghost";
        el.parentNode.insertBefore(ghost, el);
      }

      // Switch on animations.
      el.classList.add('animate-on-transforms');

      // GO GO GOOOOOO!
      el.style.transform = el.style.webkitTransform = '';
      el.style.opacity = '';
    });


    // Capture the end with transitionend
    el.addEventListener('transitionend', function(){
      el.classList.remove('animate-on-transforms');
    });
	});
});
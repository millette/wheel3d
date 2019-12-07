const colors = ["red", "green", "blue", "pink", "yellow", "black", "purple"]

const $body = document.querySelector('body');

window.addEventListener('load', () => {
	var carousels = document.querySelectorAll('.carousel');

	for (var i = 0; i < carousels.length; i++) {
		carousel(carousels[i]);
	}
});

function carousel(root) {
	var
		figure = root.querySelector('figure'),
		images = figure.children,
		n = images.length,
		gap = root.dataset.gap || 10,

		theta =  2 * Math.PI / (n),
		currImage = 0;

  figure.addEventListener("click", (ev) => {
    const index2 = Array.prototype.indexOf.call(figure.children, ev.target)
    if (index2 === -1) return
    $body.style.backgroundColor = images[index2].style.backgroundColor
    rotateCarousel(index2)
  })

	setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
	window.addEventListener('resize', () => {
		setupCarousel(n, parseFloat(getComputedStyle(images[0]).width))
	});

	function setupCarousel(n, s) {
		var apothem = s / (2 * Math.tan(Math.PI / (n)));

		figure.style.transformOrigin = `50% 50% ${- apothem}px`;

		for (var i = 0; i < n; i++) {
      images[i].style.padding = `${gap}px`;
      images[i].style.backgroundColor = colors[i % colors.length]
      images[i].innerText = `#${i}`
    }
		for (i = 1; i < n; i++) {
			images[i].style.transformOrigin = `50% 50% ${- apothem}px`;
			images[i].style.transform = `rotateY(${i * theta}rad)`;
    }

    for (i = 0; i < n; i++)
        images[i].style.backfaceVisibility = 'hidden';

		rotateCarousel(currImage);
	}

	function rotateCarousel(imageIndex) {
    console.log("imageIndex", imageIndex, imageIndex * -theta)
    console.log("currImage", currImage, currImage * -theta)
    const diff = currImage - imageIndex
		console.log("diff", diff < 0 ? diff + 45 : diff)
		console.log(imageIndex * -theta, "rad")
    currImage = imageIndex

		figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
	}
}

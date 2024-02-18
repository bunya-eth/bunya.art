const parallax = () => {
  function startParallax() {
    const layers = document.querySelectorAll('.parallax-layer');
    // Default speed differences for desktop
    let speedDiffs = [1.05, 0.15, 0.22, 0.1, 0.3, 0.35, 0.25, 0.22, 0.6, 0.13, 0.05, 0, 0, 0.1];

    // Check if the device is mobile (or if the viewport width is less than a certain breakpoint, e.g., 768px)
    if (window.innerWidth < 768) {
      // Adjusted speed differences for mobile
      speedDiffs = [0.5, 0.075, 0.11, 0.05, 0.15, 0.175, 0.15, 0.11, 0.3, 0.065, 0.025, 0, 0, 0.05];
    }

    function updatePositions() {
      layers.forEach((layer, index) => {
        const speed = speedDiffs[index];
        const currentPos = parseFloat(getComputedStyle(layer).backgroundPositionX) || 0;
        layer.style.backgroundPositionX = (currentPos - speed) + 'px';
      });

      requestAnimationFrame(updatePositions);
    }

    updatePositions();
  }

  // Start the parallax effect when the DOM content is loaded
  document.addEventListener('DOMContentLoaded', startParallax);
};

export default parallax;
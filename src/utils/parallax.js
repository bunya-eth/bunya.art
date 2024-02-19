const parallax = () => {
  function startParallax() {
    const layers = document.querySelectorAll('.parallax-layer');
    // Default speed differences for desktop
    let speedDiffs = [1.05, 0.15, 0.22, 0.1, 0.3, 0.35, 0.25, 0.22, 0.6, 0.13, 0.05, 0, 0, 0.1];

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
const blink = () => {
    document.addEventListener('DOMContentLoaded', function() {
        const layer11 = document.getElementById('layer11');
      
        function startBlink() {
          // Remove the animation to reset it
          layer11.style.animation = 'none';
          // Trigger a reflow in between removing and adding the animation to reset it
          layer11.offsetHeight;
          // Add the animation back to start it
          layer11.style.animation = 'blink 3s ease-in-out forwards';
          // Set opacity back to 0 after animation ends
          setTimeout(() => { layer11.style.opacity = 0; }, 3000);
        }
      
        // Start the first blink after a delay of 10 seconds
        setTimeout(startBlink, 10000);
      
        // Continue blinking every 10 seconds after the initial blink
        setInterval(startBlink, 10000 + 3000); // The total time is the sum of the blink duration and the delay
      });
};

export default blink;
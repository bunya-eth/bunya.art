const folder = () => {
  $(document).ready(function() {
    var wasDragged = false;
    var timeout;

    // Dynamically calculate containment boundaries to prevent overflow
    function updateContainment() {
      const headerHeight = $("#header").outerHeight(true);
      const heroSectionOffset = $("#home").offset();
      const heroSectionWidth = $("#home").width();
      const heroSectionHeight = $("#home").height();
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const draggableElementWidth = $("#folder-icon-wrapper").outerWidth(true);
      const rightBoundary = heroSectionOffset.left + heroSectionWidth - draggableElementWidth - scrollbarWidth;
      const bottomBoundary = heroSectionOffset.top + heroSectionHeight - $("#folder-icon-wrapper").outerHeight(true);
    
      return [heroSectionOffset.left, headerHeight, rightBoundary, bottomBoundary];
    }
    
    function updateFolderWindowContainment() {
      const headerHeight = $("#header").outerHeight(true);
      const heroSectionOffset = $("#home").offset();
      const heroSectionWidth = $("#home").width() - 407; // Subtract buffer width
      const heroSectionHeight = $("#home").height();
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const draggableElementWidth = $("#folder-icon-wrapper").outerWidth(true);
      const rightBoundary = heroSectionOffset.left + heroSectionWidth - draggableElementWidth - scrollbarWidth;
      const bottomBoundary = heroSectionOffset.top + heroSectionHeight - $("#folder-icon-wrapper").outerHeight(true);
    
      return [heroSectionOffset.left, headerHeight, rightBoundary, bottomBoundary];
    }

    function updateMinimizedWindowContainment() {
      const headerHeight = $("#header").outerHeight(true);
      const heroSectionOffset = $("#home").offset();
      const heroSectionWidth = $("#home").width() - 232; // Subtract buffer width for minimized state
      const heroSectionHeight = $("#home").height();
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const rightBoundary = heroSectionOffset.left + heroSectionWidth - scrollbarWidth;
      const bottomBoundary = heroSectionOffset.top + heroSectionHeight - 20; // Subtract buffer height for minimized state
    
      return [heroSectionOffset.left, headerHeight, rightBoundary, bottomBoundary];
    }

    // Update the containment when the window is resized
    $(window).resize(function() {
      $(".window, #folder-icon-wrapper").draggable("option", "containment", updateContainment());
    });

    // Folder icon draggable with updated containment
    $("#folder-icon-wrapper").draggable({
      containment: updateContainment(),
      snap: true,
      snapMode: "both",
      snapTolerance: 30,
      grid: [100, 100],
      start: function(event, ui) {
        wasDragged = true;
      },
      stop: function(event, ui) {
        setTimeout(function() { wasDragged = false; }, 100);
      }
    });

    // Open the folder window on folder icon double click
    $('#folder-icon-wrapper').dblclick(function() {
      if (!wasDragged) {
        $('#folder-window').css({
          opacity: 0,
          display: 'block'
        }).animate({
          opacity: 1,
          top: '-=10', 
        }, 300);
      }
    });

    let lastTap = 0;
$('#folder-icon-wrapper').on('touchend', function(event) {
  const currentTime = new Date().getTime();
  const tapLength = currentTime - lastTap;
  clearTimeout(timeout);

  if (tapLength < 300 && tapLength > 0) {
    // Double tap logic
    if (!wasDragged) {
      $('#folder-window').show();
    }
  } else {
    // Reset tap timer
    timeout = setTimeout(function() {
      clearTimeout(timeout);
    }, 300);
  }
  lastTap = currentTime;
});

// File click functionality to open text file windows with touch support
$(document).on('touchend', '.file-icon', function(event) {
  event.preventDefault(); // Prevent the default action to ensure touch event is handled properly
  const currentTime = new Date().getTime();
  const tapLength = currentTime - lastTap;
  clearTimeout(timeout);

  if (tapLength < 300 && tapLength > 0) {
    // Double tap logic
    if (!wasDragged) {
      const fileName = $(this).data('file');
      const fileContentId = `file-content-${fileName.replace('.txt', '')}`;
      
      if (!$(`#${fileContentId}`).length) {
        createTextFileWindow(fileName, fileContentId, true); // Pass true to indicate animation is needed
      } else {
        $(`#${fileContentId}`).css({
          opacity: 0,
          display: 'block'
        }).animate({
          opacity: 1,
          top: '-=10',
        }, 300);
      }
    }
  } else {
    // Reset tap timer
    timeout = setTimeout(function() {
      clearTimeout(timeout);
    }, 300);
  }
  lastTap = currentTime;
});

    // Folder and text file window draggable within hero section
    $('.window').each(function() {
      $(this).draggable({
        handle: ".window-title-bar",
        containment: updateFolderWindowContainment()
      });
    });

    // Minimize functionality
    $(document).on('click', '.window-minimize', function() {
      const windowContent = $(this).closest('.window').find('.window-content');
      windowContent.toggle(); // Toggle the visibility of the content
      $(this).closest('.window').toggleClass('minimized');

      
  // Get the current state of the window
  const isMinimized = $(this).closest('.window').hasClass('minimized');

  // Apply the appropriate containment based on the window state
  const containmentFunction = isMinimized ? updateMinimizedWindowContainment : updateContainment;
  $(this).closest('.window').draggable('option', 'containment', containmentFunction());
    });

    // Close functionality
    $(document).on('click', '.window-close', function() {
      $(this).closest('.window').hide();
    });

    // File click functionality to open text file windows
    $(document).on('dblclick', '.file-icon', function() {
      if (!wasDragged) {
        const fileName = $(this).data('file');
        const fileContentId = `file-content-${fileName.replace('.txt', '')}`;
    
        // Check if the window exists, create or show with animation
        if (!$(`#${fileContentId}`).length) {
          createTextFileWindow(fileName, fileContentId, true); // Pass true to indicate animation is needed
        } else {
          $(`#${fileContentId}`).css({
            opacity: 0,
            display: 'block'
          }).animate({
            opacity: 1,
            top: '-=10',  // Adjust based on your design needs
          }, 300); // Animation duration in milliseconds
        }
      }
    });

   // Function to create and append text file window
   function createTextFileWindow(fileName, fileContentId, animate = false) {
    const fileContents = {
      "file1.txt": "Yooooo! You found the way, thank you for exploring! Appreciate You for visiting and want to highlight a few points :<br><br>- This is V1 of the website as I'm just getting started with front-end, just exploring possibilities myself<br><br>- I build it from scratch in two weeks with a help of ChatGPT4 and youtube tutorials (*keving garnett voice* anything is possible!!!)<br><br>- I had no previous programming and front-end experience at all<br><br>- My goal is to create my ultimate playground and probably website gonna look completely different on the next iterations<br><br>- You can see the Games tab is not active yet, because I haven't built shit yet, next step is gonna be creating a UI interface for my own games to come.<br><br>- Yeah, exciting times ahead, always wanted to build my own interactive stuff, and here we are!<br><br>- Would truly appreciate a comment about my website on X, thank You!",
      "file2.txt": "And you did it anyway. So predictable. There is literally nothing :D<br><br><br><br><br><br>Unless...<br>↓<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> AND YOU JUST SCROLLED ALL THE WAY DOWN TOO LMAO<br><br><br><br><br><br><br>I hope I made you smile<br>If not, screenshot it and blame <a href='https://twitter.com/notthreadguy' target='_blank'>@notthreadguy</a> on X",
    };

    const fileTitles = {
      "file1.txt": "OpepenMe.txt",
      "file2.txt": "DoNotOpepen.txt",
    }

    const title = fileTitles[fileName] || fileName; // Default to the file name if no title is set

    const content = fileContents[fileName] || "Content not available.";

    const textFileWindow = $(`<div class="window file-window" id="${fileContentId}">
  <div class="window-title-bar">
    <span class="window-title">${title}</span>
    <div class="window-controls">
      <span class="window-minimize">_</span>
      <span class="window-close">&times;</span>
    </div>
  </div>
  <div class="window-content text-file-content">
    <p>${content}</p>
  </div>
</div>`).appendTo('body');
if (animate) {
  $(`#${fileContentId}`).css({
    opacity: 0,
    display: 'block'
  }).animate({
    opacity: 1,
    top: '-=10',  // Adjust based on your design needs
  }, 300); // Specify the animation duration
} else {
  // Show without animation if not specified
  $(`#${fileContentId}`).show();
}
  

  $(`#${fileContentId} .window-content`).html(`<p>${content}</p>`);

      // Make the new window draggable within the hero section
      textFileWindow.draggable({
        handle: '.window-title-bar',
        containment: updateFolderWindowContainment()
      });
    }
    // Disable dragging on mobile devices
    if ('ontouchstart' in document.documentElement) {
      $("#folder-icon-wrapper").draggable("disable");
      $('.window').draggable("disable");
    }
  });
};

export default folder;
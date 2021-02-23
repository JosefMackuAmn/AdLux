//This utility makes a video element "responsive"
//by manipulating it´s source elements based on the screen size
class ResponsiveVideo {

  constructor(id, sources) {

    //Getting native video element
    this.videoEl = document.getElementById(id);
    
    //Sorting each source sizes array descendingly by size maxWidth
    for (const source of sources) {

      source.sizes.sort((prevSize, thisSize) => thisSize.maxWidth - prevSize.maxWidth);

    }

    //Keeping track of video sources
    this.sources = sources;

    //Whenever window is resized, source elements of the video will get updated
    window.addEventListener('resize', () => {

      this.update();

    })

    //Initializing the source elements by calling the update function on page load
    this.update();

  }

  update() {

    //Getting current screen width 
    const currentWidth = document.documentElement.clientWidth;  

    //Strings representing each source element will be pushed into this array
    let currentSources = [];

    //For each source in source config of the video
    for (const source of this.sources) {

      //Getting sorted array of all suported sizes (f.e [INFINITY, 1200, 800, 500])
      // -> 1st size (index 0): 1200 - INFINITY, 2nd size (index 1): 800 - 1200, etc  
      const sourceSizes = source.sizes.map(size => size.maxWidth);

      //Getting first index for which the current window size is greater than specified size
      let currentSizeId = sourceSizes.findIndex((size, id) => (size <= currentWidth));

      //If the current window size is smaller than the smallest specified size, using size array length (so the last element gets used after subtracting 1)
      if (currentSizeId === -1) {
        currentSizeId = sourceSizes.length;
      }

      //Creating source string for adequate size
      //Subtracting currentSizeId by 1 because of transformation (when source size index 1 fullfills relation size <= currentWidth, the source size index 0 (first size) must be used)
      currentSources.push(this.createSource(source, currentSizeId - 1));
    }

    //Adding fallback text
    currentSources.push('Your browser does not support HTML5 video')

    //Joining all sources into a string
   const videoElInner = currentSources.join('');

   //If the source string did not change this update cycle, returning
   if (this.lastSourceString === videoElInner) {
      return;
   }

   //Cloning video element
   const newVideo = this.videoEl.cloneNode(true);

   //Setting sources for the video clone
   newVideo.innerHTML = videoElInner;

   //Replacing native video element with its clone
   this.videoEl.parentElement.appendChild(newVideo);
   this.videoEl.parentElement.removeChild(this.videoEl);

   //Updating video element hook
   this.videoEl = newVideo;

   //Saving this source string, so it can be used for optimalization next update cycle
   this.lastSourceString = videoElInner;

  }

  //Creates string source for given source and its size id
  //f.e <source src="img/movie.mov" type="video/quicktime">
  createSource(source, id) {

    return `<source src="${source.filePath}${source.sizes[id].name}.${source.extension}" type="${source.type}">`

  }

}

export default ResponsiveVideo;
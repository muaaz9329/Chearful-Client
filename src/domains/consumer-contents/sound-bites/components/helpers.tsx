export function isSvg(url: string) {
    // Extract the file extension from the URL
    // @ts-ignore
    try{  
      // @ts-ignore
      const fileExtension = url.split(".").pop().toLowerCase();

    // Check if it's an SVG or JPEG file
    return fileExtension === "svg";
    } 
    catch(err){
      return false
    }
    
  
  }
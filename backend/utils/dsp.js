/**
 * Digital Signal Processing utilities
 */

// Create window functions for signal processing
function createWindow(type, length) {
    const window = new Array(length);
    
    switch (type.toLowerCase()) {
      case "hamming":
        // Hamming window: w(n) = 0.54 - 0.46 * cos(2πn/(N-1))
        for (let i = 0; i < length; i++) {
          window[i] = 0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (length - 1));
        }
        break;
        
      case "hann":
        // Hann window: w(n) = 0.5 * (1 - cos(2πn/(N-1)))
        for (let i = 0; i < length; i++) {
          window[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (length - 1)));
        }
        break;
        
      case "blackman":
        // Blackman window
        const alpha = 0.16;
        const a0 = (1 - alpha) / 2;
        const a1 = 0.5;
        const a2 = alpha / 2;
        
        for (let i = 0; i < length; i++) {
          window[i] = a0 - a1 * Math.cos((2 * Math.PI * i) / (length - 1)) + 
                      a2 * Math.cos((4 * Math.PI * i) / (length - 1));
        }
        break;
        
      case "rectangular":
      default:
        // Rectangular window (no windowing)
        for (let i = 0; i < length; i++) {
          window[i] = 1.0;
        }
    }
    
    return window;
  }
  
  module.exports = {
    createWindow
  };
  
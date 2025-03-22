import * as deepar from "deepar";

// Log the version. Just in case.
console.log("Deepar version: " + deepar.version);

// Top-level await is not supported.
// So we wrap the whole code in an async function that is called immediatly.
(async function () {
  // Get the element you want to place DeepAR into. DeepAR will inherit its width and height from this and fill it.
  const previewElement = document.getElementById("ar-screen");

  // trigger loading progress bar animation
  const loadingProgressBar = document.getElementById("loading-progress-bar");
  loadingProgressBar.style.width = "100%";

  // All the effects are in the public/effects folder.
  // Here we define the order of effect files.

  let deepAR = null;

  // Initialize DeepAR with an effect file.
  try {
    deepAR = await deepar.initialize({
      licenseKey: "1ac7897bf590504547fecabc1283ccdc95ff4fcc2597b9da30957878aa032a971f7e249db8232ac5",
      previewElement,
      effect: "effects/ray-ban-wayfarer.deepar",
      // Removing the rootPath option will make DeepAR load the resources from the JSdelivr CDN,
      // which is fine for development but is not recommended for production since it's not optimized for performance and can be unstable.
      // More info here: https://docs.deepar.ai/deepar-sdk/platforms/web/tutorials/download-optimizations/#custom-deployment-of-deepar-web-resources
      rootPath: "./deepar-resources",
      additionalOptions: {
        cameraConfig: {
          // facingMode: 'environment'  // uncomment this line to use the rear camera
        },
      },
    });
  } catch (error) {
    console.error(error);
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("permission-denied-screen").style.display = "block";
    return;
  }

  // Hide the loading screen.
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("ar-screen").style.display = "block";
})();

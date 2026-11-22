const media = document.querySelector("[data-sunflower]");

if (media) {
  const video = media.querySelector(".sunflower-video");
  const trigger = media.querySelector(".sunflower-trigger");
  const scenes = [
    { type: "video", label: "sunflower video one", src: "assets/videos/sunflower-movie.MOV" },
    { type: "color", label: "the sunflower color" },
    { type: "video", label: "sunflower video two", src: "assets/videos/sunflower-movie-II.MOV" },
    { type: "color", label: "the sunflower color" },
    { type: "video", label: "sunflower video three", src: "assets/videos/sunflower-movie-III.MOV" },
    { type: "color", label: "the sunflower color" },
    { type: "video", label: "sunflower video four", src: "assets/videos/sunflower-movie-IV.MOV" },
    { type: "color", label: "the sunflower color" },
  ];
  let activeIndex = 0;

  function showScene() {
    const scene = scenes[activeIndex];
    const nextScene = scenes[(activeIndex + 1) % scenes.length];
    media.dataset.scene = scene.type;
    trigger.setAttribute("aria-label", `Show ${nextScene.label}`);

    if (scene.type !== "video") {
      video.pause();
      if (video.readyState > 0) video.currentTime = 0;
      return;
    }

    video.src = scene.src;
    video.load();
    video.play().catch((error) => {
      if (media.dataset.scene === "video" && error.name !== "AbortError") {
        console.error(`Unable to play ${scene.src}`, error);
      }
    });
  }

  trigger.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % scenes.length;
    showScene();
  });

  video.addEventListener("error", () => {
    if (media.dataset.scene === "video") {
      console.error(`Unable to load ${video.currentSrc}`, video.error);
    }
  });

  showScene();
}

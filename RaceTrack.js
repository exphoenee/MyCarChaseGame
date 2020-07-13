class raceTrack {
  constructor(image) {
    this.image = image;
    this.raceTrack = null;
  }

  create() {
    this.raceTrack = document.createElement("div");
    this.raceTrack.classList.add("racetrack");
    this.raceTrack.id = "racetrack";
    this.raceTrack.style.position = "fixed";
    this.raceTrack.style.top = "0";
    this.raceTrack.style.left = "0";
    this.raceTrack.style.height = 100 + "%";
    this.raceTrack.style.width = 100 + "%";
    this.raceTrack.style.backgroundImage = "url(" + this.image + ")";
    this.raceTrack.style.backgroundPosition = "center center";
    this.raceTrack.style.backgroundSize = "contain";
    this.raceTrack.style.backgroundRepeat = "no-repeat";
    document.body.appendChild(this.raceTrack);
  }
}

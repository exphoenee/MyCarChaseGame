class raceTrack {
  constructor(image) {
    this.image = image;
    this.raceTrackDOM = null;
  }

  create() {
    if (!this.raceTrackDOM) {
    this.raceTrackDOM = document.createElement("div");
    this.raceTrackDOM.classList.add("racetrack");
    this.raceTrackDOM.id = "racetrack";
    this.raceTrackDOM.style.height = 900 + "px";
    this.raceTrackDOM.style.width = 1100 + "px";
    this.raceTrackDOM.style.margin = "0px auto";
    this.raceTrackDOM.style.backgroundImage = "url(" + this.image + ")";
    this.raceTrackDOM.style.backgroundPosition = "top center";
    this.raceTrackDOM.style.backgroundSize = "contain";
    this.raceTrackDOM.style.backgroundRepeat = "no-repeat";
    document.body.appendChild(this.raceTrackDOM);}
  }
}

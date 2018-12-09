import Importer from "./importer/Importer";

(async () => {
  let { project, images } = await Importer.get("T6SJSFyXKLPZTwt4Sxv8GOud");
  let canvas = Importer.loadPage(project, 0, images);

  let refs = {};

  for (let child of canvas.children) {
    document.querySelector("#canvas").appendChild(child.draw(refs));
  }
})();

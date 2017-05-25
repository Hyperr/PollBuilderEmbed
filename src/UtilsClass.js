
export default class Utils
{
	// used onload to halfen images that are double size for retina
	static halfenImage(img) {
		img.style.width = img.width/2 + "px";
	}
}

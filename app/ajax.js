module.exports = function ajax(path, next) {
	var r = new XMLHttpRequest();
	r.open("GET", path, true);
	r.onreadystatechange = function () { next(r); };
	r.send();
}
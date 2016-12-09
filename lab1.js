var request = require('request');
var url = 'http://www.mosigra.ru';
//var url = 'http://www.csd.tsu.ru';
var b = [];
var old = [];
var c = 0;
var depth = 3;

function rec(u, c) {
	c += 1;
	request(u, function(err,res,body) {
		if (err) console.log(err);
		if (body != undefined) {
			var a = body.match(/[A-Za-z\d][\w\.-]+@[\w\.-]+\.[A-Za-z\d-]+[a-zA-Z\d]/ig);
			for (var i in a) {
				if (!(b.includes(a[i]))) {b.push(a[i]); console.log(a[i]);}
			}
			var l = body.match(/<a href="(\/[-+\w:\/#@$.]*)/ig);
			for (var i in l) {
				if (!(old.includes(l[i]))) l.splice(i, 1);
				else old.push(l[i]);
			}
			if (c < depth) {
				for (var i = 0; i < Math.min(30, l.length); i++) {
					v = l[i].substring(9);
					rec(u+v, c);
				}
			}
		}		
	});
}
rec(url, c);

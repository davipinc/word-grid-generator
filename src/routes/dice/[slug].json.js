import diceClassic from './classic.json';
import diceNew from './new.json';

const diceTypes = {
	classic: diceClassic,
	new: diceNew
};

export function get(req, res, next) {
	const { slug } = req.params;
	console.log('slug', slug);
	console.log(diceTypes[slug]);

	if (diceTypes[slug]) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify(diceTypes[slug]));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

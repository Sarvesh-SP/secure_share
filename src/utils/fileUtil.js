const check = (result) => {
	if (!result) {
		return false;
	}

	return true;
};

//Render Download Page with a Key field
const linkGen = (id) => {
	return `${process.env.BASE_URL}/api/files/download/${id}`;
	//Use this link to render download page
};

const downloadLink = (path) => {
	return `${__dirname}/../../${path}`;
};

module.exports = {
	check,
	linkGen,
	downloadLink,
};

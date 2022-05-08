const check = (result) => {
	if (!result) {
		return false;
	}

	return true;
};

const linkGen = (id) => {
	return `${process.env.APP_BASE_URL}/api/files/${response.uuid}`;
};

module.exports = {
	check,
	linkGen,
};

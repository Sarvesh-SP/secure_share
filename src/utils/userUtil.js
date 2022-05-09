const check = (result) => {
	if (!result) {
		return false;
	}

	return true;
};

const linkGen = (id) => {
	return `${process.env.APP_BASE_URL}/api/files/${response.uuid}`;
};

const handleErrors = (err) => {
	console.log(err.message, err.code);

	let errors = { email: "", password: "" };

	//incorrect email
	if (err.message === "Incorrect email") {
		errors.email = "that email is not registered";
	}

	if (err.message === "Incorrect password") {
		errors.password = "that password is incorrect";
	}

	if (err.code === 11000) {
		errors.email = "that email is already registered";
		return errors;
	}

	if (err.message.includes("user validation failed")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

module.exports = {
	check,
	linkGen,
	handleErrors,
};

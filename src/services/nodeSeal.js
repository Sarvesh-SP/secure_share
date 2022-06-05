const { Seal } = require("node-seal")(async () => {
	// Wait for the web assembly to fully initialize
	const Morfix = await Seal();

	////////////////////////
	// Encryption Parameters
	////////////////////////

	// Create a new EncryptionParameters
	const schemeType = Morfix.SchemeType.BFV;
	const polyModulusDegree = 4096;
	const bitSizes = [36, 36, 37];
	const bitSize = 20;

	const encParms = Morfix.EncryptionParameters(schemeType); // Assign Poly Modulus Degree
	encParms.setPolyModulusDegree(polyModulusDegree);

	// Create a suitable set of CoeffModulus primes
	const coeffModulus = Morfix.CoeffModulus.Create(
		polyModulusDegree,
		Int32Array.from(bitSizes)
	);
	encParms.setCoeffModulus(coeffModulus); // Assign a PlainModulus (only for BFV scheme type)
	const plainModulus = Morfix.PlainModulus.Batching(
		polyModulusDegree,
		bitSize
	);
	encParms.setPlainModulus(plainModulus); ////////////////////////
	// Context
	////////////////////////

	// Create a new Context
	const context = Morfix.Context(encParms, true); // Helper to check if the Context was created successfully
	if (!context.parametersSet) {
		throw new Error(
			"Could not set the parameters in the given context. Please try different encryption parameters."
		);
	} ////////////////////////
	// Keys
	////////////////////////

	const keyGenerator = Morfix.KeyGenerator(context);
	const secretKey = keyGenerator.getSecretKey();
	const publicKey = keyGenerator.getPublicKey(); ////////////////////////
	// Instances
	////////////////////////

	const evaluator = Morfix.Evaluator(context);
	// Create a BatchEncoder (only BFV SchemeType)
	const batchEncoder = Morfix.BatchEncoder(context);
	const encryptor = Morfix.Encryptor(context, publicKey);
	const decryptor = Morfix.Decryptor(context, secretKey); ////////////////////////
	// Homomorphic Functions
	////////////////////////

	// Create an array of 4096 values
	const array = Int32Array.from({ length: 4096 }).map((_, i) => i); // Encode data to a PlainText
	const plain = batchEncoder.encode(array);

	// Encrypt a PlainText
	const cipher = encryptor.encrypt(plain);

	// Decrypt a CipherText
	const decryptedPlainText = decryptor.decrypt(cipher);

	// Decode data from a PlainText
	const decodedPlainText = batchEncoder.decode(decryptedPlainText);
	// decodedPlainText === array
})();

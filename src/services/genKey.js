// Generate and save
const fs = require("fs");

// const genKeyPair = async keySize => {
//   const keys = paillier.generateRandomKeys(keySize)
//   privateKey = keys.privateKey
//   publicKey = keys.publicKey  // BigInt's do not serialize natively.
//   // We're going to implement out own naïve serializer method
//   // which just saves to a string of numbers.  BigInt.prototype.toJSON = function () {
//     return `${this.toString()}`
//   }  fs.writeFileSync(
//     'paillier_private_key',
//     JSON.stringify(privateKey),
//     'utf8'
//   )  fs.writeFileSync(
//     'paillier_public_key',
//     JSON.stringify(publicKey),
//     'utf8'
//   )
// }// Load and instantiate
// const loadKeys = async () => {
//   const rawPrivateKey = fs.readFileSync(
//     'paillier_private_key',
//     'utf8'
//   )
//   const rawPublicKey = fs.readFileSync(
//     'paillier_public_key',
//     'utf8'
//   )
//   const privateKeyObject = JSON.parse(rawPrivateKey)
//   const publicKeyObject = JSON.parse(rawPublicKey)  const publicKey = new paillier.PublicKey(
//     BigInt(publicKeyObject.n),
//     BigInt(publicKeyObject.g)
//   )
//   const privateKey = new paillier.PrivateKey(
//     BigInt(privateKeyObject.lambda),
//     BigInt(privateKeyObject.mu),
//     publicKey,
//     BigInt(privateKeyObject.p),
//     BigInt(privateKeyObject.q)
//   )
//   return { privateKey, publicKey }
// }

const genKeyPair = async (context) => {
	const keyGenerator = Morfix.keyGenerator(context);
	const privateKey = keys.getSecretKey();
	const publicKey = keys.getPublicKey();
	fs.writeFileSync("seal_private_key", privateKey.save(), "utf8");
	fs.writeFileSync("seal_public_key", publicKey.save(), "utf8");
}; // Load and instantiate
const loadKeys = async (context) => {
	const sKey = Morfix.SecretKey();
	const pKey = Morfix.PublicKey();
	sKey.load(context, fs.readFileSync(secretKeyName, "utf8"));
	pKey.load(context, fs.readFileSync(publicKeyName, "utf8"));
	return { privateKey: sKey, publicKey: pKey };
};

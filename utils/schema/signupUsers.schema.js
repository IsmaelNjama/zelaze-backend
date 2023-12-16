const schema = {
	type: 'object',
	properties: {
		firstname: { type: 'string', isNotEmpty: true },
		lastname: { type: 'string', isNotEmpty: true },
		email: { type: 'string', format: 'email', isNotEmpty: true },
		password: { type: 'string', isNotEmpty: true },
		phone: { type: 'string', isNotEmpty: true },
		country: { type: 'string', isNotEmpty: true },
		region: { type: 'string', isNotEmpty: true },
		admin: { type: 'boolean' || null },
		bio: { type: 'string' || null },
	},
	required: [
		'firstname',
		'lastname',
		'email',
		'password',
		'phone',
		'country',
		'region',
	],
	additionalProperties: true,
};

module.exports = schema;

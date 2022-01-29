const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		container: {
			padding: {
				DEFAULT: '1rem',
				lg: '8rem',
				xl: '18rem',
				'2xl': '18rem'
			}
		},
		borderWidth: {
			DEFAULT: '1px'
		},
		extend: {}
	},

	plugins: []
};

module.exports = config;

// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        fontFamily: {
          lexend: ['"Lexend Mega"', 'sans-serif'],
        },
        borderRadius: {
          DEFAULT: '7px',
        },
        boxShadow: {
          DEFAULT: '4px 4px 0px 0px var(--color-border)',
          reverse: '-4px -4px 0px 0px var(--color-border)',
        },
        fontWeight: {
          base: 500,
          heading: 700,
        },
      },
    },
  };
  
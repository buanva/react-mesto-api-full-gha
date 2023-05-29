const allowlist = [
  'http://api.buanva.students.nomoredomains.rocks',
  'http://buanva.students.nomoredomains.rocks',
  'http://localhost:3000',
  'https://api.buanva.students.nomoredomains.rocks',
  'https://buanva.students.nomoredomains.rocks',
  'https://localhost:3000',
];

const corsOptions = {
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

function corsOptionsDelegate(req, callback) {
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions.origin = true;
  } else {
    corsOptions.origin = false;
  }
  callback(null, corsOptions);
}

module.exports = corsOptionsDelegate;

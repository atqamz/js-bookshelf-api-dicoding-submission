// 24/05/2021 created by Atqa Munzir for Submission Dicoding 'Belajar Membuat Aplikasi Back-End untuk Pemula'
// 19/10/2024 modified by Atqa Munzir for Submission Dicoding 'Belajar Back-End untuk Pemula dengan JavaScript'

const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server running on ${server.info.uri}`);
};

init();

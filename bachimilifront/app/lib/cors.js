import Cors from 'cors';

// Inicializa el middleware CORS
const cors = Cors({
  methods: ['GET', 'POST', 'HEAD', 'PUT'], // Define los métodos permitidos
  origin: '*', // Puedes restringir el origen a dominios específicos
});

// Helper para ejecutar middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
export { runMiddleware };

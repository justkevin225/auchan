export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginError = {
  message: string;
};

// Simulation d'un appel réseau de connexion
export function login(credentials: LoginCredentials): Promise<void> {
  const delay = 800 + Math.floor(Math.random() * 400);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { username, password } = credentials;

      if (username === "admin" && password === "admin") {
        resolve();
      } else {
        const error: LoginError = {
          message: "Mot de passe ou identifiant incorrect",
        };
        reject(error);
      }
    }, delay);
  });
}

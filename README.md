# Auchan

Application de gestion (dashboard, magasins, transactions) construite avec Next.js 16 et React 19.

## Prérequis

- **Node.js** 20+
- **pnpm** (recommandé) ou npm / yarn

## Installation

```bash
# Avec pnpm
pnpm install

# Ou avec npm
npm install
```

## Lancer le projet

### Mode développement

```bash
pnpm dev
# ou
npm run dev
```

L’app est disponible sur [http://localhost:3000](http://localhost:3000).

### Build de production

```bash
pnpm build
# ou
npm run build
```

### Démarrer le serveur de production

Après un build :

```bash
pnpm start
# ou
npm start
```

## Connexion

En développement, utilisez les identifiants de démo :

- **Identifiant :** `admin`
- **Mot de passe :** `admin`

## Scripts disponibles

| Commande   | Description                    |
| ---------- | ------------------------------ |
| `pnpm dev` | Serveur de développement       |
| `pnpm build` | Build de production          |
| `pnpm start` | Serveur de production (post-build) |
| `pnpm lint` | Vérification ESLint           |

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui**

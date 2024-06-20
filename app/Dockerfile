# Utiliser une image officielle de Node.js en version alpine pour sa légèreté
FROM node:14-alpine

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers de l'application dans le conteneur
COPY . .

# Construire l'application pour la production
RUN npm run build

# Exposer le port sur lequel l'application va tourner
EXPOSE 3000

# Lancer l'application avec npx serve (ou une autre commande selon votre configuration)
CMD ["npm", "start"]

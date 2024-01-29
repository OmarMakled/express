FROM node:16
RUN useradd -m -r -u 1001 nodeuser
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN chown -R nodeuser:nodeuser /usr/src/app
USER nodeuser
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]

FROM node:argon
RUN mkdir -p /home/apps/rss-aggregator
WORKDIR /home/apps/rss-aggregator
COPY package.json /home/apps/rss-aggregator
RUN npm install sails -g
RUN npm install sails
RUN npm install grunt -g
RUN npm install grunt
RUN npm install
COPY . /home/apps/rss-aggregator
import { createServer, Factory, Model } from 'miragejs'
import faker from 'faker'

type User = {
  name: string
  email: string
  created_at: string;
}

export const makeServer = () => {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        createdAt() {
          return faker.date.recent(10)
        },
      })
    },

    seeds(server) {
      server.createList('user', 200)
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750; // all api's call will wait 750ms

      this.get('/users');
      this.post('/users');

      // This is used to not mess with the same namespace used by nextjs. Since nextjs also has an api
      this.namespace = '';
      this.passthrough();
    }
  })

  return server
}
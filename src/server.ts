import Fastify from 'fastify';
import { PlayersListAction } from './application/PlayerListAction.js';
import { PlayerActions } from './application/PlayerActions.js';
import { PlayerNotFound } from './domain/Exception/PlayerNotFound.js';

const fastify = Fastify({
  logger: true
});

const playersListAction = new PlayersListAction();
const playerAction = new PlayerActions();

fastify.get('/players', function (request, reply) {
  reply.send(playersListAction.getPlayersList());
})

fastify.get<{
  Params: {id: string};
}>('/players/:id(^\\d+)', function (request, reply) {
  const { id } = request.params;
  try {
    reply.send(playerAction.getPlayerInformation(parseInt(id)));
  } catch(exception: unknown) {
    if (exception instanceof PlayerNotFound) {
      reply.code(404).send(exception.message);
    } else {
      throw exception;
    }
  }
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});

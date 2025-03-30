import Fastify from 'fastify';
import { PlayerListAction } from './application/PlayerListAction.js';
import { PlayerActions } from './application/PlayerActions.js';
import { PlayerNotFound } from './domain/exception/PlayerNotFound.js';
import { PlayersRepository } from './infra/Persistence/PlayersRepository.js';
import { StatisticsAction } from './application/StatisticsAction.js';
import { Imc } from './domain/service/Imc.js';
import { MatchesRatio } from './domain/service/MatchesRatio.js';
import { Median } from './domain/service/Median.js';

const fastify = Fastify({
  logger: true
});

const playersRepository = new PlayersRepository();
const playersListAction = new PlayerListAction(playersRepository);
const playerAction = new PlayerActions(playersRepository);
const statsAction = new StatisticsAction(playersRepository, new Imc(), new MatchesRatio(), new Median());

fastify.get('/players', function (request, reply) {
  reply.send(playersListAction.getPlayerList());
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

fastify.get('/statistics', function (request, reply) {
  reply.send(statsAction.getStatistics());
})


// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});

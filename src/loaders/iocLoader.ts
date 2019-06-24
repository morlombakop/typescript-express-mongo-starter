// import { useContainer as classValidatorUseContainer } from 'class-validator';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { useContainer as routingUseContainer } from 'routing-controllers';
// import { useContainer as typeGraphQLUseContainer } from 'type-graphql';
import { Container } from 'typedi';

const iocLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  routingUseContainer(Container);
  // classValidatorUseContainer(Container);
  // typeGraphQLUseContainer(Container);
};

export default iocLoader;

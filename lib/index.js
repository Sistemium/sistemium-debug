import debugLib from 'debug';

const { DEBUG_NAMESPACE = 'stm' } = process.env;
const { ERROR_NAMESPACE = 'stm:error' } = process.env;

export default function (ns) {
  return nsLog(`${DEBUG_NAMESPACE}:${ns}`, `${ERROR_NAMESPACE}:${ns}`);
}

export function nsLog(ns, nsError = `${ns}:error`) {
  return {
    debug: debug(ns),
    error: error(nsError),
  };
}

export function debug(ns) {

  const log = debugLib(ns);
  // eslint-disable-next-line
  log.log = console.log.bind(console);
  return log;

}

export function error(ns) {
  const log = debugLib(ns);
  log.log = console.error.bind(console);
  return log;
}

import debugLib from 'debug';
import type { Debugger } from 'debug';

const { DEBUG_NAMESPACE = 'stm' } = process.env;
const { ERROR_NAMESPACE = 'stm:error' } = process.env;

interface NSLog {
  debug: Debugger;
  error: Debugger;
}

export default function (ns: string): NSLog {
  return nsLog(`${DEBUG_NAMESPACE}:${ns}`, `${ERROR_NAMESPACE}:${ns}`);
}

export function nsLog(ns: string, nsError: string = `${ns}:error`): NSLog {
  return {
    debug: debug(ns),
    error: error(nsError),
  };
}

export function debug(ns: string): Debugger {

  const log = debugLib(ns);
  // eslint-disable-next-line
  log.log = console.log.bind(console);
  return log;

}

export function error(ns: string): Debugger {
  const log = debugLib(ns);
  log.log = console.error.bind(console);
  return log;
}

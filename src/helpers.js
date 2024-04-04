'use strict';

/** Returns whether or not light is on.
 * Takes float chanceLightsOn. Should be < 1.
 */

function getLightOn(chanceLightsOn) {
  return Math.random() <= chanceLightsOn;
}

export {getLightOn}
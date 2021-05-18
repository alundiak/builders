// import another component
import main from './main';

import('./a').then((realA) => {
  console.log(realA);
  realA.default();
  import('./b').then((realB) => {
    realB.default();
  });
});

main();

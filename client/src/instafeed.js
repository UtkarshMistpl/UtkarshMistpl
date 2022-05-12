import React from 'react';
import InstaFeeds from './components/InstaFeeds';



const Instafeed = () => {
  return (
    <>
      <header className="App-header" style={{textAlign:'center'}}>
        <h1>Instagram Feed with Instagram API</h1>
      </header>

      <InstaFeeds token={"IGQVJWOWctT2xlbk9GT0lVTi1FSlUxY1g0ZA2Nub1k1SHg5QWJHemlBUGJaT2dldHdNSm5vbjE4aS1IWjAtY3FPS1N0OHNYSnNHeGZAxbW5LMFJydGFnU3JxWG9SaFUybUxjRkY1WXhodi03VFh2dFR1NgZDZD"} limit={12}/>
    </>
  );
}

export default Instafeed;
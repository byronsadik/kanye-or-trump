export function yeezyOrTrump(){
    var yeezy = 'https://api.kanye.rest?format=json',
        // trump = 'https://api.tronalddump.io/random/quote',
        trump = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random',
        trueOrFalse =  (Math.round((Math.random() * 1) + 0) === 0),
        yeezyOrTrump
      ;

    yeezyOrTrump = trueOrFalse ? yeezy : trump;

    console.log(yeezyOrTrump);

    fetch(yeezyOrTrump)
        .then((res) => { return res.json() })
        .then((data) => {
          console.log(data);
        });
}
export function yeezyOrTrump(){
    var yeezy = 'https://api.kanye.rest?format=json',
        trump = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random',
        yeezyOrTrump =  (Math.round((Math.random() * 1) + 0) === 0),
        calloutURL,
        responseMessage
      ;

    calloutURL = yeezyOrTrump ? yeezy : trump;

    console.log(calloutURL);

    fetch(calloutURL)
        .then((res) => { return res.json() })
        .then((data) => {

            if (yeezyOrTrump) {
                yeezyMessage(data);
            } else {
                trumpMessage(data);
            }

            console.log(responseMessage);

        });


    function trumpMessage(data){
        responseMessage = data.message;
    }

    function yeezyMessage(data){
        responseMessage = data.quote;
    }
    
}
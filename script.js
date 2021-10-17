// JavaScript Portion

        let SpadeQueenGame = {
            'you':{'scoreSpan': '#your-SpadeQueen-result','div':'#your-box','score':0},
            'dealer':{'scoreSpan': '#dealer-SpadeQueen-result','div':'#dealer-box','score':0},
            'cards': ['2', '3' , '4', '5','6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
            'cardsMap': {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9,'10':10,'K': 10, 'J':10, 'Q':10,'A':[1,11]},
            'wins': 0,
            'losses': 0,
            'draws': 0,
            'isStand': false,
            'turnsOver': false,
        };

        const YOU= SpadeQueenGame['you']
        const DEALER= SpadeQueenGame['dealer']

        const hitSound = new Audio('sounds/swish.m4a');
        const winSound = new Audio ('sounds/cash.mp3');
        const lossSound = new Audio('sounds/aww.mp3');
        const drawsound = new Audio('sounds/draw.mp3');

        document.querySelector('#SpadeQueen-hit-button').addEventListener('click',SpadeQueenHit);

        document.querySelector('#SpadeQueen-stand-button').addEventListener('click', dealerLogic);

        document.querySelector('#SpadeQueen-deal-button').addEventListener('click', SpadeQueenDeal);


        function SpadeQueenHit(){

            if(SpadeQueenGame['isStand']=== false){
            let card = randomCard();
            
            showCard(card,YOU);
            updateScore(card, YOU);
            showScore(YOU);
            }
            
        }

        function randomCard(){
            let randomIndex = Math.floor(Math.random()*13);
            return SpadeQueenGame['cards'][randomIndex];

        }

        

        function showCard(card, activePlayer) {

        if (activePlayer['score']<= 21){
            let cardImage= document.createElement('img');
            cardImage.src= `images/${card}.png`;
            document.querySelector(activePlayer['div']).appendChild(cardImage);
            hitSound.play();
            
            }
        }


        function  SpadeQueenDeal() {

            if(SpadeQueenGame['turnsover']=== true){

            
                SpadeQueenGame['isStand']= false;
            
                let yourImages = document.querySelector('#your-box').querySelectorAll('img');
                let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

                for(i=0; i < yourImages.length; i++){
                    yourImages[i].remove();
                }

                for(i=0; i < dealerImages.length; i++){
                    dealerImages[i].remove();
                }
                YOU['score']= 0;
                DEALER['score'] = 0;

                document.querySelector('#your-SpadeQueen-result').textContent = 0;
                document.querySelector('#dealer-SpadeQueen-result').textContent = 0;

                document.querySelector('#your-SpadeQueen-result').style.color= '#ffffff' ;
                document.querySelector('#dealer-SpadeQueen-result').style.color = '#ffffff';

                document.querySelector('#SpadeQueen-Result').textContent = "Let's Play" ;
                document.querySelector('#SpadeQueen-Result').style.color = 'black';

                SpadeQueenGame['turnsOver'] = true;

            }
        }

            

            function updateScore(card, activePlayer){
                
                if( card ==='A'){
                // If adding 11 keeps me below 21 add 11. Otherwise add 1
                if(activePlayer['score']+ SpadeQueenGame['cardsMap'][card][1]  <= 21){
                    activePlayer['score'] += SpadeQueenGame['cardsMap'][card] [1];
                    }else{
                    
                    activePlayer['score'] += SpadeQueenGame['cardsMap'][card][0];
                    }
                    

                }   else{
                
                    activePlayer['score'] += SpadeQueenGame['cardsMap'][card];
                    }
            }



        function showScore(activePlayer){
            if(activePlayer['score']>21){
                document.querySelector(activePlayer['scoreSpan']).textContent=' BUST';
                document.querySelector(activePlayer['scoreSpan']).style.color='red';
            }else{
                document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
                }
        }




            

                    function sleep(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }  

                async function dealerLogic()  {


                    SpadeQueenGame['isStand']= true;

                    while(DEALER ['score']<16 && SpadeQueenGame['isStand']=== true){

                    let card = randomCard();
                    showCard(card , DEALER);
                    updateScore( card , DEALER);
                    showScore(DEALER);
                    await sleep(1000);
                    }
                    
                    //if(DEALER['score']>15){
                        SpadeQueenGame['turnsOver'] = true;
                        let winner = computeWinner();
                        showResult(winner);
                    
                }





        // compute winner n return who just won

        function computeWinner(){
            let winner;

            if( YOU['score'] <= 21){
                
                // condition higher score than dealer or when dealer bust but you re 21 or under
                if( YOU['score']>DEALER['score'] || (DEALER['score']>21)){
                SpadeQueenGame['wins']++;
                winner = YOU;

                }else if  (YOU['score']< DEALER ['score']){
                SpadeQueenGame['losses']++;
                winner= DEALER ;

                }else if  (YOU['score'] === DEALER['score']){

                SpadeQueenGame['draws']++;

                }

                // condition when user bust but dealer doesnt 
                } else if ( YOU ['score']> 21 && DEALER['score']<=21){
                SpadeQueenGame['losses']++;
                winner= DEALER;

                // Condition when you AND the Dealer busts
            
                }else if (YOU ['score']> 21 && DEALER ['score']>21){
                SpadeQueenGame['draws']++;
                }       

            
                return winner;
                    
            }

            

                function showResult(winner){

                    let message, messageColor;

                    if(SpadeQueenGame['turnsOver']=== true){


                    if (winner=== YOU) {
                        document.querySelector('#wins').textContent= SpadeQueenGame['wins'];
                        message ='You won!';
                        messageColor = 'white';
                        winSound.play();

                    }else if (winner === DEALER){
                        document.querySelector('#losses').textContent= SpadeQueenGame['losses'];
                        message = 'You Lost!';
                        messageColor = 'red';
                        lossSound.play();

                    }else {
                        document.querySelector('#draws').textContent= SpadeQueenGame['draws'];
                        message = 'You drew!';
                        messageColor = 'white';
                        drawsound.play();
                    }
                    
                    document.querySelector('#SpadeQueen-Result').textContent = message;
                    document.querySelector('#SpadeQueen-Result').style.color = messageColor;
                }
            }



import { Box, Typography } from '@mui/material';

const PlayerNamesAndCards = ({ players , username, showdown, winner, bestHands, playerTurnIndex}) => {

    if (!players || !Array.isArray(players)) {
        // This check ensures 'players' is not undefined and is an array
        console.log('Players data is not ready or not an array');
        return <div>Loading...</div>; // Or any other placeholder content
      }
      let tempHands = [];
     bestHands.forEach((obj)=>{
        if(obj != null){
            tempHands.push(obj);
        }
     })
      if(bestHands){

        console.log("best Hands!!!!,", tempHands);
      }
      

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom:10,
        right:10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '10px',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {players.map((player, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: winner == player.seatNumber ? "green" : showdown ? "" : playerTurnIndex == player.seatNumber ? "yellow" : "",
          }}
        >
          <Typography variant="body1" color={playerTurnIndex === player.seatNumber ? 'black' : 'white'}>
            {player.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
            }}
          >
            {player.name === username || showdown==true ?
            player.cards.map((card, cardIndex) => (
                
              <Box
                key={cardIndex}
                sx={{
                  width: '50px',
                  height: '70px',
                  backgroundColor: 'black',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '5px',
                }}
              >
                <img
                  src={`/tabletextures/cardpng/${card.value + card.suit}.png`}
                  alt={`${card.value} of ${card.suit}`}
                  style={{ width: '650%', height: '650%', objectFit: 'contain' }}
                />
              </Box>
            ))
            : 
            <>
            <Box
            key={0}
            sx={{
              width: '50px',
              height: '70px',
              backgroundColor: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '5px',
            }}
          >
            <img
              src={`/tabletextures/cardpng/facedown.png`}
              style={{ width: '175%', height: '175%', objectFit: 'contain' }}
            />
            
          </Box>
          <Box
            key={0}
            sx={{
              width: '50px',
              height: '70px',
              backgroundColor: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '5px',
            }}
          >
            <img
              src={`/tabletextures/cardpng/facedown.png`}
              style={{ width: '175%', height: '175%', objectFit: 'contain' }}
            />
            
          </Box>




          </>




          
      }
          </Box>
          {showdown && bestHands && tempHands[index] ? (
                        <Typography variant="body1" color="white">
                            {tempHands[index].hand}
                        </Typography>
                    ) : `${index}`}

        </Box>
      ))}
    </Box>
  );
};

export default PlayerNamesAndCards;

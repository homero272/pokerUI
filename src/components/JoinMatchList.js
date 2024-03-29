import React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';



const JoinMatchList = (props) => {
  const { arrayOfRooms } = props;
  const {handleSelectMatch} = props;

  const RenderRow = ({ index, style, data }) => {
    const { arrayOfRooms } = data;
    const handleRoomSelector = (props) =>{
  
      
      handleSelectMatch(props);
    }
  
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton onClick={() =>handleRoomSelector(arrayOfRooms[index])}>
          <ListItemText primary={arrayOfRooms[index]} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={arrayOfRooms.length}
        overscanCount={5}
        itemData={{ arrayOfRooms }}
      >
        {RenderRow}
      </FixedSizeList>
    </Box>
  );
}

export default JoinMatchList;
